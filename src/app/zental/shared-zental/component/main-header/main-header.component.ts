import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-main-header",
  templateUrl: "./main-header.component.html",
  styleUrls: ["./main-header.component.scss"],
})
export class MainHeaderComponent
  extends BaseComponent
  implements AfterViewInit
{
  @Input() id: string = ""; // Permet d'afficher de maniere disctinc les header
  searchActive: boolean;
  filterActive: boolean;

  @Input() hasFilter = true; // Permet d'afficher ou non le boutton filtre
  @ViewChild("search") searchField: ElementRef;
  @ViewChild("sortOrdre") sortOrdre: ElementRef;

  constructor(public route: ActivatedRoute, public router: Router) {
    super();
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchActive = !!params.search;
      this.filterActive = !!params.filter;

      if (params.search) {
        if (!this.searchField.nativeElement.value) {
          this.searchField.nativeElement.value = params.search;
        }
      }
    });
  }

  research(keyword: string) {
    if (keyword) {
      this.router.navigate(["./"], {
        relativeTo: this.route,
        queryParams: { search: keyword },
        queryParamsHandling: "merge",
      });
    }
  }
}
