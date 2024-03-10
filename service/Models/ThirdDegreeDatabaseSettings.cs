using System;
namespace service.Models
{
	public class ThirdDegreeDatabaseSettings
	{
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string QuizzesCollectionName { get; set; } = null!;

        public string SubmissionsCollectionName { get; set; } = null!;

        public string CategoriesCollectionName { get; set; } = null!;

        public ThirdDegreeDatabaseSettings()
        {
            string connectionString = Environment.GetEnvironmentVariable("ASPNETCORE_MONGODB");
            ConnectionString = connectionString;
        }
    }
}

