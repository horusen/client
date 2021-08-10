import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { AmbassadeService } from "../ambassade.service";

@Component({
  selector: "app-profil-ambassade",
  templateUrl: "./profil-ambassade.component.html",
  styleUrls: ["./profil-ambassade.component.scss"],
})
export class ProfilAmbassadeComponent
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
