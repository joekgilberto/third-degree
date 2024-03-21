using System;
using service.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace service.Services
{
	public class QuizzesService
	{
		private readonly IMongoCollection<Quiz> _quizzesCollection;

		public QuizzesService(IOptions<ThirdDegreeDatabaseSettings> thirdDegreeDatabaseSettings)
		{
            var mongoClient = new MongoClient(thirdDegreeDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(thirdDegreeDatabaseSettings.Value.DatabaseName);

			_quizzesCollection = mongoDatabase.GetCollection<Quiz>(thirdDegreeDatabaseSettings.Value.QuizzesCollectionName);
		}

		public async Task<List<Quiz>> GetAsync()
		{
			return await _quizzesCollection.Find(_ => true).ToListAsync();
		}

		public async Task<Quiz?> GetByIdAsync(string id)
		{
			return await _quizzesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
		}

        public async Task<List<Quiz>> GetByCategoryAsync(string id)
        {
            return await _quizzesCollection.Find(x => x.Category == id).ToListAsync();
        }

        public async Task<List<Quiz>> GetByAuthorAsync(string id)
        {
            return await _quizzesCollection.Find(x => x.Author == id).ToListAsync();
        }

        public async Task CreateAsync(Quiz newQuiz)
		{
			await _quizzesCollection.InsertOneAsync(newQuiz);
		}

		public async Task<Quiz?> UpdateAsync(string id, Quiz updatedQuiz)
		{
            var options = new FindOneAndReplaceOptions<Quiz>
            {
                ReturnDocument = ReturnDocument.After
            };

            return await _quizzesCollection.FindOneAndReplaceAsync<Quiz>(x => x.Id == id, updatedQuiz, options);
		}

		public async Task RemoveAsync(string id)
		{
			await _quizzesCollection.DeleteOneAsync(x => x.Id == id);
		}
	}
}

