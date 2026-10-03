import { Kw, Plain, Punct, Str } from "./tokens"

export function HtmlSample() {
  return (
    <>
      <Kw>{"<section"}</Kw> <Kw>class</Kw>
      <Punct>=</Punct>
      <Str>{'"hero"'}</Str>
      <Kw>{">"}</Kw>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>{"<h1>"}</Kw>
      <Plain>{"Learn by building."}</Plain>
      <Kw>{"</h1>"}</Kw>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>{"<p>"}</Kw>
      <Plain>{"Real projects. Real skills."}</Plain>
      <Kw>{"</p>"}</Kw>
      {"\n"}
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>{"<a"}</Kw> <Kw>href</Kw>
      <Punct>=</Punct>
      <Str>{'"/start"'}</Str>
      <Kw>{">"}</Kw>
      {"\n"}
      <Plain>{"    Get started"}</Plain>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>{"</a>"}</Kw>
      {"\n"}
      <Kw>{"</section>"}</Kw>
    </>
  )
}
