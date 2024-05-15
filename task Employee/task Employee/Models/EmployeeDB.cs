using Microsoft.EntityFrameworkCore;

namespace task_Employee.Models
{
    public class EmployeeDB:DbContext
    {
        public virtual DbSet<Employee> Employees { get; set;}

        //ioc constructor

        public EmployeeDB() : base() { }
        public EmployeeDB(DbContextOptions options) : base(options) { }
    }
}
