import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { DomaineService } from "../../domaine/domaine.service";
import { MinistereService } from "../../ministere/ministere.service";
import { ServiceCreateComponent } from "../service-create/service-create.component";
import { ServiceService } from "../service.service";

@Component({
  selector: "app-service-edit",
  templateUrl: "./service-edit.component.html",
  styleUrls: ["./service-edit.component.scss"],
})
export class ServiceEditComponent
  extends ServiceCreateComponent
  implements OnInit
{
  service: any;
  constructor(
    public serviceService: ServiceService,
    public domaineService: DomaineService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(
      serviceService,
      domaineService,
      ministereService,
      ambassadeService,
      router,
      route
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["service"] = this.serviceService.singleData$.subscribe(
      (service) => {
        this.service = service;
        this.initialiseForm(service);
        console.log(this.form.value);
        this.isFormOk = true;
      }
    );
  }

  update(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign({}, this.form.value, {
        domaine: this.formValue("domaine")[0].id,
      });

      this.serviceService
        .update(this.service.id, this.helper.serializeObject(data))
        .subscribe(() => {
          this.loading = false;
          this.router.navigate(["./"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve",
          });
          this.helper.toggleModal("service-edit-modal");
        });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
