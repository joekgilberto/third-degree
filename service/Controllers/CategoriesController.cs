using System;
using service.Models;
using service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoriesService _categoriesService;

        public CategoriesController(CategoriesService categoriesService)
        {
            _categoriesService = categoriesService;
        }

        [HttpGet]
        public async Task<List<Category>> Index()
        {
            return await _categoriesService.GetAsync();
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Category>> Get(string id)
        {
            Category? category = await _categoriesService.GetByIdAsync(id);

            if (category is null)
            {
                return NotFound();
            }

            return category;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(Category newCategory)
        {
            await _categoriesService.CreateAsync(newCategory);

            return CreatedAtAction(nameof(Get), new { id = newCategory.Id }, newCategory);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize]
        public async Task<IActionResult> Update(string id, Category updatedCategory)
        {
            Category? category = await _categoriesService.GetByIdAsync(id);

            if (category is null)
            {
                return NotFound();
            }

            updatedCategory.Id = category.Id;

            await _categoriesService.UpdateAsync(id, updatedCategory);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize]
        public async Task<IActionResult> Remove(string id)
        {
            Category? category = await _categoriesService.GetByIdAsync(id);

            if (category is null)
            {
                return NotFound();
            }

            await _categoriesService.RemoveAsync(id);

            return NoContent();
        }
    }
}

