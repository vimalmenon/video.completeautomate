import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Intro, introSchema } from "./Common";
import { CodeTyperExample } from "./Common/CodeTyper/CodeTyper.example";

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
        // npx remotion render HelloWorld
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
    </>
  );
};
