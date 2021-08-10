import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ServiceService } from "../../service.service";

@Component({
  selector: "app-service-description",
  templateUrl: "./service-description.component.html",
  styleUrls: ["./service-description.component.scss"],
})
export class ServiceDescriptionComponent
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
