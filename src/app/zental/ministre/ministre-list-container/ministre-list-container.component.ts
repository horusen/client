import { MinistereService } from "src/app/zental/ministere/ministere.service";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-ministre-list-container",
  templateUrl: "./ministre-list-container.component.html",
  styleUrls: ["./ministre-list-container.component.scss"],
})
export class MinistreListContainerComponent
  extends BaseComponent
  implements OnInit
{
  ministere: any;
  constructor(public ministereService: MinistereService) {
    super();
  }

  ngOnInit(): void {
    this._subscription["ministere"] =
      this.ministereService.singleData$.subscribe((ministere) => {
        this.ministere = ministere;
      });
  }
}
