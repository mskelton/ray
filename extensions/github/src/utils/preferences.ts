import { getPreferenceValues } from "@raycast/api"

interface Preferences {
  query?: string
  token?: string
}

export default function getPreferences() {
  return getPreferenceValues<Preferences>()
}
