import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserCreateComponent } from "./user-create/user-create.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [UserCreateComponent],
  imports: [CommonModule, SharedModule],
  exports: [UserCreateComponent],
})
export class UserModule {}
