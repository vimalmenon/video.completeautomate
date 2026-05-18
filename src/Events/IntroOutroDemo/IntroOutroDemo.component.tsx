import React from 'react';

import { AbsoluteFill, Sequence } from 'remotion';
import { z } from 'zod';

import { Carousel } from '../../Common/Carousel';
import { ChapterTitle } from '../../Common/ChapterTitle';
import { CinematicTitle } from '../../Common/CinematicTitle';
import { CreditsRoll } from '../../Common/CreditsRoll';
import { EndCard } from '../../Common/EndCard';
import { GalleryGrid } from '../../Common/GalleryGrid';
import { LowerThird } from '../../Common/LowerThird';
import { MasonryGrid } from '../../Common/MasonryGrid';
import { QuoteCard } from '../../Common/QuoteCard';
import { Slideshow } from '../../Common/Slideshow';

export const introOutroDemoSchema = z.object({
  text: z.string().optional().default('Intro'),
});

type IntroOutroDemoProps = z.infer<typeof introOutroDemoSchema>;

const placeholderUrl =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop';

export const IntroOutroDemo: React.FC<IntroOutroDemoProps> = () => {
  const sectionBg: React.CSSProperties = {
    alignItems: 'center',
    background: 'linear-gradient(to bottom right, #0F172A, #1E293B)',
    display: 'flex',
    flexDirection: 'column',
    inset: 0,
    justifyContent: 'center',
    position: 'absolute',
  };

  const labelStyle: React.CSSProperties = {
    bottom: 20,
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'system-ui, sans-serif',
    fontSize: 14,
    fontWeight: 600,
    left: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    zIndex: 20,
  };

  return (
    <AbsoluteFill>
      {/* CinematicTitle (0-60) */}
      <Sequence from={0} durationInFrames={60}>
        <div style={sectionBg}>
          <CinematicTitle title="CompleteAutomate" subtitle="The Future of Automation" />
          <div style={labelStyle}>Cinematic Title</div>
        </div>
      </Sequence>

      {/* LowerThird (60-110) */}
      <Sequence from={60} durationInFrames={50}>
        <div style={sectionBg}>
          <div
            style={{
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 20,
              fontWeight: 300,
              marginBottom: 100,
            }}
          >
            Interview footage placeholder
          </div>
          <LowerThird name="Sarah Johnson" title="VP of Engineering" accentColor="#f72585" />
          <div style={labelStyle}>Lower Third</div>
        </div>
      </Sequence>

      {/* EndCard (110-180) */}
      <Sequence from={110} durationInFrames={70}>
        <div style={sectionBg}>
          <EndCard channelName="CompleteAutomate" subscribeText="Subscribe for more" />
          <div style={labelStyle}>End Card</div>
        </div>
      </Sequence>

      {/* ChapterTitle (180-230) */}
      <Sequence from={180} durationInFrames={50}>
        <div style={sectionBg}>
          <ChapterTitle chapterNumber={3} title="Advanced Automation Techniques" />
          <div style={labelStyle}>Chapter Title</div>
        </div>
      </Sequence>

      {/* QuoteCard (230-290) */}
      <Sequence from={230} durationInFrames={60}>
        <div style={sectionBg}>
          <QuoteCard
            quote="The best way to predict the future is to invent it."
            author="Alan Kay"
          />
          <div style={labelStyle}>Quote Card</div>
        </div>
      </Sequence>

      {/* CreditsRoll (290-450) */}
      <Sequence from={290} durationInFrames={160}>
        <div style={sectionBg}>
          <CreditsRoll
            credits={[
              { name: 'Alex Morgan', role: 'Director' },
              { name: 'Jamie Chen', role: 'Producer' },
              { name: 'Taylor Reed', role: 'Editor' },
              { name: 'Jordan Blake', role: 'Music' },
              { name: 'Casey Kim', role: 'Sound Design' },
              { name: 'Riley Park', role: 'Visual Effects' },
            ]}
          />
          <div style={labelStyle}>Credits Roll</div>
        </div>
      </Sequence>

      {/* GalleryGrid (450-520) */}
      <Sequence from={450} durationInFrames={70}>
        <div style={sectionBg}>
          <GalleryGrid
            images={[
              { label: 'Image 1', src: placeholderUrl },
              { label: 'Image 2', src: placeholderUrl },
              { label: 'Image 3', src: placeholderUrl },
              { label: 'Image 4', src: placeholderUrl },
              { label: 'Image 5', src: placeholderUrl },
              { label: 'Image 6', src: placeholderUrl },
            ]}
          />
          <div style={labelStyle}>Gallery Grid</div>
        </div>
      </Sequence>

      {/* MasonryGrid (520-590) */}
      <Sequence from={520} durationInFrames={70}>
        <div style={sectionBg}>
          <MasonryGrid
            images={[
              { height: 200, src: placeholderUrl },
              { height: 300, src: placeholderUrl },
              { height: 250, src: placeholderUrl },
              { height: 180, src: placeholderUrl },
              { height: 280, src: placeholderUrl },
            ]}
          />
          <div style={labelStyle}>Masonry Grid</div>
        </div>
      </Sequence>

      {/* Slideshow (590-670) */}
      <Sequence from={590} durationInFrames={80}>
        <div style={sectionBg}>
          <Slideshow
            images={[
              { caption: 'Beautiful landscape', src: placeholderUrl },
              { caption: 'Mountain view', src: placeholderUrl },
              { caption: 'Ocean sunset', src: placeholderUrl },
            ]}
          />
          <div style={labelStyle}>Slideshow</div>
        </div>
      </Sequence>

      {/* Carousel (670-750) */}
      <Sequence from={670} durationInFrames={80}>
        <div style={sectionBg}>
          <Carousel
            images={[
              { label: 'Product A', src: placeholderUrl },
              { label: 'Product B', src: placeholderUrl },
              { label: 'Product C', src: placeholderUrl },
              { label: 'Product D', src: placeholderUrl },
            ]}
          />
          <div style={labelStyle}>Carousel</div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
