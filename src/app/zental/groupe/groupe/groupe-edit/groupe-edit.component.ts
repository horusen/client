import { Component, OnInit } from "@angular/core";
import { GroupeCreateComponent } from "../groupe-create/groupe-create.component";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-edit",
  templateUrl: "./groupe-edit.component.html",
  styleUrls: ["./groupe-edit.component.scss"],
})
export class GroupeEditComponent
  extends GroupeCreateComponent
  implements OnInit
{
  groupe: any;
  constructor(public groupeService: GroupeService) {
    super(groupeService);
  }

  ngOnInit(): void {
    this._subscription["groupe"] = this.groupeService.singleData$.subscribe(
      (groupe) => {
        this.groupe = groupe;
        this.initialiseForm(groupe);
      }
    );
  }

  edit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.groupeService
        .update(this.groupe.id, this.form.value)
        .subscribe(() => {
          this.loading = false;
          this.edited.emit(true);
          this.helper.alertSuccess();
        });
    } else {
      this.helper.alertDanger("Formulaire invalide");
    }
  }
}
