import { useState } from "react"
import { List } from "@raycast/api"
import { RepositoryListSection } from "./components/RepositoryListSection"
import View from "./components/View"
import { useRepoSearch } from "./hooks/useRepoSearch"
import { isRepo } from "./utils/repos"

function SearchRepositories() {
  const [query, setQuery] = useState("")
  const { data, isLoading } = useRepoSearch(query)
  const repos = data?.search.nodes?.filter(isRepo) ?? []

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Filter repositories by name..."
      onSearchTextChange={(search) => setQuery(search)}
      throttle
    >
      <RepositoryListSection
        title="Starred"
        repos={repos.filter((repo) => repo.viewerHasStarred)}
      />

      <RepositoryListSection
        title="All repos"
        repos={repos.filter((repo) => !repo.viewerHasStarred)}
      />
    </List>
  )
}

export default function Command() {
  return (
    <View>
      <SearchRepositories />
    </View>
  )
}
