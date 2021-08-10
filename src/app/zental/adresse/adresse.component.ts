import { EventEmitter, Input, Output } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AdresseService } from "./adresse.service";

@Component({
  selector: "app-adresse",
  templateUrl: "./adresse.component.html",
  styleUrls: ["./adresse.component.scss"],
})
export class AdresseComponent extends BaseComponent implements OnInit {
  @Input() parent: { name: string; item: any };
  @Output() created = new EventEmitter<any>();
  @Output() edited = new EventEmitter<any>();
  onEdit = false;
  onAdd = false;

  constructor(
    public adresseService: AdresseService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(adresseService);
  }

  ngOnInit(): void {
    this.getData();

    this._subscription["created"] =
      this.adresseService.lastItemcreated$.subscribe((adresse) => {
        this.created.emit(adresse);
      });

    this._subscription["edited"] =
      this.adresseService.lastItemEdited$.subscribe((adresse) => {
        this.edited.emit(adresse);
      });
  }

  getData(): void {
    if (this.parent.name === "ministere")
      this.adresseService
        .getByMinistere(this.parent.item.id)
        .subscribe(() => {});
    else if (this.parent.name === "ambassade")
      this.adresseService
        .getByAmbassade(this.parent.item.id)
        .subscribe(() => {});
    else if (this.parent.name === "consulat")
      this.adresseService
        .getByConsulat(this.parent.item.id)
        .subscribe(() => {});
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "add-adresse") {
        this.addAdress();
      } else if (fragment === "edit-adresse") {
        this.editAdress();
      }
    });
  }

  addAdress(): void {
    this.onAdd = true;
    this.helper.toggleModal("adresse-create-modal");
  }

  editAdress(): void {
    if (this.adresseService.singleData) {
      this.onEdit = true;
      this.helper.toggleModal("adresse-edit-modal");
    } else {
      this.router.navigate(["./"], {
        relativeTo: this.route,
        queryParamsHandling: "preserve",
      });
    }
  }
}
