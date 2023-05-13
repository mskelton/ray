import { List } from "@raycast/api"
import { PullRequestListItemFragment } from "../generated/graphql"
import { formatCount } from "../utils/format"
import { PullRequestListItem } from "./PullRequestListItem"

export interface PullRequestListSectionProps extends List.Section.Props {
  pulls?: PullRequestListItemFragment[] | null
}

export function PullRequestListSection({
  pulls,
  ...props
}: PullRequestListSectionProps) {
  return (
    <List.Section subtitle={formatCount(pulls, "Pull Request")} {...props}>
      {(pulls ?? []).map((pull) => (
        <PullRequestListItem key={pull.id} pull={pull} />
      ))}
    </List.Section>
  )
}
