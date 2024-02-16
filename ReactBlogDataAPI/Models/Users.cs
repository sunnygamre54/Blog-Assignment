using System.ComponentModel.DataAnnotations;

namespace ReactBlogDataAPI.Models
{
    public class Users
    {
        [Key]
        public int UserID { get; set; }
        public string? UserName { get; set; }
        public string? UserEmail { get; set; }
        public string? Password { get; set; }
    }
}
