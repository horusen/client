import { BaseComponent } from "./../../../shared/components/base-component/base.component";
import { Component, Input, OnInit } from "@angular/core";
import { DiplomeService } from "../diplome.service";

@Component({
  selector: "app-diplome-solo",
  templateUrl: "./diplome-solo.component.html",
  styleUrls: ["./diplome-solo.component.scss"],
})
export class DiplomeSoloComponent extends BaseComponent implements OnInit {
  @Input() diplome: any;
  showDescription: false;
  constructor(public diplomeService: DiplomeService) {
    super();
  }

  ngOnInit(): void {}

  supprimer(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.diplomeService.delete(this.diplome.id).subscribe(() => {
        this.loading = false;
      });
    });
  }
}
