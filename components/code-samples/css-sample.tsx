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
      <Kw>gap</Kw>
      <Punct>:</Punct> <Str>1.5rem</Str>
      <Punct>;</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>padding</Kw>
      <Punct>:</Punct> <Str>5rem 2rem</Str>
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
      <Kw>font-size</Kw>
      <Punct>:</Punct> <Str>clamp(2rem, 6vw, 4rem)</Str>
      <Punct>;</Punct>
      {"\n"}
      <Punct>{"}"}</Punct>
      {"\n\n"}
      <Kw>{".btn"}</Kw> <Punct>{"{"}</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>padding</Kw>
      <Punct>:</Punct> <Str>0.75rem 1.5rem</Str>
      <Punct>;</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>border-radius</Kw>
      <Punct>:</Punct> <Str>9999px</Str>
      <Punct>;</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>transition</Kw>
      <Punct>:</Punct> <Str>transform 0.2s ease</Str>
      <Punct>;</Punct>
      {"\n\n"}
      <Plain>{"  "}</Plain>
      <Kw>{"&:hover"}</Kw> <Punct>{"{"}</Punct>
      {"\n"}
      <Plain>{"    "}</Plain>
      <Kw>transform</Kw>
      <Punct>:</Punct> <Str>translateY(-2px)</Str>
      <Punct>;</Punct>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Punct>{"}"}</Punct>
      {"\n"}
      <Punct>{"}"}</Punct>
    </>
  )
}
