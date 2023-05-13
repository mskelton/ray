import { Action, ActionPanel, Icon, Image, List } from "@raycast/api"
import { RepositoryListItemFragment } from "../generated/graphql"
import { matchColor } from "../utils/color"
import { formatUpdatedAt } from "../utils/format"
import { truthy } from "../utils/truthy"
import { PullRequests } from "./PullRequests"

export interface RepositoryListItemProps {
  repo: RepositoryListItemFragment
}

export function RepositoryListItem({ repo }: RepositoryListItemProps) {
  const updatedAt = new Date(repo.updatedAt)

  return (
    <List.Item
      id={repo.id}
      title={repo.name}
      subtitle={{
        tooltip: `Number of Stars: ${repo.stargazerCount}`,
        value: repo.stargazerCount.toString(),
      }}
      icon={{
        mask: Image.Mask.Circle,
        source: repo.owner.avatarUrl,
        tooltip: repo.owner.login,
      }}
      accessories={[
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
            target={<PullRequests repo={repo} />}
            shortcut={{ key: ".", modifiers: ["cmd"] }}
            icon={Icon.List}
            title="View Pull Requests"
          />
        </ActionPanel>
      }
    />
  )
}
