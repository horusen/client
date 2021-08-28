import { PasserelleService } from "./../passerelle.service";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-passerelle-service",
  templateUrl: "./passerelle-service.component.html",
  styleUrls: ["./passerelle-service.component.scss"],
})
export class PasserelleServiceComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public passerelleService: PasserelleService) {
    super(passerelleService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
