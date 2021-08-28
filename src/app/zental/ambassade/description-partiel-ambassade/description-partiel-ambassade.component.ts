import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AmbassadeService } from "../ambassade.service";

@Component({
  selector: "app-description-partiel-ambassade",
  templateUrl: "./description-partiel-ambassade.component.html",
  styleUrls: ["./description-partiel-ambassade.component.scss"],
})
export class DescriptionPartielAmbassadeComponent
  extends BaseComponent
  implements OnInit
{
  typeDescription: string;
  ambassade: any;
  constructor(
    public ambassadeService: AmbassadeService,
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this._subscription["ambassade"] =
      this.ambassadeService.singleData$.subscribe((ambassade) => {
        this.ambassade = ambassade;
      });

    this.getTypeDescription(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getTypeDescription(this.router.url);
      }
    });
  }

  getTypeDescription(url: string) {
    if (url.includes("missions")) {
      this.typeDescription = "missions";
    } else if (url.includes("organisations")) {
      this.typeDescription = "organisations";
    }
  }

  onAmbassadeEdited(ambassade: any) {
    console.log("Description-partiel ambassade => ", ambassade);
    this.ambassadeService.singleData = ambassade;
  }
}
