import { Component, Input, OnInit } from "@angular/core";
import { Helper } from "src/app/shared/services/helper";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-solo",
  templateUrl: "./groupe-solo.component.html",
  styleUrls: ["./groupe-solo.component.scss"],
})
export class GroupeSoloComponent implements OnInit {
  @Input() groupe: any;
  loading = false;
  constructor(public groupeService: GroupeService, public helper: Helper) {}

  ngOnInit(): void {}

  supprimer(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.groupeService.delete(this.groupe.id).subscribe({
        next: () => {
          this.loading = false;
        },
      });
    });
  }

  select(): void {
    this.groupeService.singleData = this.groupe;
  }
}
