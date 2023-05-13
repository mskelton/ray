import { List } from "@raycast/api"
import { IssueListItemFragment } from "../generated/graphql"
import { formatCount } from "../utils/format"
import { IssueListItem } from "./IssueListItem"

export interface IssueListSectionProps extends List.Section.Props {
  issues?: IssueListItemFragment[] | null
}

export function IssueListSection({ issues, ...props }: IssueListSectionProps) {
  return (
    <List.Section subtitle={formatCount(issues, "Issue")} {...props}>
      {(issues ?? []).map((issue) => (
        <IssueListItem key={issue.id} issue={issue} />
      ))}
    </List.Section>
  )
}
