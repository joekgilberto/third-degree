using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace service.Models
{
	public class Category
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Title { get; set; }

        public string? Image { get; set; }

        public string? Credit { get; set; }

        public string? Link { get; set; }
    }
}

