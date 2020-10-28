import { Component, Input, OnInit } from "@angular/core";
import { GroupeService } from "src/app/explore/school/groupe/groupe.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TacheService } from "../../../tache.service";

@Component({
  selector: "app-groupe-tache-list",
  templateUrl: "./groupe-tache-list.component.html",
  styleUrls: ["./groupe-tache-list.component.scss"],
})
export class GroupeTacheListComponent extends BaseComponent implements OnInit {
  @Input() tache: any;
  constructor(
    public tacheService: TacheService,
    public groupeService: GroupeService
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    this._subscription["tache"] = this.tacheService.singleData$.subscribe(
      (tache) => {
        this.getData(tache.id);
      }
    );
  }

  getData(tache: number) {
    this.loading = true;
    this.groupeService.getByTache(tache).subscribe((data) => {
      this.data = data;
      this.loading = false;
    });
  }
}
