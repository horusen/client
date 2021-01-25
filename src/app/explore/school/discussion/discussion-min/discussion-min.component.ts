import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DiscussionComponent } from "../discussion.component";
import { DiscussionService } from "../discussion.service";

@Component({
  selector: "app-discussion-min",
  templateUrl: "./discussion-min.component.html",
  styleUrls: ["./discussion-min.component.scss"],
})
export class DiscussionMinComponent
  extends DiscussionComponent
  implements OnInit {
  constructor(
    public discussionService: DiscussionService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(discussionService, route, router);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe((params) => {
      if (params["modal"] && params["modal"] == "discussion-min") {
        this.helper.toggleModal("discussion-min-modal");
        console.log("ok");
      }
    });
  }
}
