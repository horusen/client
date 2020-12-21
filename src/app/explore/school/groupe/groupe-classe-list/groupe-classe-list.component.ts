import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ClasseService } from "../../classe/classe.service";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-classe-list",
  templateUrl: "./groupe-classe-list.component.html",
  styleUrls: ["./groupe-classe-list.component.scss"],
})
export class GroupeClasseListComponent extends BaseComponent implements OnInit {
  classe: any;
  constructor(
    public groupeService: GroupeService,
    public classeService: ClasseService
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    this._subscription["classe"] = this.classeService.singleData$.subscribe(
      (classe) => {
        this.classe = classe;
        this.getData(classe.id);
      }
    );
  }

  getData(classe: number) {
    this.loading = true;
    this.groupeService.getGroupeByClasse(classe).subscribe(() => {
      this.loading = false;
    });
  }

  select(groupe: any) {}
}
