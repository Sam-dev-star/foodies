import { Injectable } from '@angular/core';
import { SpoonService } from './spoon.service';
import { RecipeInfo } from '../models/recipe-info';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchrecipesService {
  public query: string = null;
  public recipes: any = [];
  public apiSpoonImages: string;
  public theRecipe: any = null;
  public recipeDetails: any = null;
  private _apiUrl: string = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search";
  private _apiKey: string = "b850454dd6msh304a6d03a5246ecp1004bejsn6e049f0ea335";
  public apiInstruction: string = "https://api.spoonacular.com/recipes/analyzeInstructions"; 
  private _apiWinePairing: string = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing";
  public apiWine: string = "https://api.spoonacular.com/food/wine/recommendation"
  public api: string = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information";
  
  constructor( private _spoon: SpoonService,  private _http: HttpClient) {
    this.apiSpoonImages = this._spoon.apiImg;
  }

  public async searchRecipes(query: string){
    console.log('start searchRecipes');
    console.log('quer',query)
    this._spoon.searchRecipes(query).subscribe(recipes => {
      console.log('recipes', recipes);
      // this.recipes.spoon = spoon;
    });
  }

  public async getRecipe( recipeId:number)
  {
    this.recipeDetails = await this._spoon.getRecipeInfo(recipeId);
    console.log('this recipe detail', this.recipeDetails )
  }
  
  getRecipeInfo(recipeId: number) {
    return this._http
      .get<RecipeInfo>(`${this._apiUrl}recipes/${recipeId}/information`)
       
  }
}
