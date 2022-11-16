import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { PasserelleService } from "../passerelle.service";

@Component({
  selector: "app-passerelle-employes",
  templateUrl: "./passerelle-employes.component.html",
  styleUrls: ["./passerelle-employes.component.scss"],
})
export class PasserelleEmployesComponent
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
