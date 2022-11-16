import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-dernieres-discussions-solo",
  templateUrl: "./dernieres-discussions-solo.component.html",
  styleUrls: ["./dernieres-discussions-solo.component.scss"],
})
export class DernieresDiscussionsSoloComponent
  extends BaseComponent
  implements OnInit
{
  @Input() discussion: any;
  @Input() dialoguant: { type: string; id: number };
  correspondant: any;
  type_correspondant: any;
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.getCorrespondant(this.discussion);
  }

  getCorrespondant(discussion: any) {
    const correspondance = discussion.correspondance;
    switch (discussion.type) {
      case 1:
        this.type_correspondant = "user";
        this.correspondant =
          correspondance.user1.id_inscription === this.dialoguant.id
            ? correspondance.user2
            : correspondance.user1;
        break;
      case 2:
        if (this.dialoguant.type === "user") {
          if (correspondance.service_correspondant.service_com) {
            this.type_correspondant = "entite_diplomatique";
            this.correspondant =
              correspondance.service_correspondant.institution;
          } else {
            this.type_correspondant = "service";
            this.correspondant = correspondance.service_correspondant;
          }
        } else if (
          this.dialoguant.type === "service" ||
          this.dialoguant.type === "entite_diplomatique"
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
          correspondance.service_correspondant1.id === this.dialoguant.id
            ? correspondance.service_correspondant2
            : correspondance.service_correspondant1;

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

  getDateFormat(discussion: any): string | void {
    if (discussion) {
      const dateDiff = Date.parse(Date()) - Date.parse(discussion.touched_at);
      switch (true) {
        case dateDiff / 31536000000 >= 1:
          return "dd MMM y";
        case dateDiff / 86400000 >= 1:
          return "dd MMM";
        default:
          return "hh:mm";
      }
    }
  }
}
