using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactBlogDataAPI.Migrations
{
    /// <inheritdoc />
    public partial class initials201 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TblRefreshToken",
                columns: table => new
                {
                    TokenId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TblRefreshToken", x => x.TokenId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TblRefreshToken");
        }
    }
}
