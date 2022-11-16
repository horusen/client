import { LiaisonService } from "./../liaison.service";
import { BaseSingleComponent } from "./../../../shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-liaison-service",
  templateUrl: "./liaison-service.component.html",
  styleUrls: ["./liaison-service.component.scss"],
})
export class LiaisonServiceComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public liaisonService: LiaisonService) {
    super(liaisonService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
