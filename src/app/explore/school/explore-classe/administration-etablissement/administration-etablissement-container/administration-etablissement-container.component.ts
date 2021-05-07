import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-administration-etablissement-container",
  templateUrl: "./administration-etablissement-container.component.html",
  styleUrls: ["./administration-etablissement-container.component.scss"],
})
export class AdministrationEtablissementContainerComponent implements OnInit {
  addEtablissement: boolean = false;
  constructor(public route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {}

  ajouterEtablissement(): void {
    this.router.navigate(["./"], {
      relativeTo: this.route,
      fragment: "create-etablissement",
    });
  }

  closeAjouterEtablissement() {
    this.router.navigate(["./"], {
      relativeTo: this.route,
      preserveFragment: false,
    });
  }
}
