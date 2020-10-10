import { SidebarExploreSchoolModule } from "./sidebar-explore-school/sidebar-explore-school.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExploreSchoolComponent } from "./explore-school.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: ExploreSchoolComponent,
  },
];

@NgModule({
  declarations: [ExploreSchoolComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidebarExploreSchoolModule,
  ],
  exports: [RouterModule],
})
export class ExploreSchoolModule {}
