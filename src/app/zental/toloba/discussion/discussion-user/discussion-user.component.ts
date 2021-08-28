import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/authentification/auth.service";

@Component({
  selector: "app-discussion-user",
  templateUrl: "./discussion-user.component.html",
  styleUrls: ["./discussion-user.component.scss"],
})
export class DiscussionUserComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
