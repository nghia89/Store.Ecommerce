using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;
using Volo.Abp.Application.Services;
using Volo.Abp.DependencyInjection;

namespace Store.Ecommerce.Catalog.ImageUploader;


public class FileAppService : ApplicationService, IFileAppService
{
    private readonly BlobServiceClient _blobServiceClient;
    private readonly PictureContainerManager _pictureContainerManager;
    private readonly string _containerName;

    public FileAppService(string connectionString, string containerName, PictureContainerManager pictureContainerManager)
    {
        _blobServiceClient = new BlobServiceClient(connectionString);
        _containerName = containerName;
        _pictureContainerManager = pictureContainerManager;
    }

    public async Task<SavedPictureDto> SavePicture(SavePictureDto input)
    {
        var storageFileName = await _pictureContainerManager.SaveAsync(input.FileName, input.Content, true);
        return new SavedPictureDto { StorageFileName = storageFileName };
    }
}