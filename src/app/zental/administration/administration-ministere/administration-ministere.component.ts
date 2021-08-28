import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { MinistereService } from "../../ministere/ministere.service";

@Component({
  selector: "app-administration-ministere",
  templateUrl: "./administration-ministere.component.html",
  styleUrls: ["./administration-ministere.component.scss"],
})
export class AdministrationMinistereComponent
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
