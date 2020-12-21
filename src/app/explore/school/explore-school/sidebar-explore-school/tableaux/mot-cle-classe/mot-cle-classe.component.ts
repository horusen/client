import { Component, OnInit } from "@angular/core";
import { AffectationTacheService } from "src/app/explore/school/tache/affectation-tache/affectation-tache.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { MotCleClasseService } from "./mot-cle-classe.service";

@Component({
  selector: "app-mot-cle-classe",
  templateUrl: "./mot-cle-classe.component.html",
  styleUrls: ["./mot-cle-classe.component.scss"],
})
export class MotCleClasseComponent extends BaseComponent implements OnInit {
  constructor(
    public motCleService: MotCleClasseService,
    public affectationTacheService: AffectationTacheService
  ) {
    super(motCleService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (!this.motCleService.data.length) {
      this.loading = true;
      this.motCleService.get().subscribe(() => {
        this.loading = false;
      });
    }
  }

  filtrer(motCle: number) {
    this.affectationTacheService.applyFilter("motCles", motCle);
  }
}
