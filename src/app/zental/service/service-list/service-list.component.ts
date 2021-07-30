import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { MinistereService } from "../../ministere/ministere.service";
import { ServiceService } from "../service.service";

@Component({
  selector: "app-service-list",
  templateUrl: "./service-list.component.html",
  styleUrls: ["./service-list.component.scss"],
})
export class ServiceListComponent extends BaseComponent implements OnInit {
  constructor(
    public serviceService: ServiceService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(serviceService);
  }

  ngOnInit(): void {
    if (this.router.url.includes("ministere")) {
      this._subscription["ministere"] =
        this.ministereService.singleData$.subscribe((ministere) => {
          this.route.queryParams.subscribe((params) => {
            this.getByMinistere(ministere.id, params);
          });
        });
    } else if (this.router.url.includes("ambassade")) {
      this._subscription["ambassade"] =
        this.ambassadeService.singleData$.subscribe((ambassade) => {
          this.route.queryParams.subscribe((params) => {
            this.getByAmbassade(ambassade.id, params);
          });
        });
    }
  }

  getByMinistere(ministere: number, params: Params) {
    this.loading = true;
    this.serviceService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByAmbassade(ambassade: number, params: Params) {
    this.loading = true;
    this.serviceService.getByAmbassade(ambassade, params).subscribe(() => {
      this.loading = false;
    });
  }

  modifier(service: any) {
    this.serviceService.singleData = service;
  }
}
