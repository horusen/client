import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AffectationTacheService } from "../../affectation-tache/affectation-tache.service";

@Component({
  selector: "app-suivie-tache-list",
  templateUrl: "./suivie-tache-list.component.html",
  styleUrls: ["./suivie-tache-list.component.scss"],
})
export class SuivieTacheListComponent extends BaseComponent implements OnInit {
  @Output() showAffectationTacheCreate = new EventEmitter();
  constructor(
    public affectationTacheService: AffectationTacheService,
    public route: ActivatedRoute
  ) {
    super(affectationTacheService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(this.helper.urlParamsToObject(params));
    });
  }

  getData(filtre: {}) {
    this.loading = true;
    this.affectationTacheService
      .getTacheAssigneParUser(filtre)
      .subscribe(() => {
        this.loading = false;
      });
  }

  showAffectationTacheCreateComponent() {
    this.showAffectationTacheCreate.emit();
    this.helper.toggleModal("affectation-tache-create-modal");
  }
}
