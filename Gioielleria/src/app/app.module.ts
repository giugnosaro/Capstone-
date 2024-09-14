import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { GaranzieComponent } from './home/garanzie/garanzie.component';
import { CarouselgioielliComponent } from './home/carouselgioielli/carouselgioielli.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './services/user.service';
import { FormComponent } from './form/form.component';
import { AllComponent } from './Jewels/all/all.component';
import { AnelliComponent } from './Jewels/anelli/anelli.component';
import { OrecchiniComponent } from './Jewels/orecchini/orecchini.component';
import { CollaneComponent } from './Jewels/collane/collane.component';
import { BraccialiComponent } from './Jewels/bracciali/bracciali.component';
import { CiondoliComponent } from './Jewels/ciondoli/ciondoli.component';
import { AccessoriComponent } from './Jewels/accessori/accessori.component';
import { OrologiComponent } from './Jewels/orologi/orologi.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CarouselComponent,
    GaranzieComponent,
    CarouselgioielliComponent,
    AuthComponent,
    FormComponent,
    AllComponent,
    AnelliComponent,
    OrecchiniComponent,
    CollaneComponent,
    BraccialiComponent,
    CiondoliComponent,
    AccessoriComponent,
    OrologiComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
