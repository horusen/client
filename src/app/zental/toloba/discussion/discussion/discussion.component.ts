import { ActivatedRoute } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { DiscussionService } from "./discussion.service";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";

@Component({
  selector: "app-discussion",
  templateUrl: "./discussion.component.html",
  styleUrls: ["./discussion.component.scss"],
})
export class DiscussionComponent extends BaseSingleComponent implements OnInit {
  type_correspondant: string;
  correspondant: any;

  @Input() parent: ParentDefinition;
  constructor(
    public discussionService: DiscussionService,
    public route: ActivatedRoute
  ) {
    super(discussionService);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = !this.discussionService.singleData;

    super.ngOnInit();

    this._subscription["discussion"] =
      this.discussionService.singleData$.subscribe((discussion) => {
        this.getCorrespondant(discussion);
      });
  }

  getCorrespondant(discussion: any) {
    const correspondance = discussion.correspondance;
    switch (discussion.type) {
      case 1:
        this.type_correspondant = "user";
        this.correspondant =
          correspondance.user1.id_inscription ===
          this.parent.item.id_inscription
            ? correspondance.user2
            : correspondance.user1;
        break;
      case 2:
        if (this.parent.name === "user") {
          if (correspondance.service_correspondant.service_com) {
            this.type_correspondant = "entite_diplomatique";
            this.correspondant =
              correspondance.service_correspondant.institution;
          } else {
            this.type_correspondant = "service";
            this.correspondant = correspondance.service_correspondant;
          }
        } else if (
          this.parent.name === "service" ||
          this.parent.name === "entite_diplomatique"
        ) {
          this.type_correspondant = "user";
          this.correspondant = correspondance.user;
        }
        break;
      case 3:
        this.type_correspondant = "groupe";
        this.correspondant = correspondance.groupe;
        break;
      case 4:
        const service_correspondant =
          correspondance.service_correspondant1.id === this.parent.item.id
            ? correspondance.service_correspondant2
            : correspondance.service_correspondant1;
        console.log(service_correspondant);

        if (service_correspondant.service_com) {
          this.type_correspondant = "entite_diplomatique";
          this.correspondant = service_correspondant.institution;
        } else {
          this.type_correspondant = "service";
          this.correspondant = service_correspondant;
        }
        break;
    }
  }
}
