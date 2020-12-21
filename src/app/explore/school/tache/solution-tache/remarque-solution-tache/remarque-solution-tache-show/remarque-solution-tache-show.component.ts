import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { RemarqueSolutionTacheService } from "../remarque-solution-tache.service";

@Component({
  selector: "app-remarque-solution-tache-show",
  templateUrl: "./remarque-solution-tache-show.component.html",
  styleUrls: ["./remarque-solution-tache-show.component.scss"],
})
export class RemarqueSolutionTacheShowComponent
  extends BaseSingleComponent
  implements OnInit {
  @Output() deleted = new EventEmitter();
  @Output() edit = new EventEmitter();
  constructor(
    public remarqueService: RemarqueSolutionTacheService,
    public route: ActivatedRoute
  ) {
    super(remarqueService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  supprimer() {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.remarqueService.delete(this.single.id).subscribe(() => {
        this.loading = false;
        this.deleted.emit();
      });
    });
  }

  editer() {
    this.edit.emit();
  }
}
