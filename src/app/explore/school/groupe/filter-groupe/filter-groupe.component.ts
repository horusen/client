import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseCreateComponent } from 'src/app/shared/components/base-component/base-create.component';
import { Helper } from 'src/app/shared/services/helper';
import { ConfidentialiteService } from '../../confidentialite/confidentialite.service';
import { DomaineService } from '../../domaine/domaine.service';
import { EtablissementService } from '../../etablissement/etablissement.service';
import { GroupeService } from '../groupe.service';

@Component({
  selector: 'app-filter-groupe',
  templateUrl: './filter-groupe.component.html',
  styleUrls: ['./filter-groupe.component.scss']
})
export class FilterGroupeComponent extends BaseCreateComponent implements OnInit {
  form: FormGroup;
  urlFilter: string = '';
  public dependancies = {
    domaines: [],
    etablissements: [],
    confidentialites: [],
    operateurs: ['superieurA', 'inferieurA', 'egalA']
  }

  dependanciesLoading = {
    domaines: false,
    confidentialites: false,
    etablissements: false
  }
  constructor(public groupeService: GroupeService, public router: Router, public etablissementService: EtablissementService, public domaineService: DomaineService, public confidentialiteService: ConfidentialiteService, public helper: Helper, public route: ActivatedRoute) {
    super(groupeService);
  }

  ngOnInit(): void {
    this.initialiseForm();
    this.resetUrlFilter();
    this.router.navigateByUrl(this.urlFilter);
    this.getConfidentialites();
  }

  initialiseForm() {
    this.form = this.fb.group({
      domaines: [[]],
      confidentialites: [[]],
      membres: [[]],
      etablissements: [[]],
      operateur: [],
      nombre_membres: []
    });


    this.form.controls.nombre_membres.valueChanges.subscribe((nombre) => {
      if (parseInt(nombre) && nombre < 0) {
        this.helper.alertDanger();
        this.formValuePatcher('nombre_membres', 0);
      }

      if (!this.formValue('operateur')) {
        this.formValuePatcher('operateur', this.dependancies.operateurs[2])
      }
    })
  }

  resetUrlFilter() {
    this.urlFilter = this.router.url.split('?')[0];
  }

  getConfidentialites() {
    this.dependanciesLoading.confidentialites = true;
    this.confidentialiteService.get().subscribe(confidentialites => {
      this.dependancies.confidentialites = confidentialites;
      this.dependanciesLoading.confidentialites = false;
    })
  }

  getEtablissements() {
    if (!this.dependancies.etablissements.length) {
      this.dependanciesLoading.etablissements = true;
      this.etablissementService.get(false).subscribe(etablissements => {
        this.dependancies.etablissements = etablissements;
        this.dependanciesLoading.etablissements = false;
      })
    }
  }

  selectFormHandler(target: string, data: any) {
    this.form.controls[target].patchValue(data);
  }

  getDomaines() {
    if (!this.dependancies.domaines.length) {
      this.dependanciesLoading.domaines = true;
      this.domaineService.get(false).subscribe(domaines => {
        this.dependancies.domaines = domaines;
        this.dependanciesLoading.domaines = false;
      })
    }
  }


  resetFilter() {
    this.initialiseForm();
    this.resetUrlFilter();
    this.router.navigateByUrl(this.urlFilter);
  }




  applyfilter() {
    let queryParams = {
      domaines: this.helper.idExtractor(this.form.controls.domaines.value),
      confidentialite: this.form.controls.confidentialites.value[0]?.id,
      etablissements: this.helper.idExtractor(this.form.controls.etablissements.value),
      membres: this.form.controls.nombre_membres.value ? [this.form.controls.operateur.value, this.form.controls.nombre_membres.value] : []
    }

    this.urlFilter += `?${this.helper.convertObjectToQueryParamsUrl(queryParams)}`
    this.router.navigateByUrl(this.urlFilter);
    this.resetUrlFilter();

  }

}
