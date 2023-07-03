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

    public FileAppService(PictureContainerManager pictureContainerManager)
    {
        _pictureContainerManager = pictureContainerManager;
    }

    public async Task DeleteAsync(string imageId)
    {
        if (string.IsNullOrEmpty(imageId)) return;
        await _pictureContainerManager.DeleteImageKitAsync(imageId);
    }

    public async Task<SavedPictureDto> SavePicture(SavePictureDto input)
    {
        if (string.IsNullOrEmpty(input.FileName)) return null;

        byte[] byteArray = Convert.FromBase64String(input.Content);
        var result = await _pictureContainerManager.UploadImageToImageKit(input.FileName, byteArray);
        if (result == null) return null;
        return new SavedPictureDto
        {
            Id = result.fileId,
            Path = result.filePath
        };
    }
}