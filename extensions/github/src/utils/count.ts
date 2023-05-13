export function collectionCount(
  collection: unknown[] | null | undefined,
  singular: string,
  plural?: string
) {
  const count = collection?.length ?? 0

  return count === 1
    ? `${count} ${singular}`
    : `${count} ${plural ?? singular + "s"}`
}
