import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { AmbassadeService } from "../../ambassade.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-ambassade-ici-mon-pays",
  templateUrl: "./ambassade-ici-mon-pays.component.html",
  styleUrls: ["./ambassade-ici-mon-pays.component.scss"],
})
export class AmbassadeIciMonPaysComponent
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
