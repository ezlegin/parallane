import { Button } from "./ui/button"

const StopWondering = () => {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
          Your next chapter starts here.
        </p>

        <h2 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
          Stop wondering what to learn next.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Pick a roadmap. Start learning. Build something real.
        </p>

        <Button size="lg" className="h-12">
          Expore Roadmaps →
        </Button>
      </div>
    </section>
  )
}

export default StopWondering
