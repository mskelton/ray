import { useCachedPromise } from "@raycast/utils"
import { getPreferenceValues, showToast, Toast } from "@raycast/api"
import { getGitHubClient } from "../api/withGitHubClient"

export function useMyPullRequests() {
  const { github } = getGitHubClient()
  const preferences = getPreferenceValues()
  const baseQuery = `is:pr author:@me ${preferences.query}`

  return useCachedPromise(
    (query) => {
      return github.MyPullRequests({
        closedCount: 5,
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
