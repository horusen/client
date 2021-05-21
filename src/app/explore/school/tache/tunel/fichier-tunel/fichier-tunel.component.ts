import { Component, OnInit } from "@angular/core";
import { FichierService } from "src/app/file-manager/fichier/fichier.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TunelService } from "../tunel.service";

@Component({
  selector: "app-fichier-tunel",
  templateUrl: "./fichier-tunel.component.html",
  styleUrls: ["./fichier-tunel.component.scss"],
})
export class FichierTunelComponent extends BaseComponent implements OnInit {
  constructor(
    public fichierService: FichierService,
    public tunelService: TunelService
  ) {
    super(fichierService);
  }

  ngOnInit(): void {
    this._subscription["tunel"] = this.tunelService.singleData$.subscribe(
      (tunel) => {
        this.getData(tunel.id);
      }
    );
  }

  getData(tunel: number) {
    this.loading = true;
    this.fichierService.getByTunel(tunel).subscribe(() => {
      this.loading = false;
    });
  }
}
