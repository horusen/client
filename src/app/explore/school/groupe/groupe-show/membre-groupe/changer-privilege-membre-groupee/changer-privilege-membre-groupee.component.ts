import { MembreGroupeService } from "./../membre-groupe.service";
import { Component, OnInit } from "@angular/core";
import { BaseEditComponent } from "src/app/shared/components/base-component/base-edit.component";
import { TypeMembreGroupeService } from "../type-membre-groupe/type-membre-groupe.service";

@Component({
  selector: "app-changer-privilege-membre-groupee",
  templateUrl: "./changer-privilege-membre-groupee.component.html",
  styleUrls: ["./changer-privilege-membre-groupee.component.scss"],
})
export class ChangerPrivilegeMembreGroupeeComponent
  extends BaseEditComponent
  implements OnInit {
  getPrivilegesLoading: boolean = false;
  constructor(
    public membreGroupeService: MembreGroupeService,
    public typeMembreGroupeService: TypeMembreGroupeService
  ) {
    super(membreGroupeService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getPrivileges();
  }

  getPrivileges() {
    if (!this.typeMembreGroupeService.data.length) {
      this.getPrivilegesLoading = true;
      this.typeMembreGroupeService.get().subscribe(() => {
        this.getPrivilegesLoading = false;
      });
    }
  }

  changerPrivilege(type_membre: number) {
    this.loading = true;
    this.membreGroupeService
      .changerPrivilege(this.single.id, type_membre)
      .subscribe(() => {
        this.loading = false;
      });
  }
}
