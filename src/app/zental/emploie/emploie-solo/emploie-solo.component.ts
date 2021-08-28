import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EmploieService } from "../emploie.service";

@Component({
  selector: "app-emploie-solo",
  templateUrl: "./emploie-solo.component.html",
  styleUrls: ["./emploie-solo.component.scss"],
})
export class EmploieSoloComponent extends BaseComponent implements OnInit {
  @Input() emploie: any;
  @Input() user: any;
  showDescription = false;
  constructor(public emploieService: EmploieService, public router: Router) {
    super();
  }

  ngOnInit(): void {}

  supprimer(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.emploieService.delete(this.emploie.id).subscribe(() => {
        this.loading = false;
      });
    });
  }
}
