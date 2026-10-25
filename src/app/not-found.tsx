import Link from "next/link";
import Page from "@/components/Page";
import PageHeader from "@/components/PageHeader";

export default function NotFound() {
  return (
    <>
      <PageHeader
        command="cd: no such room"
        title="404 — Lost in the Forbidden Forest"
        subtitle="That page doesn't exist (yet). Head back to somewhere safe."
      />
      <Page>
        <Link
          href="/"
          className="w-fit rounded-md border border-green px-4 py-2 text-sm text-amber transition-colors hover:bg-green/10"
        >
          ← back home
        </Link>
      </Page>
    </>
  );
}
