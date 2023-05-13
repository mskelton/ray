import fetch from "cross-fetch"
import { environment, OAuth } from "@raycast/api"

const clientId = "7235fe8d42157f1f38c0"

export const oauthClient = new OAuth.PKCEClient({
  description: "Connect your GitHub account",
  providerIcon:
    environment.appearance === "light" ? "icon.png" : "icon@dark.png",
  providerId: "github",
  providerName: "GitHub",
  redirectMethod: OAuth.RedirectMethod.Web,
})

export async function authorize() {
  const existingTokens = await oauthClient.getTokens()

  if (existingTokens?.accessToken) {
    return existingTokens.accessToken
  }

  const authRequest = await oauthClient.authorizationRequest({
    clientId,
    endpoint: "https://github.oauth-proxy.raycast.com/authorize",
    scope: "repo read:org read:user",
  })

  const { authorizationCode } = await oauthClient.authorize(authRequest)
  const tokens = await fetchTokens(authRequest, authorizationCode)
  await oauthClient.setTokens(tokens)

  return tokens.access_token
}

export async function fetchTokens(
  authRequest: OAuth.AuthorizationRequest,
  authCode: string
): Promise<OAuth.TokenResponse> {
  const response = await fetch("https://github.oauth-proxy.raycast.com/token", {
    body: JSON.stringify({
      client_id: clientId,
      code: authCode,
      code_verifier: authRequest.codeVerifier,
      grant_type: "authorization_code",
      redirect_uri: authRequest.redirectURI,
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json() as Promise<OAuth.TokenResponse>
}
