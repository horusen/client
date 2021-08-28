import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { BaseService } from "src/app/shared/services/base.service";
import { PaysService } from "src/app/zental/pays/pays.service";

@Component({
  selector: "app-entite-diplomatique-create",
  templateUrl: "./entite-diplomatique-create.component.html",
  styleUrls: ["./entite-diplomatique-create.component.scss"],
})
export class EntiteDiplomatiqueCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() parent: ParentDefinition;
  pays: any[] = [];
  paysLoading = false;
  // element: string; // Obligatoire: A specifier dans le contructeur

  constructor(
    public service: BaseService,
    public paysService: PaysService,
    public router: Router,
    public route: ActivatedRoute,
    @Inject(String) public element: string
  ) {
    super(service);
  }

  ngOnInit(): void {
    this.initialiseForm();

    this.getPays();
  }

  initialiseForm(item?: any): void {
    this.form = this.fb.group({
      libelle: [item?.entite_diplomatique?.libelle, Validators.required],
      histoire: [item?.entite_diplomatique?.histoire],
      site_web: [item?.entite_diplomatique?.site_web],
      boite_postale: [item?.entite_diplomatique?.boite_postale],
      date_creation: [item?.entite_diplomatique?.date_creation],
      tel1: [item?.entite_diplomatique?.tel1],
      tel2: [item?.entite_diplomatique?.tel2],
      mail: [item?.entite_diplomatique?.mail],
      pays_origine: [
        item?.entite_diplomatique?.pays_origine,
        Validators.required,
      ],
      pays_siege: [
        item?.entite_diplomatique?.pays_siege
          ? [item?.entite_diplomatique?.pays_siege]
          : null,
        Validators.required,
      ],
    });

    if (this.parent && this.parent.name !== "admin") {
      this.addControl(this.parent.name, this.parent.item.id);
      this.formValuePatcher(
        "pays_origine",
        this.parent.item.entite_diplomatique.pays_origine.id
      );
    }

    this.isFormOk = true;
  }

  getPays(): void {
    this.paysLoading = true;
    this.paysService.getAll(false).subscribe((pays) => {
      this.pays = pays;
      this.paysLoading = false;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        pays_siege: this.formValue("pays_siege")[0].id,
      };

      this.service.add(data).subscribe(() => {
        this.loading = false;
        this.initialiseForm();
        this.helper.toggleModal(`${this.element}-create-modal`);
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
