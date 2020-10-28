import { Component, OnInit, Input } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { CorrectionTacheService } from "../correction-tache.service";

@Component({
  selector: "app-correction-tache-create",
  templateUrl: "./correction-tache-create.component.html",
  styleUrls: ["./correction-tache-create.component.scss"],
})
export class CorrectionTacheCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  @Input() tache: any;
  constructor(public correctionService: CorrectionTacheService) {
    super(correctionService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["schema"] = this.correctionService.schema$.subscribe(
      () => {
        this.initialiseForm();
      }
    );
  }

  initialiseForm() {
    this.initForm(["libelle", "tache", "description"], [], () => {
      this.valuePatcher("tache", this.tache.id);
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      this.correctionService.add(this.form.value).subscribe(() => {
        this.loading = false;
        this.helper.toggleModal("correction-tache-create-modal");
      });
    }
  }
}
