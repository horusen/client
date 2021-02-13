import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/authentification/auth.service";
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
    public router: Router,
    public auth: AuthService
  ) {
    super(discussionService, route, router, auth);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe((params) => {
      console.log("changed");
      if (params["modal"] && params["modal"] == "discussion-min") {
        this.helper.toggleModal("discussion-min-modal");
        console.log("ok");
      }
    });
  }
}
