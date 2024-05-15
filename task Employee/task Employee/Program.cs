
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using task_Employee.Interfaces;
using task_Employee.Models;
using task_Employee.Repository;

namespace task_Employee
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<EmployeeDB>(options =>
               options.UseLazyLoadingProxies()
               .UseSqlServer(builder.Configuration.GetConnectionString("cs"))
           );
            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            //register
            builder.Services.AddScoped<IEmployee, EmployeeRepo>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
