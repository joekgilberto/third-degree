using System;
using Amazon.SecurityToken.Model;
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

        public async Task<User?> GetByIdAsync(string id)
        {
            return await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _usersCollection.Find(x => x.Username == username).FirstOrDefaultAsync();
        }

        public async Task<User?> GetByCredentialsAsync(string username, string password)
        {
            return await _usersCollection.Find(x => x.Username == username && x.Password == password).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(User newUser)
        {
            await _usersCollection.InsertOneAsync(newUser);
        }
    }
}

