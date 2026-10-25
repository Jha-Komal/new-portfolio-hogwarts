import JourneyTimeline from "@/components/JourneyTimeline";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import journey from "@/data/journey.json";

export default function JourneySection() {
  return (
    <Section id="journey">
      <PageHeader command="git log --career" title={journey.title} subtitle={journey.subtitle} />
      <JourneyTimeline entries={journey.entries} />
    </Section>
  );
}
