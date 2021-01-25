import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeEtablissementComponent } from './type-etablissement.component';
import { TypeEtablissementListComponent } from './type-etablissement-list/type-etablissement-list.component';

const routes: Routes = [
  {
    path: "",
    component: TypeEtablissementComponent,
  },
];

@NgModule({
  declarations: [TypeEtablissementComponent, TypeEtablissementListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TypeEtablissementModule { }
