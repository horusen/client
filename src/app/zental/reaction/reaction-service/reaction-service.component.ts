import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ChargerComServiceService } from "../../service/charger-com-service.service";
import { ServiceService } from "../../service/service.service";

@Component({
  selector: "app-reaction-service",
  templateUrl: "./reaction-service.component.html",
  styleUrls: ["./reaction-service.component.scss"],
})
export class ReactionServiceComponent extends BaseComponent implements OnInit {
  userIsChargerCom = false;
  constructor(
    public chargerComService: ChargerComServiceService,
    public serviceService: ServiceService
  ) {
    super();
  }

  ngOnInit(): void {
    this._subscription["service"] = this.serviceService.singleData$.subscribe(
      (service) => {
        this.getChargerComByService(service.id, () => {
          this.userIsChargerCom = this.chargerComService.data
            .map((item) => item.employe.id_inscription)
            .includes(this.auth.user.id_inscription);
        });
      }
    );
  }

  getChargerComByService(service: number, callback: Function): void {
    this.chargerComService.getByService(service).subscribe({
      next: () => {
        callback();
      },
    });
  }
}
