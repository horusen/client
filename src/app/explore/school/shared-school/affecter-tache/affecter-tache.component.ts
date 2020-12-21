import { Validators } from "@angular/forms";
import { Component, Input, OnInit, Output } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { ChapitreService } from "../../chapitre/chapitre.service";
import { ClasseService } from "../../classe/classe.service";
import { CoursService } from "../../cours/cours.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { GroupeService } from "../../groupe/groupe.service";
import { TacheService } from "../../tache/tache.service";
import { PeriodeService } from "../../periode/periode.service";
import { EventEmitter } from "events";
import { AffectationTacheService } from "../../tache/affectation-tache/affectation-tache.service";

@Component({
  selector: "app-affecter-tache",
  templateUrl: "./affecter-tache.component.html",
  styleUrls: ["./affecter-tache.component.scss"],
})
export class AffecterTacheComponent
  extends BaseCreateComponent
  implements OnInit {
  @Input() groupe: number;
  @Input() classe: number;
  @Input() chapitre: number;
  @Input() tache: number;

  @Output() done = new EventEmitter(); // Emet un evenement aprés une afffectation

  public dependancies = {
    groupes: [],
    classes: [],
    cours: [],
    chapitres: [],
    taches: [],
    periodes: [],
  };

  public dependanciesLoading = {
    groupe: false,
    classe: false,
    cours: false,
    chapitre: false,
    tache: false,
    periode: false,
  };

  constructor(
    public tacheService: TacheService,
    public affectationTacheService: AffectationTacheService,
    public groupeService: GroupeService,
    public coursService: CoursService,
    public classeService: ClasseService,
    public chapitreService: ChapitreService,
    public etablissementService: EtablissementService,
    public periodeService: PeriodeService
  ) {
    super(tacheService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    super.ngOnInit();

    this.initialiseForm();
    this.getData();
  }

  getTache(groupe: number) {
    this.dependanciesLoading.tache = true;
    this.tacheService.getTacheNonAffecteAuGroupe(groupe).subscribe((taches) => {
      this.dependancies.taches = taches;
      this.dependanciesLoading.tache = false;
    });
  }

  getPeriode() {
    this.dependanciesLoading.periode = true;
    this.periodeService.get().subscribe((periodes) => {
      this.dependancies.periodes = periodes;
      this.dependanciesLoading.periode = false;
    });
  }

  getGroupe(classe: number) {
    this.dependanciesLoading.groupe = true;
    this.groupeService.getByClasse(classe).subscribe((groupes) => {
      this.dependancies.groupes = groupes;
      this.dependanciesLoading.groupe = false;
    });
  }

  getClasse() {
    this.dependanciesLoading.classe = true;
    this.classeService
      .getByEtablissement(this.etablissementService.etablissement.id)
      .subscribe((classes) => {
        this.dependancies.classes = classes;
        this.dependanciesLoading.classe = false;
      });
  }

  getCours(classe: number) {
    this.dependanciesLoading.cours = true;
    this.coursService.getByClasse(classe).subscribe((cours) => {
      this.dependancies.cours = cours;
      this.dependanciesLoading.cours = false;
    });
  }

  getChapitre(chapitre: number) {
    this.dependanciesLoading.chapitre = true;
    this.chapitreService.getByCours(chapitre).subscribe((chapitres) => {
      this.dependancies.chapitres = chapitres;
      this.dependanciesLoading.chapitre = false;
    });
  }

  initialiseForm() {
    this.form = this.fb.group({
      groupe: [this.groupe],
      classe: [this.classe],
      cours: [],
      periode: [[], Validators.required],
      chapitre: [this.chapitre, Validators.required],
      tache: [this.tache, Validators.required],
      debut: [null, Validators.required],
      fin: [null, Validators.required],
    });

    this.formValueComparer("debut", "fin", "verifierLesDates", true);

    this.form.controls.classe.valueChanges.subscribe((classe) => {
      this.getCours(classe[0].id);
      this.getGroupe(classe[0].id);
    });

    this.form.controls.groupe.valueChanges.subscribe((groupe) => {
      this.getTache(groupe[0].id);
    });

    this.form.controls.cours.valueChanges.subscribe((cours) => {
      this.getChapitre(cours[0].id);
    });

    this.isFormOk = true;
  }

  getData() {
    if (!this.groupe && !this.classe) {
      this.getClasse();
    }

    if (this.classe) {
      this.getCours(this.classe);
    }

    if (this.groupe) {
      this.getTache(this.groupe);
    }

    this.getPeriode();
  }

  getFormValue(field: string) {
    return this[field]
      ? this[field]
      : this.form.controls[field].value
      ? this.form.controls[field].value[0].id
      : null;
  }

  affecter() {
    this.loading = true;
    const data = {
      groupe: this.getFormValue("groupe"),
      chapitre: this.getFormValue("chapitre"),
      tache: this.getFormValue("tache"),
      classe: this.getFormValue("classe"),
      periode: this.getFormValue("periode"),
      debut: this.form.controls.debut.value,
      fin: this.form.controls.fin.value,
    };

    this.affectationTacheService.add(data).subscribe((tache) => {
      // On supprime la tache nouvelle affécté de la liste des taches qui peuvent
      // être affecté à ce groupe
      this.dependancies.taches = this.dependancies.taches.filter(
        (item) => item.id != tache.id
      );

      this.loading = false;
      this.initialiseForm();
      this.helper.alertSuccess();
    });
  }
}
