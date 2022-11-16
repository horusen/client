import { BaseComponent } from "./../../../../shared/components/base-component/base.component";
import { Component, OnInit } from "@angular/core";
import { AmbassadeService } from "../../ambassade.service";

@Component({
  selector: "app-ambassadeur-list",
  templateUrl: "./ambassadeur-list.component.html",
  styleUrls: ["./ambassadeur-list.component.scss"],
})
export class AmbassadeurListComponent extends BaseComponent implements OnInit {
  ambassade: any;
  constructor(public ambassadeService: AmbassadeService) {
    super();
  }

  ngOnInit(): void {
    this._subscription["ambassade"] =
      this.ambassadeService.singleData$.subscribe((single) => {
        this.ambassade = single;
      });
  }
}
