import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { SousDomaineService } from "../../../sous-domaine/sous-domaine.service";
import { MembreSousReseauxService } from "./membre-sous-reseaux.service";

@Component({
  selector: "app-membre-sous-reseaux",
  templateUrl: "./membre-sous-reseaux.component.html",
  styleUrls: ["./membre-sous-reseaux.component.scss"],
})
export class MembreSousReseauxComponent
  extends BaseCreateComponent
  implements OnInit {
  sousReseau: any;
  constructor(
    public membreService: MembreSousReseauxService,
    public sousDomaineService: SousDomaineService
  ) {
    super(membreService);
  }

  ngOnInit(): void {
    this._subscription[
      "sousReseau"
    ] = this.sousDomaineService.singleData$.subscribe((sousDomaine) => {
      this.sousReseau = sousDomaine;
      this.getData(sousDomaine.id);
    });
  }

  getData(sousReseau: number) {
    this.loading = true;
    this.membreService.getBySousReseau(sousReseau).subscribe(() => {
      this.loading = false;
    });
  }

  chercher(word: string) {
    this.loading = true;
    this.membreService
      .research(this.sousReseau.id, word, ["prenom", "nom"])
      .subscribe(() => {
        this.loading = false;
      });
  }
}
