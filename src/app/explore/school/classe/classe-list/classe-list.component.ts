import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ClasseService } from "../classe.service";

@Component({
  selector: "app-classe-list",
  templateUrl: "./classe-list.component.html",
  styleUrls: ["./classe-list.component.scss"],
})
export class ClasseListComponent extends BaseComponent implements OnInit {
  @Input() minified: boolean = false;
  constructor(
    public classeService: ClasseService,
    public router: Router,
    public etablissementService: EtablissementService
  ) {
    super(classeService);
  }

  ngOnInit(): void {
    if (
      this.router.url.includes("school/administration") ||
      this.router.url.includes("school/echo")
    ) {
      this._subscription[
        "etablissement"
      ] = this.etablissementService.singleData$.subscribe((etablissement) => {
        this.getByEtablissement(etablissement.id);
      });
    } else if (this.router.url.includes("school/professeur")) {
      this.getByProfesseur();
    }
  }

  modifier(classe: any) {
    this.classeService.singleData = classe;
  }

  getByProfesseur() {
    this.loading = true;
    this.classeService.getByCurrentUserAsProfesseur().subscribe(() => {
      this.loading = false;
    });
  }

  getByEtablissement(etablissement: number) {
    this.loading = true;
    this.classeService.getByEtablissement(etablissement).subscribe(() => {
      this.loading = false;
    });
  }
}
