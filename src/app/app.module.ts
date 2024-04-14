import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ReadComponent } from './components/read/read.component';
import { UpdateComponent } from './components/update/update.component';
import { DeleteComponent } from './components/delete/delete.component';
import { CreateComponent } from './components/create/create.component';
import { FormComponent } from './components/shared/form/form.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SearchComponent } from './components/shared/search/search.component';
import { AboutComponent } from './components/about/about.component';
import { CardComponent } from './components/about/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReadComponent,
    FormComponent,
    CreateComponent,
    UpdateComponent,
    DeleteComponent,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    AboutComponent,
    CardComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
