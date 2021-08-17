import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TokenStorage } from "src/app/shared/services/token-storage.service";
import { ConjointService } from "src/app/zental/conjoint/conjoint.service";
import { IdentiteService } from "src/app/zental/identite/identite.service";

@Component({
  selector: "app-conjoint-show",
  templateUrl: "./conjoint-show.component.html",
  styleUrls: ["./conjoint-show.component.scss"],
})
export class ConjointShowComponent extends BaseComponent implements OnInit {
  user: any;
  conjoint: any;
  @Output() delete = new EventEmitter();
  constructor(
    public conjointService: ConjointService,
    public identiteService: IdentiteService,
    public tokenStorage: TokenStorage
  ) {
    super(conjointService);
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        if (this.user?.id_inscription !== user.id_inscription)
          if (this.user?.id_inscription !== user.id_inscription)
            this.user = user;

        this.getConjoint();
      }
    );
  }

  getConjoint(): void {
    this.loading = true;
    this.conjointService
      .getByUser(this.user.id_inscription)
      .subscribe((conjoint) => {
        this.conjoint = conjoint;
        this.loading = false;
        console.log(conjoint);
        console.log(this.user);
      });
  }

  supprimer(): void {
    // demander une confirmation de la part du user
    this.helper.alertConfirmation(() => {
      // supprimer le conjoint et mettre à jour la variable conjoint
      this.conjointService.delete(this.conjoint.id).subscribe(() => {
        // Mettre à jour le champs situation matrimoniale pour le user dans identite-service
        this.identiteService.user = { ...this.user, situation_matrimoniale: 5 };

        this.delete.emit();

        // Si le user dans identite-service est le même user que le user connécté mettre
        // à le champs situation matrimonial de celui-ci depuis le local-storage
        if (this.user.id_inscription === this.auth.user.id_inscription) {
          this.tokenStorage.setUserField("situation_matrimoniale", 5);
        }
      });
    });
  }
}
