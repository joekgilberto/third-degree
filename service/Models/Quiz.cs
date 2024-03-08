using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace service.Models
{
	public class Quiz
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Title { get; set; }

        public List<Question> Questions { get; set; }

        public List<string> Submissions { get; set; }

        public DateTime PostingDate { get; set; }

        public string Username { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string Author { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string Category { get; set; }
    }
}

