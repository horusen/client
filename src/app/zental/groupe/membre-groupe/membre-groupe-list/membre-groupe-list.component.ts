import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { GroupeService } from "../../groupe/groupe.service";
import { MembreGroupeService } from "../membre-groupe.service";

@Component({
  selector: "app-membre-groupe-list",
  templateUrl: "./membre-groupe-list.component.html",
  styleUrls: ["./membre-groupe-list.component.scss"],
})
export class MembreGroupeListComponent extends BaseComponent implements OnInit {
  groupe: any;
  constructor(
    public membreService: MembreGroupeService,
    public groupeService: GroupeService,
    public route: ActivatedRoute
  ) {
    super(membreService);
  }

  ngOnInit(): void {
    this._subscription["groupe"] = this.groupeService.singleData$.subscribe(
      (groupe) => {
        if (groupe.id != this.groupe?.id) {
          this.groupe = groupe;

          this.route.queryParams.subscribe((params) => {
            this.getByGroupe(groupe.id, params);
          });
        }
      }
    );
  }

  getByGroupe(groupe: number, params: Params): void {
    this.loading = true;
    this.membreService.getByGroupe(groupe, params).subscribe(() => {
      this.loading = false;
    });
  }

  supprimer(membre: any): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.membreService.delete(membre).subscribe(() => {
        this.loading = false;

        // Update nombre membre groupe
        this.groupeService.setFieldInSingleData(
          "nombre_membres",
          --this.groupe.nombre_membres
        );

        this.helper.alertSuccess();
      });
    });
  }

  designerCommeAdmin(membre: any) {
    this._changerPrivilege(membre, true);
  }

  designerCommeNonAdmin(membre: any) {
    this._changerPrivilege(membre, false);
  }

  private _changerPrivilege(membre: any, isAdmin: boolean): void {
    this.helper.alertConfirmation(() => {
      this.membreService
        .update(membre.id, {
          ...membre,
          membre: membre.membre.id_inscription,
          admin: isAdmin,
        })
        .subscribe((response) => {
          if (this.groupe?.user_membership?.id === membre.id) {
            this.groupeService.setFieldInSingleData(
              "user_membership",
              response
            );
          }
          this.helper.alertSuccess();
        });
    });
  }
}
