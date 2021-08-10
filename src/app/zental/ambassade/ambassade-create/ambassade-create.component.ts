import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MinistereService } from "../../ministere/ministere.service";
import { PaysService } from "../../pays/pays.service";
import { EntiteDiplomatiqueCreateComponent } from "../../shared-zental/abstract/entite-diplomatique-create/entite-diplomatique-create.component";
import { AmbassadeService } from "../ambassade.service";

@Component({
  selector: "app-ambassade-create",
  templateUrl: "./ambassade-create.component.html",
  styleUrls: ["./ambassade-create.component.scss"],
})
export class AmbassadeCreateComponent
  extends EntiteDiplomatiqueCreateComponent
  implements OnInit
{
  constructor(
    public ambassadeService: AmbassadeService,
    public ministereService: MinistereService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(
      ambassadeService,
      ministereService,
      paysService,
      router,
      route,
      "ambassade"
    );
  }
}
