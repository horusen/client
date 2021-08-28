import { ActivatedRoute, Router } from "@angular/router";
import { NgxPicaService } from "@digitalascetic/ngx-pica";
import { Component, OnInit } from "@angular/core";
import { MinistereService } from "src/app/zental/ministere/ministere.service";
import { PresidentCreateComponent } from "../president-create/president-create.component";
import { PresidentService } from "../president.service";

@Component({
  selector: "app-president-edit",
  templateUrl: "./president-edit.component.html",
  styleUrls: ["./president-edit.component.scss"],
})
export class PresidentEditComponent
  extends PresidentCreateComponent
  implements OnInit
{
  president: any;
  constructor(
    public presidentService: PresidentService,
    public ministereService: MinistereService,
    public ngxPicaService: NgxPicaService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(presidentService, ministereService, ngxPicaService, router, route);
  }

  ngOnInit(): void {
    this._subscription["president"] =
      this.presidentService.singleData$.subscribe((president) => {
        this.initialiseForm(president);
        this.president = president;
      });

    this._subscription["ministere"] =
      this.ministereService.singleData$.subscribe((ministere) => {
        this.formValuePatcher("pays", [
          ministere.entite_diplomatique.pays_origine,
        ]);
      });
  }

  update(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays: this.formValue("pays")[0].id,
      };

      this.fillFormData(data);
      this.presidentService
        .update(this.president.id, this.formData)
        .subscribe(() => {
          this.loading = false;
          this.helper.toggleModal("president-edit-modal");
        });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
