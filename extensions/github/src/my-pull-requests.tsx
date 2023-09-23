import { List } from "@raycast/api"
import { PullRequestListSection } from "./components/PullRequestListSection"
import View from "./components/View"
import { useMyPullRequests } from "./hooks/useMyPullRequests"
import { isPR } from "./utils/pulls"

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
