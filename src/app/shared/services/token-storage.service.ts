import { JsonPipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenStorage {
  public getAccessToken(): string {
    return <string>localStorage.getItem("access_token");
  }

  public getRefreshToken(): string {
    return <string>localStorage.getItem("refresh_token");
  }

  public getUser(): any {
    return localStorage.getItem("user");
  }

  public getTokenPayload(token: string) {
    const payload = token.split(".")[1];
  }

  public save(user: any, accessToken: string, refreshToken: string) {
    this.setUser(user);
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  private setAccessToken(token: string): void {
    localStorage.setItem("access_token", token);
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem("refresh_token", token);
  }

  private setUser(user: any): void {
    localStorage.setItem("user", user);
  }

  public clear(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("refresh_token");
  }
}
