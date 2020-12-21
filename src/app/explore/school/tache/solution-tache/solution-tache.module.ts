import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SolutionTacheCreateComponent } from "./solution-tache-create/solution-tache-create.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SolutionTacheListComponent } from "./solution-tache-list/solution-tache-list.component";
import { SolutionTacheComponent } from "./solution-tache.component";
import { SolutionTacheShowComponent } from './solution-tache-show/solution-tache-show.component';
import { SolutionTacheEditComponent } from './solution-tache-edit/solution-tache-edit.component';
import { RemarqueSolutionTacheComponent } from './remarque-solution-tache/remarque-solution-tache.component';
import { RemarqueSolutionTacheShowComponent } from './remarque-solution-tache/remarque-solution-tache-show/remarque-solution-tache-show.component';
import { RemarqueSolutionTacheCreateComponent } from './remarque-solution-tache/remarque-solution-tache-create/remarque-solution-tache-create.component';
import { RemarqueSolutionTacheEditComponent } from './remarque-solution-tache/remarque-solution-tache-edit/remarque-solution-tache-edit.component';
import { SolutionTacheSoloComponent } from './solution-tache-list/solution-tache-solo/solution-tache-solo.component';

@NgModule({
  declarations: [
    SolutionTacheCreateComponent,
    SolutionTacheComponent,
    SolutionTacheListComponent,
    SolutionTacheShowComponent,
    SolutionTacheEditComponent,
    RemarqueSolutionTacheComponent,
    RemarqueSolutionTacheShowComponent,
    RemarqueSolutionTacheCreateComponent,
    RemarqueSolutionTacheEditComponent,
    SolutionTacheSoloComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [SolutionTacheCreateComponent, SolutionTacheComponent],
})
export class SolutionTacheModule {}
