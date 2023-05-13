import { from } from "nearest-color"
import { Color } from "@raycast/api"

const nearestColor = from({
  blue: "#0000FF",
  green: "#008000",
  magenta: "#FF00FF",
  orange: "#FFA500",
  purple: "#800080",
  red: "#FF0000",
  yellow: "#FFFF00",
})

const map: Record<string, Color> = {
  blue: Color.Blue,
  green: Color.Green,
  magenta: Color.Magenta,
  orange: Color.Orange,
  purple: Color.Purple,
  red: Color.Red,
  yellow: Color.Yellow,
}

export function matchColor(color: string | null): Color | null {
  return color ? map[nearestColor(color).name] ?? null : null
}
