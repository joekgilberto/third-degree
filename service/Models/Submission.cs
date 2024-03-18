using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace service.Models
{
    public class Submission
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public List<Answer> Answers { get; set; }

        public double Score { get; set; }

        public string Username { get; set; }

        public DateTime SubmissionDate { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string Challenger { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string Quiz { get; set; }
    }
}

