export function formatUpdatedAt(date: Date) {
  const formatted = date.toLocaleString(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  })

  return `Updated: ${formatted}`
}
