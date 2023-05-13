import { List } from "@raycast/api"
import { PullRequestSectionFragment } from "../generated/graphql"
import { PullRequestListItem } from "./PullRequestListItem"

export interface PullRequestListSectionProps {
  pulls?: (PullRequestSectionFragment | null | undefined)[] | null
  title: string
}

export function PullRequestListSection({
  pulls,
  title,
}: PullRequestListSectionProps) {
  return (
    <List.Section title={title}>
      {pulls.map((pull) => (
        <PullRequestListItem key={pull.id} pull={pull} />
      ))}
    </List.Section>
  )
}
