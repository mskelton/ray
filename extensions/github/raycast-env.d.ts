/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Personal Access Token - Your GitHub personal access token. */
  "token"?: string,
  /** Query - Search query to use for all commands. */
  "query"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-repos` command */
  export type SearchRepos = ExtensionPreferences & {}
  /** Preferences accessible in the `my-prs` command */
  export type MyPrs = ExtensionPreferences & {}
  /** Preferences accessible in the `my-issues` command */
  export type MyIssues = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-repos` command */
  export type SearchRepos = {}
  /** Arguments passed to the `my-prs` command */
  export type MyPrs = {}
  /** Arguments passed to the `my-issues` command */
  export type MyIssues = {}
}
