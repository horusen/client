import { Component, OnInit } from "@angular/core";
import { ReactionService } from "src/app/explore/school/reaction/reaction.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { Factory } from "src/app/shared/services/factory";
import { TunelService } from "../../tunel.service";

@Component({
  selector: "app-reaction-tunel-list",
  templateUrl: "./reaction-tunel-list.component.html",
  styleUrls: ["./reaction-tunel-list.component.scss"],
})
export class ReactionTunelListComponent
  extends BaseComponent
  implements OnInit
{
  constructor(
    public reactionService: ReactionService,
    public tunelService: TunelService,
    public factory: Factory
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    this._subscription["tunel"] = this.tunelService.singleData$.subscribe(
      (tunel) => this.getData(tunel.id)
    );
  }

  getData(tunel: number) {
    this.loading = true;
    this.reactionService.getByTunel(tunel).subscribe(() => {
      this.loading = false;
    });
  }

  rebondir(reaction: any) {
    this.reactionService.rebondissement$.next(reaction);
  }
}
