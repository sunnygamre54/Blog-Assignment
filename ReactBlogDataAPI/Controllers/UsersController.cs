using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactBlogDataAPI.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ReactBlogDataAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private BlogContext _dbContext;
        public UsersController(BlogContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("ValidateUser")]
        public async Task<ActionResult<HttpResponse>> ValidateUser(Users user)
        {
            if (_dbContext.Blogs == null)
            {
                return NotFound();
            }
            var userExists = await _dbContext.Users.Where(x => x.UserName == user.UserName && x.Password == user.Password).FirstOrDefaultAsync();
            if (userExists == null)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<HttpResponse>> AddUser(Users user)
        {
            if (user == null)
            {
                return NotFound();
            }

            var userExists = await _dbContext.Users.Where(x => x.UserName == user.UserName && x.UserEmail == user.UserEmail).FirstOrDefaultAsync();

            if (userExists != null)
            {
                return BadRequest();
            }

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
