import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { DiplomatieService } from "src/app/zental/diplomatie/diplomatie.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-diplomatie-ailleurs",
  templateUrl: "./diplomatie-ailleurs.component.html",
  styleUrls: ["./diplomatie-ailleurs.component.scss"],
})
export class DiplomatieAilleursComponent
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
      if (params.menu === "diplomatie-ailleurs") {
        this.getAilleursByPays(this.auth.user.nationalites[0].id, params);
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

  getAilleursByPays(pays: number, params: Params): void {
    this.loading = true;
    this.diplomatieService.getAilleursByPays(pays, params).subscribe(() => {
      this.loading = false;
    });
  }
}
