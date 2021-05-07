import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ProgrammeService } from "../../programme.service";

@Component({
  selector: "app-programme-list",
  templateUrl: "./programme-list.component.html",
  styleUrls: ["./programme-list.component.scss"],
})
export class ProgrammeListComponent extends BaseComponent implements OnInit {
  @Output() edit = new EventEmitter<any>();
  @Input() minified: boolean = false; // Permet d'afficher les details ou les statistiques sur  la même page que la liste des element

  constructor(
    public programmeService: ProgrammeService,
    public router: Router,
    public etablissementService: EtablissementService,
    public route: ActivatedRoute
  ) {
    super(programmeService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((query) => {
      this.getData(query);
    });
  }

  getData(params?: any) {
    // Explore professeur
    if (this.router.url.includes("school/professeur/programme")) {
      this.getByCurrentUserAsProfesseur(params);
    }

    // Administration etbalissement
    else if (
      this.router.url.match("school/administration") ||
      this.router.url.match("school/echo")
    ) {
      this._subscription[
        "etablissement"
      ] = this.etablissementService.singleData$.subscribe((etablissement) => {
        this.getByEtablissement(etablissement.id, params);
      });
    }
  }

  getByCurrentUserAsProfesseur(params?: any) {
    this.loading = true;
    this.programmeService.getByCurrentUserAsProfesseur(params).subscribe(() => {
      this.loading = false;
    });
  }

  getByEtablissement(etablissement: number, params?: any) {
    this.loading = true;
    this.programmeService
      .getByEtablissement(etablissement, true, params)
      .subscribe(() => {
        this.loading = false;
      });
  }

  modifier(programme: any) {
    this.programmeService.singleData = programme;
  }

  supprimer(programme: number) {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.programmeService.delete(programme).subscribe(() => {
        this.loading = false;
        this.helper.toastSuccess();
      });
    });
  }
}
