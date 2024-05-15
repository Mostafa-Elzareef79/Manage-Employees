using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using task_Employee.Interfaces;
using task_Employee.Models;
using task_Employee.Repository;

namespace task_Employee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployee context;
        public EmployeeController(IEmployee context)
        {
            this.context = context;
        }
        [HttpGet]
        public IActionResult GetAllEmployee()
        {
            var employees = context.GetAll();
            if (employees.Count == 0)
            {
                return BadRequest("no employee at all");
            }


            return Ok(employees);

        }
        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            var employee = context.GetById(id);
            if (employee == null)
            {
                return BadRequest("no employee have this id");
            }
            return Ok(employee);


        }
        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var existingEmployee = context.GetById(id);
            if (existingEmployee == null)
            {
                return NotFound("Employee not found.");
            }

            context.Delete(id);

            return NoContent();
        }
        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, Employee employee)
        {
            

            var existingEmployee = context.GetById(id);


            if (existingEmployee == null)
            {
                return NotFound("Employee not found.");
            }
            existingEmployee.Address = employee.Address;
            existingEmployee.Email = employee.Email;
            existingEmployee.Phone= employee.Phone;
            existingEmployee.Name= employee.Name;

            context.Update(existingEmployee);

            return NoContent();
        }
        [HttpPost]
        public IActionResult AddEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            context.Add(employee);

            return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.Id }, employee);
        }
        [HttpGet("search")]
        public IActionResult Search(string query)
        {
         
            var searchResults = context.Search(query);
            if(searchResults == null)
            {
                return BadRequest("invakid search");
              
            }
            return Ok(searchResults);
        }
    }
}
