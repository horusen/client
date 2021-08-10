import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DepartementService } from "../../departement.service";

@Component({
  selector: "app-departement-employes",
  templateUrl: "./departement-employes.component.html",
  styleUrls: ["./departement-employes.component.scss"],
})
export class DepartementEmployesComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public departementService: DepartementService) {
    super(departementService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
