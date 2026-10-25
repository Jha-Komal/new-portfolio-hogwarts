import type { Metadata } from "next";
import JourneyViewer from "@/components/JourneyViewer";
import Page from "@/components/Page";
import PageHeader from "@/components/PageHeader";
import journey from "@/data/journey.json";

export const metadata: Metadata = { title: journey.title };

export default function JourneyPage() {
  return (
    <>
      <PageHeader command="git log --career" title={journey.title} subtitle={journey.subtitle} />
      <Page>
        <JourneyViewer entries={journey.entries} />
      </Page>
    </>
  );
}
