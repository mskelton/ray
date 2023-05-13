import { Color, Icon } from "@raycast/api"
import { PullRequestListItemFragment } from "../generated/graphql"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPR = (node: any): node is PullRequestListItemFragment =>
  node?.__typename === "PullRequest"

export function getReviewDecision(pull: PullRequestListItemFragment) {
  switch (pull.reviewDecision) {
    case "REVIEW_REQUIRED":
      return { tag: { color: Color.Orange, value: "Review requested" } }

    case "CHANGES_REQUESTED":
      return { tag: { color: Color.Red, value: "Changes requested" } }

    case "APPROVED":
      return { tag: { color: Color.Green, value: "Approved" } }

    default:
      return null
  }
}

export function getCheckStatus(pull: PullRequestListItemFragment) {
  const state = pull.commits.nodes?.[0]?.commit.statusCheckRollup?.state
  if (!state) return null

  switch (state) {
    case "SUCCESS":
      return {
        icon: { source: Icon.Check, tintColor: Color.Green },
        tooltip: "Checks: Success",
      }

    case "ERROR":
    case "FAILURE":
      return {
        icon: { source: Icon.XMarkCircle, tintColor: Color.Red },
        tooltip: "Checks: Failure",
      }

    case "PENDING":
      return {
        icon: { source: Icon.Clock, tintColor: Color.SecondaryText },
        tooltip: "Checks: Pending",
      }

    default:
      return null
  }
}

export function getPullRequestStatus(
  pull: PullRequestListItemFragment,
  isDraft: boolean
) {
  switch (true) {
    case pull.merged:
      return {
        icon: { source: "merge.svg", tintColor: Color.Purple },
        text: "Merged",
      }

    case pull.closed:
      return {
        icon: { source: "pr.svg", tintColor: Color.Red },
        text: "Closed",
      }

    case isDraft:
      return {
        icon: { source: "pr-draft.svg", tintColor: Color.SecondaryText },
        text: "Draft",
      }

    default:
      return {
        icon: { source: "pr.svg", tintColor: Color.Green },
        text: "Open",
      }
  }
}
