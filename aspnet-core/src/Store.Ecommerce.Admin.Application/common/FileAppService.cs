using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;
using Volo.Abp.Application.Services;
using Volo.Abp.DependencyInjection;
using System;

namespace Store.Ecommerce.Catalog.ImageUploader;


public class FileAppService : ApplicationService, IFileAppService
{
    private readonly PictureContainerManager _pictureContainerManager;

    public FileAppService( PictureContainerManager pictureContainerManager)
    {
        _pictureContainerManager = pictureContainerManager;
    }

    public async Task<SavedPictureDto> SavePicture(SavePictureDto input)
    {
        byte[] byteArray = Convert.FromBase64String(input.Content);
        var storageFileName = await _pictureContainerManager.SaveAsync(input.FileName, byteArray, true);
        return new SavedPictureDto { StorageFileName = storageFileName };
    }
}