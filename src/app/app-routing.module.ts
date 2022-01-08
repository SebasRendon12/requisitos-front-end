import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Pagina1Component } from './pagina1/pagina1.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'pagina1', component: Pagina1Component },
  { path: 'home', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
