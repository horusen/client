import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { NiveauDifficulteClasseService } from "./niveau-difficulte-classe.service";

@Component({
  selector: "app-niveau-difficulte-classe",
  templateUrl: "./niveau-difficulte-classe.component.html",
  styleUrls: ["./niveau-difficulte-classe.component.scss"],
})
export class NiveauDifficulteClasseComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public niveauDifficulteClasseService: NiveauDifficulteClasseService
  ) {
    super(niveauDifficulteClasseService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (!this.niveauDifficulteClasseService.data.length) {
      this.loading = true;
      this.niveauDifficulteClasseService.get().subscribe(() => {
        this.loading = false;
      });
    }
  }
}
