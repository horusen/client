import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { EleveService } from "../../eleve.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { UserService } from "../../user/user.service";
import { ParentEleveService } from "../parent-eleve.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LienParenteService } from "../../lien-parente/lien-parente.service";

@Component({
  selector: "app-parent-eleve-add",
  templateUrl: "./parent-eleve-add.component.html",
  styleUrls: ["./parent-eleve-add.component.scss"],
})
export class ParentEleveAddComponent
  extends BaseCreateComponent
  implements OnInit {
  dependancies = {
    users: [],
    eleves: [],
    lienParentes: [],
    elevesBackup: [], // permet d'eviter d'eliminer un user choisi comme parent dans la liste des potentiels eleves
  };

  dependanciesLoading = {
    users: false,
    lienParentes: false,
    eleves: false,
  };
  constructor(
    public userService: UserService,
    public eleveService: EleveService,
    public parentService: ParentEleveService,
    public etablissementService: EtablissementService,
    public router: Router,
    public route: ActivatedRoute,
    public lienParenteService: LienParenteService
  ) {
    super(parentService);
  }

  ngOnInit(): void {
    this.initialiseForm();
    this.getDependancies();
  }

  getDependancies() {
    this.getUsers();
    this.getLienParentes();

    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.getEleveByEtablissement(etablissement.id);
    });
  }

  getUsers() {
    this.dependanciesLoading.users = true;
    this.userService.get(false).subscribe((users) => {
      this.dependancies.users = users;
      this.dependanciesLoading.users = false;
    });
  }

  getLienParentes() {
    this.dependanciesLoading.lienParentes = true;
    this.lienParenteService.get(false).subscribe((liens) => {
      this.dependancies.lienParentes = liens;
      this.dependanciesLoading.lienParentes = false;
    });
  }

  getEleveByEtablissement(etablissement: number) {
    this.dependanciesLoading.eleves = true;
    this.eleveService.getByEtablissement(etablissement).subscribe((eleves) => {
      this.dependancies.eleves = eleves;
      this.dependancies.elevesBackup = eleves;
      this.dependanciesLoading.eleves = false;
    });
  }

  initialiseForm() {
    this.form = this.fb.group({
      eleves: [null, Validators.required],
      lien_parente: [null, Validators.required],
      parent: [null, Validators.required],
    });

    this.form.controls.parent.valueChanges.subscribe((parent) => {
      this.dependancies.eleves = this.dependancies.elevesBackup.filter(
        (eleve) => {
          return eleve.eleve != parent[0].id_inscription;
        }
      );
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        eleves: this.helper.idExtractor(this.formValue("eleves")),
        parent: this.formValue("parent")[0].id_inscription,
        lien_parente: this.formValue("lien_parente")[0].id,
      };

      this.parentService.add(data).subscribe(() => {
        this.loading = false;
        this.form.reset();
        this.router.navigate(["./"], { relativeTo: this.route });
        this.helper.toggleModal("parent-add-modal");
      });
    } else {
      this.formInvalidError();
    }
  }
}
