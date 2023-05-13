export function timeAgo(date: string) {
  const formatter = new Intl.RelativeTimeFormat("en")
  const ranges = {
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    years: 3600 * 24 * 365,
  }

  const secondsElapsed = (new Date(date).getTime() - Date.now()) / 1000

  for (const [unit, range] of Object.entries(ranges)) {
    if (range < Math.abs(secondsElapsed)) {
      return formatter.format(
        Math.round(secondsElapsed / range),
        unit as Intl.RelativeTimeFormatUnit
      )
    }
  }

  return "Just now"
}

export function updatedAt(date: Date) {
  const formatted = date.toLocaleString(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  })

  return `Updated: ${formatted}`
}
