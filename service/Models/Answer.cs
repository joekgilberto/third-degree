using System;

namespace service.Models
{
	public class Answer
	{
		public int Id { get; set; }

		public string Guess { get; set; }

		public List<string> Guesses { get; set; }

		public Answer()
		{
		}
	}
}

