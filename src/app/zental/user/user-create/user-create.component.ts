import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.scss"],
})
export class UserCreateComponent extends BaseCreateComponent implements OnInit {
  constructor(public userService: UserService) {
    super(userService);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      telephone: [null, [Validators.required]],
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      this.userService.add(this.form.value).subscribe(() => {
        this.initForm();
        this.loading = false;
      });
    }
  }
}
