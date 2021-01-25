import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { EtablissementService } from "../../../etablissement/etablissement.service";
import { UserService } from "../../../user/user.service";
import { FonctionService } from "../../fonction/fonction.service";
import { ProfilService } from "../profil.service";

@Component({
  selector: "app-profil-create",
  templateUrl: "./profil-create.component.html",
  styleUrls: ["./profil-create.component.scss"],
})
export class ProfilCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  dependancies = {
    fonction: [],
    personne: [],
    etablissement: [],
    hierarchie: [],
  };

  loadingDependancies = {
    fonction: false,
    personne: false,
    etablissement: false,
    hierarchie: false,
  };
  constructor(
    public profilService: ProfilService,
    public fonctionService: FonctionService,
    public etablissementService: EtablissementService,
    public userService: UserService
  ) {
    super(profilService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.getDependancies();

    this.initialiseForm();

    this._subscription["schema"] = this.profilService.schema$.subscribe(() => {
      this.initialiseForm();
    });
  }

  getDependancies() {
    // fonction
    this.getDependancie("fonction", this.fonctionService);

    // hierarchie

    // etablissement
    this.getDependancie("etablissement", this.etablissementService);

    // personne
    this.getDependancie("personne", this.userService);
  }

  initialiseForm() {
    this.initForm(
      ["fonction", "hierarchie", "personne", "etablissement"],
      [],
      () => {}
    );
  }

  getDependancie(dependancy: string, service: any) {
    this.loadingDependancies[dependancy] = true;
    service.get().subscribe(() => {
      this.loadingDependancies[dependancy] = false;
    });
  }

  onFonctionCreated(event: any) {
    console.log(event);
    this.fonctionService.unshiftItemInData(event.item);
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        fonction: this.formValue("fonction")[0].id,
        hierarchie: this.formValue("hierarchie")[0].id,
        personne: this.formValue("personne")[0].id_inscription,
        etablissement: this.formValue("etablissement")[0].id,
      };

      this.profilService.add(data).subscribe(() => {
        this.loading = false;
        this.initialiseForm();
        this.helper.toggleModal("profil-create-modal");
      });
    }
  }
}
