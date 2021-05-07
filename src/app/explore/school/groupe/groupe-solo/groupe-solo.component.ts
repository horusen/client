import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Helper } from "src/app/shared/services/helper";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-solo",
  templateUrl: "./groupe-solo.component.html",
  styleUrls: ["./groupe-solo.component.scss"],
})
export class GroupeSoloComponent implements OnInit {
  @Input() groupe: any;
  @Output() loading = new EventEmitter<boolean>();
  constructor(
    public helper: Helper,
    public router: Router,
    public groupeService: GroupeService
  ) {}

  ngOnInit(): void {
    this.loading.emit(true);
    this.loading.emit(false);
  }

  modifier() {
    this.groupeService.singleData = this.groupe;
  }

  supprimer() {
    this.helper.alertConfirmation(() => {
      this.loading.emit(true);
      this.groupeService.delete(this.groupe.id).subscribe(() => {
        this.loading.emit(false);
      });
    });
  }
}
