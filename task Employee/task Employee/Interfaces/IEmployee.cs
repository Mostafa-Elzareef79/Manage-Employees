using task_Employee.Models;

namespace task_Employee.Interfaces
{
    public interface IEmployee
    {
        public List<Employee> GetAll();

        public Employee GetById(int id);
        public void Add(Employee emp);
        public void Delete(int id);

        public void Update(Employee emp);

        public void Save();
        public IEnumerable<Employee> Search(string query);
    }
}
