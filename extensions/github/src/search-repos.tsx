import { useState } from "react"
import { getPreferenceValues, List } from "@raycast/api"
import { Repository } from "./components/RepositoryListItem"
import { RepositoryListSection } from "./components/RepositoryListSection"
import { Pager } from "./utils/types"
import { useQuery } from "./utils/useQuery"

interface QueryResponse {
  search: Pager<Repository>
}

const QUERY = `
query SearchRepositoriesQuery($search: String!) {
  search(first: 20, query: $search, type: REPOSITORY) {
    nodes {
      ... on Repository {
        id
        url
        name
        owner {
          login
        }
        openGraphImageUrl
        updatedAt
        viewerHasStarred
        stargazerCount
      }
    }
  }
}
`

export default function SearchRepositories() {
  const preferences = getPreferenceValues()
  const [search, setSearch] = useState("")
  const query = `${preferences.query} ${search}`

  const { data, isLoading } = useQuery<QueryResponse>({
    enabled: !!search,
    errorMessage: "Could not load repositories",
    query: QUERY,
    variables: { search: `is:repo ${query}` },
  })

  const repos = data?.search.nodes ?? []

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Filter repositories by name..."
      onSearchTextChange={(search) => setSearch(search)}
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
