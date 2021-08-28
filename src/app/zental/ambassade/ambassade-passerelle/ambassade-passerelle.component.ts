import { ActivatedRoute } from "@angular/router";
import { AmbassadeService } from "src/app/zental/ambassade/ambassade.service";
import { BaseSingleComponent } from "./../../../shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ambassade-passerelle",
  templateUrl: "./ambassade-passerelle.component.html",
  styleUrls: ["./ambassade-passerelle.component.scss"],
})
export class AmbassadePasserelleComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public ambassadeService: AmbassadeService,
    public route: ActivatedRoute
  ) {
    super(ambassadeService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
