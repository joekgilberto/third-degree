using System;

namespace service.Models
{
	public class Question
	{
        public int Id { get; set; }

        public string Type { get; set; }

        public string? Image { get; set; }

        public string Query { get; set; }

        public Dictionary<string, string>? Choices { get; set; }

        public string Answer { get; set; }

        public Question()
		{
		}
	}
}

