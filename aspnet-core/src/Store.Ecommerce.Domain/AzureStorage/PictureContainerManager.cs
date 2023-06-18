using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;
using Volo.Abp.BlobStoring;
using Volo.Abp.Domain.Services;

namespace Store.Ecommerce;

public class PictureContainerManager : DomainService
{
    private readonly IBlobContainer<ProfilePictureContainer> _pictureContainer;
    private readonly AzureStorageAccountOptions _azureStorageAccountOptions;

    public PictureContainerManager(IBlobContainer<ProfilePictureContainer> pictureContainer,
            IOptions<AzureStorageAccountOptions> azureStorageAccountOptions)
    {
        _pictureContainer = pictureContainer;
        _azureStorageAccountOptions = azureStorageAccountOptions.Value;
    }

    public async Task<string> SaveAsync(string fileName, byte[] byteArray, bool overrideExisting = false)
    {
        var extension = Path.GetExtension(fileName);
        var storageFileName = $"{Path.GetFileNameWithoutExtension(fileName)}-{Guid.NewGuid()}{extension}";
        await _pictureContainer.SaveAsync(storageFileName, byteArray, overrideExisting);
        await UploadAndCreateThumbnailAsync(storageFileName, byteArray);
        return storageFileName;
    }

    public async Task UploadAndCreateThumbnailAsync(string fileName, byte[] byteArray, int thumbnailSize = 320)
    {
        var extension = Path.GetExtension(fileName);
        var storageFileName = $"{GetThumbnailFileName(fileName)}";

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

                await _pictureContainer.SaveAsync(storageFileName, byteArray, false);
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
