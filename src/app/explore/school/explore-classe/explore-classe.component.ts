import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ClasseService } from "../classe/classe.service";

@Component({
  selector: "app-explore-classe",
  templateUrl: "./explore-classe.component.html",
  styleUrls: ["./explore-classe.component.scss"],
})
export class ExploreClasseComponent extends BaseComponent implements OnInit {
  constructor(public classeService: ClasseService) {
    super(classeService);
  }

  ngOnInit(): void {}
}
