import { Action, ActionPanel, Color, Icon, List } from "@raycast/api"
import { RepositoryListItemFragment } from "../generated/graphql"
import { matchColor } from "../utils/color"
import { formatUpdatedAt } from "../utils/format"
import { truthy } from "../utils/truthy"
import { getGitHubUser } from "../utils/user"
import { RepositoryPullRequests } from "./RepositoryPullRequests"

export interface RepositoryListItemProps {
  repo: RepositoryListItemFragment
}

export function RepositoryListItem({ repo }: RepositoryListItemProps) {
  const updatedAt = new Date(repo.updatedAt)
  const owner = getGitHubUser(repo.owner)

  return (
    <List.Item
      id={repo.id}
      title={repo.name}
      subtitle={
        repo.stargazerCount
          ? {
              tooltip: `Number of Stars: ${repo.stargazerCount}`,
              value: repo.stargazerCount.toString(),
            }
          : undefined
      }
      icon={owner.icon}
      accessories={[
        repo.viewerHasStarred && {
          icon: { source: Icon.Star, tintColor: Color.Yellow },
          tooltip: "You have starred this repository",
        },
        repo.primaryLanguage && {
          tag: {
            color: matchColor(repo.primaryLanguage.color),
            value: repo.primaryLanguage.name,
          },
        },
        {
          date: updatedAt,
          tooltip: formatUpdatedAt(updatedAt),
        },
      ].filter(truthy)}
      keywords={[repo.owner.login]}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={repo.url} />
          <Action.CopyToClipboard content={repo.url} title="Copy URL" />
          <Action.Push
            target={<RepositoryPullRequests repo={repo} />}
            shortcut={{ key: ".", modifiers: ["cmd"] }}
            icon={Icon.List}
            title="View Pull Requests"
          />
        </ActionPanel>
      }
    />
  )
}
