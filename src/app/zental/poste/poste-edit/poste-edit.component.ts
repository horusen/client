import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { ConsulatService } from "../../consulat/consulat.service";
import { DomaineInstitutionService } from "../../domaine-institution/domaine-institution.service";
import { DomaineService } from "../../domaine/domaine.service";
import { MinistereService } from "../../ministere/ministere.service";
import { PosteCreateComponent } from "../poste-create/poste-create.component";
import { PosteService } from "../poste.service";

@Component({
  selector: "app-poste-edit",
  templateUrl: "./poste-edit.component.html",
  styleUrls: ["./poste-edit.component.scss"],
})
export class PosteEditComponent extends PosteCreateComponent implements OnInit {
  poste: any;
  constructor(
    public posteService: PosteService,
    public domaineService: DomaineInstitutionService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public consulatService: ConsulatService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(
      posteService,
      domaineService,
      ministereService,
      ambassadeService,
      consulatService,
      router,
      route
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["poste"] = this.posteService.singleData$.subscribe(
      (poste) => {
        this.poste = poste;
        this.initialiseForm(poste);
        console.log(this.form.value);
        this.isFormOk = true;
      }
    );
  }

  update(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign({}, this.form.value, {
        domaine: this.formValue("domaine")[0].id,
      });

      this.posteService
        .update(this.poste.id, this.helper.serializeObject(data))
        .subscribe(() => {
          this.loading = false;
          this.router.navigate(["./"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve",
          });
          this.helper.toggleModal("poste-edit-modal");
        });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
