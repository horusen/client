import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { PaysService } from "../../pays/pays.service";
import { MinistereCreateComponent } from "../ministere-create/ministere-create.component";
import { MinistereService } from "../ministere.service";

@Component({
  selector: "app-ministere-edit",
  templateUrl: "./ministere-edit.component.html",
  styleUrls: ["./ministere-edit.component.scss"],
})
export class MinistereEditComponent
  extends MinistereCreateComponent
  implements OnInit
{
  constructor(
    public ministereService: MinistereService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(ministereService, paysService, router, route);
  }

  ngOnInit(): void {
    this._subscription["ministere"] =
      this.ministereService.singleData$.subscribe((ministere) => {
        this.initialiseForm(ministere);
      });

    this.getPays();
  }

  update(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays_origine: this.formValue("pays_origine")[0].id,
      };

      this.ministereService
        .update(this.ministereService.singleData.id, data)
        .subscribe(() => {
          this.loading = false;
          this.helper.toggleModal(`ministere-edit-modal`);
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
