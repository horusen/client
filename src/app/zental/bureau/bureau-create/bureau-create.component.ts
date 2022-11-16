import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PaysService } from "../../pays/pays.service";
import { EntiteDiplomatiqueCreateComponent } from "../../shared-zental/abstract/entite-diplomatique-create/entite-diplomatique-create.component";
import { BureauService } from "../bureau.service";

@Component({
  selector: "app-bureau-create",
  templateUrl: "./bureau-create.component.html",
  styleUrls: ["./bureau-create.component.scss"],
})
export class BureauCreateComponent
  extends EntiteDiplomatiqueCreateComponent
  implements OnInit
{
  constructor(
    public bureauService: BureauService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(bureauService, paysService, router, route, "bureau");
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  initialiseForm(item?: any): void {
    this.form = this.fb.group({
      libelle: [item?.entite_diplomatique?.libelle, Validators.required],
      histoire: [item?.entite_diplomatique?.histoire],
      site_web: [item?.entite_diplomatique?.site_web],
      boite_postale: [item?.entite_diplomatique?.boite_postale],
      date_creation: [item?.entite_diplomatique?.date_creation],
      tel1: [item?.entite_diplomatique?.tel1],
      tel2: [item?.entite_diplomatique?.tel2],
      mail: [item?.entite_diplomatique?.mail],
      pays_origine: [
        this.parent.item.entite_diplomatique.pays_origine.id,
        Validators.required,
      ],
      [this.parent.name]: this.parent.item.id,
    });

    this.isFormOk = true;
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;

      this.service.add(this.form.value).subscribe(() => {
        this.loading = false;
        this.initialiseForm();
        this.helper.toggleModal(`bureau-create-modal`);
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
