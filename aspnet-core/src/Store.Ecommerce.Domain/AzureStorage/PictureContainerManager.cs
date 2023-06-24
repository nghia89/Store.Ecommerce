using System;
using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.Extensions.Options;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;
using Volo.Abp.BlobStoring;
using Volo.Abp.Domain.Services;

namespace Store.Ecommerce;

public class PictureContainerManager : DomainService
{
    private readonly BlobServiceClient _blobServiceClient;
    private readonly BlobContainerClient _containerClient;
    private readonly AzureStorageAccountOptions _azureStorageAccountOptions;

    public PictureContainerManager(IOptions<AzureStorageAccountOptions> azureStorageAccountOptions)
    {
        _blobServiceClient = new BlobServiceClient(azureStorageAccountOptions.Value.ConnectionString);
        _containerClient = _blobServiceClient.GetBlobContainerClient("pictures");
        _azureStorageAccountOptions = azureStorageAccountOptions.Value;
    }

    public async Task<string> SaveAsync(string fileName, byte[] byteArray)
    {
        var extension = Path.GetExtension(fileName);
        // var storageFileName = $"{Path.GetFileNameWithoutExtension(fileName)}-{Guid.NewGuid()}{extension}";
        var storageFileName = $"{Guid.NewGuid()}{extension}";
        var thumbnailBlobClient = _containerClient.GetBlobClient(storageFileName);
        BlobUploadOptions blobUploadOptions = new BlobUploadOptions()
        {
            HttpHeaders = new BlobHttpHeaders()
            {
                ContentType = "image/jpeg"
            }
        };
        var result = await thumbnailBlobClient.UploadAsync(new BinaryData(byteArray), blobUploadOptions);
        await UploadAndCreateThumbnailAsync(storageFileName, byteArray);
        return thumbnailBlobClient.Uri.ToString();
    }

    public async Task UploadAndCreateThumbnailAsync(string fileName, byte[] byteArray, int thumbnailSize = 320)
    {
        var storageFileName = $"{GetThumbnailFileName(fileName)}";
        var thumbnailBlobClient = _containerClient.GetBlobClient(storageFileName);

        using (var image = Image.Load(byteArray))
        {
            image.Mutate(x => x.Resize(new ResizeOptions
            {
                Size = new Size(thumbnailSize),
                Mode = ResizeMode.Max
            }));

            using (var thumbnailStream = new MemoryStream())
            {
                image.Save(thumbnailStream, new JpegEncoder());
                thumbnailStream.Position = 0;
                BlobUploadOptions blobUploadOptions = new BlobUploadOptions()
                {
                    HttpHeaders = new BlobHttpHeaders()
                    {
                        ContentType = "image/jpeg"
                    }
                };
                await thumbnailBlobClient.UploadAsync(new BinaryData(thumbnailStream.ToArray()), blobUploadOptions);
            }
        }
    }

    private string GetThumbnailFileName(string fileName)
    {
        string extension = Path.GetExtension(fileName);
        string thumbnailFileName = Path.GetFileNameWithoutExtension(fileName) + "_tn" + extension;
        return thumbnailFileName;
    }
}
