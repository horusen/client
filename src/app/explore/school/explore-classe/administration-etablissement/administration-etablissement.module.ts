import { SharedSchoolModule } from "./../../shared-school/shared-school.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { AdministrationEtablissementComponent } from "./administration-etablissement.component";
import { AdminsitrationEtablissementListComponent } from "./adminsitration-etablissement-list/adminsitration-etablissement-list.component";
import { AdminsitrationEtablissementShowComponent } from "./adminsitration-etablissement-show/adminsitration-etablissement-show.component";
import { EtablissementCreateComponent } from "./etablissement-create/etablissement-create.component";
import { AdministrationEtablissementShowDetailsComponent } from "./adminsitration-etablissement-show/administration-etablissement-show-details/administration-etablissement-show-details.component";
import { AdministrationEtablissementContainerComponent } from "./administration-etablissement-container/administration-etablissement-container.component";
import { AdministrationEtablissementInfoComponent } from "./administration-etablissement-info/administration-etablissement-info.component";
import { AdministrationEtablissementObjectListComponent } from "./administration-etablissement-object-list/administration-etablissement-object-list.component";
import { AdministrationEtablissementInfoDetailsComponent } from "./administration-etablissement-info-details/administration-etablissement-info-details.component";

const routes: Routes = [
  {
    path: "",
    component: AdministrationEtablissementComponent,
    children: [
      {
        path: "",
        component: AdministrationEtablissementContainerComponent,
        children: [
          {
            path: "info/:id",
            component: AdministrationEtablissementInfoComponent,
            children: [
              {
                path: "details",
                component: AdministrationEtablissementInfoDetailsComponent,
                children: [
                  {
                    path: "",
                    component: AdministrationEtablissementShowDetailsComponent,
                  },
                  {
                    path: "programme",
                    loadChildren: () =>
                      import("./../../programme/programme.module").then(
                        (module) => module.ProgrammeModule
                      ),
                  },
                  {
                    path: "formation",
                    loadChildren: () =>
                      import("./../../formation/formation.module").then(
                        (module) => module.FormationModule
                      ),
                  },
                  {
                    path: "structure",
                    loadChildren: () =>
                      import("./../../employe/employe.module").then(
                        (module) => module.EmployeModule
                      ),
                  },
                  // classe
                  {
                    path: "classe",
                    loadChildren: () =>
                      import("./../../classe/classe.module").then(
                        (module) => module.ClasseModule
                      ),
                  },
                  // Professeur
                  {
                    path: "professeur",
                    loadChildren: () =>
                      import("./../../professeur/professeur.module").then(
                        (module) => module.ProfesseurModule
                      ),
                  },
                  // Groupe
                  {
                    path: "groupes",
                    loadChildren: () =>
                      import("./../../groupe/groupe.module").then(
                        (module) => module.GroupeModule
                      ),
                  },

                  // Parent d'élèves
                  {
                    path: "parents-eleves",
                    loadChildren: () =>
                      import("./../../parent-eleve/parent-eleve.module").then(
                        (module) => module.ParentEleveModule
                      ),
                  },
                  // Élèves
                  {
                    path: "eleve",
                    loadChildren: () =>
                      import("./../../eleve/eleve.module").then(
                        (module) => module.EleveModule
                      ),
                  },

                  // Administrateur
                  {
                    path: "administrateur",
                    loadChildren: () =>
                      import(
                        "./../../etablissement/admin-etablissement/admin-etablissement.module"
                      ).then((module) => module.AdminEtablissementModule),
                  },

                  // Service
                  {
                    path: "service",
                    loadChildren: () =>
                      import(
                        "./../../etablissement/service-etablissement/service-etablissement.module"
                      ).then((module) => module.ServiceEtablissementModule),
                  },

                  // Explore
                  {
                    path: "explore",
                    loadChildren: () =>
                      import("./../../discussion/discussion.module").then(
                        (module) => module.DiscussionModule
                      ),
                  },
                ],
              },
              {
                path: "",
                component: AdministrationEtablissementObjectListComponent,
              },
            ],
          },
        ],
      },
      {
        path: ":id",
        component: AdminsitrationEtablissementShowComponent,
        children: [
          {
            path: "",
            component: AdministrationEtablissementShowDetailsComponent,
          },
          {
            path: "programme",
            loadChildren: () =>
              import("./../../programme/programme.module").then(
                (module) => module.ProgrammeModule
              ),
          },
          {
            path: "formation",
            loadChildren: () =>
              import("./../../formation/formation.module").then(
                (module) => module.FormationModule
              ),
          },
          {
            path: "structure",
            loadChildren: () =>
              import("./../../employe/employe.module").then(
                (module) => module.EmployeModule
              ),
          },
          // classe
          {
            path: "classe",
            loadChildren: () =>
              import("./../../classe/classe.module").then(
                (module) => module.ClasseModule
              ),
          },
          // Professeur
          {
            path: "professeur",
            loadChildren: () =>
              import("./../../professeur/professeur.module").then(
                (module) => module.ProfesseurModule
              ),
          },
          // Groupe
          {
            path: "groupes",
            loadChildren: () =>
              import("./../../groupe/groupe.module").then(
                (module) => module.GroupeModule
              ),
          },

          // Parent d'élèves
          {
            path: "parents-eleves",
            loadChildren: () =>
              import("./../../parent-eleve/parent-eleve.module").then(
                (module) => module.ParentEleveModule
              ),
          },
          // Élèves
          {
            path: "eleve",
            loadChildren: () =>
              import("./../../eleve/eleve.module").then(
                (module) => module.EleveModule
              ),
          },

          // Administrateur
          {
            path: "administrateur",
            loadChildren: () =>
              import(
                "./../../etablissement/admin-etablissement/admin-etablissement.module"
              ).then((module) => module.AdminEtablissementModule),
          },

          // Service
          {
            path: "service",
            loadChildren: () =>
              import(
                "./../../etablissement/service-etablissement/service-etablissement.module"
              ).then((module) => module.ServiceEtablissementModule),
          },

          // Explore
          {
            path: "explore",
            loadChildren: () =>
              import("./../../discussion/discussion.module").then(
                (module) => module.DiscussionModule
              ),
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdministrationEtablissementComponent,
    AdminsitrationEtablissementListComponent,
    AdminsitrationEtablissementShowComponent,
    EtablissementCreateComponent,
    AdministrationEtablissementShowDetailsComponent,
    AdministrationEtablissementContainerComponent,
    AdministrationEtablissementInfoComponent,
    AdministrationEtablissementObjectListComponent,
    AdministrationEtablissementInfoDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedSchoolModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AdministrationEtablissementModule {}
