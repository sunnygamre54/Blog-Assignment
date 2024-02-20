
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ReactBlogDataAPI.Models;
using ReactBlogDataAPI.Token;
using System.Text;

namespace ReactBlogDataAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<BlogContext>(options =>
            //options.UseSqlServer(builder.Configuration.GetConnectionString("BlogApp"))
            //);

            options.UseSqlServer(builder.Configuration.GetConnectionString("BlogApp"), builder =>
            {
                builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
            }));

            var MyAllowSpecificOrigins = "_MyAllowSpecificOrgin";

            var _jwtSettings = builder.Configuration.GetSection("JWTSettings");
            builder.Services.Configure<JWTSettings>(_jwtSettings);

            var authkey = builder.Configuration.GetValue<string>("JWTSettings:securitykey");

            builder.Services.AddAuthentication(item =>
            {
                item.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                item.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(item =>
            {

                item.RequireHttpsMetadata = true;
                item.SaveToken = true;
                item.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF32.GetBytes(authkey)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

            // Add services to the container.

            var _dbcontext = builder.Services.BuildServiceProvider().GetService<BlogContext>();
            builder.Services.AddSingleton<IRefreshTokenGenerator>(provider => new RefreshTokenGenerator(_dbcontext));
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                                      policy =>
                                      {
                                          policy.AllowAnyOrigin().AllowAnyHeader()
                                                              .AllowAnyMethod();
                                      });
            });


            var app = builder.Build();

            app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
