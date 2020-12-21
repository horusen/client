import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { CorrectionTacheService } from "../correction-tache.service";

@Component({
  selector: "app-correction-tache-list",
  templateUrl: "./correction-tache-list.component.html",
  styleUrls: ["./correction-tache-list.component.scss"],
})
export class CorrectionTacheListComponent
  extends BaseComponent
  implements OnInit {
  @Input() tache: any;
  @Input() excludedCorrection: number; // Permet de pouvoir recuperer tous les corrections d'un tache en en omettant specialement un
  constructor(public correctionSevice: CorrectionTacheService) {
    super(correctionSevice);
  }

  ngOnInit(): void {
    this.getData(this.tache.id);
  }

  getData(tache: number) {
    if (tache) {
      this.loading = true;
      if (this.excludedCorrection) {
        this.correctionSevice
          .getAutresCorrections(tache, this.excludedCorrection)
          .subscribe(() => {
            this.loading = true;
          });
      } else {
        this.correctionSevice.getCorrections(tache).subscribe(() => {
          this.loading = false;
        });
      }
    }
  }
}
