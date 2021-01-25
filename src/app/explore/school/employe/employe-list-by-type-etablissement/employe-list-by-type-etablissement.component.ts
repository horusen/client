import { ActivatedRoute } from "@angular/router";
import { EmployeService } from "./../employe.service";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-employe-list-by-type-etablissement",
  templateUrl: "./employe-list-by-type-etablissement.component.html",
  styleUrls: ["./employe-list-by-type-etablissement.component.scss"],
})
export class EmployeListByTypeEtablissementComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public employeService: EmployeService,
    public route: ActivatedRoute
  ) {
    super(employeService);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params["type_etablissement"]) {
        this.getData(params["type_etablissement"]);
      }
    });
  }

  getData(typeEtablissement: number) {
    this.loading = true;
    this.employeService
      .getByTypeEtablissement(typeEtablissement)
      .subscribe(() => {
        this.loading = false;
      });
  }
}
