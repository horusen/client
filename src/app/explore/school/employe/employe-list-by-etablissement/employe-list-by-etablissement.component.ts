import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ServiceEtablissementService } from "../../etablissement/service-etablissement/service-etablissement.service";
import { EmployeService } from "../employe.service";

@Component({
  selector: "app-employe-list-by-etablissement",
  templateUrl: "./employe-list-by-etablissement.component.html",
  styleUrls: ["./employe-list-by-etablissement.component.scss"],
})
export class EmployeListByEtablissementComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public employeService: EmployeService,
    public etablissementService: EtablissementService,
    public serviceEtablissementService: ServiceEtablissementService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(employeService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });
  }

  setSingleData(employe: any): void {
    this.employeService.singleData = employe;
  }

  getData(params: Params) {
    if (this.router.url.includes("service")) {
      this._subscription = this.serviceEtablissementService.singleData$.subscribe(
        (service) => {
          this.getByService(service.id, params);
        }
      );
    } else {
      this.etablissementService.singleData$.subscribe((etablissement) => {
        this.getByEtablissement(etablissement.id, params);
      });
    }
  }

  getByEtablissement(etablissement: number, params: Params) {
    this.loading = true;
    this.employeService
      .getByEtablissement(etablissement, params)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getByService(service: number, params: Params) {
    this.loading = true;
    this.employeService.getByService(service, params).subscribe(() => {
      this.loading = false;
    });
  }

  supprimer(employe: number) {
    this.loading = true;
    this.employeService.delete(employe).subscribe(() => {
      this.helper.toastSuccess();
      this.loading = false;
    });
  }
}
