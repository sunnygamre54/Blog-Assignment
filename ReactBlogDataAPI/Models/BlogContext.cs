using Microsoft.EntityFrameworkCore;

namespace ReactBlogDataAPI.Models
{
    public class BlogContext : DbContext
    {
        public BlogContext(DbContextOptions<BlogContext> options) : base(options)
        {
            
        }

        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Comments> Comments { get; set; }        
        public DbSet<TblRefreshToken> TblRefreshToken { get; set; }
    }
}
