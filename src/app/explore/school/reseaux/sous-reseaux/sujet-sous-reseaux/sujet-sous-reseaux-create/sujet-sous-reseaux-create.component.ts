import { SousDomaineService } from "./../../../../sous-domaine/sous-domaine.service";
import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { SujetSousReseauxService } from "../sujet-sous-reseaux.service";

@Component({
  selector: "app-sujet-sous-reseaux-create",
  templateUrl: "./sujet-sous-reseaux-create.component.html",
  styleUrls: ["./sujet-sous-reseaux-create.component.scss"],
})
export class SujetSousReseauxCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  constructor(
    public sujetService: SujetSousReseauxService,
    public sousDomaineService: SousDomaineService
  ) {
    super(sujetService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.initialiseForm();

    this._subscription[
      "sous_domaine"
    ] = this.sousDomaineService.singleData$.subscribe((sousDomaine) => {
      this.valuePatcher("sous_domaine", sousDomaine.id);
    });
  }

  initialiseForm() {
    this.form = this.fb.group({
      sous_domaine: [null, Validators.required],
      libelle: [null, Validators.required],
      description: [],
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      this.sujetService.add(this.form.value).subscribe(() => {
        this.loading = false;
        this.helper.toggleModal("sujet-reseaux-create-modal");
      });
    }
  }
}
