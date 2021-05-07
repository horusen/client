import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TacheService } from "../../tache.service";

@Component({
  selector: "app-tache-meme-categorie",
  templateUrl: "./tache-meme-categorie.component.html",
  styleUrls: ["./tache-meme-categorie.component.scss"],
})
export class TacheMemeCategorieComponent
  extends BaseComponent
  implements OnInit {
  constructor(public tacheService: TacheService) {
    super(tacheService);
  }

  ngOnInit(): void {
    this._subscription["tache"] = this.tacheService.singleData$.subscribe(
      (tache) => {
        this.getData(tache.id);
      }
    );
  }

  getData(chapitre: number) {
    this.loading = true;
    this.tacheService.getTacheMemeCategorie(chapitre).subscribe((taches) => {
      this.data = taches;
      this.loading = false;
    });
  }
}
