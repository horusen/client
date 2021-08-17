import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { IdentiteService } from "../../identite/identite.service";
import { TypeContactService } from "../../type-contact/type-contact.service";
import { UserService } from "../../user/user.service";
import { ContactUserService } from "../contact-user.service";

@Component({
  selector: "app-contact-user-create",
  templateUrl: "./contact-user-create.component.html",
  styleUrls: ["./contact-user-create.component.scss"],
})
export class ContactUserCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  user: any;
  dependancies = {
    types: [],
    users: [],
  };

  dependanciesLoading = {
    types: false,
    users: false,
  };

  constructor(
    public contactService: ContactUserService,
    public typecontactService: TypeContactService,
    public userService: UserService,
    public identiteService: IdentiteService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(contactService);
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        if (this.user?.id_inscription !== user.id_inscription) this.user = user;
      }
    );

    this.initialiseForm();

    this.getDependancies();

    // add newly created user to dependancies.users
    this._subscription["user"] = this.userService.lastItemcreated$.subscribe(
      (user) => {
        this.dependancies.users.unshift(user);
      }
    );
  }

  getDependancies(): void {
    this.getNoncontacts(this.user.id_inscription);

    this.getTypescontacts();
  }

  initialiseForm(): void {
    this.form = this.fb.group({
      contact: [null, Validators.required],
      urgence: [false, Validators.required],
      user: [this.user.id_inscription, Validators.required],
      type_contact: [null, Validators.required],
    });
  }

  getTypescontacts(): void {
    this.dependanciesLoading.types = true;
    this.typecontactService.getAll(false).subscribe((response) => {
      this.dependancies.types = response;
      this.dependanciesLoading.types = false;
    });
  }

  getNoncontacts(user: number): void {
    this.dependanciesLoading.users = true;
    this.userService.getByNonContact(user).subscribe((response) => {
      this.dependancies.users = response;
      this.dependanciesLoading.users = false;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        contact: this.formValue("contact")[0].id_inscription,
        type_contact: this.formValue("type_contact")[0].id,
      };

      this.contactService.add(data).subscribe(() => {
        this.loading = false;
        this.initialiseForm();
        this.helper.hideModal("contact-create-modal");
        this.helper.alertSuccess();
        this.router.navigate(["./"], { relativeTo: this.route });
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
