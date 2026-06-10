import { Configuration, UsersApi, type CurrentUser } from "./generated";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function getCurrentBackendUser(accessToken: string): Promise<CurrentUser> {
  const api = new UsersApi(
    new Configuration({
      basePath: apiUrl,
      accessToken,
    }),
  );

  return api.meApiV1MeGet();
}
