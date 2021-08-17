import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { UserService } from "src/app/zental/user/user.service";
import { FonctionService } from "src/app/zental/fonction/fonction.service";
import { PosteService } from "src/app/zental/poste/poste.service";
import { MinistreService } from "../../ministre.service";
import { MembreCabinetMinistreService } from "../membre-cabinet-ministre.service";

@Component({
  selector: "app-membre-cabinet-ministre-create",
  templateUrl: "./membre-cabinet-ministre-create.component.html",
  styleUrls: ["./membre-cabinet-ministre-create.component.scss"],
})
export class MembreCabinetMinistreCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  ministre: any;

  dependancies = {
    users: [],
    postes: [],
    fonctions: [],
  };

  dependanciesLoading = {
    users: false,
    postes: false,
    fonctions: false,
  };

  constructor(
    public membreCabinetService: MembreCabinetMinistreService,
    public userService: UserService,
    public posteService: PosteService,
    public fonctionService: FonctionService,
    public ministreService: MinistreService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(membreCabinetService);
  }

  ngOnInit(): void {
    this._subscription["ministre"] = this.ministreService.singleData$.subscribe(
      (ministre) => {
        this.ministre = ministre;
      }
    );

    this.form = this.initialiseForm();

    this.getDependancies();

    this._subscription["poste"] = this.posteService.lastItemcreated$.subscribe(
      (poste) => {
        this.dependancies.postes.unshift(poste);
      }
    );
  }

  initialiseForm(membreCabinet?: any): FormGroup {
    return this.fb.group({
      membre: [
        membreCabinet ? [membreCabinet?.membre] : [],
        Validators.required,
      ],
      poste: [
        membreCabinet?.poste ? [membreCabinet?.poste] : [],
        Validators.required,
      ],
      fonction: [
        membreCabinet?.fonction ? [membreCabinet?.fonction] : [],
        Validators.required,
      ],
      ministre: [membreCabinet?.ministre || this.ministre.id],
    });
  }

  getDependancies(): void {
    this.getUsers();
    this.getFonctions();
    this.getPostes();
  }

  getFonctions(): void {
    this.dependanciesLoading.fonctions = true;
    this.fonctionService.getAll(false).subscribe((fonctions) => {
      this.dependancies.fonctions = fonctions;
      this.dependanciesLoading.fonctions = false;
    });
  }

  getUsers(): void {
    // this.dependanciesLoading.users = true;
    // this.userService
    //   .getNonMembresCabinetMinistre(this.ministre.id)
    //   .subscribe((users) => {
    //     this.dependancies.users = users;
    //     this.dependanciesLoading.users = false;
    //   });
  }

  getPostes(): void {
    this.dependanciesLoading.postes = true;
    this.posteService.getAll(false).subscribe((postes) => {
      this.dependancies.postes = postes;
      this.dependanciesLoading.postes = false;
    });
  }

  onNewItemCreated(event: { name: string; item: any }): void {
    this.dependancies[event.name].unshift(event.item);
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign(this.form.value, {
        poste: this.formValue("poste")[0]?.id,
        membre: this.formValue("membre")[0]?.id_inscription,
        fonction: this.formValue("fonction")[0]?.id,
      });

      this.membreCabinetService.add(data).subscribe(() => {
        this.loading = false;
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
        this.helper.toggleModal("membre-cabinet-add-modal");
        this.form = this.initialiseForm();

        // Remove selected membre from users who not members in the cabinet of ministre
        this.dependancies.users = this.dependancies.users.filter(
          (user) => user.id != data.membre
        );
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
