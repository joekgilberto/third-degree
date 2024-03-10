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

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            User? user = await _usersService.GetByIdAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User newUser)
        {
            await _usersService.CreateAsync(newUser);

            return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
        }

        [HttpPut("login")]
        public async Task<ActionResult<User>> Login(string username, string password)
        {
            User? user = await _usersService.GetByCredentialsAsync(username,password);

            if (user is null)
            {
                return NotFound();
            }

            return user;
        }
    }
}

