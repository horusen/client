import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { PasswordFichierService } from "../password-fichier.service";

@Component({
  selector: "app-password-fichier-add",
  templateUrl: "./password-fichier-add.component.html",
  styleUrls: ["./password-fichier-add.component.scss"],
})
export class PasswordFichierAddComponent
  extends BaseCreateComponent
  implements OnInit {
  @Input() fichier: any;
  @Output() done = new EventEmitter();
  constructor(public passwordFichierService: PasswordFichierService) {
    super(passwordFichierService);
  }

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    super.ngOnInit();
    this.initialiseForm();
    this.verifyPassword(this.fichier.id);
  }

  initialiseForm() {
    this.form = this.fb.group({
      fichier: [this.fichier.id, Validators.required],
      password: [
        "",
        { validators: [Validators.required, Validators.minLength(6)] },
      ],
      password_confirmation: [
        "",
        { validators: [Validators.required, Validators.minLength(6)] },
      ],
    });

    this.form.controls.password_confirmation.valueChanges.subscribe(
      (password) => {
        if (this.form.controls.password.value) {
          if (password != this.form.controls.password.value) {
            this.form.controls.password_confirmation.setErrors({
              incorrect: true,
            });
          }
        }
      }
    );

    this.isFormOk = true;
  }

  verifyPassword(fichier: number) {
    this.loading = true;
    this.passwordFichierService
      .verifyPasswordExists(fichier)
      .subscribe((response) => {
        if (response.has_password) {
          this.done.emit();
        } else {
          this.helper.toggleModal("password-fichier-modal");
        }

        this.loading = false;
      });
  }

  add() {
    this.loading = true;
    this.passwordFichierService.add(this.form.value).subscribe(() => {
      this.loading = false;
      this.helper.alertSuccess();
      this.done.emit();
    });
  }
}
