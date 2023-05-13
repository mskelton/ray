import { List } from "@raycast/api"
import { IssueSectionFragment } from "../generated/graphql"
import { countCollection } from "../utils/count"
import { IssueListItem } from "./IssueListItem"

export interface IssueListSectionProps extends List.Section.Props {
  issues?: IssueSectionFragment[] | null
}

export function IssueListSection({ issues, ...props }: IssueListSectionProps) {
  return (
    <List.Section subtitle={countCollection(issues, "Issue")} {...props}>
      {(issues ?? []).map((issue) => (
        <IssueListItem key={issue.id} issue={issue} />
      ))}
    </List.Section>
  )
}
