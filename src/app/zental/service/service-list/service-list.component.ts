import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { DepartementService } from "../../departement/departement.service";
import { MinistereService } from "../../ministere/ministere.service";
import { ServiceService } from "../service.service";

@Component({
  selector: "app-service-list",
  templateUrl: "./service-list.component.html",
  styleUrls: ["./service-list.component.scss"],
})
export class ServiceListComponent extends BaseComponent implements OnInit {
  @Input() parent: { name: string; item: any };
  constructor(
    public serviceService: ServiceService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public departementService: DepartementService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(serviceService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });
  }

  getData(params: Params): void {
    if (this.parent.name === "ministere") {
      this.getByMinistere(this.parent.item.id, params);
    } else if (this.parent.name === "ambassade") {
      this.getByAmbassade(this.parent.item.id, params);
    } else if (this.parent.name === "consulat") {
      this.getByConsulat(this.parent.item.id, params);
    } else if (this.parent.name === "domaine") {
      this.getByDomaine(this.parent.item.id, params);
    } else if (this.parent.name === "departement") {
      this.getByDepartement(this.parent.item.id, params);
    }
  }

  getByMinistere(ministere: number, params: Params) {
    this.loading = true;
    this.serviceService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }

  // getByService(service: number, params: Params) {
  //   this.loading = true;
  //   this.serviceService.getByService(service, params).subscribe(() => {
  //     this.loading = false;
  //   });
  // }

  getByConsulat(consulat: number, params: Params) {
    this.loading = true;
    this.serviceService.getByConsulat(consulat, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByDepartement(departement: number, params: Params) {
    this.loading = true;
    this.serviceService.getByDepartement(departement, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByAmbassade(ambassade: number, params: Params) {
    this.loading = true;
    this.serviceService.getByAmbassade(ambassade, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByDomaine(domaine: number, params: Params) {
    this.loading = true;
    this.serviceService.getByDomaine(domaine, params).subscribe(() => {
      this.loading = false;
    });
  }

  modifier(service: any) {
    this.serviceService.singleData = service;
  }
}
