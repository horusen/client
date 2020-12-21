import { GroupeService } from "src/app/explore/school/groupe/groupe.service";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { MembreGroupeService } from "../membre-groupe.service";

@Component({
  selector: "app-membre-groupe-solo",
  templateUrl: "./membre-groupe-solo.component.html",
  styleUrls: ["./membre-groupe-solo.component.scss"],
})
export class MembreGroupeSoloComponent extends BaseComponent implements OnInit {
  @Input() membership: any;
  groupe: any;
  constructor(
    public groupeService: GroupeService,
    public membreGroupeService: MembreGroupeService
  ) {
    super(membreGroupeService);
  }

  ngOnInit(): void {
    this._subscription["groupe"] = this.groupeService.singleData$.subscribe(
      (groupe) => {
        this.groupe = groupe;
      }
    );
  }

  supprimer() {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.membreGroupeService
        .deleteMembre(this.groupe.id, this.membership.membre_details.id)
        .subscribe(() => {
          this.loading = false;
        });
    });
  }

  changerPrivilege() {
    this.membreGroupeService.singleData = this.membership;
    this.helper.toggleModal("privilege-modal");
  }
}
