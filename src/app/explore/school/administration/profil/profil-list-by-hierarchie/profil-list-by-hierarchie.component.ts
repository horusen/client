import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../../etablissement/etablissement.service";
import { TunelService } from "../../../tache/tunel/tunel.service";
import { ProfilService } from "../profil.service";

@Component({
  selector: "app-profil-list-by-hierarchie",
  templateUrl: "./profil-list-by-hierarchie.component.html",
  styleUrls: ["./profil-list-by-hierarchie.component.scss"],
})
export class ProfilListByHierarchieComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public profilService: ProfilService,
    public etablissementService: EtablissementService,
    public tunelService: TunelService
  ) {
    super(profilService);
  }

  ngOnInit(): void {}

  getData(hierarchie: number) {
    this.loading = true;
    this.profilService
      .getProfilEtablissementByHierarchie(
        this.etablissementService.etablissement.id,
        hierarchie
      )
      .subscribe(() => {
        this.loading = false;
      });
  }

  afficherTunel(profil: any) {
    this.tunelService.user = profil.personne;
  }
}
