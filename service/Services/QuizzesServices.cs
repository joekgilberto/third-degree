using System;
using service.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace service.Services
{
	public class QuizzesServices
	{
		private readonly IMongoCollection<Quiz> _quizzesCollection;

		public QuizzesServices(IOptions<ThirdDegreeDatabaseSettings> thirdDegreeDatabaseSettings)
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

		public async Task CreateAsync(Quiz newQuiz)
		{
			await _quizzesCollection.InsertOneAsync(newQuiz);
		}

		public async Task UpdateAsync(string id, Quiz updatedQuiz)
		{
			await _quizzesCollection.ReplaceOneAsync(x => x.Id == id, updatedQuiz);
		}

		public async Task RemoveAsync(string id)
		{
			await _quizzesCollection.DeleteOneAsync(x => x.Id == id);
		}
	}
}

