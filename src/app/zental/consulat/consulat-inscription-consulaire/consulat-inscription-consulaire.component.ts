import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { ConsulatService } from "../consulat.service";

@Component({
  selector: "app-consulat-inscription-consulaire",
  templateUrl: "./consulat-inscription-consulaire.component.html",
  styleUrls: ["./consulat-inscription-consulaire.component.scss"],
})
export class ConsulatInscriptionConsulaireComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public consulatService: ConsulatService,
    public route: ActivatedRoute
  ) {
    super(consulatService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
