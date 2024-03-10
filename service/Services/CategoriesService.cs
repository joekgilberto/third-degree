using System;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using service.Models;

namespace service.Services
{
	public class CategoriesService
	{
        private readonly IMongoCollection<Category> _categoriesCollection;

        public CategoriesService(IOptions<ThirdDegreeDatabaseSettings> thirdDegreeDatabaseSettings)
        {
            var mongoClient = new MongoClient(thirdDegreeDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(thirdDegreeDatabaseSettings.Value.DatabaseName);

            _categoriesCollection = mongoDatabase.GetCollection<Category>(thirdDegreeDatabaseSettings.Value.CategoriesCollectionName);
        }

        public async Task<List<Category>> GetAsync()
        {
            return await _categoriesCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(string id)
        {
            return await _categoriesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Category newCategory)
        {
            await _categoriesCollection.InsertOneAsync(newCategory);
        }

        public async Task UpdateAsync(string id, Category updatedCategory)
        {
            await _categoriesCollection.ReplaceOneAsync(x => x.Id == id, updatedCategory);
        }

        public async Task RemoveAsync(string id)
        {
            await _categoriesCollection.DeleteOneAsync(x => x.Id == id);
        }
    }
}

