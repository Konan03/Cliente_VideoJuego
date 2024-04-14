import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ReadComponent } from './components/read/read.component';
import { UpdateComponent } from './components/update/update.component';
import { DeleteComponent } from './components/delete/delete.component';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/shared/form/form.component';
import {AboutComponent} from "./components/about/about.component";

export const routes: Routes = [
  {path:'about', component:AboutComponent},
  {path:'home', component: HomeComponent},
  {path:'create', component: CreateComponent},
  {path:'read', component: ReadComponent},
  {path:'update', component: UpdateComponent},
  {path:'delete', component: DeleteComponent},
  {path:'', pathMatch:'full', component: HomeComponent},
  {path:'**', pathMatch:'full', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
