import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ProgrammeService } from "../../programme.service";
import { FormationService } from "../formation.service";

@Component({
  selector: "app-formation-list",
  templateUrl: "./formation-list.component.html",
  styleUrls: ["./formation-list.component.scss"],
})
export class FormationListComponent extends BaseComponent implements OnInit {
  editFormation = false;
  searchActive: boolean = false;
  @Input() minified: boolean = false; // Permet d'afficher les details ou les statistiques sur  la même page que la liste des element
  constructor(
    public formationService: FormationService,
    public etablissementService: EtablissementService,
    public prorgammeService: ProgrammeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(formationService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((query) => {
      this.getData(query);
    });
  }

  getData(params?: any) {
    const adminEtablissementRegex = /school\/administration\/[0-9]+\/formation/;
    const adminEtablissementRegex2 = /school\/administration\/info\/[0-9]+\/details\/formation/;
    const programmeUrlRegex = /school\/administration\/[0-9]+\/programme\/[0-9]+/;
    const etablissementUrlRegex = /school\/echo\/type\/[0-9]+\/etablissement\/[0-9]+\/formation/;

    if (
      this.router.url.match(adminEtablissementRegex) ||
      this.router.url.match(adminEtablissementRegex2) ||
      this.router.url.match(etablissementUrlRegex)
    ) {
      this._subscription[
        "etablissement"
      ] = this.etablissementService.singleData$.subscribe((etablissement) => {
        this.getByEtablissement(etablissement.id, params);
      });
    } else if (programmeUrlRegex.test(this.router.url)) {
      this._subscription[
        "programme"
      ] = this.prorgammeService.singleData$.subscribe((programme) => {
        this.getByProgramme(programme.id, params);
      });
    }
  }

  getByEtablissement(etablissement: number, params?: any) {
    this.loading = true;
    this.formationService
      .getByEtablissement(etablissement, params)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getByProgramme(programme: number, params?: any) {
    this.loading = true;
    this.formationService.getByProgramme(programme, params).subscribe(() => {
      this.loading = false;
    });
  }

  modifier(formation: any) {
    this.formationService.singleData = formation;
  }

  supprimerFormation(formation: number) {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.formationService.delete(formation).subscribe(() => {
        this.loading = false;
        this.helper.toastSuccess();
      });
    });
  }
}
