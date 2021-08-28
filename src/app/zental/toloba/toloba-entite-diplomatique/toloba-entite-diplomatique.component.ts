import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { ServiceService } from "../../service/service.service";
import { TolobaEntiteDiplomatiqueService } from "./toloba-entite-diplomatique.service";

@Component({
  selector: "app-toloba-entite-diplomatique",
  templateUrl: "./toloba-entite-diplomatique.component.html",
  styleUrls: ["./toloba-entite-diplomatique.component.scss"],
})
export class TolobaEntiteDiplomatiqueComponent
  extends BaseComponent
  implements OnInit
{
  @Input() parent: ParentDefinition;
  serviceCommunication: any;
  constructor(
    public serviceService: ServiceService,
    public tolobaService: TolobaEntiteDiplomatiqueService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    if (
      !this.parent ||
      !["ministere", "ambassade", "consulat", "bureau"].includes(
        this.parent.name
      )
    ) {
      this.router.navigate([".."], {
        relativeTo: this.route,
        queryParamsHandling: "merge",
      });
    } else {
      this.getServiceCom();

      this.tolobaService.entite_diplomatique$.next(this.parent);
    }
  }

  getServiceCom() {
    this.loading = true;
    this.serviceService
      .getServiceCommunicationEntiteDiplomatique(
        this.parent.name,
        this.parent.item.id
      )
      .subscribe((service) => {
        this.serviceCommunication = service;
        this.tolobaService.serviceCommunication$.next(service);
        this.loading = false;
      });
  }
}
