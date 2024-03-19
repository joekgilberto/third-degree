using System;
using service.Models;
using service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizzesController : ControllerBase
    {
        private readonly QuizzesService _quizzesService;

        public QuizzesController(QuizzesService quizzesService)
        {
            _quizzesService = quizzesService;
        }

        [HttpGet]
        public async Task<List<Quiz>> Index()
        {
            return await _quizzesService.GetAsync();
        }

        [HttpGet("{id:length(24)}")]
        [Authorize]
        public async Task<ActionResult<Quiz>> Get(string id)
        {
            Quiz? quiz = await _quizzesService.GetByIdAsync(id);

            if (quiz is null)
            {
                return NotFound();
            }

            return quiz;
        }

        [HttpGet("category/{id:length(24)}")]
        public async Task<List<Quiz>> GetByCategory(string id)
        {
            return await _quizzesService.GetByCategoryAsync(id);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(Quiz newQuiz)
        {
            await _quizzesService.CreateAsync(newQuiz);

            return CreatedAtAction(nameof(Get), new { id = newQuiz.Id }, newQuiz);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize]
        public async Task<IActionResult> Update(string id, Quiz updatedQuiz)
        {
            Quiz? quiz = await _quizzesService.GetByIdAsync(id);

            if (quiz is null)
            {
                return NotFound();
            }

            updatedQuiz.Id = quiz.Id;

            await _quizzesService.UpdateAsync(id, updatedQuiz);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize]
        public async Task<IActionResult> Remove(string id)
        {
            Quiz? quiz = await _quizzesService.GetByIdAsync(id);

            if(quiz is null)
            {
                return NotFound();
            }

            await _quizzesService.RemoveAsync(id);

            return NoContent();
        }
    }
}

