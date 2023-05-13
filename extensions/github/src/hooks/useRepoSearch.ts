import { useCachedPromise } from "@raycast/utils"
import { showToast, Toast } from "@raycast/api"
import { getGitHubClient } from "../api/withGitHubClient"
import getPreferences from "../utils/preferences"

export function useRepoSearch(query: string) {
  const { github } = getGitHubClient()
  const preferences = getPreferences()
  const fullQuery = `is:repo ${preferences.query} ${query}`

  return useCachedPromise(
    (query) => github.SearchReposQuery({ query }),
    [fullQuery],
    {
      execute: !!fullQuery,
      onError() {
        showToast(Toast.Style.Failure, "Could not load repositories")
      },
    }
  )
}
