import LoginForm from "@/components/forms/login/LoginForm"
import ParallaneLogo from "@/components/ParallaneLogo"
import Link from "next/link"

const page = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-3">
        <Link href={"/"}>
          <ParallaneLogo type="typo" width={200} />
        </Link>

        <p className="text-sm text-muted-foreground">
          Welcome to your Parallane account
        </p>
      </div>

      <LoginForm />
    </div>
  )
}

export default page
