import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ReactionService } from "../../../reaction/reaction.service";
import { DiscussionService } from "../../discussion.service";

@Component({
  selector: "app-reaction-discussion-min",
  templateUrl: "./reaction-discussion-min.component.html",
  styleUrls: ["./reaction-discussion-min.component.scss"],
})
export class ReactionDiscussionMinComponent
  extends BaseComponent
  implements OnInit
{
  discussion: any;
  showTabs = {
    message: false,
    fichier: true,
  };
  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    this._subscription["discussion"] =
      this.discussionService.singleData$.subscribe((discussion) => {
        this.discussion = discussion;
      });

    // this.route.queryParams.subscribe((params) => {
    //   if (params["type_discussion"] && !params["tab"]) {
    //     this.router.navigate(["./"], {
    //       queryParamsHandling: "merge",
    //       queryParams: { tab: "message" },
    //       relativeTo: this.route,
    //     });
    //   }

    //   params["tab"] == "message"
    //     ? (this.showTabs.message = true)
    //     : (this.showTabs.fichier = false);
    // });
  }

  closeModal() {
    this.helper.toggleModal("discussion-min-modal");
  }
}
