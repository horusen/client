import { BureauService } from "./../bureau.service";
import { BaseSingleComponent } from "./../../../shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-bureau-poste",
  templateUrl: "./bureau-poste.component.html",
  styleUrls: ["./bureau-poste.component.scss"],
})
export class BureauPosteComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public bureauService: BureauService) {
    super(bureauService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
