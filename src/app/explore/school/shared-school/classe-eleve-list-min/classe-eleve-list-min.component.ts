import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "src/app/authentification/auth.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EleveService } from "../../eleve.service";
import { TunelService } from "../../tache/tunel/tunel.service";

@Component({
  selector: "app-classe-eleve-list-min",
  templateUrl: "./classe-eleve-list-min.component.html",
  styleUrls: ["./classe-eleve-list-min.component.scss"],
})
export class ClasseEleveListMinComponent
  extends BaseComponent
  implements OnInit {
  @Input() styleLight: boolean = true; // Permet d'adapter la couleur du texte en fonction de l'élèment parent
  constructor(
    public eleveService: EleveService,
    public auth: AuthService,
    public tunelService: TunelService
  ) {
    super(eleveService);
  }

  ngOnInit(): void {
    this.getData();
  }

  showEleve(eleve: number) {
    this.eleveService.loading = true;
    this.eleveService.getSingle(eleve).subscribe(() => {
      this.eleveService.loading = false;
    });
  }

  getData() {
    this.loading = true;
    this.eleveService
      .getEleveDuMemeClasse(this.auth.selectedProfile.profil.id)
      .subscribe((data) => {
        this.data = data;
        this.loading = false;
      });
  }

  afficherTunel(user: any) {
    this.tunelService.user = user.eleve_details;
  }
}
