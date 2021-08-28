import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ServiceService } from "../../service/service.service";

@Component({
  selector: "app-toloba-service",
  templateUrl: "./toloba-service.component.html",
  styleUrls: ["./toloba-service.component.scss"],
})
export class TolobaServiceComponent extends BaseComponent implements OnInit {
  service: any;
  constructor(public serviceService: ServiceService) {
    super();
  }

  ngOnInit(): void {
    this._subscription["service"] = this.serviceService.singleData$.subscribe(
      (service) => {
        this.service = service;
      }
    );
  }
}
