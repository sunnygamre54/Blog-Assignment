using System.ComponentModel.DataAnnotations;

namespace ReactBlogDataAPI.Models
{
    public class TblRefreshToken
    {
        [Key]
        public string TokenId { get; set; }
        public string RefreshToken { get; set; }
        public string UserName { get; set; }
        public bool IsActive { get; set; }
    }
}
