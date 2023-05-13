import { List } from "@raycast/api"
import { PullRequestListSection } from "./components/PullRequestListSection"
import View from "./components/View"
import { PullRequestSectionFragment } from "./generated/graphql"
import { useMyPullRequests } from "./hooks/useMyPullRequests"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPR = (node: any): node is PullRequestSectionFragment =>
  node?.__typename === "PullRequest"

function MyPullRequests() {
  const { data, isLoading } = useMyPullRequests()

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Filter pull requests by name..."
    >
      <PullRequestListSection
        title="Open"
        pulls={data?.open.nodes?.filter(isPR)}
      />

      <PullRequestListSection
        title="Recently closed"
        pulls={data?.closed.nodes?.filter(isPR)}
      />
    </List>
  )
}

export default function Command() {
  return (
    <View>
      <MyPullRequests />
    </View>
  )
}
