import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'form', component: FormComponent},
  {path: '', redirectTo: '/auth', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
