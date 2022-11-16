import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EmployeService } from "../../employe/employe.service";
import { ChargerComServiceService } from "../../service/charger-com-service.service";
import { TolobaEntiteDiplomatiqueService } from "../../toloba/toloba-entite-diplomatique/toloba-entite-diplomatique.service";

@Component({
  selector: "app-reaction-entite-diplomatique",
  templateUrl: "./reaction-entite-diplomatique.component.html",
  styleUrls: ["./reaction-entite-diplomatique.component.scss"],
})
export class ReactionEntiteDiplomatiqueComponent
  extends BaseComponent
  implements OnInit
{
  userIsChargerCom = false;
  constructor(
    public employeService: EmployeService,
    public tolobaService: TolobaEntiteDiplomatiqueService
  ) {
    super();
  }

  ngOnInit(): void {
    this._subscription["service"] =
      this.tolobaService.serviceCommunication$.subscribe((service) => {
        this.getChargerComByService(service.id, () => {
          this.userIsChargerCom = this.employeService.data
            .map((item) => item.employe.id_inscription)
            .includes(this.auth.user.id_inscription);
        });
      });
  }

  getChargerComByService(service: number, callback: Function): void {
    this.employeService.getByService(service, {}).subscribe({
      next: () => {
        callback();
      },
    });
  }
}
