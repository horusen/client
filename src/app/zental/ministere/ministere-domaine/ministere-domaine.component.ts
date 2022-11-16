import { MinistereService } from "./../ministere.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";

@Component({
  selector: "app-ministere-domaine",
  templateUrl: "./ministere-domaine.component.html",
  styleUrls: ["./ministere-domaine.component.scss"],
})
export class MinistereDomaineComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public ministereService: MinistereService) {
    super(ministereService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
