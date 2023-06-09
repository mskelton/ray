import { GraphQLClient } from "graphql-request"
import { Octokit } from "octokit"
import { useMemo, useState } from "react"
import { Detail, environment, MenuBarExtra } from "@raycast/api"
import { getSdk } from "../generated/graphql"
import getPreferences from "../utils/preferences"
import { authorize } from "./oauth"

let github: ReturnType<typeof getSdk> | null = null
let octokit: Octokit | null = null

export function withGithubClient(component: JSX.Element) {
  const [x, forceRerender] = useState(0)

  // we use a `useMemo` instead of `useEffect` to avoid a render
  useMemo(() => {
    ;(async function () {
      const { token: pat } = getPreferences()
      const token = pat || (await authorize())
      const authorization = pat ? `token ${token}` : `bearer ${token}`

      github = getSdk(
        new GraphQLClient("https://api.github.com/graphql", {
          headers: { authorization },
        })
      )

      octokit = new Octokit({ auth: token })
      forceRerender(x + 1)
    })()
  }, [])

  if (!github || !octokit) {
    if (environment.commandMode === "view") {
      // Using the <List /> component makes the placeholder buggy
      return <Detail isLoading />
    } else if (environment.commandMode === "menu-bar") {
      return <MenuBarExtra isLoading />
    } else {
      console.error(
        "`withGithubClient` is only supported in `view` and `menu-bar` mode"
      )

      return null
    }
  }

  return component
}

export function getGitHubClient() {
  if (!github || !octokit) {
    throw new Error("getGitHubClient must be used when authenticated")
  }

  return { github, octokit }
}
