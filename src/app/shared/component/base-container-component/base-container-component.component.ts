import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "../../components/base-component/base.component";
import { BaseService } from "../../services/base.service";

@Component({
  selector: "app-base-container-component",
  templateUrl: "./base-container-component.component.html",
  styleUrls: ["./base-container-component.component.scss"],
})
export class BaseContainerComponentComponent
  extends BaseComponent
  implements OnInit
{
  create = false;
  edit = false;
  filter = false;

  // A specifier à chaque fois que un component herite de  celui ci
  // Represent l'element sur lequel est s'appuie ce component: ex ministre, service, ministere
  element: string;

  constructor(
    public service: BaseService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === `add-${this.element}`) {
        this.create = true;
        this.helper.toggleModal(`${this.element}-create-modal`);
      } else if (fragment === `edit-${this.element}`) {
        if (this.service.singleData) {
          this.edit = true;
          this.helper.toggleModal(`${this.element}-edit-modal`);
        } else {
          this.router.navigate(["./"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve",
          });
        }
      } else if (fragment === "showFilter") {
        this.filter = true;
        this.helper.toggleModal(`${this.element}-filter-modal`);
      }
    });
  }
}
