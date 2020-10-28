import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { CorrectionTacheService } from "./correction-tache.service";
import { TacheService } from "../tache.service";

@Component({
  selector: "app-correction-tache",
  templateUrl: "./correction-tache.component.html",
  styleUrls: ["./correction-tache.component.scss"],
})
export class CorrectionTacheComponent
  extends BaseSingleComponent
  implements OnInit {
  displayCreateComponent: boolean = true;
  constructor(
    public correctionTacheService: CorrectionTacheService,
    public tacheService: TacheService,
    public route: ActivatedRoute
  ) {
    super(correctionTacheService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["tache"] = this.tacheService.singleData$.subscribe(
      (tache) => {
        this.getCorrection(tache);
      }
    );
  }

  getCorrection(tache: number) {
    this.route.params.subscribe((params) => {
      this.loading = true;
      if (params["id"]) {
        this.correctionTacheService.getSingle(params["id"]).subscribe(() => {
          this.loading = false;
          console.log(this.single);
        });
      } else {
        this.correctionTacheService
          .getCorrectionParDefaut(tache)
          .subscribe(() => {
            console.log(this.single);
            this.loading = false;
          });
      }
    });
  }

  showCreateComponent() {
    this.displayCreateComponent = true;
    this.helper.toggleModal("correction-tache-create-modal");
  }
}
