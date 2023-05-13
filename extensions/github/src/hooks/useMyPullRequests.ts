import { useCachedPromise } from "@raycast/utils"
import { showToast, Toast } from "@raycast/api"
import { getGitHubClient } from "../api/withGitHubClient"
import getPreferences from "../utils/preferences"

export function useMyPullRequests() {
  const { github } = getGitHubClient()
  const preferences = getPreferences()
  const baseQuery = `is:pr author:@me ${preferences.query}`

  return useCachedPromise(
    (query) => {
      return github.MyPullRequests({
        closedCount: 10,
        closedQuery: `${query} is:closed`,
        openCount: 20,
        openQuery: `${query} is:open`,
      })
    },
    [baseQuery],
    {
      onError() {
        showToast(Toast.Style.Failure, "Could not load pull requests")
      },
    }
  )
}
