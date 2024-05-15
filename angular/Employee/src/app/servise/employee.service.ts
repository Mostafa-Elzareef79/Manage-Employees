import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { LoaderService } from './loader.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
   url=environment.baseUrl;

  constructor(private http:HttpClient,private loaderService:LoaderService) { 

  }
  searchEmployees(searchText: string): Observable<any> {
    return this.http.get<any>(`${this.url}/Employee/search?query=${searchText}`);
  }
   GetAll(): Observable<any[]> {
    this.loaderService.show();
    return this.http.get<any[]>(`${this.url}/Employee`) .pipe(
      tap(() => this.loaderService.hide())
    );
    
   
  }
  GetById(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/Employee/${id}`);
  }
  AddEmployee(emp:any): Observable<any[]> {
    return this.http.post<any[]>(`${this.url}/Employee`,emp);
  }
  removeEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/Employee/${id}`);
  }
  UpdateEmployee(id: number,emp:any): Observable<any> {
    return this.http.put<any>(`${this.url}/Employee/${id}`,emp);
  }
}
