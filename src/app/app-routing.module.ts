import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RecipedetailsComponent } from './components/recipedetails/recipedetails.component';

const routes: Routes = [
   { path:'', component:WelcomeComponent },
   { path: 'recipe', component: RecipedetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
