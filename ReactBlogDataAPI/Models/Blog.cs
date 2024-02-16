namespace ReactBlogDataAPI.Models
{
    public class Blog
    {

        public Blog(string Title, string Content)
        {
            this.Title = Title;
            this.Content = Content;
        }

        public int ID { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }
    }
}
