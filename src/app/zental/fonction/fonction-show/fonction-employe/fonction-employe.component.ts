import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { FonctionService } from "../../fonction.service";

@Component({
  selector: "app-fonction-employe",
  templateUrl: "./fonction-employe.component.html",
  styleUrls: ["./fonction-employe.component.scss"],
})
export class FonctionEmployeComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public fonctionService: FonctionService) {
    super(fonctionService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
