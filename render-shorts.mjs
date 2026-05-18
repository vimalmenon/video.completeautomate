#!/usr/bin/env node
/**
 * Render a YouTube Shorts video programmatically.
 *
 * Usage:
 *   node render-shorts.js --props '{"speechScript":"...","audioUrl":"...","topic":"..."}' --output out/shorts.mp4
 *
 * Or via stdin:
 *   echo '{"props":{...},"output":"out/shorts.mp4"}' | node render-shorts.js
 *
 * Or from a JSON file:
 *   node render-shorts.js --input config.json
 */

import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  // Parse arguments
  const args = process.argv.slice(2);
  let props = {};
  let outputPath = '';
  let inputFile = '';
  let compositionId = 'YouTubeShorts';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--props' && i + 1 < args.length) {
      props = JSON.parse(args[++i]);
    } else if (args[i] === '--output' && i + 1 < args.length) {
      outputPath = args[++i];
    } else if (args[i] === '--input' && i + 1 < args.length) {
      inputFile = args[++i];
    } else if (args[i] === '--composition' && i + 1 < args.length) {
      compositionId = args[++i];
    }
  }

  // Read from stdin if piped
  if (!inputFile && !outputPath && !process.stdin.isTTY) {
    const stdin = await new Promise((resolve) => {
      let data = '';
      process.stdin.on('data', (chunk) => (data += chunk));
      process.stdin.on('end', () => resolve(data));
    });
    const parsed = JSON.parse(stdin);
    props = parsed.props || parsed;
    outputPath = parsed.output || outputPath;
    compositionId = parsed.composition || compositionId;
  }

  // Read from input file
  if (inputFile) {
    const content = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
    props = content.props || content;
    outputPath = content.output || outputPath;
    compositionId = content.composition || compositionId;
  }

  if (!outputPath) {
    console.error("Usage: node render-shorts.js --props '{...}' --output out/video.mp4");
    process.exit(1);
  }

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (outputDir && !fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Calculate duration from speech script word count
  const wordCount = (props.speechScript || '').split(/\s+/).filter(Boolean).length;
  const calculatedDuration = Math.max(wordCount * 9, 180); // 9 frames per word, min 6 seconds
  const durationInFrames = props.durationInFrames || calculatedDuration;

  const inputProps = {
    accentColor: props.accentColor || '#0891B2',
    audioUrl: props.audioUrl || '',
    durationInFrames,
    speechScript: props.speechScript || '',
    topic: props.topic || '',
  };

  console.log(`🎬 Rendering "${compositionId}"...`);
  console.log(
    `   Script: ${wordCount} words, ${durationInFrames} frames (${(durationInFrames / 30).toFixed(1)}s)`
  );
  console.log(`   Output: ${outputPath}`);
  if (inputProps.audioUrl) {
    console.log(`   Audio: ${inputProps.audioUrl}`);
  }

  // Bundle the Remotion project
  console.log('📦 Bundling project...');
  const bundleLocation = await bundle({
    entryPoint: path.resolve(__dirname, 'src/index.ts'),
    webpackOverride: (config) => config,
  });

  // Select the composition
  console.log('🎯 Selecting composition...');
  const composition = await selectComposition({
    id: compositionId,
    inputProps,
    serveUrl: bundleLocation,
  });

  // Override duration
  composition.durationInFrames = durationInFrames;

  // Render
  console.log('🎥 Rendering video...');
  await renderMedia({
    chromiumOptions: {
      enableMultiProcessOnLinux: true,
    },
    codec: 'h264',
    composition,
    inputProps,
    outputLocation: outputPath,
    serveUrl: bundleLocation,
  });

  console.log(`✅ Done! Video saved to: ${outputPath}`);
}

main().catch((err) => {
  console.error('❌ Render failed:', err);
  process.exit(1);
});
