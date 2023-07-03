using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Imagekit.Sdk;
using Microsoft.Extensions.Options;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;
using Volo.Abp.BlobStoring;
using Volo.Abp.Domain.Services;
using Imagekit;
using SixLabors.ImageSharp.PixelFormats;
using Store.Ecommerce.Settings;

namespace Store.Ecommerce;

public class PictureContainerManager : DomainService
{
    private readonly BlobServiceClient _blobServiceClient;
    private readonly BlobContainerClient _containerClient;
    private readonly AzureStorageAccountOptions _azureStorageAccountOptions;
    private readonly ImagekitioOptions _imagekitioOptions;
    private readonly ImagekitClient _imagekit;

    public PictureContainerManager(IOptions<AzureStorageAccountOptions> azureStorageAccountOptions,
        IOptions<ImagekitioOptions> imageKitIo)
    {
        _blobServiceClient = new BlobServiceClient(azureStorageAccountOptions.Value.ConnectionString);
        _containerClient = _blobServiceClient.GetBlobContainerClient("pictures");
        _azureStorageAccountOptions = azureStorageAccountOptions.Value;
        _imagekit = new ImagekitClient(imageKitIo.Value.PublicKey, imageKitIo.Value.PrivateKey, imageKitIo.Value.UrlEndpoint);
    }

    public async Task<Result> UploadImageToImageKit(string fileName, byte[] byteArray)
    {
        var extension = Path.GetExtension(fileName);
        FileCreateRequest ob = new FileCreateRequest
        {

            file = byteArray,
            fileName = $"{Guid.NewGuid()}{extension}"
        };
        ob.folder = "picture";
        var rsp = await _imagekit.UploadAsync(ob);
        return rsp;
    }

    public async Task DeleteImageKitAsync(string imageId)
    {
        var result = await _imagekit.DeleteFileAsync(imageId);
        await Task.CompletedTask;
    }


    public async Task<string> SaveAsync(string fileName, byte[] byteArray)
    {
        var extension = Path.GetExtension(fileName);
        // var storageFileName = $"{Path.GetFileNameWithoutExtension(fileName)}-{Guid.NewGuid()}{extension}";
        var storageFileName = $"{Guid.NewGuid()}{extension}";
        var blobClient = _containerClient.GetBlobClient(storageFileName);
        BlobUploadOptions blobUploadOptions = new BlobUploadOptions()
        {
            HttpHeaders = new BlobHttpHeaders()
            {
                ContentType = "image/jpeg"
            }
        };
        await blobClient.UploadAsync(new BinaryData(byteArray), blobUploadOptions);
        await UploadAndCreateThumbnailAsync(storageFileName, byteArray);
        return blobClient.Uri.ToString();
    }

    public async Task DeleteAsync(string pathFile)
    {
        var fileId = pathFile.Split("/").Last();
        _containerClient.DeleteBlobIfExists(fileId);
        _containerClient.DeleteBlobIfExists($"{GetThumbnailFileName(fileId)}");
        await Task.CompletedTask;
    }

    public async Task UploadAndCreateThumbnailAsync(string fileName, byte[] byteArray, int thumbnailSize = 320)
    {
        var storageFileName = $"{GetThumbnailFileName(fileName)}";
        var thumbnailBlobClient = _containerClient.GetBlobClient(storageFileName);

        using var image = Image.Load(byteArray);
        image.Mutate(x => x.Resize(new ResizeOptions
        {
            Size = new Size(thumbnailSize),
            Mode = ResizeMode.Max
        }));

        using var thumbnailStream = new MemoryStream();
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

    private string GetThumbnailFileName(string fileName)
    {
        string extension = Path.GetExtension(fileName);
        string thumbnailFileName = Path.GetFileNameWithoutExtension(fileName) + "_tn" + extension;
        return thumbnailFileName;
    }
}
