import { List } from "@raycast/api"
import { RepositoryListItemFragment } from "../generated/graphql"
import { useRepoPullRequests } from "../hooks/useRepoPullRequests"
import { isPR } from "../utils/pulls"
import { PullRequestListSection } from "./PullRequestListSection"

interface RepositoryPullRequestsProps {
  repo: RepositoryListItemFragment
}

export function RepositoryPullRequests({ repo }: RepositoryPullRequestsProps) {
  const { data, isLoading } = useRepoPullRequests(repo)
  const pulls = data?.repository?.pullRequests.nodes?.filter(isPR) ?? []
  console.log(pulls)

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Filter pull requests by name..."
      navigationTitle={`Search ${repo.name} pull requests`}
    >
      <PullRequestListSection
        title="Open"
        pulls={pulls.filter((pull) => pull.state === "OPEN")}
      />

      <PullRequestListSection
        title="Recently Closed"
        pulls={pulls.filter((pull) => pull.state !== "OPEN")}
      />
    </List>
  )
}
