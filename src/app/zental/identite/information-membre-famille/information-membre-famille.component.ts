import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { UserService } from "src/app/zental/user/user.service";
import { RelationFamilialeService } from "../../relation-familiale/relation-familiale.service";

@Component({
  selector: "app-information-membre-famille",
  templateUrl: "./information-membre-famille.component.html",
  styleUrls: ["./information-membre-famille.component.scss"],
})
export class InformationMembreFamilleComponent
  extends BaseComponent
  implements OnInit
{
  @Input() user: any;
  @Input() typeMembreFamille: any;
  relationFamiliale: any;
  @Output() create = new EventEmitter();
  constructor(
    public userService: UserService,
    public relationFamilialeService: RelationFamilialeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getMembreFamille();

    this._subscription["famille"] =
      this.relationFamilialeService.lastItemcreated$.subscribe(
        (membreFamille) => {
          if (membreFamille.type?.libelle === this.typeMembreFamille) {
            this.relationFamiliale = membreFamille;
          }
        }
      );
  }

  getMembreFamille(): void {
    this.loading = true;
    this.relationFamilialeService
      .getByUserByType(this.user.id_inscription, this.typeMembreFamille)
      .subscribe((response) => {
        this.relationFamiliale = response;
        this.loading = false;
      });
  }

  supprimer() {
    this.helper.alertConfirmation(() => {
      this.relationFamilialeService
        .delete(this.relationFamiliale.id)
        .subscribe(() => {
          this.relationFamiliale = null;
        });
    });
  }
}
