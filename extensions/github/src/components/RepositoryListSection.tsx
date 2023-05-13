import { List } from "@raycast/api"
import { SearchRepoFragmentFragment } from "../generated/graphql"
import { RepositoryListItem } from "./RepositoryListItem"

export interface RepositoryListSectionProps extends List.Section.Props {
  repos: SearchRepoFragmentFragment[]
}

export function RepositoryListSection({
  repos,
  ...props
}: RepositoryListSectionProps) {
  return (
    <List.Section {...props}>
      {repos.map((repo) => (
        <RepositoryListItem key={repo.id} repo={repo} />
      ))}
    </List.Section>
  )
}
