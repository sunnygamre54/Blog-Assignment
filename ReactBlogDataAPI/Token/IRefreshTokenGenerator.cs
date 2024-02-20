using Microsoft.AspNetCore.Authentication.Cookies;

namespace ReactBlogDataAPI.Token
{
    public interface IRefreshTokenGenerator
    {
        string GenerateToken(string username);

    }
}
