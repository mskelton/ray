import { List } from "@raycast/api"
import { IssueListSection } from "./components/IssueListSection"
import View from "./components/View"
import { IssueSectionFragment } from "./generated/graphql"
import { useMyIssues } from "./hooks/useMyIssues"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isIssue = (node: any): node is IssueSectionFragment =>
  node?.__typename === "Issue"

function MyIssues() {
  const { data, isLoading } = useMyIssues()

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Filter issues by name...">
      <IssueListSection
        title="Open"
        issues={data?.open.nodes?.filter(isIssue)}
      />

      <IssueListSection
        title="Recently closed"
        issues={data?.closed.nodes?.filter(isIssue)}
      />
    </List>
  )
}

export default function Command() {
  return (
    <View>
      <MyIssues />
    </View>
  )
}
