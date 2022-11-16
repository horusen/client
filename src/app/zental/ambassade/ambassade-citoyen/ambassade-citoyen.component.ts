import { Component, OnInit } from "@angular/core";
import { AmbassadeService } from "../ambassade.service";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";

@Component({
  selector: "app-ambassade-citoyen",
  templateUrl: "./ambassade-citoyen.component.html",
  styleUrls: ["./ambassade-citoyen.component.scss"],
})
export class AmbassadeCitoyenComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public ambassadeService: AmbassadeService) {
    super(ambassadeService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
