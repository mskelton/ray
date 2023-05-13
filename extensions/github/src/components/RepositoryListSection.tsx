import { List } from "@raycast/api"
import { RepositoryListItemFragment } from "../generated/graphql"
import { formatCount } from "../utils/format"
import { RepositoryListItem } from "./RepositoryListItem"

export interface RepositoryListSectionProps extends List.Section.Props {
  repos: RepositoryListItemFragment[]
}

export function RepositoryListSection({
  repos,
  ...props
}: RepositoryListSectionProps) {
  return (
    <List.Section
      subtitle={formatCount(repos, "Repository", "Repositories")}
      {...props}
    >
      {repos.map((repo) => (
        <RepositoryListItem key={repo.id} repo={repo} />
      ))}
    </List.Section>
  )
}
