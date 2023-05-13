import { Action, ActionPanel, Icon, Image, List } from "@raycast/api"
import { IssueSectionFragment } from "../generated/graphql"
import { updatedAt } from "../utils/format"
import { truthy } from "../utils/truthy"

function getStateIcon(issue: IssueSectionFragment): Image.ImageLike {
  return issue.state === "OPEN"
    ? { source: "icons/issue-opened.png" }
    : { source: "icons/issue-closed.png" }
}

export interface IssueListItemProps {
  issue: IssueSectionFragment
}

export function IssueListItem({ issue }: IssueListItemProps) {
  const date = new Date(issue.updatedAt)

  return (
    <List.Item
      id={issue.id}
      title={issue.title}
      subtitle={`#${issue.number}`}
      icon={getStateIcon(issue)}
      keywords={[issue.number + ""]}
      accessories={[
        issue.comments.totalCount && {
          icon: Icon.Bubble,
          text: issue.comments.totalCount + "",
        },
        {
          date,
          tooltip: updatedAt(date),
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
