import { CodegenConfig } from "@graphql-codegen/cli"
import * as dotenv from "dotenv"

dotenv.config()

const config: CodegenConfig = {
  documents: ["src/**/*.graphql"],
  generates: {
    "./src/generated/graphql.ts": {
      config: {
        avoidOptionals: true,
        enumsAsTypes: true,
        skipTypename: true,
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
  schema: [
    {
      "https://api.github.com/graphql": {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          "User-Agent": "Raycast",
        },
      },
    },
  ],
}

export default config
