import { BaseComponent } from "./../../../shared/components/base-component/base.component";
import { Component, OnInit } from "@angular/core";
import { ConsulatService } from "../consulat.service";

@Component({
  selector: "app-consul",
  templateUrl: "./consul.component.html",
  styleUrls: ["./consul.component.scss"],
})
export class ConsulComponent extends BaseComponent implements OnInit {
  consulat: any;
  constructor(public consulatService: ConsulatService) {
    super();
  }

  ngOnInit(): void {
    this._subscription["consulat"] = this.consulatService.singleData$.subscribe(
      (consulat) => {
        this.consulat = consulat;
      }
    );
  }
}
