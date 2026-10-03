import { Kw, Plain, Punct, Str } from "./tokens"

export function TypeScriptSample() {
  return (
    <>
      <Kw>interface</Kw> <Kw>Developer</Kw> <Punct>{"{"}</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Plain>name</Plain>
      <Punct>:</Punct> <Kw>string</Kw>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Plain>stack</Plain>
      <Punct>:</Punct> <Kw>string</Kw>
      <Punct>[]</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Plain>years</Plain>
      <Punct>:</Punct> <Kw>number</Kw>
      {"\n"}
      <Punct>{"}"}</Punct>
      {"\n\n"}
      <Kw>function</Kw> <Plain>greet</Plain>
      <Punct>{"<"}</Punct>
      <Plain>T</Plain> <Kw>extends</Kw> <Kw>Developer</Kw>
      <Punct>{">"}</Punct>
      <Punct>(</Punct>
      <Plain>dev</Plain>
      <Punct>:</Punct> <Plain>T</Plain>
      <Punct>)</Punct>
      <Punct>:</Punct> <Kw>string</Kw> {" {"}
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>return</Kw> <Str>{"`Hello, ${dev.name}`"}</Str>
      {"\n"}
      <Punct>{"}"}</Punct>
    </>
  )
}
