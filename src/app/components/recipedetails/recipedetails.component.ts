import { Component, OnInit } from '@angular/core';
import { SearchrecipesService } from 'src/app/services/searchrecipes.service';
import { Router } from '@angular/router';
import { RecipeInfo, Ingredient } from 'src/app/models/recipe-info';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { SpoonService } from 'src/app/services/spoon.service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipedetails',
  templateUrl: './recipedetails.component.html',
  styleUrls: ['./recipedetails.component.scss']
})
export class RecipedetailsComponent implements OnInit {
  public step: any = null ;
  public recipe: RecipeInfo = null;
  public recipeDetails: any = null;
  public apiSpoonImg: string = null;
  private _apiWine: string = "https://api.spoonacular.com/food/wine/recommendation";

  
  constructor( private _api: SearchrecipesService, private _router: Router, 
    private _http: HttpClient, private _spoon: SpoonService) { 
    this.apiSpoonImg = this._api.apiSpoonImages;
  }

  ngOnInit(): void {
    if (this._api.theRecipe=='')
    {
        this._router.navigate(['']);
    } else {
      this.recipe = this._api.theRecipe;
      this.recipeDetails = this._api.getRecipe(this.recipe.id);
    }
  }
  getRecipeInfo(recipeId: number) {
    return this._http
      .get<RecipeInfo>(`${environment.apiUrl}recipes/${recipeId}/information`)
       
  }

  public async getRecipe( recipeId:number)
  {
    this.recipeDetails = await this._spoon.getRecipeInfo(recipeId);
  }

}
