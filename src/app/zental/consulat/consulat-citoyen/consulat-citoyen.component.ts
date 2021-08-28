import { BaseSingleComponent } from "./../../../shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { ConsulatService } from "../consulat.service";

@Component({
  selector: "app-consulat-citoyen",
  templateUrl: "./consulat-citoyen.component.html",
  styleUrls: ["./consulat-citoyen.component.scss"],
})
export class ConsulatCitoyenComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public consulatService: ConsulatService) {
    super(consulatService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
