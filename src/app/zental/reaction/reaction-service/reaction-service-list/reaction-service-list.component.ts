import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ChargerComServiceService } from "src/app/zental/service/charger-com-service.service";
import { ServiceService } from "src/app/zental/service/service.service";
import { DiscussionService } from "src/app/zental/toloba/discussion/discussion/discussion.service";
import { ReactionService } from "../../reaction/reaction.service";

@Component({
  selector: "app-reaction-service-list",
  templateUrl: "./reaction-service-list.component.html",
  styleUrls: ["./reaction-service-list.component.scss"],
})
export class ReactionServiceListComponent
  extends BaseComponent
  implements OnInit
{
  service: any;
  discussion: any;
  chargerComs: any[]; // Stock les chargés de communications des services
  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService,
    public chargerComService: ChargerComServiceService,
    public serviceService: ServiceService
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    this._subscription["discussion"] =
      this.discussionService.singleData$.subscribe((discussion) => {
        this.discussion = discussion;
        this.getByDiscussion(discussion.id);
      });

    this._subscription["service"] = this.serviceService.singleData$.subscribe(
      (service) => (this.service = service)
    );

    this._subscription["charger_com"] = this.chargerComService.data$.subscribe(
      (data) => {
        this.chargerComs = data;
      }
    );
  }

  rebondir(reaction: any): void {
    this.reactionService.rebondissement = reaction;
  }

  supprimer(reaction: number): void {
    this.helper.alertConfirmation(() => {
      this.reactionService.delete(reaction).subscribe({
        next: () => {
          this.helper.toastSuccess();
        },
      });
    });
  }

  getByDiscussion(discussion: number): void {
    this.loading = true;
    this.reactionService.getByDiscussion(discussion).subscribe(() => {
      this.loading = false;
    });
  }

  isDialoguant(service: any): boolean {
    return service?.id === this.service.id;
  }
}
