import { CodeWindow } from "@/components/code-window"
import { HtmlSample } from "./html-sample"
import { CssSample } from "./css-sample"
import { ReactSample } from "./react-sample"
import { JavaScriptSample } from "./javascript-sample"
import { TypeScriptSample } from "./typescript-sample"
import { MySqlSample } from "./mysql-sample"
import { NodeSample } from "./node-sample"
import { NextJsSample } from "./nextjs-sample"
import { GitSample } from "./git-sample"
import { DockerSample } from "./docker-sample"
import { DesignSample } from "./design-sample"
import { FigmaBasicSample } from "./figma-basic-sample"
import { FigmaAdvancedSample } from "./figma-advanced-sample."

export type Language =
  | "html"
  | "css"
  | "react"
  | "javascript"
  | "typescript"
  | "mysql"
  | "node"
  | "nextjs"
  | "git"
  | "docker"
  | "web-design"
  | "figma-basic"
  | "figma-advanced"

const SAMPLES: Record<Language, { label: string; Component: React.FC }> = {
  html: { label: "HTML", Component: HtmlSample },
  css: { label: "CSS", Component: CssSample },
  react: { label: "React", Component: ReactSample },
  javascript: { label: "JavaScript", Component: JavaScriptSample },
  typescript: { label: "TypeScript", Component: TypeScriptSample },
  mysql: { label: "MySQL", Component: MySqlSample },
  node: { label: "Node.js", Component: NodeSample },
  nextjs: { label: "Next.js", Component: NextJsSample },
  git: { label: "Git", Component: GitSample },
  docker: { label: "Docker", Component: DockerSample },
  "web-design": { label: "Design", Component: DesignSample },
  "figma-basic": { label: "Figma", Component: FigmaBasicSample },
  "figma-advanced": { label: "Figma", Component: FigmaAdvancedSample },
}

export function LanguageSample({
  language,
  className,
}: {
  language: Language
  className?: string
}) {
  const { label, Component } = SAMPLES[language]

  return (
    <CodeWindow language={label} className={className}>
      <Component />
    </CodeWindow>
  )
}

export {
  HtmlSample,
  CssSample,
  ReactSample,
  JavaScriptSample,
  TypeScriptSample,
  MySqlSample,
  NodeSample,
  NextJsSample,
  GitSample,
  DockerSample,
}
