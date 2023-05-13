import { useCachedPromise } from "@raycast/utils"
import { showToast, Toast } from "@raycast/api"
import { getGitHubClient } from "../api/withGitHubClient"
import { RepositoryListItemFragment } from "../generated/graphql"

export function useRepoPullRequests(repo: RepositoryListItemFragment) {
  const { github } = getGitHubClient()

  return useCachedPromise(
    (name: string, owner: string) => github.RepoPullRequests({ name, owner }),
    [repo.name, repo.owner.login],
    {
      onError() {
        showToast(Toast.Style.Failure, "Could not load pull requests")
      },
    }
  )
}
