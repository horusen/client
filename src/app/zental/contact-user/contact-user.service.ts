import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ContactUserService extends BaseService {
  constructor() {
    super("contacts/users");
  }
}
