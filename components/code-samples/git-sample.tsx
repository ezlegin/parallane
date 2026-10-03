import { Kw, Plain, Str } from "./tokens"

function Line({ cmd, args }: { cmd: string; args: React.ReactNode }) {
  return (
    <>
      <span className="text-muted-foreground/50 select-none">$ </span>
      <Kw>{cmd}</Kw> <Plain>{args}</Plain>
      {"\n"}
    </>
  )
}

export function GitSample() {
  return (
    <>
      <Line
        cmd="git checkout"
        args={
          <>
            -b <Str>feature/auth</Str>
          </>
        }
      />
      <Line cmd="git add" args={<Str>.</Str>} />
      <Line
        cmd="git commit"
        args={
          <>
            -m <Str>{'"feat: add login"'}</Str>
          </>
        }
      />
      <Line
        cmd="git push"
        args={
          <>
            origin <Str>feature/auth</Str>
          </>
        }
      />
    </>
  )
}
