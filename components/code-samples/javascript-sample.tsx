import { Kw, Plain, Punct, Str } from "./tokens"

export function JavaScriptSample() {
  return (
    <>
      <Kw>const</Kw> <Plain>stack</Plain> <Punct>=</Punct> <Punct>[</Punct>
      <Str>{'"React"'}</Str>
      <Punct>,</Punct> <Str>{'"Node"'}</Str>
      <Punct>,</Punct> <Str>{'"SQL"'}</Str>
      <Punct>]</Punct>
      {"\n\n"}
      <Kw>const</Kw> <Plain>upper</Plain> <Punct>=</Punct> <Plain>stack</Plain>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Punct>.</Punct>
      <Plain>filter</Plain>
      <Punct>(</Punct>
      <Plain>skill</Plain> <Punct>{"=>"}</Punct> <Plain>skill</Plain>
      <Punct>.</Punct>
      <Plain>length</Plain> <Punct>{">"}</Punct> <Str>3</Str>
      <Punct>)</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Punct>.</Punct>
      <Plain>map</Plain>
      <Punct>(</Punct>
      <Plain>skill</Plain> <Punct>{"=>"}</Punct> <Plain>skill</Plain>
      <Punct>.</Punct>
      <Plain>toUpperCase</Plain>
      <Punct>()</Punct>
      <Punct>)</Punct>
      {"\n\n"}
      <Kw>function</Kw> <Plain>summary</Plain>
      <Punct>(</Punct>
      <Plain>skills</Plain>
      <Punct>)</Punct> {" {"}
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>return</Kw> <Punct>{"{"}</Punct>
      {"\n"}
      <Plain>{"    "}</Plain>
      <Plain>count</Plain>
      <Punct>:</Punct> <Plain>skills</Plain>
      <Punct>.</Punct>
      <Plain>length</Plain>
      <Punct>,</Punct>
      {"\n"}
      <Plain>{"    "}</Plain>
      <Plain>top</Plain>
      <Punct>:</Punct> <Plain>skills</Plain>
      <Punct>[</Punct>
      <Str>0</Str>
      <Punct>]</Punct>
      <Punct>,</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Punct>{"}"}</Punct>
      {"\n"}
      <Punct>{"}"}</Punct>
      {"\n\n"}
      <Plain>console</Plain>
      <Punct>.</Punct>
      <Plain>log</Plain>
      <Punct>(</Punct>
      <Plain>summary</Plain>
      <Punct>(</Punct>
      <Plain>upper</Plain>
      <Punct>))</Punct>
      {"\n"}
      <Punct>{"//"}</Punct> <Str>{'→ { count: 2, top: "REACT" }'}</Str>
    </>
  )
}
