import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MinistereService } from "../../ministere/ministere.service";
import { PasseFrontiereService } from "../../passe-frontiere/passe-frontiere.service";
import { PaysService } from "../../pays/pays.service";
import { TypePasserelleService } from "../../type-passerelle/type-passerelle.service";
import { VilleService } from "../../villes/ville.service";
import { PasserelleCreateComponent } from "../passerelle-create/passerelle-create.component";
import { PasserelleService } from "../passerelle.service";

@Component({
  selector: "app-passerelle-edit",
  templateUrl: "./passerelle-edit.component.html",
  styleUrls: ["./passerelle-edit.component.scss"],
})
export class PasserelleEditComponent
  extends PasserelleCreateComponent
  implements OnInit
{
  passerelle: any;

  constructor(
    public passerelleService: PasserelleService,
    public ministereService: MinistereService,
    public paysService: PaysService,
    public villeService: VilleService,
    public router: Router,
    public route: ActivatedRoute,
    public passeFrontiereService: PasseFrontiereService,
    public typeService: TypePasserelleService
  ) {
    super(
      passerelleService,
      paysService,
      router,
      route,
      passeFrontiereService,
      typeService
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["passerelle"] =
      this.passerelleService.singleData$.subscribe((passerelle) => {
        this.passerelle = passerelle;
        this.initialiseForm(passerelle);
        this.addControls(
          ["type", "passe_frontiere"],
          [[passerelle.type], [passerelle.passe_frontiere]],
          [true, true]
        );
      });
  }

  edit(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays_siege: this.formValue("pays_siege")[0].id,
        type: this.formValue("type")[0].id,
        passe_frontiere: this.formValue("passe_frontiere")[0].id,
      };

      this.passerelleService.update(this.passerelle.id, data).subscribe(() => {
        this.loading = false;
        this.helper.toggleModal(`passerelle-edit-modal`);
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
