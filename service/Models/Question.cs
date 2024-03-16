using System;

namespace service.Models
{
	public class Question
	{
        public int Id { get; set; }

        public string Type { get; set; }

        public string? Image { get; set; }

        public string Query { get; set; }

        public Choices? Choices { get; set; }

        public string? Answer { get; set; }
        
        public List<string>? Answers {get; set;}

        public Question()
		{
		}
	}
}

