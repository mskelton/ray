import { Action, ActionPanel, Color, Icon, Image, List } from "@raycast/api"
import { SearchRepoFragmentFragment } from "../generated/graphql"
import { timeAgo } from "../utils/format"
import { PullRequests } from "./PullRequests"

export interface RepositoryListItemProps {
  repo: SearchRepoFragmentFragment
}

export function RepositoryListItem({ repo }: RepositoryListItemProps) {
  return (
    <List.Item
      id={repo.id}
      title={repo.name}
      subtitle={repo.owner.login}
      icon={{ mask: Image.Mask.Circle, source: repo.openGraphImageUrl }}
      accessories={[
        {
          icon: {
            source: Icon.Star,
            tintColor: repo.viewerHasStarred ? Color.Yellow : undefined,
          },
          text: repo.stargazerCount + "",
        },
        { text: timeAgo(repo.updatedAt) },
      ]}
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
