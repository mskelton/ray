import { Color } from "@raycast/api"
import { IssueSectionFragment } from "../generated/graphql"

export function getIssueStatus(issue: IssueSectionFragment) {
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
