import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { MinistereService } from "../ministere.service";

@Component({
  selector: "app-ministere-fonction",
  templateUrl: "./ministere-fonction.component.html",
  styleUrls: ["./ministere-fonction.component.scss"],
})
export class MinistereFonctionComponent
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
