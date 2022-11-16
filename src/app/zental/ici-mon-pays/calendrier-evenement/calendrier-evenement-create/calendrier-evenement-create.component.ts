import { Validators } from "@angular/forms";
import { IciMonPaysService } from "src/app/zental/ici-mon-pays.service";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { Component, OnInit } from "@angular/core";
import { CalendrierEvenementService } from "../calendrier-evenement.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-calendrier-evenement-create",
  templateUrl: "./calendrier-evenement-create.component.html",
  styleUrls: ["./calendrier-evenement-create.component.scss"],
})
export class CalendrierEvenementCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  constructor(
    public calendrierService: CalendrierEvenementService,
    public iciMonPaysService: IciMonPaysService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(calendrierService);
  }

  ngOnInit(): void {
    this.inititaliseForm();

    this._subscription["pays"] = this.iciMonPaysService.pays$.subscribe(
      (pays) => {
        this.formValuePatcher("pays", pays.id);
      }
    );
  }

  inititaliseForm(evenement?: any): void {
    this.form = this.fb.group({
      libelle: [evenement?.libelle, Validators.required],
      description: [evenement?.description, Validators.required],
      pays: [evenement?.pays, Validators.required],
      date: [evenement?.date, Validators.required],
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      this.calendrierService.add(this.form.value).subscribe(() => {
        this.inititaliseForm();
        this.loading = false;
        this.helper.hideModal("calendrier-evenement-create-modal");
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "merge",
        });
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
