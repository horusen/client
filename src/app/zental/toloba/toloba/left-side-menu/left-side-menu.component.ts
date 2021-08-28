import { Helper } from "src/app/shared/services/helper";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "src/app/authentification/auth.service";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-left-side-menu",
  templateUrl: "./left-side-menu.component.html",
  styleUrls: ["./left-side-menu.component.scss"],
})
export class LeftSideMenuComponent extends BaseComponent implements OnInit {
  @Input() parent: ParentDefinition;
  activeMenu = {
    "votre-diaspora": false,
    "vos-groupes": false,
    "vos-services-consulaires": false,
    "votre-diplomatie": false,
    "diplomatie-ailleurs": false,
    "autres-groupes": false,
  };

  activeMenuKeys: string[];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    if (
      this.parent.name === "user" &&
      !this.parent.item.inscription_consulaire
    ) {
      delete this.activeMenu["votre-diaspora"];
      delete this.activeMenu["vos-services-consulaires"];
      delete this.activeMenu["votre-diplomatie"];
      delete this.activeMenu["vos-groupe"];
    }

    if (this.parent.name !== "user") {
      delete this.activeMenu["vos-groupes"];
      delete this.activeMenu["autres-groupes"];
    }

    this.activeMenuKeys = Object.keys(this.activeMenu);

    this.route.queryParams.subscribe((params) => {
      if (params.menu) {
        this.activateMenu(params.menu);
      } else {
        this.navigate();
      }
    });
  }

  resetActiveMenu(): void {
    Object.keys(this.activeMenu).forEach(
      (key) => (this.activeMenu[key] = false)
    );
  }

  activateMenu(menuName: string): void {
    this.resetActiveMenu();
    if (Object.keys(this.activeMenu).includes(menuName)) {
      this.activeMenu[menuName] = true;
    } else {
      this.navigate();
    }
  }

  navigate(menu?: string): void {
    const url = this.router.url;

    this.router.navigate([url.split("?")[0]], {
      queryParams: { menu: menu || Object.keys(this.activeMenu)[0] },
      queryParamsHandling: "merge",
    });
  }

  isMenuActive(menuName: string): boolean {
    return this.activeMenu[menuName];
  }

  selectMenu(menuName: string): void {
    this.navigate(menuName);
  }
}
