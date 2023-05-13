export function formatUpdatedAt(date: Date) {
  const formatted = date.toLocaleString(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  })

  return `Updated: ${formatted}`
}

export function formatCount(
  collection: unknown[] | null | undefined,
  singular: string,
  plural?: string
) {
  const count = collection?.length ?? 0

  return count === 1
    ? `${count} ${singular}`
    : `${count} ${plural ?? singular + "s"}`
}
