import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-details",
  templateUrl: "./groupe-details.component.html",
  styleUrls: ["./groupe-details.component.scss"],
})
export class GroupeDetailsComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public groupeService: GroupeService) {
    super(groupeService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
