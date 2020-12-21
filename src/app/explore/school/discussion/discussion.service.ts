import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class DiscussionService extends BaseService {
  constructor() {
    super("discussion");
  }

  // Discussion object peut être : un correspondant, un groupe ou un sous réseaux
  getDiscussion(type_discussion: number, discussion_object: number) {
    const data = {
      type_discussion,
      correspondant: type_discussion == 1 ? discussion_object : null,
      groupe: type_discussion == 2 ? discussion_object : null,
      sous_reseaux: type_discussion == 3 ? discussion_object : null,
    };

    return this.factory
      .post("discussion/check", this.helper.omitNullValueInObject(data))
      .pipe(
        tap({
          next: (discussion) => (this.singleData = discussion),
        })
      );
  }
}
