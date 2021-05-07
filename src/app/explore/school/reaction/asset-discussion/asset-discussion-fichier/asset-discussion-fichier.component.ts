import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FichierService } from "src/app/file-manager/fichier/fichier.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DiscussionService } from "../../../discussion/discussion.service";

@Component({
  selector: "app-asset-discussion-fichier",
  templateUrl: "./asset-discussion-fichier.component.html",
  styleUrls: ["./asset-discussion-fichier.component.scss"],
})
export class AssetDiscussionFichierComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public fichierService: FichierService,
    public route: ActivatedRoute,
    public discussionService: DiscussionService
  ) {
    super(fichierService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.discussionService.singleData$.subscribe((discussion) => {
        this.getData(discussion.id, queryParams);
      });
    });
  }

  getData(discussion: number, params?: Params) {
    this.loading = true;
    this.fichierService.getByDiscussion(discussion, params).subscribe(() => {
      this.loading = false;
    });
  }
}
