import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseEditComponent } from "src/app/shared/components/base-component/base-edit.component";
import { SolutionTacheService } from "../../solution-tache.service";
import { RemarqueSolutionTacheService } from "../remarque-solution-tache.service";

@Component({
  selector: "app-remarque-solution-tache-edit",
  templateUrl: "./remarque-solution-tache-edit.component.html",
  styleUrls: ["./remarque-solution-tache-edit.component.scss"],
})
export class RemarqueSolutionTacheEditComponent
  extends BaseEditComponent
  implements OnInit {
  @Output() done = new EventEmitter();
  constructor(
    public remarqueService: RemarqueSolutionTacheService,
    public solutionService: SolutionTacheService
  ) {
    super(remarqueService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.initialiseForm();
  }

  initialiseForm() {
    this.form = this.fb.group({
      solution: [this.single.solution, Validators.required],
      remarque: [this.single.remarque],
      note: [this.single.note, Validators.required],
    });
  }

  edit() {
    if (this.form.valid) {
      this.loading = true;
      this.remarqueService
        .update(this.single.id, this.form.value)
        .subscribe(() => {
          this.done.emit();
          this.loading = false;
        });
    }
  }
}
