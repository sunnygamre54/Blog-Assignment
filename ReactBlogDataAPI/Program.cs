
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ReactBlogDataAPI.Models;

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
            // Add services to the container.

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

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
