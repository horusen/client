import { Component, OnInit } from "@angular/core";
import { EmployeService } from "src/app/explore/school/employe/employe.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ServiceEtablissementService } from "../../service-etablissement.service";

@Component({
  selector: "app-service-etablissement-show-employe",
  templateUrl: "./service-etablissement-show-employe.component.html",
  styleUrls: ["./service-etablissement-show-employe.component.scss"],
})
export class ServiceEtablissementShowEmployeComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public serviceEtablissementService: ServiceEtablissementService,
    public employeService: EmployeService
  ) {
    super(employeService);
  }

  ngOnInit(): void {
    this._subscription[
      "service"
    ] = this.serviceEtablissementService.singleData$.subscribe((service) => {
      this.getData(service.id);
    });
  }

  getData(service: number) {
    this.loading = true;
    this.employeService.getByService(service).subscribe(() => {
      this.loading = false;
    });
  }
}
