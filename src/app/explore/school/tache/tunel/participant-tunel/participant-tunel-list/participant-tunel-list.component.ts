import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TunelService } from "../../tunel.service";
import { ParticipantTunelService } from "../participant-tunel.service";

@Component({
  selector: "app-participant-tunel-list",
  templateUrl: "./participant-tunel-list.component.html",
  styleUrls: ["./participant-tunel-list.component.scss"],
})
export class ParticipantTunelListComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public participantTunelService: ParticipantTunelService,
    public tunelService: TunelService
  ) {
    super(participantTunelService);
  }

  ngOnInit(): void {
    this._subscription["tunel"] = this.tunelService.singleData$.subscribe(
      (tunel) => {
        this.getData(tunel.id);
      }
    );
  }

  getData(tunel: number) {
    this.loading = true;
    this.participantTunelService.get(tunel).subscribe((participants) => {
      this.loading = false;
    });
  }
}
