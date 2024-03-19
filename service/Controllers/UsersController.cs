using System;
using service.Models;
using service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _usersService;

        public UsersController(UsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            User? user = await _usersService.GetByIdAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            user.Password = null;

            return user;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetByUsername(string username)
        {
            User? user = await _usersService.GetByUsernameAsync(username);

            if (user is null)
            {
                return NotFound();
            }

            user.Password = null;

            return user;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(Creds credentials)
        {
            User? exists = await _usersService.GetByUsernameAsync(credentials.Username);

            if (exists is null)
            {
                User newUser = new User(credentials);
                await _usersService.CreateAsync(newUser);

                return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
            }

            return BadRequest();
        }

        [HttpPut("login")]
        public async Task<ActionResult<Dictionary<string, object>>> Login(Creds credentials)
        {
            User? user = await _usersService.GetByCredentialsAsync(credentials.Username, credentials.Password);

            if (user is null)
            {
                return NotFound();
            }

            user.Password = null;

            var issuer = Environment.GetEnvironmentVariable("ASPNETCORE_ISSUER");
            var audience = Environment.GetEnvironmentVariable("ASPNETCORE_AUDIENCE");
            var key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("ASPNETCORE_KEY"));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.NameId, user.Id),
                }),
                Expires = DateTime.UtcNow.AddHours(10),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            string stringToken = tokenHandler.WriteToken(token);

            Dictionary<string, object> loggedIn = new Dictionary<string, object>();

            loggedIn.Add("user", user);
            loggedIn.Add("token", stringToken);

            return loggedIn;
        }
    }
}

