import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Helper } from "src/app/shared/services/helper";

@Component({
  selector: "app-description-partiel",
  templateUrl: "./description-partiel.component.html",
  styleUrls: ["./description-partiel.component.scss"],
})
export class DescriptionPartielComponent implements OnInit, AfterViewInit {
  @Input() parent: { name: string; item: any; typeDescription: string };
  @Output() descriptionEdited = new EventEmitter<any>();
  description: string;
  edit = false;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public helper: Helper
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment?.includes("edit")) {
        this.edit = true;
        this.helper.toggleModal("composant-modal");
      }
    });
  }

  composantEditedHandler(description: any): void {
    console.log("Description partiel => ", description);
    this.descriptionEdited.emit(description);
    this.helper.toggleModal("composant-modal");
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
  }
}
