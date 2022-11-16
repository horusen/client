import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ConsulatService } from "../../consulat.service";

@Component({
  selector: "app-description-partiel-consulat",
  templateUrl: "./description-partiel-consulat.component.html",
  styleUrls: ["./description-partiel-consulat.component.scss"],
})
export class DescriptionPartielConsulatComponent
  extends BaseComponent
  implements OnInit
{
  typeDescription: string;
  consulat: any;
  constructor(public consulatService: ConsulatService, public router: Router) {
    super();
  }

  ngOnInit(): void {
    this._subscription["consulat"] = this.consulatService.singleData$.subscribe(
      (consulat) => {
        this.consulat = consulat;
      }
    );

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

  onConsulatEdited(consulat: any) {
    console.log("Description-partiel consulat => ", consulat);
    this.consulatService.singleData = consulat;
  }
}
