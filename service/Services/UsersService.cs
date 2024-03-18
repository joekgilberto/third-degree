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
            return await _usersCollection.Find(x => x.Cred.Username == username).FirstOrDefaultAsync();
        }

        public async Task<User?> GetByCredentialsAsync(Cred credentials)
        {
            return await _usersCollection.Find(x => x.Cred.Username == credentials.Username && x.Cred.Password == credentials.Password).FirstOrDefaultAsync();
        }

        public async Task CreateAsync(User newUser)
        {
            await _usersCollection.InsertOneAsync(newUser);
        }
    }
}

