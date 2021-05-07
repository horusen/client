import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TunelService } from "../../tunel.service";
import { ReactionTunelService } from "../reaction-tunel.service";

@Component({
  selector: "app-reaction-tunel-list",
  templateUrl: "./reaction-tunel-list.component.html",
  styleUrls: ["./reaction-tunel-list.component.scss"],
})
export class ReactionTunelListComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public reactionTunelService: ReactionTunelService,
    public tunelService: TunelService
  ) {
    super(reactionTunelService);
  }

  ngOnInit(): void {
    this._subscription[
      "tunel"
    ] = this.tunelService.singleData$.subscribe((tunel) =>
      this.getData(tunel.id)
    );
  }

  getData(tunel: number) {
    this.loading = true;
    this.reactionTunelService.getData(tunel).subscribe(() => {
      this.loading = false;
    });
  }
}
