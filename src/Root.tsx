import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Intro, introSchema } from "./Common";
import { AutomationNextBigThing, automationNextBigThingSchema } from "./Events/AutomationNextBigThing";
import { CodeTyperExample } from "./Common/CodeTyper/CodeTyper.example";
import { BarChartDemo, barChartDemoSchema } from "./Events/BarChartDemo";
import { ChartsDemo, chartsDemoSchema } from "./Events/ChartDemo";
import { TextDemo, textDemoSchema } from "./Events/TextDemo";
import { ContentAnimationDemo, contentAnimationDemoSchema } from "./Events/ContentAnimationDemo";
import { BackgroundDemo, backgroundDemoSchema } from "./Events/BackgroundDemo";
import { CinematicTransitionsDemo, cinematicTransitionsDemoSchema } from "./Events/CinematicTransitionsDemo";
import { LogoBrandingDemo, logoBrandingDemoSchema } from "./Events/LogoBrandingDemo";
import { IntroOutroDemo, introOutroDemoSchema } from "./Events/IntroOutroDemo";
import { ImageMediaDemo, imageMediaDemoSchema } from "./Events/ImageMediaDemo";
import { ThreeDemo } from "./Events/ThreeDemo";
import { YouTubeShorts } from "./YouTubeShorts";

// Each <Composition> is an entry in the sidebar!
// Common reusable components live in src/Common/ for import into your own compositions

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />
      <Composition
        id="Intro"
        component={Intro}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={introSchema}
        defaultProps={{ text: "CompleteAutomate" }}
      />
      <Composition
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
        id="BarChartDemo"
        component={BarChartDemo}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        schema={barChartDemoSchema}
        defaultProps={{
          title: "Monthly Performance",
          subtitle: "Data visualization for 2023",
          data: [
            { x: 0, y: 50, label: "Jan" },
            { x: 1, y: 80, label: "Feb" },
            { x: 2, y: 30, label: "Mar" },
            { x: 3, y: 70, label: "Apr" },
            { x: 4, y: 45, label: "May" },
            { x: 5, y: 90, label: "Jun" },
            { x: 6, y: 60, label: "Jul" },
            { x: 7, y: 75, label: "Aug" },
            { x: 8, y: 40, label: "Sep" },
            { x: 9, y: 85, label: "Oct" },
          ],
        }}
      />
      <Composition
        id="ChartsDemo"
        component={ChartsDemo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        schema={chartsDemoSchema}
        defaultProps={{
          title: "Performance Metrics",
          subtitle: "Data visualization showcase",
        }}
      />
      <Composition
        id="TextDemo"
        component={TextDemo}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
        schema={textDemoSchema}
        defaultProps={{ text: "BINGO!" }}
      />
      <Composition
        id="ContentAnimationDemo"
        component={ContentAnimationDemo}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
        schema={contentAnimationDemoSchema}
        defaultProps={{ text: "BINGO!" }}
      />
      <Composition
        id="BackgroundDemo"
        component={BackgroundDemo}
        durationInFrames={500}
        fps={30}
        width={1920}
        height={1080}
        schema={backgroundDemoSchema}
        defaultProps={{ text: "Backgrounds" }}
      />
      <Composition
        id="CinematicTransitionsDemo"
        component={CinematicTransitionsDemo}
        durationInFrames={680}
        fps={30}
        width={1920}
        height={1080}
        schema={cinematicTransitionsDemoSchema}
        defaultProps={{ text: "Cinematic" }}
      />
      <Composition
        id="LogoBrandingDemo"
        component={LogoBrandingDemo}
        durationInFrames={500}
        fps={30}
        width={1920}
        height={1080}
        schema={logoBrandingDemoSchema}
        defaultProps={{ text: "Brand" }}
      />
      <Composition
        id="IntroOutroDemo"
        component={IntroOutroDemo}
        durationInFrames={750}
        fps={30}
        width={1920}
        height={1080}
        schema={introOutroDemoSchema}
        defaultProps={{ text: "Intro" }}
      />
      <Composition
        id="ImageMediaDemo"
        component={ImageMediaDemo}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
        schema={imageMediaDemoSchema}
        defaultProps={{ text: "Media" }}
      />
      <Composition
        id="ThreeDemo"
        component={ThreeDemo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="YouTubeShorts"
        component={YouTubeShorts}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          speechScript:
            "Artificial intelligence is transforming every industry. From healthcare to finance, AI is unlocking new possibilities. Machine learning models can now understand language better than ever before. This is just the beginning of a new era. The future of technology has never been more exciting.",
          topic: "The AI Revolution",
          accentColor: "#0891B2",
        }}
      />
    </>
  );
};
