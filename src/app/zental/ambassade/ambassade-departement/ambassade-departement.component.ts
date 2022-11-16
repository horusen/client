import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { AmbassadeService } from "../ambassade.service";

@Component({
  selector: "app-ambassade-departement",
  templateUrl: "./ambassade-departement.component.html",
  styleUrls: ["./ambassade-departement.component.scss"],
})
export class AmbassadeDepartementComponent
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
