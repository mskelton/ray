import { List } from "@raycast/api"
import { IssueListSection } from "./components/IssueListSection"
import View from "./components/View"
import { useMyIssues } from "./hooks/useMyIssues"
import { isIssue } from "./utils/issues"

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
