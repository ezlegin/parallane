import { Kw, Plain, Punct, Str } from "./tokens"

export function ReactSample() {
  return (
    <>
      <Kw>function</Kw> <Kw>Counter</Kw>
      <Punct>(</Punct>
      <Plain>{"{ step = 1 }"}</Plain>
      <Punct>)</Punct> {" {"}
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>const</Kw> <Plain>[count, setCount]</Plain> <Punct>=</Punct>{" "}
      <Kw>useState</Kw>
      <Punct>(</Punct>
      <Str>0</Str>
      <Punct>)</Punct>
      {"\n\n"}
      <Plain>{"  "}</Plain>
      <Kw>const</Kw> <Plain>double</Plain> <Punct>=</Punct> <Kw>useMemo</Kw>
      <Punct>(</Punct>
      <Punct>{"() => "}</Punct>
      <Plain>count</Plain> <Punct>*</Punct> <Str>2</Str>
      <Punct>,</Punct> <Punct>[</Punct>
      <Plain>count</Plain>
      <Punct>])</Punct>
      {"\n\n"}
      <Plain>{"  "}</Plain>
      <Kw>return</Kw> <Punct>(</Punct>
      {"\n"}
      <Plain>{"    "}</Plain>
      <Kw>{"<div>"}</Kw>
      {"\n"}
      <Plain>{"      "}</Plain>
      <Kw>{"<button"}</Kw> <Kw>onClick</Kw>
      <Punct>=</Punct>
      <Punct>{"{"}</Punct>
      <Punct>{"() => "}</Punct>
      <Plain>setCount</Plain>
      <Punct>(</Punct>
      <Plain>count</Plain> <Punct>+</Punct> <Plain>step</Plain>
      <Punct>)</Punct>
      <Punct>{"}"}</Punct>
      <Kw>{">"}</Kw>
      {"\n"}
      <Plain>{"        Clicked "}</Plain>
      <Punct>{"{count}"}</Punct>
      <Plain>{" times"}</Plain>
      {"\n"}
      <Plain>{"      "}</Plain>
      <Kw>{"</button>"}</Kw>
      {"\n"}
      <Plain>{"      "}</Plain>
      <Kw>{"<p>"}</Kw>
      <Plain>{"Double: "}</Plain>
      <Punct>{"{double}"}</Punct>
      <Kw>{"</p>"}</Kw>
      {"\n"}
      <Plain>{"    "}</Plain>
      <Kw>{"</div>"}</Kw>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Punct>)</Punct>
      {"\n"}
      <Punct>{"}"}</Punct>
    </>
  )
}
