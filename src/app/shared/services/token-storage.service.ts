import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenStorage {
  public getAccessToken(): string {
    return <string>localStorage.getItem("accessToken");
  }

  public getRefreshToken(): string {
    return <string>localStorage.getItem("refresh_token");
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem("user"));
  }

  public getSelectedProfile(): any {
    if (localStorage.getItem("selected-profile") != "undefined")
      return JSON.parse(localStorage.getItem("selected-profile"));
  }

  public getProfiles(): any {
    return JSON.parse(localStorage.getItem("profiles"));
  }

  public getTokenPayload(token: string) {
    const payload = token.split(".")[1];
  }

  public changeSelectedProfile(profile: any) {
    localStorage.setItem("selected-profile", JSON.stringify(profile));
  }

  public setUserField(field: string, value: any) {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...this.getUser(), [field]: value })
    );
  }

  public save(token: any) {
    localStorage.setItem("user", JSON.stringify(token.user));
    localStorage.setItem("accessToken", token.access_token);
    localStorage.setItem("profiles", JSON.stringify(token.profiles));
    localStorage.setItem("profileCount", token.profilesCount);
    localStorage.setItem("refreshToken", token.refresh_token);
  }

  public clear(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("profiles");
    localStorage.removeItem("profilesCount");
    localStorage.removeItem("selected-profile");
  }
}
