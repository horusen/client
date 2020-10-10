import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TacheComponent } from "./tache.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "", component: TacheComponent }];

@NgModule({
  declarations: [TacheComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [RouterModule],
})
export class TacheModule {}
