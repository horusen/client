import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { PaysService } from "../../pays/pays.service";
import { MinistereService } from "../ministere.service";

@Component({
  selector: "app-ministere-create",
  templateUrl: "./ministere-create.component.html",
  styleUrls: ["./ministere-create.component.scss"],
})
export class MinistereCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  pays: any[] = [];
  paysLoading = false;

  constructor(
    public ministereService: MinistereService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(ministereService);
  }

  ngOnInit(): void {
    this.initialiseForm();

    this.getPays();
  }

  initialiseForm(item?: any): void {
    this.form = this.fb.group({
      libelle: [item?.entite_diplomatique?.libelle, Validators.required],
      site_web: [item?.entite_diplomatique?.site_web],
      boite_postale: [item?.entite_diplomatique?.boite_postale],
      date_creation: [item?.entite_diplomatique?.date_creation],
      tel1: [item?.entite_diplomatique?.tel1],
      tel2: [item?.entite_diplomatique?.tel2],
      mail: [item?.entite_diplomatique?.mail],
      pays_origine: [
        item?.entite_diplomatique?.pays_siege
          ? [item?.entite_diplomatique?.pays_siege]
          : null,
        Validators.required,
      ],
    });

    this.isFormOk = true;
  }

  getPays(): void {
    this.paysLoading = true;
    this.paysService.getAll(false).subscribe((pays) => {
      this.pays = pays;
      this.paysLoading = false;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays_origine: this.formValue("pays_origine")[0].id,
      };

      this.ministereService.add(data).subscribe(() => {
        this.loading = false;
        this.form.reset();
        this.helper.toggleModal(`ministere-add-modal`);
        this.helper.alertSuccess();
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
