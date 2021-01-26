import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { AffectationTacheService } from "../../affectation-tache/affectation-tache.service";
import { SolutionTacheService } from "../solution-tache.service";

@Component({
  selector: "app-solution-tache-create",
  templateUrl: "./solution-tache-create.component.html",
  styleUrls: ["./solution-tache-create.component.scss"],
})
export class SolutionTacheCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  constructor(
    public solutionService: SolutionTacheService,
    public affectationService: AffectationTacheService
  ) {
    super(solutionService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    super.ngOnInit();

    this.initialiseForm();

    this._subscription[
      "affectation"
    ] = this.affectationService.singleData$.subscribe((affectation) => {
      this.formValuePatcher("affectation_tache", affectation.id);
    });
  }

  initialiseForm() {
    this.form = this.fb.group({
      affectation_tache: ["", Validators.required],
      solution: ["", Validators.required],
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      this.solutionService.add(this.form.value).subscribe(() => {
        this.loading = false;
        this.helper.toggleModal("solution-tache-create-modal");
        this.helper.alertSuccess();
      });
    }
  }
}
