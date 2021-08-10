import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Helper } from "src/app/shared/services/helper";

@Component({
  selector: "app-responsable",
  templateUrl: "./responsable.component.html",
  styleUrls: ["./responsable.component.scss"],
})
export class ResponsableComponent implements OnInit {
  create = false;
  filtre = false;
  edit = false;
  @Input() parent: { name: string; item: any; entiteDiplomatique: any };
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public helper: Helper
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "add-" + this.parent.name) {
        this.create = true;
        this.helper.toggleModal(this.parent.name + "-add-modal");
      }
    });
  }
}
