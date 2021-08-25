import { NgxPicaService } from "@digitalascetic/ngx-pica";
import { Injectable } from "@angular/core";
// import { ToastrManager } from "ng6-toastr-notifications";s
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

declare var $;

@Injectable({
  providedIn: "root",
})
export class Helper {
  public booleanReponse = ["OUI", "NON"];

  constructor(
    // public toastr: ToastrManager,
    private translate: TranslateService,
    private router: Router,
    private toastr: ToastrService,
    private _ngxPicaService: NgxPicaService,
    private _route: ActivatedRoute
  ) {}

  navigate(path: string[], queryParams?: {}, fragment?: string): void {
    this.router.navigate(path, {
      queryParams: queryParams,
      fragment: fragment,
      relativeTo: this._route,
    });
  }

  reloadPage(path: string[], queryParams?: {}, fragment?: string) {
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate(path, {
        queryParams: queryParams,
        fragment: fragment,
      });
    });
  }

  getQueryParamsFromUrl(url: string) {
    if (url.includes("?")) {
      const queryParams = url.split("?")[1];
      const queryParamsTable = queryParams.split("&");
      const returnedObject = {};
      queryParamsTable.forEach((element) => {
        const queryParamsObject = element.split("=");
        returnedObject[queryParamsObject[0]] = queryParamsObject[1];
      });

      return returnedObject;
    }
  }

  toggleModal(id: string): void {
    $("#" + id).modal("toggle");
  }

  showModal(id: string): void {
    $("#" + id).modal("show");
  }

  hideModal(id: string): void {
    $("#" + id).modal("hide");
  }

  idExtractor(data: any[], idField: string = "id"): number[] {
    let returned: number[] = [];
    data.forEach((element) => {
      returned.push(element[idField]);
    });
    return returned;
  }

  alertSuccess(): void {
    Swal.fire({
      icon: "success",
      title: "Effectué avec succés",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  alertDanger(word: string = "ERREUR"): void {
    Swal.fire({
      icon: "error",
      title: word,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  toastSuccess(word?: string): void {
    if (!word)
      this.translate
        .get("effectueAvecSucces")
        .subscribe((translatedWord) => (word = translatedWord));

    this.toastr.success(word);
  }

  toastDanger(word?: string, titre?: string): void {
    if (!word)
      this.translate
        .get("ERREUR")
        .subscribe((translatedWord) => (word = translatedWord));

    this.toastr.error(word, titre, {
      closeButton: true,
      disableTimeOut: true,
    });
  }

  getTranslation(word: string): Observable<string> {
    let translatedWord: string;
    return this.translate.get(word);
  }

  alertConfirmation(callback: Function) {
    const options = {
      title: this.getTranslation("etesVousSur"),
      // text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: this.getTranslation("OUI"),
      cancelButtonText: this.getTranslation("nonQuitter"),
    };

    Swal.fire({
      title: "Êtes vous sûr de votre choix?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Oui`,
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });

    // Swal.fire({ ...options }).then((result) => {
    //   if (result.value) {
    //     callback();
    //   }
    // });
  }

  unsubscribe(subscriptions: any) {
    Object.keys(subscriptions).forEach((key) => {
      if (subscriptions[key]) {
        subscriptions[key].unsubscribe();
      }
    });
  }

  fromHtmlStringToText(htmlString: string) {
    return new DOMParser().parseFromString(htmlString, "text/html")
      .documentElement.textContent;
  }

  // Permet d'afficher un nombre bien defini de caractere dans un texte
  strcut(text: string, wordCount: number) {
    text = this.fromHtmlStringToText(text);
    // if text's length lower than wordCound(nbre of word we want), simply return the text
    if (text.length < wordCount) {
      return text;
    }

    // Else if text's length greater than wordCount, return the cutted text with three dots wich is mean text's cutted before the end
    return `${text.substring(0, wordCount)}...`;
  }

  omitFieldInObject(obj: {}, omitKeys: string[]): {} {
    if (Object.keys(obj).length) {
      return Object.keys(obj).reduce((result, key) => {
        if (!omitKeys.includes(key)) {
          result[key] = obj[key];
        }
        return result;
      }, {});
    }

    return {};
  }

  // omitValueInArray(array: any[], omittedValues: any[]) {
  //   let newArray = [];
  //   array.forEach(item => {
  //     if(!omittedValues.includes(item)) {
  //       newArray.push(item);
  //     }
  //   })
  // }

  omitNullValueInObject(obj: {}) {
    let newObject = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] && obj[key] !== "null") {
        newObject[key] = obj[key];
      }
    });

    return newObject;
  }

  omitEmptyArraysInObject(obj: {}) {
    let newObject = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        if (obj[key] instanceof Array) {
          if (obj[key].length) newObject[key] = obj[key];
        } else newObject[key] = obj[key];
      }
    });

    return newObject;
  }

  parseInt(num: string) {
    return parseInt(num);
  }

  findValueInArrayByID(array: any[], id: number, libelleID: string = "id") {
    return array.find((item) => item[libelleID] == id);
  }

  findIndexItemInArray(array: any[], id: number, libelleID: string = "id") {
    return array.findIndex((element) => {
      return element[libelleID] == id;
    });
  }

  deleteItemInArrayByID(
    array: any[],
    idItem: number,
    libelleID: string = "id"
  ) {
    return array.filter((item) => item[libelleID] != idItem);
  }

  rechercher(data: any[], field: string, value: string) {
    return data.find((item) => item[field] == value);
  }

  checkIfUrlHasItem(route: ActivatedRouteSnapshot, item: string): boolean {
    const url = route.pathFromRoot
      .map((v) => v.url.map((segment) => segment.toString()).join("/"))
      .filter((item) => item);

    return url.includes(item);
  }

  checkExtension(filename: string, extension: any): boolean {
    if (filename.match(extension + "$")) {
      return true;
    }
    return false;
  }

  ArrayObjectMapField(array: any[], field: string): any[] {
    return array.map((item: any) => item[field]);
  }

  appendObjectToQueryParams(
    route: ActivatedRoute,
    object: object,
    omittedParams?: string[]
  ): void {
    let queryParams: any;
    route.queryParams.subscribe((query) => (queryParams = query));
    this.router.navigate(["./"], {
      queryParams: {
        ...object,
        ...this.omitFieldInObject(queryParams, omittedParams),
      },
      relativeTo: route,
    });
  }

  log(message: string) {
    console.log(message);
  }

  getLastUrlFragment(url: string): string {
    const urlWithoutQueryParams = url.split("?")[0];
    const fragmentedUrl = urlWithoutQueryParams.split("/");
    return fragmentedUrl[fragmentedUrl.length - 1];
  }

  serializeObject(object: {}) {
    return this.omitEmptyArraysInObject(this.omitNullValueInObject(object));
  }
  convertObjectToQueryParamsUrl(object: object) {
    let queryParams: string = "";
    let index: number = 0;
    object = this.omitEmptyArraysInObject(object);
    object = this.omitNullValueInObject(object);
    Object.keys(object).forEach((key) => {
      if (object[key] instanceof Array) {
        queryParams += `${index > 0 ? "&" : ""}${key}=${object[key].join(",")}`;
      } else {
        queryParams += `${index > 0 ? "&" : ""}${key}=${object[key]}`;
      }
      index += 1;
    });

    return queryParams;
  }

  checkExtensions(filename: string, extensions: string[]): boolean {
    for (let extension of extensions) {
      if (this.checkExtension(filename, extension)) return true;
    }
    return false;
  }

  urlify(text: string) {
    const urlRegex =
      /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;
    if (text) {
      return text.replace(
        urlRegex,
        (url: string) => '<a href="' + url + '">' + url + "</a>"
      );
    } else {
      return text;
    }
  }

  // Transform les parametres d'une url en objet
  urlParamsToObject(params: Object) {
    let returnedObject = {};
    Object.keys(params).forEach((key) => {
      if (+params[key][1]) {
        returnedObject[key] = params[key].split(",");
        returnedObject[key].map((item: string) => this.parseInt(item));
      } else {
        returnedObject[key] = [+params[key]];
      }
    });

    return returnedObject;
  }

  stringify(element: object) {
    return JSON.stringify(element);
  }
}
