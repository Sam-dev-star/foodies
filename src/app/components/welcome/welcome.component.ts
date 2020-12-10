import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchrecipesService } from 'src/app/services/searchrecipes.service';
import { SpoonService } from 'src/app/services/spoon.service';
import { RecipeInfo, Ingredient } from 'src/app/services/spoon.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  
  public recipeSearchForm: FormGroup;
  public result: any;
  public results: any;
  public apiSpoonImg:string;
  private recipeService: RecipeInfo;
  constructor( private _fb:FormBuilder, private _api:SearchrecipesService, private _router: Router,private menu: MenuController ) { 
    this.apiSpoonImg = this._api.apiSpoonImages;
    console.log('ApiSpoonImage ',this.apiSpoonImg);
  }

  ngOnInit(): void {
    this.recipeSearchForm= this._fb.group({
      query:['',[Validators.required]]
    })
  }
  
  public async searchSubmit(){

    const query= this.recipeSearchForm.value.query; 
    this.result = await this._api.searchRecipes(query);
    console.log('this.result',this.result)
  }
  showIngredients(ingredients: Ingredient[]): string {
    return ingredients.reduce(
      (prev, curr) => `${prev ? prev + ', ' : ''}${curr.name}`,
      ''
    );
  }

  showRecipe( recipe:any )
  {
      this._api.theRecipe = recipe;
      this._router.navigate(['recipe']);
  }
  
}

  
   
  