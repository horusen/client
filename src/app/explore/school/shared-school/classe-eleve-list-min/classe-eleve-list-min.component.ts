import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TunelService } from "../../tache/tunel/tunel.service";
import { ClasseEleveService } from "./classe-eleve.service";

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
    public classeEleveService: ClasseEleveService,
    public tunelService: TunelService
  ) {
    super(classeEleveService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (!this.classeEleveService.data.length) {
      this.loading = true;
      this.classeEleveService.initialise().subscribe(() => {
        this.loading = false;
      });
    }
  }

  afficherTunel(user: any) {
    this.tunelService.user = user.eleve_details;
    console.log(this.auth.user.id_inscription);
    console.log(user.eleve_details.id_inscription);
  }
}
