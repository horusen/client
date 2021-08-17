import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { UserService } from "src/app/zental/user/user.service";
import { MinistereService } from "../../ministere/ministere.service";
import { MinistreService } from "../ministre.service";

@Component({
  selector: "app-ministre-create",
  templateUrl: "./ministre-create.component.html",
  styleUrls: ["./ministre-create.component.scss"],
})
export class MinistreCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  actuelMinistre = false;
  dependancies = {
    users: [],
  };

  dependanciesLoading = {
    users: false,
  };

  constructor(
    public ministereService: MinistereService,
    public ministreService: MinistreService,
    public userService: UserService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(ministreService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    this.actuelMinistre = !!this.router.url.includes("actuel");

    super.ngOnInit();

    this.initialiseForm();

    this._subscription["ministere"] =
      this.ministereService.singleData$.subscribe((ministere) => {
        this.formValuePatcher("ministere", ministere.id);
      });

    this.getUsers();
  }

  initialiseForm(ministre?: any): void {
    this.form = this.fb.group({
      employe: [ministre ? [ministre?.employe] : null, Validators.required],
      poste: [1, Validators.required],
      debut: [
        ministre?.debut,
        { validators: [Validators.required], updateOn: "blur" },
      ],
      fin: [
        ministre?.fin,
        {
          updateOn: "blur",
          validators: this.actuelMinistre ? null : [Validators.required],
        },
      ],
      note: [ministre?.note],
      en_fonction: [this.actuelMinistre, Validators.required],
      ministere: [null, Validators.required],
    });

    this.formValueComparer(
      "debut",
      "fin",
      "verifiezLesDatesDeDebutEtDeFin",
      true
    );

    // Set if the ministre is the current one
    this.formValuePatcher("en_fonction", this.actuelMinistre);

    this.isFormOk = true;
  }

  getUsers(): void {
    this.dependanciesLoading.users = true;
    this.userService.getAll().subscribe((users) => {
      this.dependancies.users = users;
      this.dependanciesLoading.users = false;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign(this.form.value, {
        responsable: this.formValue("employe")[0].id_inscription,
      });
      this.ministreService.add(data).subscribe(() => {
        this.loading = false;
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
        this.helper.toggleModal("ministre-add-modal");
        this.initialiseForm();
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
