import { Validators } from "@angular/forms";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { PasswordFichierService } from "../password-fichier.service";

@Component({
  selector: "app-password-fichier-check",
  templateUrl: "./password-fichier-check.component.html",
  styleUrls: ["./password-fichier-check.component.scss"],
})
export class PasswordFichierCheckComponent
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

    this.helper.toggleModal("password-fichier-modal");
  }

  initialiseForm() {
    this.form = this.fb.group({
      fichier: [this.fichier.id, Validators.required],
      password: [
        "",
        { validators: [Validators.required, Validators.minLength(6)] },
      ],
    });

    this.isFormOk = true;
  }

  check() {
    this.loading = true;
    this.passwordFichierService
      .checkPassword(this.form.value)
      .subscribe((response) => {
        this.loading = false;
        if (response.password_checked) {
          this.done.emit();
        } else {
          this.form.controls.password.setErrors({ incorrect: true });
        }
      });
  }
}
