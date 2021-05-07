import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DiscussionService } from "../../../discussion/discussion.service";
import { EleveService } from "../../../eleve.service";

@Component({
  selector: "app-asset-discussion-etudiant",
  templateUrl: "./asset-discussion-etudiant.component.html",
  styleUrls: ["./asset-discussion-etudiant.component.scss"],
})
export class AssetDiscussionEtudiantComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public eleveService: EleveService,
    public discussionService: DiscussionService,
    public route: ActivatedRoute
  ) {
    super(eleveService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this._subscription[
        "discussion"
      ] = this.discussionService.singleData$.subscribe((discussion) => {
        this.getData(discussion.correspondant.id_inscription, params);
      });
    });
  }

  getData(user: number, params?: Params) {
    this.loading = true;
    this.eleveService.getByUserAsProfesseur(user, params).subscribe(() => {
      this.loading = false;
    });
  }
}
