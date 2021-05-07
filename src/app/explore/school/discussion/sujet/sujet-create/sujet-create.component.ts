import { Component, Input, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { GroupeService } from "../../../groupe/groupe.service";
import { SousDomaineService } from "../../../sous-domaine/sous-domaine.service";
import { SujetService } from "../sujet.service";

@Component({
  selector: "app-sujet-create",
  templateUrl: "./sujet-create.component.html",
  styleUrls: ["./sujet-create.component.scss"],
})
export class SujetCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  type: string;
  constructor(
    public sujetService: SujetService,
    public groupeService: GroupeService,
    public sousDomaineService: SousDomaineService,
    public router: Router
  ) {
    super(sujetService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    super.ngOnInit();

    this.initialiseForm();

    if (this.router.url.match(/.groupe./)) {
      this._subscription["groupe"] = this.groupeService.singleData$.subscribe(
        (groupe) => {
          this.addControl("groupe", groupe.id, true);
        }
      );
    } else if (this.router.url.match(/.reseaux./)) {
      this._subscription[
        "sous-reseau"
      ] = this.sousDomaineService.singleData$.subscribe((sousDomaine) => {
        if (sousDomaine) {
          this.addControl("sous_reseau", sousDomaine.id, true);
        }
      });
    }
  }

  initialiseForm() {
    this.form = this.fb.group({
      libelle: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      this.sujetService.add(this.form.value).subscribe(() => {
        this.loading = false;
        this.valuesPatcher(["libelle", "description"], ["", ""]);
        this.helper.toggleModal("sujet-create-modal");
      });
    } else {
      this.helper.alertDanger("Les champs rensignés sont incorrects");
    }
  }
}
