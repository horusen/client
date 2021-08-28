import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PaysService } from "../../pays/pays.service";
import { EntiteDiplomatiqueEditComponent } from "../../shared-zental/abstract/entite-diplomatique-edit/entite-diplomatique-edit.component";
import { AmbassadeService } from "../ambassade.service";

@Component({
  selector: "app-ambassade-edit",
  templateUrl: "./ambassade-edit.component.html",
  styleUrls: ["./ambassade-edit.component.scss"],
})
// implements OnInit
export class AmbassadeEditComponent extends EntiteDiplomatiqueEditComponent {
  ambassade: any;
  constructor(
    public ambassadeService: AmbassadeService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(ambassadeService, paysService, router, route, "ambassade");
  }
  ngOnInit(): void {
    super.ngOnInit();
  }
}
