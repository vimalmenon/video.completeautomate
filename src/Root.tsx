import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Intro, introSchema } from "./Common";
import { AutomationNextBigThing, automationNextBigThingSchema } from "./Events/AutomationNextBigThing";
import { CodeTyperExample } from "./Common/CodeTyper/CodeTyper.example";
import { ServicesShowcase, servicesShowcaseSchema } from "./Events/ServicesShowcase";
import { ClientTestimonial, clientTestimonialSchema } from "./Events/ClientTestimonial";
import { ProcessFlow, processFlowSchema } from "./Events/ProcessFlow";
import { Comparison, comparisonSchema } from "./Events/Comparison";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render Intro
        id="Intro"
        component={Intro}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={introSchema}
        defaultProps={{ text: "CompleteAutomate" }}
      />
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render CodeTyper
        id="CodeTyper"
        component={CodeTyperExample}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AutomationNextBigThing"
        component={AutomationNextBigThing}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={automationNextBigThingSchema}
        defaultProps={{
          text: "Automation is the next big thing",
          subtext: "And it's already here.",
        }}
      />
      <Composition
        id="ServicesShowcase"
        component={ServicesShowcase}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={servicesShowcaseSchema}
        defaultProps={{
          title: "Our Services",
          subtitle: "End-to-end AI automation for your business",
          services: [
            {
              icon: "🤖",
              name: "AI Chatbots",
              description: "Intelligent conversational agents that handle customer inquiries 24/7.",
            },
            {
              icon: "⚙️",
              name: "Workflow Automation",
              description: "Streamline repetitive tasks with custom automated pipelines.",
            },
            {
              icon: "📊",
              name: "Data Insights",
              description: "Transform raw data into actionable business intelligence.",
            },
          ],
        }}
      />
      <Composition
        id="ClientTestimonial"
        component={ClientTestimonial}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        schema={clientTestimonialSchema}
        defaultProps={{
          quote: "Working with Complete Automate transformed our operations. We cut processing time by 80% and our team can finally focus on what matters.",
          author: "Sarah Chen",
          role: "CTO",
          company: "TechVentures Inc.",
          rating: 5,
        }}
      />
      <Composition
        id="ProcessFlow"
        component={ProcessFlow}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={processFlowSchema}
        defaultProps={{
          title: "Our Process",
          steps: [
            { number: 1, title: "Discover", description: "Understand your workflow and identify automation opportunities." },
            { number: 2, title: "Design", description: "Architect a custom solution tailored to your needs." },
            { number: 3, title: "Build", description: "Develop and integrate the automation pipeline." },
            { number: 4, title: "Optimize", description: "Monitor, refine, and scale your automation." },
          ],
        }}
      />
      <Composition
        id="Comparison"
        component={Comparison}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        schema={comparisonSchema}
        defaultProps={{
          beforeTitle: "Manual Operations",
          afterTitle: "Automated with AI",
          beforePoints: [
            "Hours spent on repetitive data entry",
            "Human error in critical processes",
            "Slow response to customer inquiries",
            "Limited scalability during peak times",
          ],
          afterPoints: [
            "Fully automated data pipelines",
            "99.9% accuracy across all operations",
            "Instant 24/7 customer support",
            "Effortlessly scale without adding headcount",
          ],
        }}
      />
    </>
  );
};
