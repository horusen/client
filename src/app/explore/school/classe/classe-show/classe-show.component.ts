import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ClasseService } from "../classe.service";

@Component({
  selector: "app-classe-show",
  templateUrl: "./classe-show.component.html",
  styleUrls: ["./classe-show.component.scss"],
})
export class ClasseShowComponent extends BaseSingleComponent implements OnInit {
  constructor(
    public classeService: ClasseService,
    public route: ActivatedRoute
  ) {
    super(classeService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();

    this._subscription["classe"] = this.classeService.singleData$.subscribe(
      () => {
        this.helper.toggleModal("classe-show-modal");
      }
    );

    this.route.queryParams.subscribe((params) => {
      if (!params.modal) {
        this.helper.toggleModal("classe-show-modal");
      }
    });
  }
}
