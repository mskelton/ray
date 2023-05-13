import { useState } from "react"
import { showToast, Toast } from "@raycast/api"
import { getGitHubClient } from "../api/withGitHubClient"
import { PullRequestSectionFragment } from "../generated/graphql"

function getMessage(isDraft: boolean) {
  return isDraft
    ? {
        failureMessage: "Failed to mark pull request as ready",
        successMessage: "Pull request marked as ready",
      }
    : {
        failureMessage: "Failed to convert pull request to draft",
        successMessage: "Pull request converted to draft",
      }
}

export function usePullDraftMutation(pull: PullRequestSectionFragment) {
  const { github } = getGitHubClient()
  const [isDraft, setIsDraft] = useState(pull.isDraft)

  async function mutate() {
    const message = getMessage(isDraft)

    try {
      if (isDraft) {
        await github.ReadyForReview({ id: pull.id })
      } else {
        await github.ConvertToDraft({ id: pull.id })
      }

      showToast(Toast.Style.Success, message.successMessage)
      setIsDraft(!isDraft)
    } catch (error) {
      console.error(error)
      showToast(Toast.Style.Failure, message.failureMessage)
    }
  }

  return [mutate, { isDraft }] as const
}
