import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseService } from "src/app/shared/services/base.service";
import { MinistereService } from "src/app/zental/ministere/ministere.service";
import { PaysService } from "src/app/zental/pays/pays.service";
import { EntiteDiplomatiqueCreateComponent } from "../entite-diplomatique-create/entite-diplomatique-create.component";

@Component({
  selector: "app-entite-diplomatique-edit",
  templateUrl: "./entite-diplomatique-edit.component.html",
  styleUrls: ["./entite-diplomatique-edit.component.scss"],
})
export class EntiteDiplomatiqueEditComponent
  extends EntiteDiplomatiqueCreateComponent
  implements OnInit
{
  item: any;
  constructor(
    public service: BaseService,
    public ministereService: MinistereService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute,
    @Inject(String) public element: string
  ) {
    super(service, ministereService, paysService, router, route, element);
  }

  ngOnInit(): void {
    this._subscription["item"] = this.service.singleData$.subscribe((item) => {
      this.item = item;
      this.initialiseForm(item);
    });
    this.getPays();
  }

  update(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays_siege: this.formValue("pays_siege")[0].id,
      };
      this.service.update(this.item.id, data).subscribe(() => {
        this.loading = false;
        this.helper.toggleModal(`${this.element}-edit-modal`);
        this.initialiseForm(this.item);
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
