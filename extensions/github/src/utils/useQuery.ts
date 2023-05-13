import { useFetch } from "@raycast/utils"
import { getPreferenceValues, showToast, Toast } from "@raycast/api"

type Variables = Record<string, unknown>

interface GraphQLResponse<T> {
  data: T
  errors?: {
    message: string
  }[]
}

interface UseQueryOptions {
  enabled?: boolean
  errorMessage: string
  query: string
  variables?: Variables
}

export function useQuery<T>({
  enabled = true,
  errorMessage,
  query,
  variables,
}: UseQueryOptions) {
  const preferences = getPreferenceValues()

  return useFetch<T>("https://api.github.com/graphql", {
    body: JSON.stringify({ query, variables }),
    execute: enabled,
    headers: {
      Authorization: `Bearer ${preferences.token}`,
    },
    keepPreviousData: true,
    method: "POST",
    onError() {
      showToast(Toast.Style.Failure, errorMessage)
    },
    async parseResponse(response) {
      const { data, errors } = (await response.json()) as GraphQLResponse<T>

      if (errors?.length) {
        throw new Error(errors[0].message)
      }

      return data
    },
  })
}
