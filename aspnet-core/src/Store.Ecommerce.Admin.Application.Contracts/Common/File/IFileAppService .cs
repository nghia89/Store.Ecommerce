using System.IO;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Store.Ecommerce
{
    public interface IFileAppService
    {
        Task<SavedPictureDto> SavePicture(SavePictureDto input);
        Task DeleteAsync(string pathFile);
    }
}