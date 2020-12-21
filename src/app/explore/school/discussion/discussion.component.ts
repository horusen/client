import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DiscussionService } from "./discussion.service";

@Component({
  selector: "app-discussion",
  templateUrl: "./discussion.component.html",
  styleUrls: ["./discussion.component.scss"],
})
export class DiscussionComponent extends BaseComponent implements OnInit {
  discussion: any;
  activeComponent = {
    professeur: true,
    groupe: false,
    "sous-reseaux": false,
  };
  constructor(
    public discussionService: DiscussionService,
    public route: ActivatedRoute
  ) {
    super(discussionService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["type_discussion"]) {
        this.activateComponent(params["type_discussion"]);

        // get Discussion
        params["type_discussion"] == "professeur" && params["professeur"]
          ? this.checkDiscussion(1, params["professeur"])
          : null;
        params["type_discussion"] == "groupe" && params["groupe"]
          ? this.checkDiscussion(2, params["groupe"])
          : null;
        params["type_discussion"] == "sous-reseaux" && params["sous-reseaux"]
          ? this.checkDiscussion(3, params["sous-reseaux"])
          : null;
      }
    });

    this._subscription[
      "discussion"
    ] = this.discussionService.singleData$.subscribe(
      (discussion) => (this.discussion = discussion)
    );
  }

  checkDiscussion(type_discussion: number, groupe: number) {
    this.discussionService.getDiscussion(type_discussion, groupe).subscribe();
  }

  resetComponent() {
    Object.keys(this.activeComponent).forEach((item) => {
      this.activeComponent[item] = false;
    });
  }

  activateComponent(component: string) {
    if (this.activeComponent.hasOwnProperty(component)) {
      this.resetComponent();
      this.activeComponent[component] = true;
    }
  }
}
