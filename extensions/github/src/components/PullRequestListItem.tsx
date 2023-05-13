import { Action, ActionPanel, Icon, List } from "@raycast/api"
import { PullRequestSectionFragment } from "../generated/graphql"
import { usePullDraftMutation } from "../hooks/usePullDraftMutation"
import { formatUpdatedAt } from "../utils/format"
import {
  getCheckStatus,
  getPullRequestStatus,
  getReviewDecision,
} from "../utils/pulls"
import { truthy } from "../utils/truthy"

export interface PullRequestListItemProps {
  pull: PullRequestSectionFragment
}

export function PullRequestListItem({ pull }: PullRequestListItemProps) {
  const [mutate, { isDraft }] = usePullDraftMutation(pull)
  const status = getPullRequestStatus(pull)
  const updatedAt = new Date(pull.updatedAt)

  return (
    <List.Item
      id={pull.id}
      title={pull.title}
      subtitle={{
        tooltip: `Repository: ${pull.repository.nameWithOwner}`,
        value: `#${pull.number}`,
      }}
      icon={{
        tooltip: `Status: ${status.text}`,
        value: status.icon,
      }}
      accessories={[
        getCheckStatus(pull),
        pull.comments.totalCount && {
          icon: Icon.Bubble,
          text: pull.comments.totalCount.toString(),
        },
        getReviewDecision(pull),
        {
          date: updatedAt,
          tooltip: formatUpdatedAt(updatedAt),
        },
      ].filter(truthy)}
      keywords={pull.repository.nameWithOwner.split("/")}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={pull.url} />
          <Action.CopyToClipboard content={pull.url} title="Copy URL" />

          {pull.state === "OPEN" && (
            <Action
              icon={isDraft ? Icon.Eye : Icon.EyeDisabled}
              shortcut={{ key: ".", modifiers: ["cmd"] }}
              title={isDraft ? "Ready for Review" : "Mark as Draft"}
              onAction={mutate}
            />
          )}
        </ActionPanel>
      }
    />
  )
}
