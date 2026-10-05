import { Kw, Plain, Punct, Str } from "./tokens"

export function HtmlSample() {
  return (
    <>
      <Kw>{"<section"}</Kw> <Kw>class</Kw>
      <Punct>=</Punct>
      <Str>{'"hero"'}</Str>
      <Kw>{">"}</Kw>
      {"\n"}
      {/* Header */}
      <Plain>{"  "}</Plain>
      <Kw>{"<header"}</Kw> <Kw>class</Kw>
      <Punct>=</Punct>
      <Str>{'"hero__header"'}</Str>
      <Kw>{">"}</Kw>
      {"\n"}
      <Plain>{"    "}</Plain>
      <Kw>{"<nav>"}</Kw>
      {"\n"}
      <Plain>{"      "}</Plain>
      <Kw>{"<a"}</Kw> <Kw>href</Kw>
      <Punct>=</Punct>
      <Str>{'"/"'}</Str>
      <Kw>{">"}</Kw>
      <Plain>{"Home"}</Plain>
      <Kw>{"</a>"}</Kw>
      {"\n"}
      <Plain>{"      "}</Plain>
      <Kw>{"<a"}</Kw> <Kw>href</Kw>
      <Punct>=</Punct>
      <Str>{'"/courses"'}</Str>
      <Kw>{">"}</Kw>
      <Plain>{"Courses"}</Plain>
      <Kw>{"</a>"}</Kw>
      {"\n"}
      <Plain>{"    "}</Plain>
      <Kw>{"</nav>"}</Kw>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>{"</header>"}</Kw>
      {"\n\n"}
      {/* Hero content */}
      <Plain>{"  "}</Plain>
      <Kw>{"<main>"}</Kw>
      {"\n"}
      <Plain>{"    "}</Plain>
      <Kw>{"<h1>"}</Kw>
      <Plain>{"Learn by building."}</Plain>
      <Kw>{"</h1>"}</Kw>
      {"\n"}
      <Plain>{"    "}</Plain>
      <Kw>{"<p>"}</Kw>
      <Plain>{"Real projects. Real skills."}</Plain>
      <Kw>{"</p>"}</Kw>
      {"\n\n"}
      {/* Figure */}
      <Plain>{"    "}</Plain>
      <Kw>{"<figure>"}</Kw>
      {"\n"}
      <Plain>{"      "}</Plain>
      <Kw>{"<img"}</Kw> <Kw>src</Kw>
      <Punct>=</Punct>
      <Str>{'"hero.png"'}</Str> <Kw>alt</Kw>
      <Punct>=</Punct>
      <Str>{'"Dashboard preview"'}</Str>
      <Kw>{"/>"}</Kw>
      {"\n"}
      <Plain>{"      "}</Plain>
      <Kw>{"<figcaption>"}</Kw>
      <Plain>{"Built in week one."}</Plain>
      <Kw>{"</figcaption>"}</Kw>
      {"\n"}
      <Plain>{"    "}</Plain>
      <Kw>{"</figure>"}</Kw>
      {"\n\n"}
      {/* CTA */}
      <Plain>{"    "}</Plain>
      <Kw>{"<a"}</Kw> <Kw>href</Kw>
      <Punct>=</Punct>
      <Str>{'"/start"'}</Str> <Kw>class</Kw>
      <Punct>=</Punct>
      <Str>{'"btn btn--primary"'}</Str>
      <Kw>{">"}</Kw>
      {"\n"}
      <Plain>{"      Get started"}</Plain>
      {"\n"}
      <Plain>{"    "}</Plain>
      <Kw>{"</a>"}</Kw>
      {"\n"}
      <Plain>{"  "}</Plain>
      <Kw>{"</main>"}</Kw>
      {"\n"}
      <Kw>{"</section>"}</Kw>
    </>
  )
}
