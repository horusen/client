import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { IdentiteService } from "src/app/zental/identite/identite.service";
import { RelationFamilialeService } from "src/app/zental/relation-familiale/relation-familiale.service";

@Component({
  selector: "app-enfant-list",
  templateUrl: "./enfant-list.component.html",
  styleUrls: ["./enfant-list.component.scss"],
})
export class EnfantListComponent extends BaseComponent implements OnInit {
  user: any;
  constructor(
    public relationFamilialeService: RelationFamilialeService,
    public identiteService: IdentiteService
  ) {
    super(relationFamilialeService);
  }

  ngOnInit(): void {
    this.identiteService.user$.subscribe((user) => {
      if (this.user?.id_inscription !== user.id_inscription) {
        this.user = user;
        this.getData(user.id_inscription);
      }
    });

    this.relationFamilialeService.lastItemcreated$.subscribe((relation) => {
      if (relation.type.libelle === "enfant") {
        this.data.unshift(relation);
      }
    });
  }

  getData(user: number): void {
    this.loading = true;
    this.relationFamilialeService
      .getByUserByTypeList(user, "enfant")
      .subscribe((response) => {
        this.data = response;
        this.loading = false;
      });
  }

  supprimer(id: number): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.relationFamilialeService.delete(id).subscribe(() => {
        this.data = this.data.filter((relation) => relation.id !== id);
        this.loading = false;
        this.helper.alertSuccess();
      });
    });
  }
}
