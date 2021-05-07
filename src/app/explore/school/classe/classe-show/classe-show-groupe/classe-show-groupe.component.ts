import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { GroupeService } from "../../../groupe/groupe.service";
import { ClasseService } from "../../classe.service";

@Component({
  selector: "app-classe-show-groupe",
  templateUrl: "./classe-show-groupe.component.html",
  styleUrls: ["./classe-show-groupe.component.scss"],
})
export class ClasseShowGroupeComponent extends BaseComponent implements OnInit {
  constructor(
    public classeService: ClasseService,
    public groupeService: GroupeService
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    this._subscription["classe"] = this.classeService.singleData$.subscribe(
      (classe) => {
        this.getData(classe.id);
      }
    );
  }

  getData(classe: number) {
    this.loading = true;
    this.groupeService.getByClasse(classe).subscribe(() => {
      this.loading = false;
    });
  }
}
