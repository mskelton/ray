import React from "react"
import { ReactNode } from "react"
import {
  environment,
  getPreferenceValues,
  Icon,
  Image,
  Keyboard,
  launchCommand,
  LaunchType,
  MenuBarExtra,
  openCommandPreferences,
} from "@raycast/api"

function clipText(text: string) {
  const maxLength = 100
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + " ..."
  }
  return text
}

export function MenuBarRoot(props: {
  children?: React.ReactNode
  error?: string | undefined
  icon?: Image.ImageLike
  isLoading?: boolean
  title?: string
  tooltip?: string
}): JSX.Element {
  const error = props.error
  const reloadMenu = () => {
    launchCommand({
      name: environment.commandName,
      type: LaunchType.UserInitiated,
    })
  }

  return (
    <MenuBarExtra
      icon={props.icon}
      isLoading={props.isLoading}
      title={props.title}
      tooltip={props.tooltip}
    >
      {error ? (
        <MenuBarItem
          title={`Error: ${error}`}
          icon={{ source: Icon.Warning }}
          onAction={reloadMenu}
        />
      ) : (
        props.children
      )}
    </MenuBarExtra>
  )
}

export function MenuBarItem(props: {
  icon?: Image.ImageLike
  onAction?: ((event: object) => void) | undefined
  shortcut?: Keyboard.Shortcut | undefined
  subtitle?: string
  title: string
  tooltip?: string
}): JSX.Element {
  return (
    <MenuBarExtra.Item
      title={clipText(props.title)}
      icon={props.icon}
      subtitle={props.subtitle}
      shortcut={props.shortcut}
      onAction={props.onAction}
      tooltip={props.tooltip}
    />
  )
}

function shownElements(
  elements?: ReactNode,
  maxElements?: number
): { hidden: number; shown?: ReactNode } {
  if (!maxElements) {
    return { hidden: 0, shown: elements }
  }
  if (React.isValidElement(elements)) {
    return { hidden: 0, shown: [elements] }
  }
  const els = elements as JSX.Element[] | undefined
  if (!els || els.length <= 0) {
    return { hidden: 0, shown: undefined }
  }
  const maxShown = maxElements || 10
  const shown = els.slice(0, maxShown)
  const hidden = els.length - shown.length
  return { hidden, shown }
}

function joinNonEmpty(
  parts?: (string | undefined)[],
  separator?: string | undefined
): string | undefined {
  if (!parts || parts.length <= 0) {
    return undefined
  }
  return parts.join(separator)
}

export function MenuBarSection(props: {
  children?: ReactNode
  emptyElement?: JSX.Element | null
  maxChildren?: number
  moreElement?: (hidden: number) => JSX.Element | null
  subtitle?: string
  title?: string
}): JSX.Element | null {
  const title = joinNonEmpty(
    [props.title, props.subtitle].filter((e) => e),
    " "
  )
  const { hidden, shown } = shownElements(props.children, props.maxChildren)
  const empty = shown === undefined || (shown as object[]).length <= 0
  return (
    <MenuBarExtra.Section title={title}>
      {shown}
      {hidden > 0 && props.moreElement && props.moreElement(hidden)}
      {empty && props.emptyElement && props.emptyElement}
    </MenuBarExtra.Section>
  )
}

export function MenuBarSubmenu(props: {
  children?: ReactNode
  icon?: Image.ImageLike | undefined
  subtitle?: string
  title: string
}): JSX.Element {
  const title =
    joinNonEmpty(
      [props.title, props.subtitle].filter((e) => e),
      " "
    ) || ""
  return (
    <MenuBarExtra.Submenu title={title} icon={props.icon}>
      {props.children}
    </MenuBarExtra.Submenu>
  )
}

export function MenuBarItemConfigureCommand(): JSX.Element {
  return (
    <MenuBarExtra.Item
      title="Configure Command"
      shortcut={{ key: ",", modifiers: ["cmd"] }}
      icon={Icon.Gear}
      onAction={() => openCommandPreferences()}
    />
  )
}

export function getBoundedPreferenceNumber(params: {
  default?: number
  max?: number
  min?: number
  name: string
}): number {
  const boundMin = params.min || 1
  const boundMax = params.max || 100
  const fallback = params.default || 10
  const prefs = getPreferenceValues()
  const maxtext = (prefs[params.name] as string) || ""
  const max = Number(maxtext)
  if (isNaN(max)) {
    return fallback
  }
  if (max < boundMin) {
    return fallback
  }
  if (max > boundMax) {
    return fallback
  }
  return max
}
