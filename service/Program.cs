﻿using service.Models;
using service.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<ThirdDegreeDatabaseSettings>(
    builder.Configuration.GetSection("ThirdDegreeDatabase"));

builder.Services.AddSingleton<QuizzesService>();
builder.Services.AddSingleton<SubmissionsService>();
builder.Services.AddSingleton<CategoriesService>();
builder.Services.AddSingleton<UsersService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

