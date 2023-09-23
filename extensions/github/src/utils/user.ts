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

  const text = (user.name ? user.name : user.login) ?? "-"
  return {
    icon: {
      tooltip: text,
      value: {
        mask: Image.Mask.Circle,
        source: user?.avatarUrl,
      },
    },
    text,
  }
}
