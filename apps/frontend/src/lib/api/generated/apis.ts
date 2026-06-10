import type { CurrentUser } from "./models";
import { Configuration } from "./runtime";

export class UsersApi {
  constructor(private readonly configuration = new Configuration()) {}

  async meApiV1MeGet(): Promise<CurrentUser> {
    const response = await fetch(`${this.configuration.basePath}/api/v1/me`, {
      headers: {
        Authorization: `Bearer ${this.configuration.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Backend request failed with ${response.status}`);
    }

    return response.json();
  }
}
