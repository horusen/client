import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ChargerComServiceService } from "../../service/charger-com-service.service";
import { ServiceService } from "../../service/service.service";
import { EmployeService } from "../employe.service";

@Component({
  selector: "app-employe-list",
  templateUrl: "./employe-list.component.html",
  styleUrls: ["./employe-list.component.scss"],
})
export class EmployeListComponent extends BaseComponent implements OnInit {
  @Input() parent: { name: string; item: any };
  constructor(
    public employeService: EmployeService,
    public route: ActivatedRoute,
    public chargerComService: ChargerComServiceService
  ) {
    super(employeService);
  }

  ngOnInit(): void {
    console.log(this.parent);
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });
  }

  getData(params: Params) {
    if (this.parent.name === "departement") {
      this.getByDepartement(this.parent.item.id, params);
    } else if (this.parent.name === "bureau") {
      this.getByBureau(this.parent.item.id, params);
    } else if (this.parent.name === "fonction") {
      this.getByFonction(this.parent.item.id, params);
    } else if (this.parent.name === "poste") {
      this.getByPoste(this.parent.item.id, params);
    } else if (this.parent.name === "ministere") {
      this.getByMinistere(this.parent.item.id, params);
    } else if (this.parent.name === "service") {
      this.getByService(this.parent.item.id, params);
    } else if (this.parent.name === "ambassade") {
      this.getByAmbassade(this.parent.item.id, params);
    } else if (this.parent.name === "consulat") {
      this.getByConsulat(this.parent.item.id, params);
    } else if (this.parent.name === "domaine") {
      this.getByDomaine(this.parent.item.id, params);
    }
  }

  getByPoste(poste: number, params: Params): void {
    this.loading = true;
    this.employeService.getByPoste(poste, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByAmbassade(ambassade: number, params: Params): void {
    this.loading = true;
    this.employeService.getByAmbassade(ambassade, params).subscribe({
      next: () => {
        this.loading = false;
      },
    });
  }

  getByDomaine(domaine: number, params: Params): void {
    this.loading = true;
    this.employeService.getByDomaine(domaine, params).subscribe({
      complete: () => {
        this.loading = false;
      },
    });
  }

  getByConsulat(consulat: number, params: Params): void {
    this.loading = true;
    this.employeService.getByConsulat(consulat, params).subscribe({
      complete: () => {
        this.loading = false;
      },
    });
  }

  getByService(service: number, params: Params): void {
    this.loading = true;
    this.employeService.getByService(service, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByFonction(fonction: number, params: Params): void {
    this.loading = true;
    this.employeService.getByFonction(fonction, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByBureau(bureau: number, params: Params): void {
    this.loading = true;
    this.employeService.getByBureau(bureau, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByDepartement(departement: number, params: Params): void {
    this.loading = true;
    this.employeService.getByDepartement(departement, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByMinistere(ministere: number, params: Params): void {
    this.loading = true;
    this.employeService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }

  designerCommeChargerCom(employe: any) {
    this.modifierAttributChargerCom(employe, true);
  }

  designerCommeNonChargerCom(employe: any) {
    this.modifierAttributChargerCom(employe, false);
  }

  modifierAttributChargerCom(employe: any, etat: boolean): void {
    this.chargerComService
      .update(employe.id, { charger_com: etat })
      .subscribe(() => {
        this.helper.alertSuccess();
      });
  }
}
