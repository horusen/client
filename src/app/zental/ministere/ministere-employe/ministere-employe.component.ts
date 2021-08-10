import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { MinistereService } from "../ministere.service";

@Component({
  selector: "app-ministere-employe",
  templateUrl: "./ministere-employe.component.html",
  styleUrls: ["./ministere-employe.component.scss"],
})
export class MinistereEmployeComponent
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
