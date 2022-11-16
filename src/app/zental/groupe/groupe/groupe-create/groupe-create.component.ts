import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-create",
  templateUrl: "./groupe-create.component.html",
  styleUrls: ["./groupe-create.component.scss"],
})
export class GroupeCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  constructor(public groupeService: GroupeService) {
    super(groupeService);
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm(groupe?: any): void {
    this.form = this.fb.group({
      libelle: [groupe?.libelle, Validators.required],
      description: [groupe?.description, Validators.required],
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      this.groupeService.add(this.form.value).subscribe(() => {
        this.loading = false;
        this.created.emit(true);
        this.helper.alertSuccess();
      });
    }
  }
}
