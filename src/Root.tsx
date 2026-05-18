import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Intro, introSchema } from "./Common";
import { AutomationNextBigThing, automationNextBigThingSchema } from "./Events/AutomationNextBigThing";
import { CodeTyperExample } from "./Common/CodeTyper/CodeTyper.example";
import { BarChartDemo, barChartDemoSchema } from "./Events/BarChartDemo";

// Each <Composition> is an entry in the sidebar!

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
    </>
  );
};
