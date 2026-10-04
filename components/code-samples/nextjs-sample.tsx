import { Kw, Plain, Punct } from "./tokens"

export function NextJsSample() {
  return (
    <>
      <Kw>async</Kw> <Kw>function</Kw> <Kw>Page</Kw>
      <Punct>(</Punct>
      <Plain>{"{ params }"}</Plain>
      <Punct>)</Punct> {" {"}
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>const</Kw> <Plain>{"{ slug }"}</Plain> <Punct>=</Punct> <Kw>await</Kw>{" "}
      <Plain>params</Plain>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>const</Kw> <Plain>course</Plain> <Punct>=</Punct> <Kw>await</Kw>{" "}
      <Plain>prisma</Plain>
      <Punct>.</Punct>
      <Plain>course</Plain>
      <Punct>.</Punct>
      <Plain>findUnique</Plain>
      <Punct>(</Punct>
      {"{"}
      {"\n"}
      <Plain>{"    "}</Plain>
      <Plain>where</Plain>
      <Punct>:</Punct> {" {"} <Plain>slug</Plain> {" }"}
      <Punct>,</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      {"}"}
      <Punct>)</Punct>
      {"\n\n"}
      <Plain>{"  "}</Plain>
      <Kw>return</Kw> <Kw>{"<CourseHero"}</Kw> <Kw>course</Kw>
      <Punct>=</Punct>
      <Punct>{"{"}</Punct>
      <Plain>course</Plain>
      <Punct>{"}"}</Punct> <Kw>{"/>"}</Kw>
      {"\n"}
      <Punct>{"}"}</Punct>
    </>
  )
}
