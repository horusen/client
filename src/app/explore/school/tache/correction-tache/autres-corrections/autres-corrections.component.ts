import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { CorrectionTacheService } from "../correction-tache.service";

@Component({
  selector: "app-autres-corrections",
  templateUrl: "./autres-corrections.component.html",
  styleUrls: ["./autres-corrections.component.scss"],
})
export class AutresCorrectionsComponent
  extends BaseComponent
  implements OnInit {
  constructor(public correctionTacheService: CorrectionTacheService) {
    super(correctionTacheService);
  }

  ngOnInit(): void {
    this._subscription[
      "correction"
    ] = this.correctionTacheService.singleData$.subscribe((correction) => {
      this.getData(correction.tache, correction.id);
    });
  }

  getData(tache: number, correction: number) {
    this.loading = true;
    this.correctionTacheService
      .getAutresCorrections(tache, correction)
      .subscribe(() => {
        this.loading = false;
      });
  }
}
