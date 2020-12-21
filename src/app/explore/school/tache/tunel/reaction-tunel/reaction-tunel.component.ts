import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ParticipantTunelService } from "../participant-tunel/participant-tunel.service";
import { TunelService } from "../tunel.service";
import { ReactionTunelService } from "./reaction-tunel.service";

@Component({
  selector: "app-reaction-tunel",
  templateUrl: "./reaction-tunel.component.html",
  styleUrls: ["./reaction-tunel.component.scss"],
})
export class ReactionTunelComponent extends BaseComponent implements OnInit {
  tunel: any;
  participerLoading: boolean = false;
  afficherParticipants: boolean = false;
  constructor(
    public tunelService: TunelService,
    public reactionTunelService: ReactionTunelService,
    public participantTunelService: ParticipantTunelService
  ) {
    super(reactionTunelService);
  }

  ngOnInit(): void {
    this._subscription["tunel"] = this.tunelService.singleData$.subscribe(
      (tunel) => {
        this.tunel = tunel;
        this.helper.toggleModal("reaction-tunel-modal");
      }
    );
  }

  participer() {
    this.helper.alertConfirmation(() => {
      this.participerLoading = true;
      this.participantTunelService.participer(this.tunel.id).subscribe(() => {
        this.loading = false;
      });
    });
  }
}
