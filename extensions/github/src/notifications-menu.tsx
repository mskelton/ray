import { useCachedPromise } from "@raycast/utils"
import { Color, getPreferenceValues, Icon, open } from "@raycast/api"
import { getGitHubClient } from "./api/withGitHubClient"
import { MenuBarItem, MenuBarRoot } from "./components/Menu"
import View from "./components/View"

function displayTitlePreference() {
  const prefs = getPreferenceValues()
  const val: boolean | undefined = prefs.showCount
  return val == undefined ? true : val
}

function NotificationsMenu() {
  const { octokit } = getGitHubClient()

  const { data, isLoading } = useCachedPromise(
    async () => {
      const result =
        await octokit.rest.activity.listNotificationsForAuthenticatedUser({
          per_page: 50,
        })

      return result.data.map((notification) => notification)
    },
    [],
    { keepPreviousData: true },
  )

  return (
    <MenuBarRoot
      title={displayTitlePreference() && data ? `${data.length}` : undefined}
      icon={{
        source: "notifications.svg",
        tintColor: data?.length ? Color.Blue : Color.PrimaryText,
      }}
      isLoading={isLoading}
      tooltip="GitHub Notifications"
    >
      <MenuBarItem
        title="Open Notifications"
        icon={Icon.Terminal}
        shortcut={{ key: "o", modifiers: ["cmd"] }}
        onAction={() => open("https://github.com/notifications")}
      />
    </MenuBarRoot>
  )
}

export default function Command() {
  return (
    <View>
      <NotificationsMenu />
    </View>
  )
}
