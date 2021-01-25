import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AffectationTacheService } from "../../../tache/affectation-tache/affectation-tache.service";
import { ClasseService } from "../../classe.service";

@Component({
  selector: "app-tache-list-by-classe",
  templateUrl: "./tache-list-by-classe.component.html",
  styleUrls: ["./tache-list-by-classe.component.scss"],
})
export class TacheListByClasseComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public affectationTacheService: AffectationTacheService,
    public classeService: ClasseService,
    public router: Router
  ) {
    super(affectationTacheService);
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.loading = true;
    this.affectationTacheService.get().subscribe((data) => {
      this.data = data;
      this.loading = false;
    });
  }

  navigateTotache(tache: number) {
    this.helper.toggleModal("classe-show-modal");
    this.router.navigate(["/", "school", "tache", tache]);
  }
}
