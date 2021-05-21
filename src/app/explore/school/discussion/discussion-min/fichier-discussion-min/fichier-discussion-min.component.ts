import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FichierService } from "src/app/file-manager/fichier/fichier.service";
import { AssetDiscussionFichierComponent } from "../../../reaction/asset-discussion/asset-discussion-fichier/asset-discussion-fichier.component";
import { DiscussionService } from "../../discussion.service";

@Component({
  selector: "app-fichier-discussion-min",
  templateUrl: "./fichier-discussion-min.component.html",
  styleUrls: ["./fichier-discussion-min.component.scss"],
})
export class FichierDiscussionMinComponent
  extends AssetDiscussionFichierComponent
  implements OnInit
{
  constructor(
    public fichierService: FichierService,
    public route: ActivatedRoute,
    public discussionService: DiscussionService
  ) {
    super(fichierService, route, discussionService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
