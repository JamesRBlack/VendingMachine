import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppConstants } from './app.constants';


const routes: Routes = [
  {
    path: AppConstants.homePath,
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule), // Use lazy loaded feature.
  },
  { path: '', redirectTo: AppConstants.homePath, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
