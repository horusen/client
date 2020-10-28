import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})

/*
  Used for abstract component
  * Les components abstraites qui heritent de base-component ont besoin
  d'avoir un service de type BaseService pour respecter l'injection de dépendance
  pour que l'heritage puisse fonctionner normalement

  * Vu que le service utilisé dans l'injection de dépendance est de type BaseService,
  On a voulu directement mettre BaseService comme dépendance dans les components abstraites.
  Mais pour une raison que l'on ignore, l'injection de dépendance ne fonctionne pas quand on met
  directement BaseService

  * Pour pallier à ce probleme, on a crée le service AltBaseService qui est une service
  abstraite heritant de BaseService.

*/
export abstract class AbstractBaseService extends BaseService {
  constructor() {
    super("");
  }
}
