import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { MinistereService } from "../ministere.service";

@Component({
  selector: "app-ministere-poste",
  templateUrl: "./ministere-poste.component.html",
  styleUrls: ["./ministere-poste.component.scss"],
})
export class MinisterePosteComponent
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
