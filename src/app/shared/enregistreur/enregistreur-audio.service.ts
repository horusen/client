import { EnregistreurService } from "./enregistreur.service";
import { Injectable } from "@angular/core";
import { Helper } from "../services/helper";

@Injectable({
  providedIn: "root",
})
export class EnregistreurAudioService extends EnregistreurService {
  constructor(private _helper: Helper) {
    super(_helper, "audio");
  }
}
