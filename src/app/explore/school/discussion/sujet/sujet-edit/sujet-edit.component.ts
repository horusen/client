import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseEditComponent } from "src/app/shared/components/base-component/base-edit.component";
import { DiscussionService } from "../../discussion.service";
import { SujetService } from "../sujet.service";

@Component({
  selector: "app-sujet-edit",
  templateUrl: "./sujet-edit.component.html",
  styleUrls: ["./sujet-edit.component.scss"],
})
export class SujetEditComponent extends BaseEditComponent implements OnInit {
  constructor(
    public sujetService: SujetService,
    public route: ActivatedRoute,
    public discussionService: DiscussionService
  ) {
    super(sujetService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["single"] = this.sujetService.singleData$.subscribe(
      (sujet) => {
        this.initFormWithData(
          sujet,
          ["libelle", "description", "etat"],
          [
            "id",
            "created_at",
            "updated_at",
            "deleted_at",
            "user",
            "dernirerReaction",
            "inscription",
            "etat",
          ]
        );
      }
    );
  }

  update() {
    if (this.form.valid) {
      this.loading = true;
      this.sujetService
        .update(this.single.id, this.form.value)
        .subscribe((sujet) => {
          this.loading = false;

          // On modifie les données dans le component discussion si la discussion actuelle tourne autour du sujet modifié
          if (this.discussionService.singleData.sujet.id === sujet.id) {
            this.discussionService.setFieldInSingleData("sujet", sujet);
          }
          this.helper.toggleModal("sujet-edit-modal");
        });
    } else {
      this.helper.alertDanger("Les champs rensignés sont incorrects");
    }
  }
}
