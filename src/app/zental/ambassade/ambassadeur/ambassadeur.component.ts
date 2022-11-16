import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AmbassadeService } from "../ambassade.service";

@Component({
  selector: "app-ambassadeur",
  templateUrl: "./ambassadeur.component.html",
  styleUrls: ["./ambassadeur.component.scss"],
})
export class AmbassadeurComponent extends BaseComponent implements OnInit {
  ambassade: any;
  constructor(public ambassadeService: AmbassadeService) {
    super();
  }

  ngOnInit(): void {
    this._subscription["ambassade"] =
      this.ambassadeService.singleData$.subscribe((ambassade) => {
        this.ambassade = ambassade;
      });
  }
}
