import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ConsulatService } from "../../consulat.service";

@Component({
  selector: "app-consul-list",
  templateUrl: "./consul-list.component.html",
  styleUrls: ["./consul-list.component.scss"],
})
export class ConsulListComponent extends BaseComponent implements OnInit {
  consulat: any;
  constructor(public consulatService: ConsulatService) {
    super();
  }

  ngOnInit(): void {
    this._subscription["consulat"] = this.consulatService.singleData$.subscribe(
      (single) => {
        this.consulat = single;
      }
    );
  }
}
