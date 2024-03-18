using System;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace service.Models
{
	public class User
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public Cred Cred { get; set; }

        public List<string> Submissions { get; set; }

        public int Clearance { get; set; }
    }
}

