import { Validators } from "@angular/forms";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PasswordFichierService } from "../password-fichier.service";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";

@Component({
  selector: "app-password-fichier-edit",
  templateUrl: "./password-fichier-edit.component.html",
  styleUrls: ["./password-fichier-edit.component.scss"],
})
export class PasswordFichierEditComponent
  extends BaseCreateComponent
  implements OnInit {
  @Input() fichier: any;
  @Output() done = new EventEmitter();
  constructor(public passwordFichierService: PasswordFichierService) {
    super(passwordFichierService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initialiseForm();

    this.helper.toggleModal("password-fichier-modal");
  }

  initialiseForm() {
    this.form = this.fb.group({
      fichier: [this.fichier.id, Validators.required],
      ancien_password: [
        "",
        { validators: [Validators.required, Validators.minLength(6)] },
      ],
      nouveau_password: [
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
          if (password != this.form.controls.nouveau_password.value) {
            this.form.controls.password_confirmation.setErrors({
              incorrect: true,
            });
          }
        }
      }
    );

    this.isFormOk = true;
  }

  edit() {
    this.loading = true;
    this.passwordFichierService.edit(this.form.value).subscribe((res) => {
      if (res.password_updated) {
        this.loading = false;
        this.done.emit();
      } else {
        this.form.controls.ancien_password.setErrors({ incorrect: true });
      }
    });
  }
}
