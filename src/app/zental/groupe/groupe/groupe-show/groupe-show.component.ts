import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DemandeAdhesionGroupeService } from "../../demande-adhesion-groupe/demande-adhesion-groupe.service";
import { MembreGroupeService } from "../../membre-groupe/membre-groupe.service";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-show",
  templateUrl: "./groupe-show.component.html",
  styleUrls: ["./groupe-show.component.scss"],
})
export class GroupeShowComponent
  extends BaseSingleComponent
  implements OnInit, AfterViewInit
{
  localLoading = false;
  constructor(
    public groupeService: GroupeService,
    public membreGroupeService: MembreGroupeService,
    public demandeService: DemandeAdhesionGroupeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(groupeService, route);
  }

  ngOnInit(): void {
    if (!this.groupeService.singleData) {
      this.enableFetchDataFromURL = true;
    }

    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "edit-groupe") {
        this.helper.toggleModal("groupe-edit-modal");
      }
    });
  }

  faireUneDemande(): void {
    this.helper.alertConfirmation(() => {
      this.localLoading = true;
      this.demandeService
        .add({ user: this.auth.user.id_inscription, groupe: this.single.id })
        .subscribe((demande) => {
          this.groupeService.setFieldInSingleData("user_demande", demande);
          this.groupeService.setFieldInSingleData(
            "nombre_demandes",
            ++this.single.nombre_demandes
          );

          const groupeInData = this.groupeService.findItemInDataByID(
            this.single.id
          );
          groupeInData.user_demande = demande;
          groupeInData.nombre_demandes++;
          this.groupeService.emitData();

          this.localLoading = false;
          this.helper.alertSuccess();
        });
    });
  }

  annulerDemande(): void {
    this.helper.alertConfirmation(() => {
      this.localLoading = true;
      this.demandeService
        .annuler(this.single.user_demande?.id)
        .subscribe(() => {
          this.groupeService.setFieldInSingleData("user_demande", null);
          this.groupeService.setFieldInSingleData(
            "nombre_demandes",
            --this.single.nombre_demandes
          );

          const groupeInData = this.groupeService.findItemInDataByID(
            this.single.id
          );
          groupeInData.user_demande = null;
          groupeInData.nombre_demandes--;
          this.groupeService.emitData();

          this.localLoading = false;
          this.helper.alertSuccess();
        });
    });
  }

  onEdited(): void {
    this.helper.toggleModal("groupe-edit-modal");
    this.router.navigate(["./"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
  }

  supprimer(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.groupeService.delete(this.single.id).subscribe(() => {
        this.router.navigate([".."], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
      });
    });
  }

  quitter(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.membreGroupeService
        .delete(this.single.user_membership.id)
        .subscribe(() => {
          this.loading = false;
          this.groupeService.setFieldInSingleData(
            "nombre_membres",
            --this.single.nombre_membres
          );
          this.groupeService.setFieldInSingleData("user_membership", null);
        });
    });
  }
}
