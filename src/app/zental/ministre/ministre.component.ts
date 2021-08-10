import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { MinistereService } from "../ministere/ministere.service";
import { MinistreService } from "./ministre.service";

@Component({
  selector: "app-ministre",
  templateUrl: "./ministre.component.html",
  styleUrls: ["./ministre.component.scss"],
})
export class MinistreComponent extends BaseComponent implements OnInit {
  ministere: any;
  constructor(public ministereService: MinistereService) {
    super();
  }

  ngOnInit(): void {
    this._subscription["ministere"] =
      this.ministereService.singleData$.subscribe(
        (ministere) => (this.ministere = ministere)
      );
  }
}
