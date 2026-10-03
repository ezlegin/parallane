import { Kw, Plain, Punct, Str } from "./tokens"

export function NodeSample() {
  return (
    <>
      <Kw>import</Kw> <Plain>express</Plain> <Kw>from</Kw>{" "}
      <Str>{'"express"'}</Str>
      {"\n\n"}
      <Kw>const</Kw> <Plain>app</Plain> <Punct>=</Punct> <Plain>express</Plain>
      <Punct>()</Punct>
      {"\n\n"}
      <Plain>app</Plain>
      <Punct>.</Punct>
      <Plain>get</Plain>
      <Punct>(</Punct>
      <Str>{'"/api/courses"'}</Str>
      <Punct>,</Punct> <Kw>async</Kw> <Punct>(</Punct>
      <Plain>req, res</Plain>
      <Punct>)</Punct> <Punct>{"=>"}</Punct> {" {"}
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>const</Kw> <Plain>courses</Plain> <Punct>=</Punct> <Kw>await</Kw>{" "}
      <Plain>Course</Plain>
      <Punct>.</Punct>
      <Plain>findMany</Plain>
      <Punct>()</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Plain>res</Plain>
      <Punct>.</Punct>
      <Plain>json</Plain>
      <Punct>(</Punct>
      <Plain>courses</Plain>
      <Punct>)</Punct>
      {"\n"}
      <Punct>{"}"}</Punct>
      <Punct>)</Punct>
      {"\n\n"}
      <Plain>app</Plain>
      <Punct>.</Punct>
      <Plain>listen</Plain>
      <Punct>(</Punct>
      <Str>3000</Str>
      <Punct>)</Punct>
    </>
  )
}
