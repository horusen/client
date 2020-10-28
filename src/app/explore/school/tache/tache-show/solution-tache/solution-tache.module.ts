import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SolutionTacheComponent } from "./solution-tache.component";
import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SolutionTacheComponent,
  },
];
@NgModule({
  declarations: [SolutionTacheComponent],
  imports: [CommonModule],
})
export class SolutionTacheModule {}
