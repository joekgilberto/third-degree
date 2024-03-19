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

        public string Username { get; set; }

        public string? Password { get; set; }

        public List<string> Submissions { get; set; } = new List<string>();

        public int Clearance { get; set; } = 0;

        public User(Creds credentials)
        {
            Username = credentials.Username;
            Password = credentials.Password;
        }
    }
}