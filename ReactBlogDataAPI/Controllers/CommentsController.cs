using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactBlogDataAPI.Models;
using static System.Net.Mime.MediaTypeNames;

namespace ReactBlogDataAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private BlogContext dbContext;
        public CommentsController(BlogContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("{blogID}")]
        public async Task<ICollection<Comments>> GetComments(int blogID)
        {
            var comments = new List<Comments>();
            comments = await dbContext.Comments.Where(x => x.BlogID == blogID).OrderBy(x => x.CommentID).ToListAsync();
            //var comments = (from com in dbContext.Comments
            //                join user in dbContext.Users
            //                on com.UserID equals user.UserID
            //                where com.BlogID == blogID
            //                select new
            //                {
            //                    blogID = com.BlogID,
            //                    username = user.UserName,
            //                    comment = com.content,
            //                    createdAt = com.CreatedAt
            //                }).ToListAsync();
            return comments;
        }

        [HttpPost]
        public async Task<IActionResult> AddComments(Comments comment)
        {
            try
            {
                dbContext.Comments.Add(comment);
                await dbContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
