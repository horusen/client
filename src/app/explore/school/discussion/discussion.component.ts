import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DiscussionService } from "./discussion.service";

@Component({
  selector: "app-discussion",
  templateUrl: "./discussion.component.html",
  styleUrls: ["./discussion.component.scss"],
})
export class DiscussionComponent extends BaseComponent implements OnInit {
  @Input() parent: string = "";
  discussion: any;
  activeComponent = {
    professeur: this.parent == "explore-professeur", // est actif par défaut dans la section explore-professeur
    groupe: false,
    "sous-reseaux": false,
    sujet: this.parent == "sous-reseaux",
    "membre-administration": false,
  };
  constructor(
    public discussionService: DiscussionService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(discussionService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["type_discussion"]) {
        this.activateComponent(params["type_discussion"]);

        // get Discussion

        params["type_discussion"] == "correspondance" && params["correspondant"]
          ? this.checkDiscussion(1, params["correspondant"])
          : null;

        params["type_discussion"] == "membre-administration" &&
        params["membre-administration"]
          ? this.checkDiscussion(1, params["membre-administration"])
          : null;

        params["type_discussion"] == "professeur" && params["professeur"]
          ? this.checkDiscussion(1, params["professeur"])
          : null;

        params["type_discussion"] == "groupe" && params["groupe"]
          ? this.checkDiscussion(2, params["groupe"])
          : null;
        params["type_discussion"] == "sous-reseaux" && params["sous-reseaux"]
          ? this.checkDiscussion(3, params["sous-reseaux"])
          : null;
        params["type_discussion"] == "sujet" && params["sujet"]
          ? this.checkDiscussion(4, +params["sujet"])
          : null;
      }
    });

    if (
      this.parent == "sous-reseaux" &&
      !this.router.url.includes("type-discussion")
    ) {
      this.router.navigate(["./"], {
        queryParams: { type_discussion: "sujet" },
        relativeTo: this.route,
      });
    }

    this._subscription[
      "discussion"
    ] = this.discussionService.singleData$.subscribe(
      (discussion) => (this.discussion = discussion)
    );
  }

  checkDiscussion(type_discussion: number, idTypeDiscussion: number) {
    this.discussionService
      .getDiscussion(type_discussion, idTypeDiscussion)
      .subscribe();
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
