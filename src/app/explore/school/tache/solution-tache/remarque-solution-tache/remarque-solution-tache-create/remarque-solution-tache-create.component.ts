import { Validators } from "@angular/forms";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { RemarqueSolutionTacheService } from "../remarque-solution-tache.service";
import { SolutionTacheService } from "../../solution-tache.service";

@Component({
  selector: "app-remarque-solution-tache-create",
  templateUrl: "./remarque-solution-tache-create.component.html",
  styleUrls: ["./remarque-solution-tache-create.component.scss"],
})
export class RemarqueSolutionTacheCreateComponent
  extends BaseCreateComponent
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

    this._subscription["solution"] = this.solutionService.singleData$.subscribe(
      (solution) => {
        this.valuePatcher("solution", solution.id);
      }
    );
  }

  initialiseForm() {
    this.form = this.fb.group({
      solution: ["", Validators.required],
      remarque: [""],
      note: ["", Validators.required],
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      this.remarqueService.add(this.form.value).subscribe(() => {
        this.done.emit();
        this.loading = false;
      });
    }
  }
}
