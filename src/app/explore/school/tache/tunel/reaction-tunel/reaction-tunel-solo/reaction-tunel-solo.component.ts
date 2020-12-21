import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ReactionTunelService } from "../reaction-tunel.service";

@Component({
  selector: "app-reaction-tunel-solo",
  templateUrl: "./reaction-tunel-solo.component.html",
  styleUrls: ["./reaction-tunel-solo.component.scss"],
})
export class ReactionTunelSoloComponent
  extends BaseComponent
  implements OnInit {
  @Input() reaction: any;
  @Input() reversed: boolean = false;
  constructor(public reactionTunelService: ReactionTunelService) {
    super(reactionTunelService);
  }

  ngOnInit(): void {}

  rebondir() {
    this.reactionTunelService.rebondissement$.next(this.reaction);
  }
}
