import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxComponent } from './box/box.component';
import { BoxDetailComponent } from './box/components/box-detail/box-detail.component';

const routes: Routes = [
  {
    path: 'boxes',
    component: BoxComponent,
  },
  {
    path: 'boxes/:id',
    component: BoxDetailComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'boxes',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
