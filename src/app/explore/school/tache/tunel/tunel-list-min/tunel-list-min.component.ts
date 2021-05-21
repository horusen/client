import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TunelService } from "../tunel.service";

@Component({
  selector: "app-tunel-list-min",
  templateUrl: "./tunel-list-min.component.html",
  styleUrls: ["./tunel-list-min.component.scss"],
})
export class TunelListMinComponent extends BaseComponent implements OnInit {
  constructor(public tunelService: TunelService) {
    super(tunelService);
  }

  ngOnInit(): void {
    this._subscription["user"] = this.tunelService.user$.subscribe((user) => {
      this.getData(user.id_inscription);
    });
  }

  getData(user: number) {
    this.loading = true;
    this.tunelService.getByUser(user).subscribe((tunels) => {
      this.data = tunels;
      this.loading = false;
    });
  }

  select(tunel: any) {
    this.tunelService.singleData = tunel;
  }
}
