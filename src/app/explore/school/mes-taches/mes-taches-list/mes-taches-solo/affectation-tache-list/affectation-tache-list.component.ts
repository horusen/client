import { Component, Input, OnInit } from "@angular/core";
import { AffecterTacheService } from "src/app/explore/school/shared-school/affecter-tache/affecter-tache.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-affectation-tache-list",
  templateUrl: "./affectation-tache-list.component.html",
  styleUrls: ["./affectation-tache-list.component.scss"],
})
export class AffectationTacheListComponent
  extends BaseComponent
  implements OnInit {
  @Input() tache: any;
  constructor(public affecterService: AffecterTacheService) {
    super(affecterService);
  }

  ngOnInit(): void {
    this.get(this.tache.id);
  }

  get(tache: number) {
    this.loading = true;
    this.affecterService.getByUserTache(tache).subscribe(() => {
      this.loading = false;
    });
  }
}
