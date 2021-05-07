import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-asset-discussion",
  templateUrl: "./asset-discussion.component.html",
  styleUrls: ["./asset-discussion.component.scss"],
})
export class AssetDiscussionComponent implements OnInit {
  typeAsset: string; // Renseigne sur le type d'asset à afficher
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.typeAsset = queryParams.asset;
    });
  }
}
