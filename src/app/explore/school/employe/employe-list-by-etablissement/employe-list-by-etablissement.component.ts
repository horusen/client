import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
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
    public route: ActivatedRoute
  ) {
    super(employeService);
  }

  ngOnInit(): void {
    this.etablissementService.singleData$.subscribe((etablissement) => {
      this.getData(etablissement.id);
    });
  }

  getData(etablissement: number) {
    this.loading = true;
    this.employeService.getByEtablissement(etablissement).subscribe(() => {
      this.loading = false;
    });
  }

   
}