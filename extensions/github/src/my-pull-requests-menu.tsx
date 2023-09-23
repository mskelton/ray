import { useCachedPromise } from "@raycast/utils"
import {
  Color,
  getPreferenceValues,
  Icon,
  launchCommand,
  LaunchType,
  open,
} from "@raycast/api"
import { getGitHubClient } from "./api/withGitHubClient"
import {
  getBoundedPreferenceNumber,
  MenuBarItem,
  MenuBarItemConfigureCommand,
  MenuBarRoot,
  MenuBarSection,
} from "./components/Menu"
import View from "./components/View"
import { PullRequestSummaryFragment } from "./generated/graphql"
import getPreferences from "./utils/preferences"

async function launchMyPullRequestsCommand(): Promise<void> {
  return launchCommand({
    name: "my-pull-requests",
    type: LaunchType.UserInitiated,
  })
}

function displayTitlePreference() {
  const prefs = getPreferenceValues()
  const val: boolean | undefined = prefs.showtext
  return val == undefined ? true : val
}

function getMaxPullRequestsPreference(): number {
  return getBoundedPreferenceNumber({ name: "maxitems" })
}

function getIcon(pr: PullRequestSummaryFragment): string | null {
  const checkState = pr.commits.nodes
    ? pr.commits.nodes[0]?.commit.statusCheckRollup?.state
    : null
  switch (checkState) {
    case "SUCCESS":
      return "✅"
    case "ERROR":
    case "FAILURE":
      return "⚠️"
    case "PENDING":
      return "⏱️"
    default:
      return null
  }
}

function OpenPullRequestMenu() {
  const { github } = getGitHubClient()
  const preferences = getPreferences()

  const { data, isLoading } = useCachedPromise(
    async () => {
      const result = await github.searchPullRequests({
        count: 50,
        query: `is:pr is:open author:@me archived:false ${preferences.query}`,
      })

      return result.search.nodes?.map(
        (edge) => edge as PullRequestSummaryFragment
      )
    },
    [],
    { keepPreviousData: true }
  )

  return (
    <MenuBarRoot
      title={displayTitlePreference() && data ? `${data.length}` : undefined}
      icon={{ source: "pr.svg", tintColor: Color.PrimaryText }}
      isLoading={isLoading}
      tooltip="GitHub My Open Pull Requests"
    >
      <MenuBarSection title="My Pull Requests">
        <MenuBarItem
          title="Open My Pull Requests"
          icon={Icon.Terminal}
          shortcut={{ key: "o", modifiers: ["cmd"] }}
          onAction={() => launchMyPullRequestsCommand()}
        />
      </MenuBarSection>

      <MenuBarSection
        maxChildren={getMaxPullRequestsPreference()}
        moreElement={(hidden) => (
          <MenuBarItem
            title={`... ${hidden} more`}
            onAction={() => launchMyPullRequestsCommand()}
          />
        )}
        emptyElement={<MenuBarItem title="No Pull Requests" />}
      >
        {data?.map((item) => (
          <MenuBarItem
            key={item.id}
            title={`#${item.number} ${item.title} ${getIcon(item) || ""}`}
            icon="pull-request.svg"
            tooltip={item.repository.nameWithOwner}
            onAction={() => open(item.permalink)}
          />
        ))}
      </MenuBarSection>
      <MenuBarSection>
        <MenuBarItemConfigureCommand />
      </MenuBarSection>
    </MenuBarRoot>
  )
}

export default function Command() {
  return (
    <View>
      <OpenPullRequestMenu />
    </View>
  )
}
