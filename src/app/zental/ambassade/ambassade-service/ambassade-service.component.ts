import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { AmbassadeService } from "../ambassade.service";

@Component({
  selector: "app-ambassade-service",
  templateUrl: "./ambassade-service.component.html",
  styleUrls: ["./ambassade-service.component.scss"],
})
export class AmbassadeServiceComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public ambassadeService: AmbassadeService) {
    super(ambassadeService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
