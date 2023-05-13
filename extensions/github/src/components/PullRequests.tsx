import { List } from "@raycast/api"
import { RepositoryListItemFragment } from "../generated/graphql"
import { PullRequestListSection } from "./PullRequestListSection"

interface PullRequestsProps {
  repo: RepositoryListItemFragment
}

export function PullRequests({ repo }: PullRequestsProps) {
  const { data, isLoading } = useQuery<QueryResponse>({
    errorMessage: "Could not load repositories",
    query: QUERY,
    variables: {
      name: repo.name,
      owner: repo.owner.login,
    },
  })

  const pulls = data?.repository.pullRequests.nodes ?? []

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
