﻿using Microsoft.EntityFrameworkCore;

namespace ReactBlogDataAPI.Models
{
    public class BlogContext : DbContext
    {
        public BlogContext(DbContextOptions<BlogContext> options) : base(options)
        {
            
        }

        public DbSet<Blog> Blogs { get; set; }
    }
}
