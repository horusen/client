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
  getDiscussion(
    type_discussion: number,
    discussion_object: number,
    correspondant?: number
  ) {
    const data = {
      type_discussion,
      correspondant:
        (type_discussion == 1 ? discussion_object : null) ||
        (type_discussion == 5 ? correspondant : null),
      groupe: type_discussion == 2 ? discussion_object : null,
      sous_reseaux: type_discussion == 3 ? discussion_object : null,
      sujet: type_discussion == 4 ? discussion_object : null,
      etablissement: type_discussion == 5 ? discussion_object : null,
      service_etablissement: type_discussion == 6 ? discussion_object : null,
    };

    return this.factory
      .post("discussion/check", this.helper.omitNullValueInObject(data))
      .pipe(
        tap({
          next: (discussion) => {
            this.singleData = discussion;
          },
        })
      );
  }

  // Positionnement ne peut prendre que interne ou externe
  getDernieresDiscussionsEtablissement(
    etablissement: number,
    positionnement: string
  ) {
    return this.getDernieresDiscussions(
      `etablissement/${etablissement}`,
      `/${positionnement}`
    );
  }

  // getDernieresDiscussionsInternesEtablissement(etablissement: number) {
  //   return this.getDernieresDiscussions(
  //     `etablissement/${etablissement}`,
  //     "/interne"
  //   );
  // }
  // getDernieresDiscussionsExternesEtablissement(etablissement: number) {
  //   return this.getDernieresDiscussions(
  //     `etablissement/${etablissement}`,
  //     "/externe"
  //   );
  // }

  getDernieresDiscussionsProfesseur() {
    return this.getDernieresDiscussions(`professeur`);
  }

  getDernieresDiscussionsAdministration(etablissement: number) {
    return this.getDernieresDiscussions(
      `etablissement/${etablissement}/administration`
    );
  }

  getDernieresDiscussions(urlprefix: string, urlSuffix: string = "") {
    return this.factory.get(`${urlprefix}/discussion/latest${urlSuffix}`).pipe(
      tap({
        next: (data) => {
          this.data = data;
          // if (
          //   this.singleData &&
          //   !this.helper
          //     .ArrayObjectMapField(data, "id")
          //     .includes(this.singleData.id)
          // ) {
          //   this.unshiftItemInData(this.singleData);
          // }
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }
}
