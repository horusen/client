import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { UserService } from "../../../../user/user.service";
import { ChargerCommunicationEtablissementService } from "../charger-communication-etablissement.service";
import { EtablissementService } from "../../../etablissement.service";

@Component({
  selector: "app-charger-commnunication-etablissement-add",
  templateUrl: "./charger-commnunication-etablissement-add.component.html",
  styleUrls: ["./charger-commnunication-etablissement-add.component.scss"],
})
export class ChargerCommnunicationEtablissementAddComponent
  extends BaseCreateComponent
  implements OnInit {
  etablissement: any;
  getNonChargerComLoading: boolean = false;
  nonChargerCom: any = [];

  constructor(
    public chargerComService: ChargerCommunicationEtablissementService,
    public userService: UserService,
    public etablissementService: EtablissementService
  ) {
    super(chargerComService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    super.ngOnInit();

    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.initialiseForm(etablissement.id);
      this.getNonChargerCom(etablissement.id);
    });

    this._subscription[
      "lastItemDeleted"
    ] = this.chargerComService.lastItemDeleted$.subscribe((item) => {
      this.nonChargerCom.unshift(item.chargerCom_details);
    });
  }

  initialiseForm(etablissement: number) {
    this.form = this.fb.group({
      chargerComs: [[], Validators.required],
      etablissement: [etablissement, Validators.required],
    });

    this.isFormOk = true;
  }

  getNonChargerCom(etablissement: number) {
    this.getNonChargerComLoading = true;
    this.userService
      .getNonChargerComOnEtablissement(etablissement)
      .subscribe((users) => {
        this.nonChargerCom = users;
        this.getNonChargerComLoading = false;
      });
  }

  create() {
    this.loading = true;
    const data = {
      charger_coms: this.helper.idExtractor(
        this.formValue("chargerComs"),
        "id_inscription"
      ),
      ...this.helper.omitFieldInObject(this.form.value, ["chargerComs"]),
    };

    this.chargerComService.add(data).subscribe((chargerComs) => {
      this.loading = false;

      // Delete new ChargerComs in Non chargerComs array
      const chargerComIDs = chargerComs.map(
        (chargerCom) => chargerCom.charger_com_details.id_inscription
      );
      this.nonChargerCom = this.nonChargerCom.filter((item) =>
        chargerComIDs.includes(item.id_inscription)
      );
      this.helper.toastSuccess();
      this.formValuePatcher("chargerComs", []);
      this.helper.toggleModal("charger-com-etablissement-add-modal");
    });
  }
}
