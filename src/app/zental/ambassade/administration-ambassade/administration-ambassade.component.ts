import { ActivatedRoute } from "@angular/router";
import { AmbassadeService } from "./../ambassade.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";

@Component({
  selector: "app-administration-ambassade",
  templateUrl: "./administration-ambassade.component.html",
  styleUrls: ["./administration-ambassade.component.scss"],
})
export class AdministrationAmbassadeComponent
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
