using System;
namespace service.Models
{
	public class Cred
    {
        public string Username { get; set; }

        public string? Password { get; set; }

        public Cred(string username)
        {
            Username = username;
        }
    }
}

