import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DiplomatieService } from "src/app/zental/diplomatie/diplomatie.service";

@Component({
  selector: "app-votre-diplomatie",
  templateUrl: "./votre-diplomatie.component.html",
  styleUrls: ["./votre-diplomatie.component.scss"],
})
export class VotreDiplomatieComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  searchActive: boolean;
  @ViewChild("search") searchField: ElementRef;

  constructor(
    public diplomatieService: DiplomatieService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(diplomatieService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.menu === "votre-diplomatie") {
        this.getByPays(this.auth.user.nationalites[0]?.pays?.id, params);
      }
    });
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchActive = !!params.search;

      if (params.search) {
        if (!this.searchField?.nativeElement?.value) {
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

  getByPays(pays: number, params: Params): void {
    this.loading = true;
    this.diplomatieService.getByPays(pays, params).subscribe(() => {
      this.loading = false;
    });
  }
}
