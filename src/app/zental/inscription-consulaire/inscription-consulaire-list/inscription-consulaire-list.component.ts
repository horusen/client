import { ParentDefinition } from "./../../../shared/models/parent-definition.model";
import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { InscritptionConsulaireService } from "../inscritption-consulaire.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-inscription-consulaire-list",
  templateUrl: "./inscription-consulaire-list.component.html",
  styleUrls: ["./inscription-consulaire-list.component.scss"],
})
export class InscriptionConsulaireListComponent
  extends BaseComponent
  implements OnInit
{
  @Input() parent: ParentDefinition;
  filtreEtat: number; // Defini un filtre par etats des elements
  constructor(
    public inscriptionConsulaireService: InscritptionConsulaireService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(inscriptionConsulaireService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        if (params.filter) {
          let filterParams = JSON.parse(params.filter);
          if (!filterParams["etats"]) {
            this.router.navigate(["./"], {
              relativeTo: this.route,
              queryParams: { filter: JSON.stringify({ etats: [1] }) },
              queryParamsHandling: "preserve",
            });

            return;
          } else {
            this.filtreEtat = JSON.parse(params.filter).etats[0];
            console.log(this.filtreEtat);
          }
        } else {
          this.router.navigate(["./"], {
            relativeTo: this.route,
            queryParams: { filter: JSON.stringify({ etats: [1] }) },
          });

          return;
        }

        this.getData(params);
      },
    });
  }

  selectInscriptionConsulaire(inscription: any): void {
    this.inscriptionConsulaireService.singleData = inscription;
  }

  getData(params: Params): void {
    if (this.parent.name === "ambassade") {
      this.getByAmbassade(this.parent.item.id, params);
    } else if (this.parent.name === "consulat") {
      this.getByConsulat(this.parent.item.id, params);
    } else if (this.parent.name === "liaison") {
      this.getByLiaison(this.parent.item.id, params);
    }
  }

  getByLiaison(liaison: number, params: Params): void {
    this.loading = true;
    this.inscriptionConsulaireService.getByLiaison(liaison, params).subscribe({
      complete: () => {
        this.loading = false;
      },
    });
  }

  getByConsulat(consulat: number, params: Params): void {
    this.loading = true;
    this.inscriptionConsulaireService
      .getByConsulat(consulat, params)
      .subscribe({
        complete: () => {
          this.loading = false;
        },
      });
  }

  getByAmbassade(ambassade: number, params: Params): void {
    this.loading = true;
    this.inscriptionConsulaireService
      .getByAmbassade(ambassade, params)
      .subscribe({
        next: () => {
          this.loading = false;
        },
      });
  }

  changerEtat(etat: any): void {
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParams: { filter: JSON.stringify({ etats: [etat] }) },
      queryParamsHandling: "merge",
    });
  }
}
