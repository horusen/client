import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { MinistereService } from "../ministere.service";

@Component({
  selector: "app-ministere-departement",
  templateUrl: "./ministere-departement.component.html",
  styleUrls: ["./ministere-departement.component.scss"],
})
export class MinistereDepartementComponent
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
