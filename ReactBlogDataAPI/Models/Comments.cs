using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactBlogDataAPI.Models
{
    public class Comments
    {
        [Key]
        public int CommentID { get; set; }
        public int? BlogID { get; set; }
        [ForeignKey("BlogID")]
        public virtual Blog? Blogs { get; set; }
        public int? UserID { get; set; }
        [ForeignKey("UserID")]
        public virtual Users? Users { get; set; }
        public string? content { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
