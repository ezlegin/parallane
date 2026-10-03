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
      <Plain>console</Plain>
      <Punct>.</Punct>
      <Plain>log</Plain>
      <Punct>(</Punct>
      <Plain>upper</Plain>
      <Punct>)</Punct>
    </>
  )
}
