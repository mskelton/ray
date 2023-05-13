import { Icon, Image } from "@raycast/api"

export interface User {
  avatarUrl: string
  login?: string
  name?: string | null
}

export function getGitHubUser(user?: User | null) {
  if (!user) {
    return { icon: Icon.Person, text: "Unknown" }
  }

  return {
    icon: {
      mask: Image.Mask.Circle,
      source: user?.avatarUrl,
      tooltip: (user.name ? user.name : user.login) ?? "-",
    },
    text: (user.name ? user.name : user.login) ?? "-",
  }
}
