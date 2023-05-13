import { Action, ActionPanel, Icon, List } from "@raycast/api"
import { IssueListItemFragment } from "../generated/graphql"
import { formatUpdatedAt } from "../utils/format"
import { getIssueStatus } from "../utils/issues"
import { truthy } from "../utils/truthy"

export interface IssueListItemProps {
  issue: IssueListItemFragment
}

export function IssueListItem({ issue }: IssueListItemProps) {
  const updatedAt = new Date(issue.updatedAt)
  const status = getIssueStatus(issue)

  return (
    <List.Item
      id={issue.id}
      title={issue.title}
      subtitle={{
        tooltip: `Repository: ${issue.repository.nameWithOwner}`,
        value: `#${issue.number}`,
      }}
      icon={{ tooltip: `Status: ${status.text}`, value: status.icon }}
      keywords={[issue.number.toString()]}
      accessories={[
        issue.comments.totalCount && {
          icon: Icon.Bubble,
          text: issue.comments.totalCount + "",
        },
        {
          date: updatedAt,
          tooltip: formatUpdatedAt(updatedAt),
        },
      ].filter(truthy)}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={issue.url} />
          <Action.CopyToClipboard content={issue.url} title="Copy URL" />
        </ActionPanel>
      }
    />
  )
}
