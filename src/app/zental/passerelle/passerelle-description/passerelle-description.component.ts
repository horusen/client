import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { PasserelleService } from "../passerelle.service";

@Component({
  selector: "app-passerelle-description",
  templateUrl: "./passerelle-description.component.html",
  styleUrls: ["./passerelle-description.component.scss"],
})
export class PasserelleDescriptionComponent
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
