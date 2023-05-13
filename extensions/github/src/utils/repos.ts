import { RepositoryListItemFragment } from "../generated/graphql"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isRepo = (node: any): node is RepositoryListItemFragment =>
  node?.__typename === "Repository"
