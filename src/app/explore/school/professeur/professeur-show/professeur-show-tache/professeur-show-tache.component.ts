import { TacheService } from "src/app/explore/school/tache/tache.service";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ProfesseurService } from "../../professeur.service";

@Component({
  selector: "app-professeur-show-tache",
  templateUrl: "./professeur-show-tache.component.html",
  styleUrls: ["./professeur-show-tache.component.scss"],
})
export class ProfesseurShowTacheComponent
  extends BaseComponent
  implements OnInit {
  constructor(public tacheService: TacheService) {
    super(tacheService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.tacheService.initialise().subscribe(() => {
      this.loading = false;
    });
  }
}
