using System.ComponentModel.DataAnnotations.Schema;

namespace ReactBlogDataAPI.Models
{
    public class Blog
    {

        public Blog(string Title, string Content)
        {
            this.Title = Title;
            this.Content = Content;
        }

        public int BlogID { get; set; }        
        public int? UserID { get; set; }
        [ForeignKey("UserID")]
        public virtual Users? User { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
