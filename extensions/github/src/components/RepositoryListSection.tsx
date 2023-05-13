import { List } from "@raycast/api"
import { SearchRepoFragmentFragment } from "../generated/graphql"
import { collectionCount } from "../utils/count"
import { RepositoryListItem } from "./RepositoryListItem"

export interface RepositoryListSectionProps extends List.Section.Props {
  repos: SearchRepoFragmentFragment[]
}

export function RepositoryListSection({
  repos,
  ...props
}: RepositoryListSectionProps) {
  return (
    <List.Section
      subtitle={collectionCount(repos, "Repository", "Repositories")}
      {...props}
    >
      {repos.map((repo) => (
        <RepositoryListItem key={repo.id} repo={repo} />
      ))}
    </List.Section>
  )
}
