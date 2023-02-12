import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from '../../shared/models/recipe';
import { RecipeServiceService } from '../recipe-service.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  searchValue: string = '';

  constructor(
    private recipeService: RecipeServiceService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  toCreateRecipe() {
    this.router.navigate(['recipes/create-recipe']);
  }

  toDetails(id: string) {
    this.router.navigate(['recipes', id]);
  }

  signOut() {
    this.authService.signOut();
  }
}
