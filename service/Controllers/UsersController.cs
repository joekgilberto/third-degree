using System;
using service.Models;
using service.Services;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> Get(string username)
        {
            User? user = await _usersService.GetByUsernameAsync(username);

            if (user is null)
            {
                return NotFound();
            }

            Profile profile = new Profile(user);

            return profile;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User newUser)
        {
            await _usersService.CreateAsync(newUser);

            return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
        }

        [HttpPut("login")]
        public async Task<ActionResult<Profile>> Login(string username, string password)
        {
            User? user = await _usersService.GetByCredentialsAsync(username,password);

            if (user is null)
            {
                return NotFound();
            }

            Profile profile = new Profile(user);

            return profile;
        }
    }
}

