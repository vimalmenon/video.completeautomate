import './index.css';
import { Composition } from 'remotion';

import { Intro, introSchema } from './Common';
import { CodeTyperExample } from './Common/CodeTyper/CodeTyper.example';
import {
  AutomationNextBigThing,
  automationNextBigThingSchema,
} from './Events/AutomationNextBigThing';
import { BackgroundDemo, backgroundDemoSchema } from './Events/BackgroundDemo';
import { BarChartDemo, barChartDemoSchema } from './Events/BarChartDemo';
import { ChartsDemo, chartsDemoSchema } from './Events/ChartDemo';
import {
  CinematicTransitionsDemo,
  cinematicTransitionsDemoSchema,
} from './Events/CinematicTransitionsDemo';
import { ClientTestimonial, clientTestimonialSchema } from './Events/ClientTestimonial';
import { Comparison, comparisonSchema } from './Events/Comparison';
import { ContentAnimationDemo, contentAnimationDemoSchema } from './Events/ContentAnimationDemo';
import { ImageMediaDemo, imageMediaDemoSchema } from './Events/ImageMediaDemo';
import { IntroOutroDemo, introOutroDemoSchema } from './Events/IntroOutroDemo';
import { LogoBrandingDemo, logoBrandingDemoSchema } from './Events/LogoBrandingDemo';
import { ProcessFlow, processFlowSchema } from './Events/ProcessFlow';
import { ServicesShowcase, servicesShowcaseSchema } from './Events/ServicesShowcase';
import { TextDemo, textDemoSchema } from './Events/TextDemo';
import { ThreeDemo } from './Events/ThreeDemo';
import { HelloWorld, myCompSchema } from './HelloWorld';
import { YouTubeShorts } from './YouTubeShorts';

// Each <Composition> is an entry in the sidebar!
// Common reusable components live in src/Common/ for import into your own compositions

export const RemotionRoot: React.FC = () => (
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
        logoColor1: '#91EAE4',
        logoColor2: '#86A8E7',
        titleColor: '#000000',
        titleText: 'Welcome to Remotion',
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
      schema={introSchema}
      defaultProps={{ text: 'CompleteAutomate' }}
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
      durationInFrames={420}
      fps={30}
      width={1920}
      height={1080}
      schema={automationNextBigThingSchema}
      defaultProps={{
        logos: [
          { name: 'Tech Innovate' },
          { name: 'DataFlow Corp' },
          { name: 'CloudBase' },
          { name: 'NexGen Systems' },
          { name: 'Pulse Analytics' },
          { name: 'Vertex Labs' },
          { name: 'Streamline Pro' },
          { name: 'Elevate AI' },
        ],
        subtext: "And it's already here.",
        text: 'Automation is the next big thing',
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
        services: [
          {
            description: 'Intelligent conversational agents that handle customer inquiries 24/7.',
            icon: '🤖',
            name: 'AI Chatbots',
          },
          {
            description: 'Streamline repetitive tasks with custom automated pipelines.',
            icon: '⚙️',
            name: 'Workflow Automation',
          },
          {
            description: 'Transform raw data into actionable business intelligence.',
            icon: '📊',
            name: 'Data Insights',
          },
        ],
        subtitle: 'End-to-end AI automation for your business',
        title: 'Our Services',
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
        author: 'Sarah Chen',
        company: 'TechVentures Inc.',
        quote:
          'Working with Complete Automate transformed our operations. We cut processing time by 80% and our team can finally focus on what matters.',
        rating: 5,
        role: 'CTO',
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
        steps: [
          {
            description: 'Understand your workflow and identify automation opportunities.',
            number: 1,
            title: 'Discover',
          },
          {
            description: 'Architect a custom solution tailored to your needs.',
            number: 2,
            title: 'Design',
          },
          {
            description: 'Develop and integrate the automation pipeline.',
            number: 3,
            title: 'Build',
          },
          {
            description: 'Monitor, refine, and scale your automation.',
            number: 4,
            title: 'Optimize',
          },
        ],
        title: 'Our Process',
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
        afterPoints: [
          'Fully automated data pipelines',
          '99.9% accuracy across all operations',
          'Instant 24/7 customer support',
          'Effortlessly scale without adding headcount',
        ],
        afterTitle: 'Automated with AI',
        beforePoints: [
          'Hours spent on repetitive data entry',
          'Human error in critical processes',
          'Slow response to customer inquiries',
          'Limited scalability during peak times',
        ],
        beforeTitle: 'Manual Operations',
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
        data: [
          { label: 'Jan', x: 0, y: 50 },
          { label: 'Feb', x: 1, y: 80 },
          { label: 'Mar', x: 2, y: 30 },
          { label: 'Apr', x: 3, y: 70 },
          { label: 'May', x: 4, y: 45 },
          { label: 'Jun', x: 5, y: 90 },
          { label: 'Jul', x: 6, y: 60 },
          { label: 'Aug', x: 7, y: 75 },
          { label: 'Sep', x: 8, y: 40 },
          { label: 'Oct', x: 9, y: 85 },
        ],
        subtitle: 'Data visualization for 2023',
        title: 'Monthly Performance',
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
        subtitle: 'Data visualization showcase',
        title: 'Performance Metrics',
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
      defaultProps={{ text: 'BINGO!' }}
    />
    <Composition
      id="ContentAnimationDemo"
      component={ContentAnimationDemo}
      durationInFrames={480}
      fps={30}
      width={1920}
      height={1080}
      schema={contentAnimationDemoSchema}
      defaultProps={{ text: 'BINGO!' }}
    />
    <Composition
      id="BackgroundDemo"
      component={BackgroundDemo}
      durationInFrames={500}
      fps={30}
      width={1920}
      height={1080}
      schema={backgroundDemoSchema}
      defaultProps={{ text: 'Backgrounds' }}
    />
    <Composition
      id="CinematicTransitionsDemo"
      component={CinematicTransitionsDemo}
      durationInFrames={680}
      fps={30}
      width={1920}
      height={1080}
      schema={cinematicTransitionsDemoSchema}
      defaultProps={{ text: 'Cinematic' }}
    />
    <Composition
      id="LogoBrandingDemo"
      component={LogoBrandingDemo}
      durationInFrames={500}
      fps={30}
      width={1920}
      height={1080}
      schema={logoBrandingDemoSchema}
      defaultProps={{ text: 'Brand' }}
    />
    <Composition
      id="IntroOutroDemo"
      component={IntroOutroDemo}
      durationInFrames={750}
      fps={30}
      width={1920}
      height={1080}
      schema={introOutroDemoSchema}
      defaultProps={{ text: 'Intro' }}
    />
    <Composition
      id="ImageMediaDemo"
      component={ImageMediaDemo}
      durationInFrames={330}
      fps={30}
      width={1920}
      height={1080}
      schema={imageMediaDemoSchema}
      defaultProps={{ text: 'Media' }}
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
        accentColor: '#0891B2',
        speechScript:
          'Artificial intelligence is transforming every industry. From healthcare to finance, AI is unlocking new possibilities. Machine learning models can now understand language better than ever before. This is just the beginning of a new era. The future of technology has never been more exciting.',
        topic: 'The AI Revolution',
      }}
    />
  </>
);
