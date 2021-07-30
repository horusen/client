import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { MinistereService } from "../../ministere.service";

@Component({
  selector: "app-description-partiel-ministere",
  templateUrl: "./description-partiel-ministere.component.html",
  styleUrls: ["./description-partiel-ministere.component.scss"],
})
export class DescriptionPartielMinistereComponent
  extends BaseSingleComponent
  implements OnInit, AfterViewInit
{
  typeDescription: string;
  edit = false;
  constructor(
    public ministereService: MinistereService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(ministereService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.getTypeDescription(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getTypeDescription(this.router.url);
      }
    });
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment?.includes("edit")) {
        this.edit = true;
        this.helper.toggleModal("composant-modal");
      }
    });
  }

  composantEditedHandler(ministere: any): void {
    this.ministereService.setFieldInSingleData(
      this.typeDescription.slice(0, -1),
      ministere[this.typeDescription.slice(0, -1)]
    );
    this.helper.toggleModal("composant-modal");
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
  }

  getTypeDescription(url: string) {
    if (url.includes("missions")) {
      this.typeDescription = "missions";
    } else if (url.includes("organisations")) {
      this.typeDescription = "organisations";
    }
  }
}
