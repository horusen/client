import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/authentification/auth.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ClasseService } from "../../classe/classe.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-list",
  templateUrl: "./groupe-list.component.html",
  styleUrls: ["./groupe-list.component.scss"],
})
export class GroupeListComponent extends BaseComponent implements OnInit {
  @Input() displayBy: string;
  @Input() minified = false;
  constructor(
    public groupeService: GroupeService,
    public router: Router,
    public etablissementService: EtablissementService,
    public classeService: ClasseService,
    public route: ActivatedRoute
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    if (this.router.url.match(/ancien-groupe/)) {
      this.getAnciensGroupes(this.auth.selectedProfile.profil.classe);
    } else if (this.router.url.match(/school\/tache\/groupe/)) {
      this.getByClasse(this.auth.selectedProfile.profil.classe);
    }

    this.route.queryParams.subscribe((query) => {
      switch (this.displayBy) {
        case "etablissement":
          this._subscription[
            "etablissement"
          ] = this.etablissementService.singleData$.subscribe((etablissement) =>
            this.getByEtablissement(etablissement.id)
          );
          break;
        case "professeur":
          this.getGroupeProfesseurByUserAsProfesseur(query);
          break;
        case "classe":
          this._subscription[
            "classe"
          ] = this.classeService.singleData$.subscribe((classe) =>
            this.getByClasse(classe.id, query)
          );
          break;

        case "groupesIndependants":
          this.getGroupeIndependant(query);
          break;
        // default:
        //   this.getGroupeClasseByUserAsMembre(query);
        //   break;
      }
    });
  }

  getByEtablissement(etablissement: number) {
    this.loading = true;
    this.groupeService.getByEtablissement(etablissement).subscribe(() => {
      this.loading = false;
    });
  }

  getGroupeClasseByUserAsMembre(query?: any) {
    this.loading = true;
    this.groupeService.get(query).subscribe(() => {
      this.loading = false;
    });
  }

  getGroupeIndependant(query?: any) {
    this.loading = true;
    this.groupeService.getGroupeIndependant(query).subscribe(() => {
      this.loading = false;
    });
  }

  getGroupeProfesseurByUserAsProfesseur(query: any) {
    this.loading = true;
    this.groupeService
      .getGroupeProfesseurByUserAsProfesseur(query)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getAnciensGroupes(classe: number) {
    this.loading = true;
    this.groupeService.getAnciensGroupes(classe).subscribe(() => {
      this.loading = false;
    });
  }

  getByClasse(classe: number, params?: any) {
    this.loading = true;
    this.groupeService.getByClasse(classe).subscribe(() => {
      this.loading = false;
    });
  }

  onLoading(loading: boolean) {
    this.loading = loading;
  }
}
