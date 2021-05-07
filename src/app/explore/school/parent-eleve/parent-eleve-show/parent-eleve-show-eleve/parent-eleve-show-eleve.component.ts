import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EleveService } from "../../../eleve.service";
import { ParentEleveService } from "../../parent-eleve.service";

@Component({
  selector: "app-parent-eleve-show-eleve",
  templateUrl: "./parent-eleve-show-eleve.component.html",
  styleUrls: ["./parent-eleve-show-eleve.component.scss"],
})
export class ParentEleveShowEleveComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public eleveService: EleveService,
    public parentService: ParentEleveService
  ) {
    super(eleveService);
  }

  ngOnInit(): void {
    this._subscription["parent"] = this.parentService.singleData$.subscribe(
      (parent) => {
        this.getData(parent.id);
      }
    );
  }

  getData(parent: number) {
    this.loading = true;
    this.eleveService.getByParent(parent).subscribe(() => {
      this.loading = false;
    });
  }
}
