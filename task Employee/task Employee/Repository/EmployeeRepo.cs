using Microsoft.EntityFrameworkCore;
using task_Employee.Interfaces;
using task_Employee.Models;

namespace task_Employee.Repository
{
    public class EmployeeRepo:IEmployee
    {
        private readonly EmployeeDB context;
        public EmployeeRepo(EmployeeDB context)
        {
            this.context = context;


        }
        public void Add(Employee emp)
        {
            context.Employees.Add(emp);
            Save();
        }

        public void Delete(int id)
        {
            context.Employees.Remove(GetById(id));
            Save();
        }

        public List<Employee> GetAll()
        {
            return context.Employees.ToList();
        }

        public Employee GetById(int id)
        {
            return context.Employees.SingleOrDefault(i => i.Id == id);
        }

        public void Save()
        {
            context.SaveChanges();
        }


        public void Update(Employee emp)
        {
            context.Employees.Update(emp);
            Save();
        }
      

        public IEnumerable<Employee> Search(string query)
        {
          
            return context.Employees.Where(e => e.Name.Contains(query) || e.Email.Contains(query) || e.Phone.Contains(query)).ToList();
        }

     
    }
}

