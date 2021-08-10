import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ServiceService } from "../../service.service";

@Component({
  selector: "app-service-employe",
  templateUrl: "./service-employe.component.html",
  styleUrls: ["./service-employe.component.scss"],
})
export class ServiceEmployeComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public serviceService: ServiceService) {
    super(serviceService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
