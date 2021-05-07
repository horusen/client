import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-mes-groupes-independants",
  templateUrl: "./mes-groupes-independants.component.html",
  styleUrls: ["./mes-groupes-independants.component.scss"],
})
export class MesGroupesIndependantsComponent
  extends BaseComponent
  implements OnInit {
  constructor(public groupeService: GroupeService) {
    super(groupeService);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.groupeService
      .getGroupeIndependantByUserAsMembre()
      .subscribe((groupes) => {
        this.data = groupes;
        this.loading = false;
      });
  }
}
