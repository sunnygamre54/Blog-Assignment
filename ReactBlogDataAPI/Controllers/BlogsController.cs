using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactBlogDataAPI.Models;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace ReactBlogDataAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogsController : ControllerBase
    {
        private BlogContext _blogContext;
        public BlogsController(BlogContext blogContext)
        {
            _blogContext = blogContext;
        }

        [HttpGet(Name = "GetBlogs")]
        public async Task<ActionResult<IEnumerable<Blog>>> GetBlogs()
        {
            if (_blogContext.Blogs == null)
            {
                return NotFound();
            }
            return await _blogContext.Blogs.OrderBy(x => x.BlogID).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Blog>> GetBlogs(int id)
        {
            if (_blogContext.Blogs == null)
            {
                return NotFound();
            }
            var blog = await _blogContext.Blogs.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }
            return blog;
        }

        [HttpPost]
        public async Task<ActionResult<Blog>> AddBlogs(Blog data)
        {
            if(data == null)
            {
                return NotFound();
            }

            _blogContext.Blogs.Add(data);
            await _blogContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBlogs), new { id = data.BlogID }, data);
        }
    }
}
