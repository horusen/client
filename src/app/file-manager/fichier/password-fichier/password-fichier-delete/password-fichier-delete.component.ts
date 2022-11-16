import { PasswordFichierService } from "./../password-fichier.service";
import { Component, OnInit } from "@angular/core";
import { PasswordFichierCheckComponent } from "../password-fichier-check/password-fichier-check.component";

@Component({
  selector: "app-password-fichier-delete",
  templateUrl: "./password-fichier-delete.component.html",
  styleUrls: ["./password-fichier-delete.component.scss"],
})
export class PasswordFichierDeleteComponent
  extends PasswordFichierCheckComponent
  implements OnInit {
  constructor(public passwordFichierService: PasswordFichierService) {
    super(passwordFichierService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  check() {
    this.loading = true;
    this.passwordFichierService
      .checkPassword(this.form.value)
      .subscribe((response) => {
        if (response.password_checked) {
          this.delete();
          this.done.emit();
        } else {
          this.form.controls.password.setErrors({ incorrect: true });
          this.loading = false;
        }
      });
  }

  delete() {
    this.passwordFichierService.delete(this.fichier.id).subscribe(() => {
      this.loading = false;
    });
  }
}
