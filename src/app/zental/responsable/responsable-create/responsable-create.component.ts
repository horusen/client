import { Component, Input, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { UserService } from "src/app/zental/user/user.service";
import { ResponsableService } from "../responsable.service";

@Component({
  selector: "app-responsable-create",
  templateUrl: "./responsable-create.component.html",
  styleUrls: ["./responsable-create.component.scss"],
})
export class ResponsableCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() parent: { name: string; entiteDiplomatique: any };
  actuelResponsable = false;
  dependancies = {
    users: [],
  };

  dependanciesLoading = {
    users: false,
  };

  constructor(
    public responsableService: ResponsableService,
    public userService: UserService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(responsableService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    this.actuelResponsable = !!this.router.url.includes("actuel");

    super.ngOnInit();

    this.initialiseForm();

    this.getUsers();
  }

  getPosteFieldValue(): number {
    if (this.parent.name === "ministre") return 1;
    else if (this.parent.name === "ambassadeur") return 2;
    else if (this.parent.name === "consul") return 3;
  }

  getInstitutionName(): string {
    if (this.parent.name === "ministre") return "ministere";
    else if (this.parent.name === "ambassadeur") return "ambassade";
    else if (this.parent.name === "consul") return "consulat";
  }

  initialiseForm(responsable?: any): void {
    this.form = this.fb.group({
      employe: [
        responsable ? [responsable?.employe] : null,
        Validators.required,
      ],
      poste: [this.getPosteFieldValue(), Validators.required],
      debut: [
        responsable?.debut,
        { validators: [Validators.required], updateOn: "blur" },
      ],
      fin: [
        responsable?.fin,
        {
          updateOn: "blur",
          validators: this.actuelResponsable ? null : [Validators.required],
        },
      ],
      note: [responsable?.note],
      en_fonction: [this.actuelResponsable, Validators.required],
      [this.getInstitutionName()]: [this.parent.entiteDiplomatique.id],
    });

    this.formValueComparer(
      "debut",
      "fin",
      "verifiezLesDatesDeDebutEtDeFin",
      true
    );

    // Set if the ministre is the current one
    this.formValuePatcher("en_fonction", this.actuelResponsable);

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
      this.responsableService.add(data).subscribe(() => {
        this.loading = false;
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
        this.helper.toggleModal(this.parent.name + "-add-modal");
        this.initialiseForm();
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
