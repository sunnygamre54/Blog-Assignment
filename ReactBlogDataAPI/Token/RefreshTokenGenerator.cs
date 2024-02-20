using Microsoft.Identity.Client;
using ReactBlogDataAPI.Models;
using System.Security.Cryptography;

namespace ReactBlogDataAPI.Token
{
    public class RefreshTokenGenerator : IRefreshTokenGenerator
    {
        private readonly BlogContext context;
        public RefreshTokenGenerator(BlogContext learn_DB)
        {
            context = learn_DB;
        }
        public string GenerateToken(string username)
        {
            var randomnumber = new byte[32];
            using (var randomnumbergenerator = RandomNumberGenerator.Create())
            {
                randomnumbergenerator.GetBytes(randomnumber);
                string RefreshToken = Convert.ToBase64String(randomnumber);

                var _user = context.TblRefreshToken.FirstOrDefault(o => o.UserName == username);
                if (_user != null)
                {
                    _user.RefreshToken = RefreshToken;
                    context.SaveChanges();
                }
                else
                {
                    TblRefreshToken tblRefreshtoken = new TblRefreshToken()
                    {
                        UserName = username,
                        TokenId = new Random().Next().ToString(),
                        RefreshToken = RefreshToken,
                        IsActive = true
                    };
                }

                return RefreshToken;
            }
        }
    }
}
