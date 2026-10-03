import { Kw, Plain, Punct, Str } from "./tokens"

export function MySqlSample() {
  return (
    <>
      <Kw>SELECT</Kw> <Plain>u.name</Plain>
      <Punct>,</Punct> <Plain>c.title</Plain>
      {"\n"}
      <Kw>FROM</Kw> <Plain>users</Plain> <Plain>u</Plain>
      {"\n"}
      <Kw>JOIN</Kw> <Plain>enrollments</Plain> <Plain>e</Plain> <Kw>ON</Kw>{" "}
      <Plain>e.user_id</Plain> <Punct>=</Punct> <Plain>u.id</Plain>
      {"\n"}
      <Kw>JOIN</Kw> <Plain>courses</Plain> <Plain>c</Plain> <Kw>ON</Kw>{" "}
      <Plain>c.id</Plain> <Punct>=</Punct> <Plain>e.course_id</Plain>
      {"\n"}
      <Kw>WHERE</Kw> <Plain>u.country</Plain> <Punct>=</Punct>{" "}
      <Str>{"'IR'"}</Str>
      {"\n"}
      <Kw>ORDER BY</Kw> <Plain>e.enrolled_at</Plain> <Kw>DESC</Kw>
      {"\n"}
      <Kw>LIMIT</Kw> <Str>10</Str>
      <Punct>;</Punct>
    </>
  )
}
