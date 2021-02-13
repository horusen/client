import { BaseComponent } from "./../../../../shared/components/base-component/base.component";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { DernieresDiscussionsService } from "./dernieres-discussions.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { DiscussionService } from "../discussion.service";

@Component({
  selector: "app-dernieres-discussions",
  templateUrl: "./dernieres-discussions.component.html",
  styleUrls: ["./dernieres-discussions.component.scss"],
})
export class DernieresDiscussionsComponent
  extends BaseComponent
  implements OnInit {
  @Input() type: string;
  idCurrentObject: number;
  constructor(
    public dernieresDiscussionService: DernieresDiscussionsService,
    public etablissementService: EtablissementService,
    public discussionService: DiscussionService
  ) {
    super(dernieresDiscussionService);
  }

  ngOnInit(): void {
    if (this.type == "etablissement") {
      this.getByEtablissement();
    }
  }

  checkDiscussion(discussionObject: number, correspondant?: number) {
    let idType: number;
    idType = this.type == "etablissement" ? 5 : null;
    this.discussionService
      .getDiscussion(idType, discussionObject, correspondant)
      .subscribe();
  }

  getByEtablissement() {
    this.etablissementService.singleData$.subscribe((etablissement) => {
      this.loading = true;
      this.dernieresDiscussionService
        .getDernierDiscussion(this.type, etablissement.id)
        .subscribe(() => {
          this.loading = false;
        });
    });
  }
}
