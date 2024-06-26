import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(m => m.BooksPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    loadChildren: () => import('./auth/log-in/log-in.module').then(m => m.LogInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'recommendations',
    loadChildren: () => import('./recommendations/recommendations.module').then(m => m.RecommendationsPageModule),
    canLoad: [AuthGuard]
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
