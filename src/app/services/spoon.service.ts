import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class SpoonService {
  
  imageUrl: string;
  record:number = 200; 
  public apiImg: string ="https://spoonacular.com/recipeImages/";
  private _apiImgKey:string ="7bfcf13e0a18406788a474bd39505634"; 
  private _apiUrl: string = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search";
  private _apiKey: string = "b850454dd6msh304a6d03a5246ecp1004bejsn6e049f0ea335";
  private _apiHost: string = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
  private _HttpOption: object = {
    headers: new HttpHeaders({
      'x-rapidapi-key' : this._apiKey,
      'x-rapidapi-host' : this._apiHost,
    })
  };
  private _apiWinePairing: string = "https://api.spoonacular.com/food/wine/pairing";

  _resultSearch = new Subject();
   resultSearch = this._resultSearch.asObservable();

  constructor( private _http: HttpClient) { }

  public searchRecipes(query: String){
    const _apiUrl= this._apiUrl + '?q=' + query + `&number=${this.record}`; 
    return this._http.get(_apiUrl,this._HttpOption);  
  }
  
  getRecipeInfo(recipeId: number) {
    return this._http
      .get<RecipeInfo>(`${this._apiUrl}recipes/${recipeId}/information`)
       
  }
};


  


export interface Us {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface Metric {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface Measures {
  us: Us;
  metric: Metric;
}

export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  original: string;
  originalString: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  metaInformation: string[];
  measures: Measures;
}

export interface ProductMatch {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  averageRating: number;
  ratingCount: number;
  score: number;
  link: string;
}

export interface WinePairing {
  pairedWines: string[];
  pairingText: string;
  productMatches: ProductMatch[];
}

export interface Ingredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Equipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Length {
  number: number;
  unit: string;
}

export interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length: Length;
}

export interface AnalyzedInstruction {
  name: string;
  steps: Step[];
}

export interface RecipeInfo {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  lowFodmap: boolean;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  spoonacularScore: number;
  healthScore: number;
  creditsText: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: any[];
  winePairing: WinePairing;
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  originalId?: any;
}