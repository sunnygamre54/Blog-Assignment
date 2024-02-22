using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ReactBlogDataAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ReactBlogDataAPI.Token;

namespace ReactBlogDataAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly BlogContext _dbContext;
        private readonly JWTSettings _jwtSettings;
        public readonly IRefreshTokenGenerator _refreshTokenGenerator;
        public UsersController(BlogContext dbContext, IOptions<JWTSettings> options, IRefreshTokenGenerator refreshTokenGenerator)
        {
            _dbContext = dbContext;
            _jwtSettings = options.Value;
            _refreshTokenGenerator = refreshTokenGenerator;
        }

        [HttpPost("ValidateUser")]
        public async Task<IActionResult> ValidateUser(Users user)
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
            return Ok("Valid User");
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(Users user)
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

            return Ok("User Added Successfully");
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<int>> GetUserID(string username)
        {
            var userId = await _dbContext.Users.Where(x => x.UserName == username).Select(x => x.UserID).FirstOrDefaultAsync();
            return userId;
        }

        [NonAction]
        public TokenResponse Authenticate(string username, Claim[] claims)
        {
            TokenResponse tokenResponse = new TokenResponse();
            var tokenkey = Encoding.UTF32.GetBytes(_jwtSettings.securityKey);
            var tokenhandler = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(15),
                 signingCredentials: new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256)

                );
            tokenResponse.JWTToken = new JwtSecurityTokenHandler().WriteToken(tokenhandler);
            tokenResponse.RefreshToken = _refreshTokenGenerator.GenerateToken(username);
            return tokenResponse;
        }

        [Route("Authenticate")]
        [HttpPost]
        public async Task<IActionResult> Authenticate(Users user)
        {
            TokenResponse tokenResponse = new TokenResponse();
            var _user = _dbContext.Users.FirstOrDefault(u => u.UserName == user.UserName && u.Password == user.Password);
            if (_user == null)
            {
                return Unauthorized();
            }

            var tokenhandler = new JwtSecurityTokenHandler();
            var tokenkey = Encoding.UTF32.GetBytes(_jwtSettings.securityKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.Name, _user.UserName),
                        //new Claim(ClaimTypes.Role, _user.Role)
                    }
                ),
                Expires = DateTime.Now.AddMinutes(20),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenhandler.CreateToken(tokenDescriptor);
            string finaltoken = tokenhandler.WriteToken(token);

            tokenResponse.JWTToken = finaltoken;
            tokenResponse.RefreshToken = _refreshTokenGenerator.GenerateToken(user.UserName);

            return Ok(tokenResponse);
        }

        [Route("Refresh")]
        [HttpPost]
        public async Task<IActionResult> Refresh(TokenResponse token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token.JWTToken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF32.GetBytes(_jwtSettings.securityKey)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            }, out securityToken);

            var _token = securityToken as JwtSecurityToken;

            if (_token != null && _token.Header.Alg.Equals(SecurityAlgorithms.HmacSha256))
            {
                return Unauthorized();
            }
            var username = principal.Identity.Name;
            var _reftable = _dbContext.TblRefreshToken.FirstOrDefault(u => u.UserName == username && u.RefreshToken == token.RefreshToken);
            if (_reftable == null)
            {
                return Unauthorized();
            }
            TokenResponse result = Authenticate(username, principal.Claims.ToArray());
            return Ok(result);
        }
    }
}
