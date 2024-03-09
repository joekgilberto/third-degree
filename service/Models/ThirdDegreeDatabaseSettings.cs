using System;
namespace service.Models
{
	public class ThirdDegreeDatabaseSettings
	{
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string QuizzesCollectionName { get; set; } = null!;
    }
}

