import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { Recipe } from '../../shared/models/recipe';
import { RecipeServiceService } from '../recipe-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  searchValue: string = '';
  filteredRecipes: Recipe[] = [];
  currentUser: any;
  user: any;

  constructor(
    private recipeService: RecipeServiceService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
      this.getUser();
    });
  }

  filterRecipes() {
    this.filteredRecipes = this.recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  toCreateRecipe() {
    this.router.navigate(['recipes/create-recipe']);
  }

  toProfile() {
    this.router.navigate(['profile']);
  }

  toDetails(id: string) {
    this.router.navigate(['recipes', id]);
  }

  signOut() {
    this.authService.signOut().then(() => {
      localStorage.clear();
      this.snackBar.open('Signed out successfully', 'Close', {
        duration: 2000,
      });
    });
  }

  getUser() {
    this.currentUser = this.authService.getCurrentUser();
    const userId = this.currentUser.uid;
    this.userService.getUser(userId).subscribe((user) => {
      this.user = user;
    });
  }
}
