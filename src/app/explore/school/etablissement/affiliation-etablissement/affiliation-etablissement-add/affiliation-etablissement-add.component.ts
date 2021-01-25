import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { EtablissementService } from "../../etablissement.service";
import { TypeEtablissementService } from "../../type-etablissement/type-etablissement.service";
import { AffiliationEtablissementService } from "../affiliation-etablissement.service";

@Component({
  selector: "app-affiliation-etablissement-add",
  templateUrl: "./affiliation-etablissement-add.component.html",
  styleUrls: ["./affiliation-etablissement-add.component.scss"],
})
export class AffiliationEtablissementAddComponent
  extends BaseCreateComponent
  implements OnInit {
  dependancies = {
    etablissements: [],
    typeEtablissements: [],
  };

  dependanciesLoading = {
    etablissement: false,
    typeEtablissement: false,
  };
  constructor(
    public affiliationService: AffiliationEtablissementService,
    public etablissementService: EtablissementService,
    public typeEtablissementService: TypeEtablissementService
  ) {
    super(affiliationService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    super.ngOnInit();

    this.initialiseForm();

    this.getTypeEtablissement();
  }

  onSelectedTypeEtablissement(type: any) {
    this.getEtablissementsNonAffiliesByType(type.id);
  }

  initialiseForm() {
    this.form = this.fb.group({
      typeEtablissement: [],
      etablissement1: [
        this.etablissementService.etablissement.id,
        Validators.required,
      ],
      etablissement2: [null, Validators.required],
    });

    this.isFormOk = true;
  }

  getEtablissementsNonAffiliesByType(type: number) {
    this.dependanciesLoading.etablissement = true;
    this.etablissementService
      .getEtablissementsNonAffiliesByTypeLocally(type)
      .subscribe((data) => {
        this.dependancies.etablissements = data;
        this.dependanciesLoading.etablissement = false;
      });
  }

  getTypeEtablissement() {
    this.dependanciesLoading.typeEtablissement = true;
    this.typeEtablissementService.get().subscribe((data) => {
      this.dependancies.typeEtablissements = data;
      this.dependanciesLoading.typeEtablissement = false;
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        etablissement1: this.etablissementService.etablissement.id,
        etablissement2: this.form.controls.etablissement2.value[0].id,
      };

      this.affiliationService.add(data).subscribe(() => {
        this.loading = false;
        this.initialiseForm();
        this.helper.toggleModal("affiliation-add-modal");
      });
    }
  }
}
