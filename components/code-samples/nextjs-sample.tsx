import { Kw, Plain, Punct } from "./tokens"

export function NextJsSample() {
  return (
    <>
      <Kw>interface</Kw> <Kw>Props</Kw> <Punct>{"{"}</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Plain>params</Plain>
      <Punct>:</Punct> <Plain>Promise</Plain>
      <Punct>{"<"}</Punct>
      <Punct>{"{"}</Punct> <Plain>slug</Plain>
      <Punct>:</Punct> <Kw>string</Kw> <Punct>{"}"}</Punct>
      <Punct>{">"}</Punct>
      {"\n"}
      <Punct>{"}"}</Punct>
      {"\n\n"}
      <Kw>export</Kw> <Kw>async</Kw> <Kw>function</Kw> <Kw>Page</Kw>
      <Punct>(</Punct>
      <Plain>{"{ params }"}</Plain>
      <Punct>:</Punct> <Plain>Props</Plain>
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
      <Plain>{"    "}</Plain>
      <Plain>include</Plain>
      <Punct>:</Punct> {" {"} <Plain>seasons</Plain>
      <Punct>:</Punct> <Kw>true</Kw> {" }"}
      <Punct>,</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      {"}"}
      <Punct>)</Punct>
      {"\n\n"}
      <Plain>{"  "}</Plain>
      <Kw>if</Kw> <Punct>(</Punct>
      <Punct>!</Punct>
      <Plain>course</Plain>
      <Punct>)</Punct> <Kw>notFound</Kw>
      <Punct>()</Punct>
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
