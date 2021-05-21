import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MembreGroupeService } from "src/app/explore/school/groupe/groupe-show/membre-groupe/membre-groupe.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TunelService } from "../../tunel.service";

@Component({
  selector: "app-participant-tunel-list",
  templateUrl: "./participant-tunel-list.component.html",
  styleUrls: ["./participant-tunel-list.component.scss"],
})
export class ParticipantTunelListComponent
  extends BaseComponent
  implements OnInit
{
  tunel: any;
  @Output() onChangerPrivilegeMembre = new EventEmitter();
  constructor(
    public membreGroupeService: MembreGroupeService,
    public tunelService: TunelService
  ) {
    super(membreGroupeService);
  }

  ngOnInit(): void {
    this._subscription["tunel"] = this.tunelService.singleData$.subscribe(
      (tunel) => {
        this.tunel = tunel;
        this.getData(tunel.id_groupe);
      }
    );
  }

  getData(groupeTunel: number) {
    this.loading = true;
    this.membreGroupeService.getByGroupe(groupeTunel).subscribe(() => {
      this.loading = false;
    });
  }

  changerPrivilege(membre: any) {
    this.membreGroupeService.singleData = membre;
    this.onChangerPrivilegeMembre.emit();
  }

  supprimer(membreship: number) {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.membreGroupeService.delete(membreship).subscribe(() => {
        this.loading = false;
      });
    });
  }
}
