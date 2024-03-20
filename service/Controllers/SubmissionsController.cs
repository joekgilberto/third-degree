using System;
using service.Models;
using service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubmissionsController : ControllerBase
    {
        private readonly SubmissionsService _submissionsService;

        public SubmissionsController(SubmissionsService submissionsService)
        {
            _submissionsService = submissionsService;
        }

        [HttpGet]
        public async Task<List<Submission>> Index()
        {
            return await _submissionsService.GetAsync();
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Submission>> Get(string id)
        {
            Submission? submission = await _submissionsService.GetByIdAsync(id);

            if (submission is null)
            {
                return NotFound();
            }

            return submission;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(Submission newSubmission)
        {
            await _submissionsService.CreateAsync(newSubmission);

            return CreatedAtAction(nameof(Get), new { id = newSubmission.Id }, newSubmission);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize]
        public async Task<ActionResult<Submission>> Update(string id, Submission updatedSubmission)
        {
            Submission? submission = await _submissionsService.GetByIdAsync(id);

            if (submission is null)
            {
                return NotFound();
            }

            updatedSubmission.Id = submission.Id;

            Submission? update = await _submissionsService.UpdateAsync(id, updatedSubmission);

            if (update is null)
            {
                return NotFound();
            }

            return update;
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize]
        public async Task<IActionResult> Remove(string id)
        {
            Submission? submission = await _submissionsService.GetByIdAsync(id);

            if (submission is null)
            {
                return NotFound();
            }

            await _submissionsService.RemoveAsync(id);

            return NoContent();
        }
    }
}

