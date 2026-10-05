import { Card } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Privacy — Parallane",
  description:
    "The rules for using Parallane, and how we handle your data. Written in plain English.",
}

const LAST_UPDATED = "October 5, 2026"

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      {/* Header */}
      <header className="border-b pb-10">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Legal
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-balance md:text-5xl">
          Terms & Privacy
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          The rules for using Parallane, and how we handle your data. We've
          written this in plain English — no legal jargon, no traps. If
          something isn't clear, email us and we'll explain it.
        </p>

        <p className="mt-6 text-xs text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      {/* Table of contents */}
      <nav className="border-b py-8">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          On this page
        </p>

        <div className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
          <a href="#terms" className="text-foreground hover:underline">
            Part 1 — Terms of Service
          </a>
          <a href="#privacy" className="text-foreground hover:underline">
            Part 2 — Privacy Policy
          </a>
        </div>
      </nav>

      {/* ============================================== */}
      {/* PART 1 — TERMS */}
      {/* ============================================= */}

      <section id="terms" className="scroll-mt-24 pt-16">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Part 1
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
          Terms of Service
        </h2>

        <div className="mt-10 space-y-12">
          <Clause number="1" title="Accepting these terms">
            <p>
              By creating an account or using Parallane, you agree to these
              terms. If you don't agree, don't use the platform. That's the
              whole deal.
            </p>

            <p>
              You must be at least 13 years old to use Parallane. If you're
              under 18, you need a parent or guardian's permission.
            </p>
          </Clause>

          <Clause number="2" title="Your account">
            <p>
              You're responsible for what happens on your account. Keep your
              password private, use a real email address, and don't share your
              login with anyone else. If someone else uses your account, that's
              your responsibility.
            </p>

            <p>
              We may suspend or delete accounts that break these terms, spam
              other users, or attempt to scrape or copy the platform.
            </p>
          </Clause>

          <Clause number="3" title="Membership and payments">
            <p>
              Parallane is a paid platform. A membership gives you unlimited
              access to every course, roadmap, and feature on the site for a
              fixed period of time.
            </p>

            <p>
              We offer two plans: <strong>monthly</strong> and{" "}
              <strong>annual</strong>. Each payment covers one full period — one
              month or one year — and does{" "}
              <strong>not renew automatically</strong>. When the period ends,
              access ends with it.
            </p>

            <p>
              If you want to continue after your period ends, you simply
              purchase again. There's nothing to cancel, and no recurring charge
              to stop.
            </p>

            <p>
              Prices are shown in euros (EUR) and include any applicable taxes
              unless stated otherwise. We may change prices in the future, but
              any change only affects new purchases — never an existing period
              you've already paid for.
            </p>

            <p>
              Payments are processed by a third-party payment provider. We never
              see or store your full card details.
            </p>
          </Clause>

          <Clause number="4" title="No refunds">
            <p>
              Membership fees are <strong>non-refundable</strong>. When you
              purchase a membership, you're buying access for a fixed period,
              and that access starts immediately.
            </p>

            <p>
              We don't refund partial periods, unused days, or changes of mind.
              Please make sure Parallane is right for you before you purchase —
              browse the free lessons and previews available on every course.
            </p>

            <p>
              That said, we're reasonable people. If you were charged twice,
              charged by mistake, or something genuinely went wrong on our end,
              email us and we'll fix it. That's not a refund policy — it's just
              fixing our mistakes.
            </p>

            <p>
              If you're located in the EU, UK, or another region with a
              statutory cooling-off period: by purchasing a membership and
              accessing course content, you acknowledge that you waive your
              right to withdraw.
            </p>
          </Clause>

          <Clause number="5" title="Course access and licenses">
            <p>
              When you have an active membership, you get a{" "}
              <strong>personal, non-transferable license</strong> to access and
              learn from our courses.
            </p>

            <p>What that means in practice:</p>

            <ul className="ml-5 list-disc space-y-2">
              <li>You can watch, read, and learn from any course.</li>
              <li>
                You can take notes, build projects, and use what you learn in
                your own work.
              </li>
              <li>
                You <strong>cannot</strong> download, re-upload, resell, or
                share our course videos, files, or written content.
              </li>
              <li>
                You <strong>cannot</strong> use our content to train AI models
                or build a competing product.
              </li>
            </ul>

            <p>
              If your membership ends, your access to the courses ends too — but
              your progress and certificates stay in your account.
            </p>
          </Clause>

          <Clause number="6" title="Certificates">
            <p>
              When you complete a course, you'll receive a Parallane certificate
              of completion. It's a real recognition of your work — but it's not
              an accredited degree or a substitute for formal education.
            </p>

            <p>
              We reserve the right to revoke a certificate if we find it was
              obtained by cheating or breaking these terms.
            </p>
          </Clause>

          <Clause number="7" title="What you can't do">
            <p>To keep Parallane a good place to learn, you agree not to:</p>

            <ul className="ml-5 list-disc space-y-2">
              <li>Share your account or login credentials with others.</li>
              <li>Download, record, or redistribute our course content.</li>
              <li>
                Use bots, scrapers, or automated tools to access the platform.
              </li>
              <li>
                Post hateful, harassing, or illegal content in reviews or tutor
                conversations.
              </li>
              <li>
                Attempt to hack, reverse-engineer, or disrupt the platform.
              </li>
              <li>Impersonate another user, tutor, or Parallane staff.</li>
            </ul>

            <p>
              Break these rules and we may suspend or delete your account
              without a refund.
            </p>
          </Clause>

          <Clause number="8" title="Reviews and content you post">
            <p>
              You own what you write. When you post a review, a comment, or a
              message to a tutor, you keep the rights to it — but you give us
              permission to display it on the platform (for example, showing
              your review on a course page).
            </p>

            <p>
              You can only submit one review per course. Reviews are public and
              may be seen by other users. Don't post anything you wouldn't want
              a stranger to read.
            </p>
          </Clause>

          <Clause number="9" title="Ask Tutor">
            <p>
              Ask Tutor is a Q&A feature where you can get help from instructors
              inside a lesson. It's meant for questions about the course
              material.
            </p>

            <p>
              We aim to respond to every question, but we can't guarantee a
              specific response time. If your question is about something
              outside the course, we may not be able to help.
            </p>
          </Clause>

          <Clause number="10" title="Our content">
            <p>
              Everything on Parallane — the videos, code, written lessons,
              design, brand, and logo — belongs to us. You can use what you
              learn, but you can't copy what you see.
            </p>

            <p>
              If you believe we've used your work without permission, email us
              and we'll sort it out.
            </p>
          </Clause>

          <Clause number="11" title="If we end your access">
            <p>
              We can suspend or delete your account if you break these terms. If
              we do, we'll tell you why. You can appeal by replying to that
              email.
            </p>

            <p>
              You can request to delete your account by emailing{" "}
              <a
                href="mailto:hello@parallane.com"
                className="text-foreground underline underline-offset-4"
              >
                hello@parallane.com
              </a>
              . We'll remove your personal data (see the Privacy section below).
              Deleting your account doesn't give you a refund for the current
              period — your access continues until the period ends, then it
              stops.
            </p>
          </Clause>

          <Clause number="12" title="Limitation of liability">
            <p>
              Parallane is provided as-is. We work hard to keep everything
              running smoothly, but we can't promise the platform will never
              have bugs, downtime, or interruptions.
            </p>

            <p>
              We're not responsible for indirect losses — like if you don't get
              a job after taking a course, or if a project you build using what
              you learned doesn't work out. We're here to teach. What you do
              with that knowledge is yours.
            </p>
          </Clause>

          <Clause number="13" title="Changes to these terms">
            <p>
              We might update these terms in the future. If we do something
              significant, we'll email you at least 14 days before it takes
              effect.
            </p>

            <p>
              Continuing to use Parallane after a change means you accept the
              new terms.
            </p>
          </Clause>
        </div>
      </section>

      {/* ============================================== */}
      {/* PART 2 — PRIVACY */}
      {/* ============================================== */}

      <section id="privacy" className="scroll-mt-24 border-t pt-16">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Part 2
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
          Privacy Policy
        </h2>

        <p className="mt-6 max-w-2xl leading-7 text-muted-foreground">
          Here's the short version: we collect the minimum we need to run
          Parallane, we don't sell your data, and we never will. The longer
          version is below.
        </p>

        <div className="mt-10 space-y-12">
          <Clause number="1" title="What we collect">
            <p>Only what's needed to run your account:</p>

            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong>Account info</strong> — your name, email, and hashed
                password.
              </li>
              <li>
                <strong>Profile info</strong> — optional details like your
                country, city, and address (used for billing).
              </li>
              <li>
                <strong>Learning data</strong> — courses you're enrolled in,
                lessons you've completed, and progress percentages.
              </li>
              <li>
                <strong>Reviews and conversations</strong> — the reviews you
                submit and your Ask Tutor messages.
              </li>
              <li>
                <strong>Payment info</strong> — processed by our payment
                provider. We see a reference number and the amount, but never
                your full card details.
              </li>
              <li>
                <strong>Technical data</strong> — basic logs like IP address and
                browser type, used to keep the platform secure.
              </li>
            </ul>
          </Clause>

          <Clause number="2" title="How we use your data">
            <p>We use your data for four things:</p>

            <ul className="ml-5 list-disc space-y-2">
              <li>To run your account and give you access to courses.</li>
              <li>To process payments and manage your membership.</li>
              <li>
                To send you emails you actually need — receipts, password
                resets, course updates, and important account notices.
              </li>
              <li>
                To improve the platform — understanding which courses work and
                which don't.
              </li>
            </ul>

            <p>
              We don't send marketing emails unless you opt in. And we never
              sell your data to third parties.
            </p>
          </Clause>

          <Clause number="3" title="Who we share it with">
            <p>
              We share data only with the services we need to run Parallane:
            </p>

            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong>Payment provider</strong> — to process your membership
                payments.
              </li>
              <li>
                <strong>Email service</strong> — to send you receipts and
                password resets.
              </li>
              <li>
                <strong>Hosting provider</strong> — to serve the website and
                store data securely.
              </li>
            </ul>

            <p>
              Each of these services is contractually required to protect your
              data and use it only for the specific purpose we've hired them
              for. None of them can use your data for their own marketing.
            </p>
          </Clause>

          <Clause number="4" title="Cookies">
            <p>
              We use one essential cookie: a session cookie that keeps you
              logged in. That's it. No tracking cookies, no advertising cookies,
              no third-party pixels.
            </p>

            <p>
              If we ever add analytics, we'll use a privacy-first tool that
              doesn't track individual users, and we'll say so here.
            </p>
          </Clause>

          <Clause number="5" title="How long we keep your data">
            <p>
              We keep your data as long as your account exists. If you delete
              your account, we remove your personal data within 30 days.
            </p>

            <p>
              Two exceptions: payment records (required for tax and accounting)
              and anonymous statistics (which don't identify you). Payment
              records are kept for the period required by law, usually 5–7
              years.
            </p>
          </Clause>

          <Clause number="6" title="Your rights">
            <p>You have the right to:</p>

            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong>See your data</strong> — request a copy of everything we
                have on you.
              </li>
              <li>
                <strong>Correct it</strong> — fix anything that's wrong from
                your profile settings.
              </li>
              <li>
                <strong>Delete it</strong> — request deletion by email and we'll
                remove your data.
              </li>
              <li>
                <strong>Export it</strong> — get your data in a portable format.
              </li>
              <li>
                <strong>Object to processing</strong> — tell us to stop using
                your data for a specific purpose.
              </li>
            </ul>

            <p>
              Email us to exercise any of these rights. We'll respond within 30
              days.
            </p>
          </Clause>

          <Clause number="7" title="Security">
            <p>
              Passwords are hashed. Connections are encrypted. Access to
              production data is limited to the people who need it to keep the
              platform running.
            </p>

            <p>
              We can't promise absolute security — no one can. But we take it
              seriously and act quickly if something goes wrong.
            </p>
          </Clause>

          <Clause number="8" title="Children">
            <p>
              Parallane isn't for children under 13. If we find out someone
              under 13 has created an account, we'll delete it and any data
              attached to it.
            </p>
          </Clause>

          <Clause number="9" title="Where your data lives">
            <p>
              Our servers are hosted internationally. By using Parallane, you
              agree that your data may be transferred to and processed in
              countries outside of your own.
            </p>

            <p>
              We choose hosting providers that follow industry-standard data
              protection practices.
            </p>
          </Clause>

          <Clause number="10" title="Changes to this policy">
            <p>
              If we make significant changes to how we handle your data, we'll
              email you before it takes effect. Small clarifications might
              happen quietly — you can always see the current version on this
              page.
            </p>
          </Clause>
        </div>
      </section>

      {/* Contact */}
      <Card className="mt-20 gap-0 rounded-2xl border bg-muted/30 p-8 md:p-10">
        <h3 className="text-lg font-semibold">Questions?</h3>

        <p className="mt-2 leading-7 text-muted-foreground">
          If anything on this page isn't clear, or you want to exercise a
          privacy right, email us. We read every message.
        </p>

        <a
          href="mailto:parallane.com@gmail.com"
          className="mt-4 inline-block font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
        >
          parallane.com@gmail.com
        </a>
      </Card>
    </div>
  )
}

// ---------- Sub-components ----------

function Clause({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-8">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted/50 text-xs font-semibold text-muted-foreground tabular-nums">
        {number}
      </div>

      <div className="min-w-0 space-y-4">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>

        <div className="space-y-4 text-sm leading-7 text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  )
}
