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
import { EleveService } from "../../eleve.service";

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
    eleves: [],
    periodes: [],
    elementsDAffectation: [
      { id: 1, libelle: "eleve" },
      { id: 2, libelle: "groupe" },
      { id: 3, libelle: "classe" },
    ],
  };

  public dependanciesLoading = {
    groupe: false,
    classe: false,
    cours: false,
    chapitre: false,
    tache: false,
    periode: false,
    eleve: false,
  };

  constructor(
    public tacheService: TacheService,
    public affectationTacheService: AffectationTacheService,
    public groupeService: GroupeService,
    public coursService: CoursService,
    public classeService: ClasseService,
    public chapitreService: ChapitreService,
    public etablissementService: EtablissementService,
    public periodeService: PeriodeService,
    public eleveService: EleveService
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

  getEleve(classe: number) {
    this.dependanciesLoading.eleve = true;
    this.eleveService.getByClasse(classe).subscribe((eleves) => {
      this.dependancies.eleves = eleves;
      this.dependanciesLoading.eleve = false;
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
      eleves: [this.groupe],
      classe: [this.classe],
      cours: [],
      periode: [[], Validators.required],
      chapitre: [this.chapitre, Validators.required],
      tache: [this.tache, Validators.required],
      debut: [null, Validators.required],
      fin: [null, Validators.required],
      affecterA: [
        [this.dependancies.elementsDAffectation[0]],
        Validators.required,
      ],
    });

    this.formValueComparer("debut", "fin", "verifierLesDates", true);

    this.form.controls.affecterA.valueChanges.subscribe((element) => {
      if (this.form.controls.classe.value) {
        if (element[0].libelle == "eleve") {
          this.getEleve(this.form.controls.classe.value[0].id);
        } else if (element[0].libelle == "groupe") {
          this.getGroupe(this.form.controls.classe.value[0].id);
        }
      }
    });

    this.form.controls.classe.valueChanges.subscribe((classe) => {
      this.getCours(classe[0].id);
      if (this.form.controls.affecterA.value[0].libelle == "groupe") {
        this.getGroupe(classe[0].id);
      } else if (this.form.controls.affecterA.value[0].libelle == "eleve") {
        this.getEleve(classe[0].id);
      }
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
      groupe:
        this.getFormValue("affecterA") == "groupe"
          ? this.getFormValue("groupe")
          : null,
      eleves:
        this.getFormValue("affecterA") == "eleve"
          ? this.helper.idExtractor(this.formValue("eleves"))
          : null,
      chapitre: this.getFormValue("chapitre"),
      tache: this.getFormValue("tache"),
      classe: this.getFormValue("classe"),
      periode: this.getFormValue("periode"),
      debut: this.form.controls.debut.value,
      fin: this.form.controls.fin.value,
    };

    this.affectationTacheService
      .add(this.helper.omitNullValueInObject(data))
      .subscribe((tache) => {
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
