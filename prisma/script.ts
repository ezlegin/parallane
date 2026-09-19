import { db } from "./db"

async function main() {
  const users = await db.orm.public.User.select("id", "email", "name")
    .limit(2)
    .all()

  console.log(users)

  await db.close()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
