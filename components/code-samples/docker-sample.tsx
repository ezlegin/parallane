import { Kw, Plain, Punct, Str } from "./tokens"

export function DockerSample() {
  return (
    <>
      <Kw>FROM</Kw> <Plain>node:20-alpine</Plain>
      {"\n\n"}
      <Kw>WORKDIR</Kw> <Plain>/app</Plain>
      {"\n"}
      <Kw>COPY</Kw> <Plain>package*.json</Plain> <Plain>./</Plain>
      {"\n"}
      <Kw>RUN</Kw> <Plain>npm ci</Plain>
      {"\n\n"}
      <Kw>COPY</Kw> <Plain>.</Plain> <Plain>.</Plain>
      {"\n"}
      <Kw>RUN</Kw> <Plain>npm run build</Plain>
      {"\n\n"}
      <Kw>EXPOSE</Kw> <Str>3000</Str>
      {"\n"}
      <Kw>CMD</Kw> <Punct>[</Punct>
      <Str>{'"npm"'}</Str>
      <Punct>,</Punct> <Str>{'"start"'}</Str>
      <Punct>]</Punct>
    </>
  )
}
