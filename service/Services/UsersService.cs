using System;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using service.Models;

namespace service.Services
{
    public class UsersService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UsersService(IOptions<ThirdDegreeDatabaseSettings> thirdDegreeDatabaseSettings)
        {
            var mongoClient = new MongoClient(thirdDegreeDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(thirdDegreeDatabaseSettings.Value.DatabaseName);

            _usersCollection = mongoDatabase.GetCollection<User>(thirdDegreeDatabaseSettings.Value.UsersCollectionName);
        }

        public async Task<List<User>> GetAsync()
        {
            return await _usersCollection.Find(_ => true).ToListAsync();
        }

        public async Task<User?> GetByIdAsync(string id)
        {
            return await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(User newUser)
        {
            await _usersCollection.InsertOneAsync(newUser);
        }

        public async Task UpdateAsync(string id, User updatedUser)
        {
            await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);
        }

        public async Task RemoveAsync(string id)
        {
            await _usersCollection.DeleteOneAsync(x => x.Id == id);
        }
    }
}

