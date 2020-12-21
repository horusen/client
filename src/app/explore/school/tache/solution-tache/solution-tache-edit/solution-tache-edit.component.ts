import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseEditComponent } from "src/app/shared/components/base-component/base-edit.component";
import { SolutionTacheService } from "../solution-tache.service";

@Component({
  selector: "app-solution-tache-edit",
  templateUrl: "./solution-tache-edit.component.html",
  styleUrls: ["./solution-tache-edit.component.scss"],
})
export class SolutionTacheEditComponent
  extends BaseEditComponent
  implements OnInit {
  constructor(public solutionService: SolutionTacheService) {
    super(solutionService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["single"] = this.solutionService.singleData$.subscribe(
      (single) => {
        this.initialiseForm(single);
      }
    );
  }

  initialiseForm(single: any) {
    this.form = this.fb.group({
      affectation_tache: [single.affectation_tache.id, Validators.required],
      solution: [single.solution, Validators.required],
    });

    this.isFormOk = true;
  }

  edit() {
    if (this.form.valid) {
      this.loading = true;
      this.solutionService
        .update(this.single.id, this.form.value)
        .subscribe(() => {
          this.loading = false;
          this.helper.toggleModal("solution-tache-edit-modal");
          this.helper.toggleModal("solution-tache-show-modal");
          this.helper.alertSuccess();
        });
    }
  }
}
