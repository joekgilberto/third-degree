using System;
namespace service.Models
{
	public class ThirdDegreeDatabaseSettings
	{
        public string ConnectionString { get; set; } = Environment.GetEnvironmentVariable("ASPNETCORE_MONGODB");

        public string DatabaseName { get; set; } = null!;

        public string QuizzesCollectionName { get; set; } = null!;

        public string SubmissionsCollectionName { get; set; } = null!;

        public string CategoriesCollectionName { get; set; } = null!;

        public string UsersCollectionName { get; set; } = null!;
    }
}

