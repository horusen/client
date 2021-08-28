import { ActivatedRoute } from "@angular/router";
import { AmbassadeService } from "./../ambassade.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";

@Component({
  selector: "app-ambassade-inscription-consulaire",
  templateUrl: "./ambassade-inscription-consulaire.component.html",
  styleUrls: ["./ambassade-inscription-consulaire.component.scss"],
})
export class AmbassadeInscriptionConsulaireComponent
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
