import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './Components/manage/manage.component';

const routes: Routes = [
  { path: '', redirectTo: '/mange', pathMatch: 'full' },
  { path: 'mange', component: ManageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
