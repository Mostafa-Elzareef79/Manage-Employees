
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/servise/employee.service';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginatePipe } from 'ngx-pagination';
import { LoaderService } from 'src/app/servise/loader.service';
import { error } from 'jquery';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  searchText:string='';
  isNameAscending:boolean=true;
  isEmailAscending:boolean=true;
  nameSortColor: string = 'black';
emailSortColor: string = 'black';
count:number=1;
  sinpEmpData: IEmployee = {
    id: 0,
    name: '',
    address: '',
    email: '',
    phone: ''
  };

  vaidationAddEmp: FormGroup;
  vaidationEditEmp: FormGroup;

  deleteEmp: number = 0;
  pageSize: number = 10;
  p: number = 1;
  employees: IEmployee[] = [];
  Emp: IEmployee = {
    id: 0,
    name: '',
    address: '',
    email: '',
    phone: ''
  };
  EditEmp: IEmployee = {
    id: 0,
    name: '',
    address: '',
    email: '',
    phone: ''
  };
  selectAll: boolean = false;
  selectedEmployees: number[] = [];
  loading:boolean=false;

  constructor(
    private employeeServise: EmployeeService,
    private toastr: ToastrService,
    formbuilder: FormBuilder,
    public loaderService:LoaderService
  ) {
    this.vaidationAddEmp = formbuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(010|011|012)\d{8}$/)]]
    });

    this.vaidationEditEmp = formbuilder.group({
      id: [0],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(010|011|012)\d{8}$/)]]
    });
  }
  get name(){
    return this.vaidationAddEmp.get('name')
  }
  get address(){
    return this.vaidationAddEmp.get('address')
  }
  get phone(){
    return this.vaidationAddEmp.get('phone')
  }
  get email(){
    return this.vaidationAddEmp.get('email')
  }
  get nameEdit(){
    return this.vaidationEditEmp.get('name')
  }
  get addressEdit(){
    return this.vaidationEditEmp.get('address')
  }
  get phoneEdit(){
    return this.vaidationEditEmp.get('phone')
  }
  get emailEdit(){
    return this.vaidationEditEmp.get('email')
  }
  ngOnInit(): void {
    
    this.loading = true;
    setTimeout(() => {
      this.employeeServise.GetAll().subscribe(
        (data) => {
          this.employees = data;
          this.loading = false; 
        },
        (error) => {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modelStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modelStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modelStateErrors.flat();
              } else {
                this.toastr.error(error.error, error.status);
              }
              break;
            case 201:
              this.toastr.success('Process succesful');
              break;
            case 401:
              this.toastr.error('Unauthorized', error.status);
              break;
            case 403:
            
              this.toastr.error('Unauthorized', error.status);
              break;
            case 404:
              this.toastr.error('No data to show ');
          
              break;
            case 500:
              this.toastr.error('Internal Server Error');
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(error);
              break;
          }
          this.loading=false
        }
      );
    }, 2000); 
  }

  searchEmployees($event:any): void {
    
    this.loading = true;
    setTimeout(() => {
      
    
      if (this.searchText.trim() !== '') {
        this.loading = true;
        this.employeeServise.searchEmployees(this.searchText).subscribe(
          (data) => {
            this.employees = data;
            this.loading = false;
          },
          (error) => {
            switch (error.status) {
              case 400:
                if (error.error.errors) {
                  const modelStateErrors = [];
                  for (const key in error.error.errors) {
                    if (error.error.errors[key]) {
                      modelStateErrors.push(error.error.errors[key]);
                    }
                  }
                  throw modelStateErrors.flat();
                } else {
                  this.toastr.error(error.error, error.status);
                }
                break;
              case 201:
                this.toastr.success('Process succesful');
                break;
              case 401:
                this.toastr.error('Unauthorized', error.status);
                break;
              case 403:
              
                this.toastr.error('Unauthorized', error.status);
                break;
              case 404:
                this.toastr.error('Error during search', 'Error');
            
                break;
              case 500:
                this.toastr.error('Internal Server Error');
                break;
              default:
                this.toastr.error('Something unexpected went wrong');
                console.log(error);
                break;
            }
           
           
            this.loading = false;
          }
        );
      }
    }
    , 2000); 


  }
  onchange(){
    if(this.searchText==''){
      this.loading = true;
      setTimeout(() => {
        this.employeeServise.GetAll().subscribe(
          (data) => {
            this.employees = data;
            this.loading = false; 
          },
          (error) => {

           this.toastr.error('Error during fetching data', 'Error');
            this.loading = false; 
          }
        );
      }, 2000); 
    }
  }
  DeleteEmployees(id: number): void {
    this.loading = true;
    setTimeout(() => {
     
      this.employeeServise.removeEmployee(id).subscribe((data) => {
      this.employees = this.employees.filter((emp: any) => emp.id !== id);
      this.toastr.success('Employee deleted successfully');
      this.deleteEmp = 0;
      this.loading = false; 
      if(  this.employees.length==0){
        this.selectAll = false;
      }
    },(error)=>{
      this.toastr.error('Employee deleted faild');
      this.loading=false;
    });
    }, 2000); 
   
  }

  deleteSelectedEmployees(): void {
    this.loading=true;
    
    if (this.deleteEmp != 0) {
      this.DeleteEmployees(this.deleteEmp);
      this.closeRemoveForm();
      this.deleteEmp=0;
      return;
    }

    this.selectedEmployees.forEach((id) => {
    
      
      this.employeeServise.removeEmployee(id).subscribe(
        () => {
          this.employees = this.employees.filter((emp) => emp.id !== id);
          this.selectAll = false;
        }
      );
    });

    if (this.selectedEmployees.length > 0) {
      this.toastr.success('Employees deleted successfully', 'Success');
    }

    this.selectedEmployees = [];
    this.closeRemoveForm();
    this.loading =false
  }

  addEmployee(): void {
    if (this.vaidationAddEmp?.invalid) {
      this.toastr.warning('Please enter valid data');
      return;
    }

    const emp = this.vaidationAddEmp.value;
    this.loading = true;
    setTimeout(() => {
       this.employeeServise.AddEmployee(emp).subscribe((data) => {
      this.toastr.success('Employee added successfully', 'Success');
      this.employeeServise.GetAll().subscribe((data) => {
        this.employees = data;
        if(this.employees.length!=this.selectedEmployees.length){
          this.selectAll=false;
         }
         if(this.employees.length==this.selectedEmployees.length){
          this.selectAll=true;
         }
         this.loading = false;
      },(error)=>{
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modelStateErrors.push(error.error.errors[key]);
                }
              }
              throw modelStateErrors.flat();
            } else {
              this.toastr.error(error.error, error.status);
            }
            break;
          case 201:
            this.toastr.success('Process succesful');
            break;
          case 401:
            this.toastr.error('Unauthorized', error.status);
            break;
          case 403:
           
            this.toastr.error('Unauthorized', error.status);
            break;
          case 404:
           
            break;
          case 500:
            this.toastr.error('Internal Server Error');
            break;
          default:
            this.toastr.error('Something unexpected went wrong');
            console.log(error);
            break;
        }
       
        
         this.resetForm();
      this.selectedEmployees = [];
      });
      this.loading = false;
    });
    }, 2000); 
  
  
   
  
    this.closeForm();
  }

  showADDForm(): void {
    this.Emp = {
      id: 0,
      name: '',
      address: '',
      email: '',
      phone: ''
    };

    this.vaidationAddEmp.reset();

    const popupForm = document.getElementById('popupForm') as HTMLElement;
    popupForm.style.display = 'block';
  }

  closeForm(): void {
    const popupForm = document.getElementById('popupForm') as HTMLElement;
    popupForm.style.display = 'none';
  }

  showEditForm(): void {
    const popupForm = document.getElementById('popupFormUpdate') as HTMLElement;
    popupForm.style.display = 'block';
  }

  closeEditForm(): void {
    const popupForm = document.getElementById('popupFormUpdate') as HTMLElement;
    popupForm.style.display = 'none';
    this.vaidationEditEmp.reset();
  }

  showRemoveForm(deleted: number): void {
    this.deleteEmp = deleted;

    if (this.selectedEmployees.length == 0) {
      if (this.deleteEmp != 0) {
        const popupForm = document.getElementById('popupFormRemove') as HTMLElement;
        popupForm.style.display = 'block';
      }

      if (this.selectedEmployees.length == 0 && this.deleteEmp == 0) {
        this.toastr.warning('Please check at least one item');
      }

      return;
    }

    const popupForm = document.getElementById('popupFormRemove') as HTMLElement;
    popupForm.style.display = 'block';
  }

  closeRemoveForm(): void {
    const popupForm = document.getElementById('popupFormRemove') as HTMLElement;
    popupForm.style.display = 'none';
  }

  resetForm(): void {
    this.Emp = {
      id: 0,
      name: '',
      address: '',
      email: '',
      phone: ''
    };
  }

  showUpdateForm(emp: IEmployee): void {
    this.vaidationEditEmp.patchValue({
      id: emp.id,
      name: emp.name,
      address: emp.address,
      email: emp.email,
      phone: emp.phone
    });

    this.showEditForm();
  }

  updateEmployee(): void {
    if (this.vaidationEditEmp?.invalid) {
      this.toastr.warning('Please enter valid data');
      return;
    }

    const EditEmp = this.vaidationEditEmp.value;
    this.loading = true;
    setTimeout(() => {
     this.employeeServise.UpdateEmployee(EditEmp.id, EditEmp).subscribe((response) => {
      this.employeeServise.GetAll().subscribe((data) => {
        this.toastr.success('Employee successfully updated', 'Update');
        this.employees = data;
        this.closeEditForm();
        this.selectedEmployees = [];
        this.loading = false;
      });
    },(error)=>{
      this.loading = false;
this.toastr.error("error during updae data")
this.closeEditForm();
    });
   }, 2000); 

 
  }

  onCheckboxChange(employeeId: number, event: any): void {
    if (event.target.checked) {
      this.selectedEmployees.push(employeeId);

     
    } else {
      this.selectedEmployees = this.selectedEmployees.filter((id) => id !== employeeId);

   
    }
   if(this.employees.length!=this.selectedEmployees.length){
    this.selectAll=false;
   }
   if(this.employees.length==this.selectedEmployees.length){
    this.selectAll=true;
   }
  }

  toggleAll(event: any): void {
    this.selectAll = event.target.checked;

    if (this.selectAll) {
      this.selectedEmployees = this.employees.map((emp) => emp.id);
    } else {
      this.selectedEmployees = [];
    }
  }
  isChecked(item: IEmployee): boolean {
    return this.selectedEmployees.some((checkedItem) => checkedItem === item.id);
  }
  sortByName() {
    this.employees.sort((a, b) => {
      if (this.isNameAscending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    
    this.isNameAscending = !this.isNameAscending;
    this.isEmailAscending = true; 
   
  this.nameSortColor =  'blue' ;
  this.emailSortColor = 'black'; 
  }
  sortByEmail() {
    this.employees.sort((a, b) => {
      if (this.isEmailAscending) {
        return a.email.localeCompare(b.email);
      } else {
        return b.email.localeCompare(a.email);
      }
    });
  
    this.isEmailAscending = !this.isEmailAscending;
    this.isNameAscending = true; 
    this.emailSortColor =  'blue' ;
    this.nameSortColor = 'black';
  }
  calculateIndex(index: number): number {
    return (this.p - 1) * this.pageSize + index + 1;
  }
  
}
