using System;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace service.Models
{
    public class Profile
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Username { get; set; }

        public List<string> Submissions { get; set; }

        public int Clearance { get; set; }

        public Profile(User user)
        {
            Id = user.Id;
            Username = user.Username;
            Submissions = user.Submissions;
            Clearance = user.Clearance;
        }
    }
}

