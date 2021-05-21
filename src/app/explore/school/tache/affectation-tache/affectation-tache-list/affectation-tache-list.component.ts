import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AffectationTacheService } from "../affectation-tache.service";

@Component({
  selector: "app-affectation-tache-list",
  templateUrl: "./affectation-tache-list.component.html",
  styleUrls: ["./affectation-tache-list.component.scss"],
})
export class AffectationTacheListComponent
  extends BaseComponent
  implements OnInit
{
  @Output() showAffectationTacheCreate = new EventEmitter();
  constructor(
    public affectationTacheService: AffectationTacheService,
    public route: ActivatedRoute
  ) {
    super(affectationTacheService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.paramsToFiltre(params);
      this.affectationTacheService.checkIfHasFiltre();
      // this.getData();
    });
    this.getData();
  }

  getData() {
    this.loading = true;
    this.affectationTacheService.get().subscribe(() => {
      this.loading = false;
    });
  }

  showAffectationTacheCreateComponent() {
    this.showAffectationTacheCreate.emit();
    this.helper.toggleModal("affectation-tache-create-modal");
  }

  urlParamsSerializer(params: Object) {
    let returnedObject = {};
    Object.keys(params).forEach((key) => {
      if (+params[key][1]) {
        returnedObject[key] = params[key].split(",");
        returnedObject[key].map((item: string) => this.helper.parseInt(item));
      } else {
        returnedObject[key] = [+params[key]];
      }
    });

    return returnedObject;
  }

  paramsToFiltre(params: object): void {
    this.affectationTacheService.resetFiltre();
    Object.keys(this.urlParamsSerializer(params)).forEach((key) => {
      this.affectationTacheService._filtre[key] =
        this.urlParamsSerializer(params)[key];
    });

    this.affectationTacheService.checkIfHasFiltre();
  }

  choisirAffectation(affectation: any) {
    this.affectationTacheService.singleData = affectation;
  }
}
