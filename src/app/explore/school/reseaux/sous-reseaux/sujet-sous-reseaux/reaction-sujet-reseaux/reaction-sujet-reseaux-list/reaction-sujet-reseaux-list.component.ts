import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { SujetSousReseauxService } from "../../sujet-sous-reseaux.service";
import { ReactionSujetReseauxService } from "../reaction-sujet-reseaux.service";

@Component({
  selector: "app-reaction-sujet-reseaux-list",
  templateUrl: "./reaction-sujet-reseaux-list.component.html",
  styleUrls: ["./reaction-sujet-reseaux-list.component.scss"],
})
export class ReactionSujetReseauxListComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public reactionService: ReactionSujetReseauxService,
    public sujetService: SujetSousReseauxService,
    public imageHandlerService: ImageHandlerService
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    this._subscription["sujet"] = this.sujetService.singleData$.subscribe(
      (sujet) => {
        this.getData(sujet.id);
      }
    );
  }

  getData(sujet: number) {
    this.loading = true;
    this.reactionService.getBySujet(sujet).subscribe(() => {
      this.loading = false;
    });
  }

  rebondir(reaction: any) {
    this.reactionService.rebondissement$.next(reaction);
  }
}
