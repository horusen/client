import { map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { TunelService } from "../tunel.service";

@Injectable({
  providedIn: "root",
})
export class ParticipantTunelService extends BaseService {
  constructor(public tunelService: TunelService) {
    super("tache/tunel/participant");
  }

  get(tunel: number) {
    return this.factory.get(`tache/tunel/${tunel}/participant`).pipe(
      tap({
        next: (data) => {
          this.data = data.map((item: any) => item.participant);
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  participer(tunel: number) {
    return this.factory
      .post(`tache/tunel/participant/participer`, { tunel })
      .pipe(
        tap({
          next: () => {
            const indexTunel = this.tunelService.findIndexItemInDataByID(tunel);
            this.tunelService.data[indexTunel].is_user_participant = true;
          },
        })
      );
  }
}
