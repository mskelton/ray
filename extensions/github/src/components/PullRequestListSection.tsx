import { List } from "@raycast/api"
import { PullRequestSectionFragment } from "../generated/graphql"
import { countCollection } from "../utils/count"
import { PullRequestListItem } from "./PullRequestListItem"

export interface PullRequestListSectionProps extends List.Section.Props {
  pulls?: PullRequestSectionFragment[] | null
}

export function PullRequestListSection({
  pulls,
  ...props
}: PullRequestListSectionProps) {
  return (
    <List.Section subtitle={countCollection(pulls, "Pull Request")} {...props}>
      {(pulls ?? []).map((pull) => (
        <PullRequestListItem key={pull.id} pull={pull} />
      ))}
    </List.Section>
  )
}
