import { Component, OnInit } from "@angular/core";
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
  pays: any[];
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
    this.enableRetrieveSchema = true;
    super.ngOnInit();

    this._subscription["schema"] = this.ministereService.schema$.subscribe(
      () => {
        // form initialisation
        this.initialiseForm();
      }
    );

    this.getPays();
  }

  initialiseForm() {
    this.initForm(["libelle", "pays", "description", "mail"]);
  }

  getPays(): void {
    this.paysLoading = true;
    this.paysService.getAll(false).subscribe((pays) => {
      this.pays = pays;
      this.paysLoading = false;
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign(this.form.value, {
        pays: this.formValue("pays")[0].id,
      });

      this.ministereService.add(data).subscribe(() => {
        this.loading = false;
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
        this.helper.toggleModal("ministere-add-modal");
        this.helper.alertSuccess();
        this.initialiseForm();
      });
    } else {
      this.helper.alertDanger("Remplissez convenablement le formulaire");
    }
  }
}
