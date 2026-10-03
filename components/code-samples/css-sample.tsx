import { Kw, Plain, Punct, Str } from "./tokens"

export function CssSample() {
  return (
    <>
      <Kw>{".hero"}</Kw> <Punct>{"{"}</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>display</Kw>
      <Punct>:</Punct> <Str>flex</Str>
      <Punct>;</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>flex-direction</Kw>
      <Punct>:</Punct> <Str>column</Str>
      <Punct>;</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>gap</Kw>
      <Punct>:</Punct> <Str>1.5rem</Str>
      <Punct>;</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>padding</Kw>
      <Punct>:</Punct> <Str>3rem</Str>
      <Punct>;</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>background</Kw>
      <Punct>:</Punct> <Str>#0a0a0a</Str>
      <Punct>;</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>color</Kw>
      <Punct>:</Punct> <Str>#fafafa</Str>
      <Punct>;</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>border-radius</Kw>
      <Punct>:</Punct> <Str>1rem</Str>
      <Punct>;</Punct>
      {"\n"}
      <Punct>{"}"}</Punct>
    </>
  )
}
