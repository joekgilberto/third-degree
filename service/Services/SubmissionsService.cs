using System;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using service.Models;

namespace service.Services
{
	public class SubmissionsService
	{
        private readonly IMongoCollection<Submission> _submissionsCollection;

        public SubmissionsService(IOptions<ThirdDegreeDatabaseSettings> thirdDegreeDatabaseSettings)
        {
            var mongoClient = new MongoClient(thirdDegreeDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(thirdDegreeDatabaseSettings.Value.DatabaseName);

            _submissionsCollection = mongoDatabase.GetCollection<Submission>(thirdDegreeDatabaseSettings.Value.SubmissionsCollectionName);
        }

        public async Task<List<Submission>> GetAsync()
        {
            return await _submissionsCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Submission?> GetByIdAsync(string id)
        {
            return await _submissionsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Submission newSubmission)
        {
            await _submissionsCollection.InsertOneAsync(newSubmission);
        }

        public async Task UpdateAsync(string id, Submission updatedSubmission)
        {
            await _submissionsCollection.ReplaceOneAsync(x => x.Id == id, updatedSubmission);
        }

        public async Task RemoveAsync(string id)
        {
            await _submissionsCollection.DeleteOneAsync(x => x.Id == id);
        }
    }
}

