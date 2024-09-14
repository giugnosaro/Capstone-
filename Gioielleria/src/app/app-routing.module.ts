import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { FormComponent } from './form/form.component';
import { AllComponent } from './Jewels/all/all.component';
import { AnelliComponent } from './Jewels/anelli/anelli.component';
import { OrecchiniComponent } from './Jewels/orecchini/orecchini.component';
import { CollaneComponent } from './Jewels/collane/collane.component';
import { BraccialiComponent } from './Jewels/bracciali/bracciali.component';
import { CiondoliComponent } from './Jewels/ciondoli/ciondoli.component';
import { AccessoriComponent } from './Jewels/accessori/accessori.component';
import { OrologiComponent } from './Jewels/orologi/orologi.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'form', component: FormComponent},
  {path: 'all', component: AllComponent},
  {path: 'anelli', component: AnelliComponent},
  {path: 'orecchini', component: OrecchiniComponent},
  {path: 'collane', component: CollaneComponent},
  {path: 'bracciali', component: BraccialiComponent},
  {path: 'ciondoli', component: CiondoliComponent},
  {path: 'accessori', component: AccessoriComponent},
  {path: 'orologi', component: OrologiComponent},
  {path: '', redirectTo: '/auth', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
