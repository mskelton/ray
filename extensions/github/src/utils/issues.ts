import { Color } from "@raycast/api"
import { IssueListItemFragment } from "../generated/graphql"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isIssue = (node: any): node is IssueListItemFragment =>
  node?.__typename === "Issue"

export function getIssueStatus(issue: IssueListItemFragment) {
  switch (issue.stateReason) {
    case "NOT_PLANNED":
      return {
        color: Color.Purple,
        icon: { source: "skip.svg", tintColor: Color.SecondaryText },
        text: "Closed as not planned",
      }

    case "COMPLETED":
      return {
        color: Color.Purple,
        icon: { source: "issue-closed.svg", tintColor: Color.Purple },
        text: "Closed as completed",
      }

    default:
      return {
        color: Color.Green,
        icon: { source: "issue-opened.svg", tintColor: Color.Green },
        text: "Open",
      }
  }
}
