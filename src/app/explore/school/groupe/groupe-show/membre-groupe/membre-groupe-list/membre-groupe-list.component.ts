import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { GroupeService } from "../../../groupe.service";
import { MembreGroupeService } from "../membre-groupe.service";

@Component({
  selector: "app-membre-groupe-list",
  templateUrl: "./membre-groupe-list.component.html",
  styleUrls: ["./membre-groupe-list.component.scss"],
})
export class MembreGroupeListComponent extends BaseComponent implements OnInit {
  constructor(
    public membreGroupeService: MembreGroupeService,
    public groupeService: GroupeService
  ) {
    super(membreGroupeService);
  }

  ngOnInit(): void {
    this._subscription["groupe"] = this.groupeService.singleData$.subscribe(
      (groupe) => {
        this.getData(groupe.id);
      }
    );
  }

  getData(groupe: number) {
    this.loading = true;
    this.membreGroupeService.getByGroupe(groupe).subscribe(() => {
      this.loading = false;
    });
  }
}
