import type { CareerDef } from '../framework.js'

export const motionDesigner: CareerDef = {
  slug: 'motion-designer',
  name: 'Motion Designer',
  category: 'Creative',
  order: 45,
  description:
    'Animates brand stories with After Effects and Premiere — typography animation, transitions, sound and delivery.',
  difficulty: 'Intermediate',
  pathSummary:
    'Motion Designers begin with animation principles and After Effects fundamentals, develop motion graphics and typography animation skills, master timeline editing, sound design and visual effects compositing in After Effects and Premiere Pro, and culminate in 3D motion integration with Blender, broadcast-ready delivery and client-facing project management.',
  mainSkills: [
    'Keyframe animation and easing curves in After Effects',
    'Typography animation and kinetic type',
    'Transitions, motion graphics and visual storytelling',
    'Timeline editing and sequencing in Premiere Pro',
    'Sound design and audio-visual synchronisation',
    '3D motion graphics basics in Blender',
    'Export, codec management and broadcast delivery standards',
  ],
  sourcePlatforms: [
    'Adobe After Effects',
    'Adobe Premiere Pro',
    'Blender',
    'Adobe Documentation',
  ],
  companyName: 'Kinetic Frame Studios',
  roleTitle: 'Motion Designer',

  chapters: [
    {
      slug: 'animation-principles-and-after-effects-fundamentals',
      stage: 'Beginner',
      title: 'Animation Principles & After Effects Fundamentals',
      description:
        'Learn the 12 principles of animation applied to motion graphics, navigate the After Effects workspace, and create your first keyframed animations with confident easing.',
      topics: [
        {
          slug: 'animation-principles-for-motion-graphics',
          title: 'Animation Principles for Motion Graphics',
          minutes: 28,
          objectives: [
            'Explain the 12 principles of animation and identify which apply to motion graphics.',
            'Apply timing, spacing and easing to create natural-feeling motion.',
            'Distinguish between linear, ease-in, ease-out and custom bezier curves.',
          ],
          sections: [
            {
              heading: 'The 12 Principles in Context',
              body: 'Disney\'s 12 principles — squash and stretch, anticipation, staging, follow-through and more — were developed for character animation, but most translate directly to motion graphics. Anticipation makes a logo reveal feel intentional; staging ensures the viewer\'s eye follows the right path; follow-through gives particle systems and shape layers a sense of physical weight. Understanding these principles is what separates kinetic noise from purposeful motion.',
            },
            {
              heading: 'Timing, Spacing and Easing',
              body: 'Timing is how many frames an action takes; spacing is how objects move between those frames. Two keyframes at frame 0 and frame 30 define timing, but the interpolation curve between them defines spacing. Linear interpolation produces robotic motion. Ease-in (slow start) and ease-out (slow end) curves produce the accelerating and decelerating arcs that mirror real-world physics.',
            },
            {
              heading: 'The Graph Editor',
              body: 'After Effects\' Graph Editor visualises animation curves as editable Bézier splines. The speed graph shows velocity over time; the value graph shows the property value. Dragging handles on keyframes adjusts influence and velocity, letting you create snappy pops, smooth drifts or bounce-back effects that the default keyframe types cannot achieve.',
            },
          ],
          links: [
            {
              title: 'After Effects Animation and Keyframes',
              url: 'https://helpx.adobe.com/after-effects/using/creating-keyframe-animation.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Graph Editor Overview',
              url: 'https://helpx.adobe.com/after-effects/using/graph-editor.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Blender Animation Fundamentals',
              url: 'https://docs.blender.org/manual/en/latest/animation/index.html',
              sourceName: 'Blender',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'In the After Effects Graph Editor, what does the speed graph visualise?',
            options: [
              'The opacity of layers over time',
              'The velocity of a property between keyframes',
              'The audio waveform of the composition',
              'The render queue progress',
            ],
            answerIndex: 1,
            explanation:
              'The speed graph displays how fast a property changes over time, allowing you to adjust the acceleration and deceleration of motion between keyframes.',
          },
        },
        {
          slug: 'navigating-the-after-effects-workspace',
          title: 'Navigating the After Effects Workspace',
          minutes: 27,
          objectives: [
            'Configure a new composition with appropriate settings for video output.',
            'Understand the relationship between compositions, layers and the timeline.',
            'Use the Project panel, Composition panel and Effect Controls panel efficiently.',
          ],
          sections: [
            {
              heading: 'Composition Setup',
              body: 'A composition defines the canvas for motion work: resolution (1920×1080 for HD, 3840×2160 for 4K), frame rate (24 fps for cinematic, 30 fps for broadcast, 60 fps for UI demos), duration and background colour. Start every project by setting these correctly — changing frame rate mid-project causes keyframe misalignment and timing issues.',
            },
            {
              heading: 'Panels and Workspaces',
              body: 'After Effects organises work across panels: the Project panel holds assets and compositions; the Composition panel previews the visual output; the Timeline panel sequences layers and keyframes; Effect Controls adjusts applied effects. Workspaces (Window > Workspace) reconfigure panel layouts for tasks like Animation, Effects or Colour.',
            },
            {
              heading: 'Layer Types and Hierarchy',
              body: 'Layers are the building blocks of any composition: Shape Layers for vector graphics, Solid Layers for fills and effects, Text Layers for typography, Adjustment Layers for global effects and Pre-compositions for nesting. Layer order determines render order — top layers appear in front. Parent-child linking lets one layer\'s transform drive another\'s.',
            },
          ],
          links: [
            {
              title: 'After Effects Composition Settings',
              url: 'https://helpx.adobe.com/after-effects/using/composition-settings-dialog.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'After Effects Workspace Overview',
              url: 'https://helpx.adobe.com/after-effects/using/workspace.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Adobe Premiere Pro Workspace Guide',
              url: 'https://helpx.adobe.com/premiere-pro/using/workspace.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Why should you set your composition frame rate before adding keyframes?',
            options: [
              'After Effects automatically adjusts keyframes when frame rate changes',
              'Changing frame rate after keyframing causes timing misalignment',
              'Frame rate only affects audio, not visual timing',
              'Higher frame rates always produce better quality',
            ],
            answerIndex: 1,
            explanation:
              'After Effects keyframes are tied to specific frames. Changing the frame rate shifts which frame each keyframe lands on, disrupting carefully timed animations.',
          },
        },
        {
          slug: 'your-first-keyframe-animation',
          title: 'Your First Keyframe Animation',
          minutes: 30,
          objectives: [
            'Animate a shape layer using position, scale and rotation keyframes.',
            'Apply ease-in and ease-out to create natural acceleration.',
            'Preview, adjust and refine timing in the timeline.',
          ],
          sections: [
            {
              heading: 'Setting Keyframes',
              body: 'Click the stopwatch icon next to a property (Position, Scale, Rotation, Opacity) to create the first keyframe at the current time indicator. Move the CTI forward and change the value — After Effects automatically creates a second keyframe. The interpolation between them defines the animation. This is the fundamental loop of motion design: set a value, move in time, set another value.',
            },
            {
              heading: 'Applying Easing',
              body: 'Select keyframes and press F9 (Easy Ease) to convert linear keyframes to bezier. This adds a default ease-in and ease-out that immediately improves motion quality. For more control, open the Graph Editor and drag the influence handles: steeper curves mean faster motion through the middle; flatter curves mean longer acceleration.',
            },
            {
              heading: 'Preview and Refinement',
              body: 'RAM Preview (Numpad 0) renders frames into memory for real-time playback. Watch the animation loop multiple times — the eye catches timing problems after the third pass. Adjust keyframe positions on the timeline to speed up or slow down sections. Use the Value Graph to tweak overshoot and settle for a polished feel.',
            },
          ],
          links: [
            {
              title: 'Creating Keyframe Animation in After Effects',
              url: 'https://helpx.adobe.com/after-effects/using/creating-keyframe-animation.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'After Effects Keyboard Shortcuts',
              url: 'https://helpx.adobe.com/after-effects/using/keyboard-shortcuts.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Blender Keyframing Basics',
              url: 'https://docs.blender.org/manual/en/latest/animation/keyframes/index.html',
              sourceName: 'Blender',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What does pressing F9 do to selected keyframes in After Effects?',
            options: [
              'Deletes the keyframes',
              'Applies Easy Ease for smooth acceleration and deceleration',
              'Doubles the animation speed',
              'Locks the keyframes in place',
            ],
            answerIndex: 1,
            explanation:
              'Easy Ease (F9) converts linear keyframes to bezier keyframes with a default ease-in and ease-out curve, making the motion feel more natural.',
          },
        },
      ],
    },

    {
      slug: 'motion-graphics-and-typography-animation',
      stage: 'Foundation',
      title: 'Motion Graphics & Typography Animation',
      description:
        'Build core motion graphics skills — shape layer workflows, kinetic typography and expression-driven animation — that form the backbone of branded video content.',
      topics: [
        {
          slug: 'shape-layer-animation',
          title: 'Shape Layer Animation',
          minutes: 29,
          objectives: [
            'Create and animate shape layers using paths, strokes and fills.',
            'Use Trim Paths, Repeater and Wiggle Path for procedural motion.',
            'Combine multiple shape operators to build complex animated graphics.',
          ],
          sections: [
            {
              heading: 'Shape Layer Anatomy',
              body: 'Shape layers contain vector paths, strokes, fills and operators stacked in the timeline. Unlike imported vectors, shape layers are fully animatable within After Effects: every property — path, stroke width, fill colour, repeater offset — accepts keyframes. This makes them the primary tool for building motion graphics from scratch.',
            },
            {
              heading: 'Trim Paths and Strokes',
              body: 'Trim Paths is the most-used shape operator for motion graphics. It animates the Start, End and Offset of a stroke, creating draw-on effects, loading bars and line animations. Combined with stroke width and dash settings, Trim Paths can produce everything from elegant line reveals to energetic wipe transitions.',
            },
            {
              heading: 'Repeaters and Wiggle Path',
              body: 'The Repeater duplicates shape elements in a grid or radial pattern, offsetting position, scale and rotation per copy — ideal for abstract backgrounds and particle-like effects. Wiggle Path adds randomised distortion to path points, creating organic flicker, jitter and turbulence without manual keyframes.',
            },
          ],
          links: [
            {
              title: 'After Effects Shape Layer Properties',
              url: 'https://helpx.adobe.com/after-effects/using/shape-layer-properties.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'After Effects Trim Paths Operator',
              url: 'https://helpx.adobe.com/after-effects/using/shape-tools.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Adobe Motion Graphics Resource Hub',
              url: 'https://helpx.adobe.com/after-effects/using/creating-animating-shapes.html',
              sourceName: 'Adobe Documentation',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which shape operator is most commonly used to create a "draw-on" stroke animation?',
            options: ['Wiggle Path', 'Repeater', 'Trim Paths', 'Merge Paths'],
            answerIndex: 2,
            explanation:
              'Trim Paths animates the Start and End of a stroke path, allowing you to reveal or hide a stroke over time to create draw-on effects.',
          },
        },
        {
          slug: 'kinetic-typography',
          title: 'Kinetic Typography',
          minutes: 30,
          objectives: [
            'Animate text using character-level and word-level selectors.',
            'Build kinetic type compositions that synchronise with voice-over or music.',
            'Use text animators for per-character rotation, position and opacity reveals.',
          ],
          sections: [
            {
              heading: 'Text Animators and Selectors',
              body: 'After Effects text animators let you animate individual characters, words or lines within a single text layer. The Range Selector defines which characters are affected; the Animator adds properties like Position, Scale, Rotation or Opacity. Combining multiple animators on one text layer creates complex reveals — characters sliding in from different directions with staggered timing.',
            },
            {
              heading: 'Per-Character Animation',
              body: 'Enable Per-character 3D to rotate individual letters on all three axes. This unlocks true dimensional typography: letters tumbling into place, words rotating to reveal hidden text, or letters bouncing independently. Per-character animation is the signature technique behind high-end title sequences and social media type videos.',
            },
            {
              heading: 'Syncing Typography to Audio',
              body: 'Import a voice-over or music track and use its waveform as a visual reference in the timeline. Place keyframes at beat markers or speech syllables to synchronise type reveals with audio. The Convert Audio to Keyframes expression generates a null with amplitude values you can link to text properties for automatic rhythm-driven animation.',
            },
          ],
          links: [
            {
              title: 'After Effects Text Animation',
              url: 'https://helpx.adobe.com/after-effects/using/animating-text.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Text Animator Properties Reference',
              url: 'https://helpx.adobe.com/after-effects/using/text-animation-selectors.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Adobe Premiere Pro Audio Editing',
              url: 'https://helpx.adobe.com/premiere-pro/using/clip-enhancements.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What does the Range Selector control in an After Effects text animator?',
            options: [
              'The font size of the text',
              'Which characters within the text layer are affected by the animator',
              'The background colour behind the text',
              'The render order of multiple text layers',
            ],
            answerIndex: 1,
            explanation:
              'The Range Selector defines a start and end range of characters (or words/lines) that the animator\'s properties apply to, allowing selective per-character animation.',
          },
        },
        {
          slug: 'expressions-and-parenting',
          title: 'Expressions & Parenting',
          minutes: 28,
          objectives: [
            'Write basic expressions using wiggle, loopOut and linear to automate animation.',
            'Use the pick whip to link properties and create driven animation rigs.',
            'Set up parent-child hierarchies for coordinated multi-layer motion.',
          ],
          sections: [
            {
              heading: 'Introduction to Expressions',
              body: 'Expressions are JavaScript snippets applied to any property in After Effects. They replace manual keyframes with procedural animation: wiggle(3, 50) adds randomised movement; loopOut("cycle") repeats keyframe sequences; linear(value, 0, 100, 50, 0) maps input ranges to output ranges. Expressions run every frame, making them powerful for procedural and data-driven animation.',
            },
            {
              heading: 'The Pick Whip',
              body: 'The pick whip (spiral icon) links one property to another, generating an expression automatically. Parent a child layer\'s position to a null\'s position: the child follows the null\'s movement. Link a shape\'s scale to a slider effect: adjusting the slider drives the animation. The pick whip is the fastest way to build expression connections without writing code.',
            },
            {
              heading: 'Parenting Hierarchies',
              body: 'Parenting makes one layer inherit the transform of another. A character rig, for example, parents the forearm to the upper arm, and the hand to the forearm — moving the shoulder cascades through the chain. Parenting works independently of expressions, but combining both creates rigs where some properties follow parents and others respond to custom logic.',
            },
          ],
          links: [
            {
              title: 'After Effects Expression Language Reference',
              url: 'https://helpx.adobe.com/after-effects/using/expression-language.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'After Effects Parenting and Linking',
              url: 'https://helpx.adobe.com/after-effects/using/parenting-layers.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Blender Constraints and Parenting',
              url: 'https://docs.blender.org/manual/en/latest/animation/constraints/index.html',
              sourceName: 'Blender',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What does the expression wiggle(5, 100) do to a layer\'s position property?',
            options: [
              'Moves the layer 100 pixels to the right',
              'Randomises the position 5 times per second within a 100-pixel radius',
              'Locks the position at frame 100',
              'Loops the position keyframes 5 times',
            ],
            answerIndex: 1,
            explanation:
              'The wiggle expression takes frequency (5 times per second) and amplitude (100 pixels), generating randomised values around the original property value at the specified rate.',
          },
        },
      ],
    },

    {
      slug: 'timeline-editing-sound-and-compositing',
      stage: 'Intermediate',
      title: 'Timeline Editing, Sound & Compositing',
      description:
        'Master Premiere Pro editing, sound design fundamentals, and advanced After Effects compositing with effects, masks and motion tracking.',
      topics: [
        {
          slug: 'premiere-pro-timeline-editing',
          title: 'Premiere Pro Timeline Editing',
          minutes: 30,
          objectives: [
            'Cut, trim and arrange clips on the Premiere Pro timeline for efficient storytelling.',
            'Apply transitions, speed ramps and nested sequences.',
            'Use markers and adjustment layers to streamline the editing workflow.',
          ],
          sections: [
            {
              heading: 'Cutting and Trimming',
              body: 'Premiere Pro\'s Razor tool (C) splits clips; the Ripple Edit tool (B) trims a clip while closing the gap; the Rolling Edit tool (N) shifts the cut point between two adjacent clips without changing total duration. Mastering these three tools handles 90% of editing tasks. Keyboard shortcuts for each tool are essential for speed.',
            },
            {
              heading: 'Transitions and Speed Ramps',
              body: 'Cross Dissolve is the most common transition, but motion designers favour Push, Wipe and custom Morph Cut for branded content. Speed ramps — achieved with Time Remapping — accelerate or decelerate footage segments for dramatic emphasis. Right-click a clip > Show Clip Keyframes > Time Remapping to reveal the speed envelope on the timeline.',
            },
            {
              heading: 'Markers and Adjustment Layers',
              body: 'Markers (M key) flag points on the timeline for beat sync, cut points or notes. Adjustment layers (New > Adjustment Layer) apply effects to every clip beneath them — colour grading, grain or sharpening — without modifying individual clips. This non-destructive approach is standard practice for broadcast and social content.',
            },
          ],
          links: [
            {
              title: 'Premiere Pro Editing Basics',
              url: 'https://helpx.adobe.com/premiere-pro/using/rough-cut-editing.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Premiere Pro Speed and Duration',
              url: 'https://helpx.adobe.com/premiere-pro/using/speed-duration.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'After Effects and Premiere Pro Integration',
              url: 'https://helpx.adobe.com/after-effects/using/dynamic-link-common-uses.html',
              sourceName: 'Adobe Documentation',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which Premiere Pro tool lets you trim the edge of a clip while automatically closing the gap it creates?',
            options: ['Razor Tool', 'Ripple Edit Tool', 'Rolling Edit Tool', 'Slip Tool'],
            answerIndex: 1,
            explanation:
              'The Ripple Edit tool trims a clip\'s in or out point and shifts all subsequent clips on the timeline to close the resulting gap, maintaining sequence integrity.',
          },
        },
        {
          slug: 'sound-design-for-motion',
          title: 'Sound Design for Motion',
          minutes: 27,
          objectives: [
            'Select and layer sound effects to reinforce visual motion.',
            'Synchronise audio hits, whooshes and ambient textures to keyframes.',
            'Mix audio levels, EQ and compression for broadcast-ready output.',
          ],
          sections: [
            {
              heading: 'Sound Selection and Layering',
              body: 'Motion graphics audio typically layers three elements: a bed (ambient music or drone for mood), accents (hits, whooshes and pops synced to visual actions) and texture (subtle clicks, rattles or room tone that fill silence). Source sounds from libraries like Freesound or Artlist, then layer them in Premiere Pro\'s Audio Track Mixer or After Effects\' audio waveform view.',
            },
            {
              heading: 'Audio-Visual Synchronisation',
              body: 'The most impactful motion graphics have sounds that arrive 1–2 frames before the visual action, creating anticipation. Place markers on the audio waveform at beat points, then align keyframe peaks to those markers. For typography reveals, a typewriter click on each letter adds tactile satisfaction. For logo animations, a low boom on the final lock-up provides weight.',
            },
            {
              heading: 'Mixing and Mastering Basics',
              body: 'Target -6 dB peak for dialogue, -12 dB for music beds and -14 dB for sound effects in the final mix. Use a high-pass filter (80–100 Hz) to remove rumble from non-bass elements. Light compression (2:1 ratio) on the master bus glues the mix together. Premiere Pro\'s Essential Sound panel automates much of this for editors who are not dedicated audio engineers.',
            },
          ],
          links: [
            {
              title: 'Premiere Pro Audio Track Mixer',
              url: 'https://helpx.adobe.com/premiere-pro/using/audio-track-mixer.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Essential Sound Panel in Premiere Pro',
              url: 'https://helpx.adobe.com/premiere-pro/using/essential-sound-panel.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'After Effects Audio Waveform Visualisation',
              url: 'https://helpx.adobe.com/after-effects/using/audio-non-music.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'In motion graphics sound design, why do sound effects often arrive 1–2 frames before the visual action?',
            options: [
              'It reduces file size',
              'It creates anticipation and makes the motion feel more impactful',
              'It fixes audio desynchronisation bugs',
              'It is a required broadcast standard',
            ],
            answerIndex: 1,
            explanation:
              'Anticipatory audio triggers the viewer\'s expectation just before the visual payoff, making the animation feel punchier and more intentional through psychological anticipation.',
          },
        },
        {
          slug: 'compositing-effects-and-motion-tracking',
          title: 'Compositing, Effects & Motion Tracking',
          minutes: 29,
          objectives: [
            'Apply and stack After Effects plugins and native effects for polished composites.',
            'Use masks, mattes and track mattes to isolate and reveal elements.',
            'Track motion in footage to attach graphics to moving objects.',
          ],
          sections: [
            {
              heading: 'Effects and Layer Styles',
              body: 'After Effects offers hundreds of built-in effects: Drop Shadow and Inner Glow for depth; Glow and CC Light Rays for light effects; Turbulent Displace for organic distortion. Effects stack in the Effect Controls panel — order matters, as each effect processes the output of the one above it. Pre-composing complex effect chains keeps the main timeline readable.',
            },
            {
              heading: 'Masks and Track Mattes',
              body: 'Masks define which part of a layer is visible. Draw a mask path with the Pen tool, then animate Mask Path keyframes to reveal or hide content. Track Mattes use one layer\'s luminance or alpha to control another layer\'s visibility — Alpha Matte for shape-based reveals, Luma Matte for gradient-based dissolves. Both techniques are essential for clean compositing.',
            },
            {
              heading: 'Motion Tracking and Stabilisation',
              body: 'After Effects\' Tracker panel analyses footage to follow a point, a plane or overall camera motion. Point tracking attaches a null to a moving feature; you then parent a graphic to that null. The Warp Stabiliser smooths handheld footage without manual tracking. Both tools bridge the gap between animated graphics and live-action footage.',
            },
          ],
          links: [
            {
              title: 'After Effects Effects and Presets',
              url: 'https://helpx.adobe.com/after-effects/using/effects-presets.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'After Effects Tracking and Stabilisation',
              url: 'https://helpx.adobe.com/after-effects/using/motion-tracking-stabilizing.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Adobe Documentation on Compositing',
              url: 'https://helpx.adobe.com/after-effects/using/combining-masking.html',
              sourceName: 'Adobe Documentation',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the difference between an Alpha Matte and a Luma Matte in After Effects?',
            options: [
              'Alpha Matte uses transparency; Luma Matte uses brightness values',
              'Alpha Matte is faster to render; Luma Matte requires more RAM',
              'They produce identical results with different file formats',
              'Alpha Matte works only with shape layers',
            ],
            answerIndex: 0,
            explanation:
              'An Alpha Matte uses the alpha (transparency) channel of the matte layer to define visibility, while a Luma Matte uses the luminance (brightness) values — white reveals, black conceals.',
          },
        },
      ],
    },

    {
      slug: 'advanced-delivery-and-3d-motion',
      stage: 'Advanced',
      title: 'Advanced Delivery & 3D Motion',
      description:
        'Tackle broadcast delivery specifications, colour grading, 3D motion graphics in Blender, and end-to-end project management for professional motion design output.',
      topics: [
        {
          slug: 'export-and-broadcast-delivery',
          title: 'Export & Broadcast Delivery',
          minutes: 28,
          objectives: [
            'Configure After Effects render queue and Media Encoder presets for different output targets.',
            'Understand codec, container and bitrate trade-offs for web, broadcast and archive.',
            'Prepare deliverables with correct colour space, safe areas and captioning.',
          ],
          sections: [
            {
              heading: 'Render Queue vs Media Encoder',
              body: 'After Effects\' Render Queue exports directly from the composition with full control over output modules, but it ties up After Effects during rendering. Adobe Media Encoder accepts After Effects compositions via Dynamic Link and renders in the background while you continue working. For batch exports or H.264/H.265 delivery, Media Encoder is the professional standard.',
            },
            {
              heading: 'Codecs, Containers and Bitrate',
              body: 'A codec (H.264, ProRes, DNxHD) compresses video; a container (MP4, MOV, MXF) wraps the stream. ProRes 422 HQ and DNxHR are edit-friendly intermediates with minimal generation loss. H.264 at 15–25 Mbps suits web delivery; ProRes 4444 preserves alpha channels for broadcast compositing. Always match the codec to the recipient\'s pipeline.',
            },
            {
              heading: 'Colour Space and Safe Areas',
              body: 'Web content targets sRGB (Rec. 709); HDR delivery uses Rec. 2020 with PQ or HLG transfer functions. Title safe (80%) and action safe (90%) zones ensure text and critical motion survive overscan on broadcast displays. Embed captions via SRT or embedded CEA-608 for accessibility compliance.',
            },
          ],
          links: [
            {
              title: 'After Effects Render Queue Guide',
              url: 'https://helpx.adobe.com/after-effects/using/rendering-exporting.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Adobe Media Encoder Export Presets',
              url: 'https://helpx.adobe.com/media-encoder/using/export-settings.html',
              sourceName: 'Adobe Documentation',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Blender Video Output Settings',
              url: 'https://docs.blender.org/manual/en/latest/render/output/index.html',
              sourceName: 'Blender',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Why would a motion designer choose ProRes 4444 over H.264 for a broadcast deliverable?',
            options: [
              'ProRes 4444 produces smaller file sizes',
              'ProRes 4444 preserves an alpha channel and has minimal compression artefacts',
              'H. 264 does not support HD resolution',
              'ProRes 4444 is required for social media uploads',
            ],
            answerIndex: 1,
            explanation:
              'ProRes 4444 supports an alpha channel for transparency and uses visually lossless compression, making it suitable for broadcast compositing where quality and transparency are critical.',
          },
        },
        {
          slug: 'colour-grading-for-motion',
          title: 'Colour Grading for Motion',
          minutes: 27,
          objectives: [
            'Apply colour correction and grading using Lumetri Colour in Premiere Pro and After Effects.',
            'Use colour wheels, curves and HSL secondary adjustments for targeted grading.',
            'Match colour across shots and maintain broadcast-safe luminance levels.',
          ],
          sections: [
            {
              heading: 'Colour Correction vs Grading',
              body: 'Colour correction fixes technical issues — white balance, exposure, contrast — so footage looks natural and consistent. Colour grading is the creative layer: applying a mood, style or brand palette. Correct first, grade second. Attempting to grade uncorrected footage amplifies imbalances rather than establishing a look.',
            },
            {
              heading: 'Lumetri Colour Workflow',
              body: 'Lumetri Colour is available in both Premiere Pro and After Effects. The panel offers six sections: Input LUT, Creative (looks and film stock emulation), Curves (RGB and Hue/Saturation), Colour Wheels (lift, gamma, gain for shadows, midtones, highlights), HSL Secondary (isolated colour adjustments) and Vignette. Work top-to-bottom for a systematic grade.',
            },
            {
              heading: 'Broadcast-Safe Levels',
              body: 'Legal broadcast luminance ranges from 16–235 (in 8-bit). Levels exceeding this range are clipped by broadcast monitors. The Lumetri Scopes panel shows waveform, vectorscope and histogram data. Keep whites below 100 IRE and blacks above 0 IRE for safe broadcast. Web delivery is more forgiving, but maintaining legal levels is still best practice.',
            },
          ],
          links: [
            {
              title: 'Premiere Pro Lumetri Colour Panel',
              url: 'https://helpx.adobe.com/premiere-pro/using/color-correction.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'After Effects Lumetri Colour Effect',
              url: 'https://helpx.adobe.com/after-effects/using/lumetri-color-effect.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Adobe Colour Management Overview',
              url: 'https://helpx.adobe.com/after-effects/using/color-management-setting.html',
              sourceName: 'Adobe Documentation',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'In broadcast-safe video, what is the maximum legal luminance value in 8-bit IRE?',
            options: ['100 IRE', '235 IRE', '255 IRE', '16 IRE'],
            answerIndex: 0,
            explanation:
              'In the broadcast-safe range (16–235 for 8-bit video), whites should not exceed 100 IRE to prevent clipping on broadcast monitors. Values above this are considered illegal for traditional broadcast.',
          },
        },
        {
          slug: '3d-motion-graphics-in-blender',
          title: '3D Motion Graphics in Blender',
          minutes: 30,
          objectives: [
            'Model, light and animate basic 3D objects in Blender for motion graphics integration.',
            'Use Blender\'s node-based materials to create stylised 3D surfaces.',
            'Render 3D passes from Blender and composite them into After Effects projects.',
          ],
          sections: [
            {
              heading: 'Blender Modelling for Motion',
              body: 'Motion designers use Blender for 3D elements that 2D tools cannot produce: rotating product renders, geometric abstract shapes and particle simulations. Start with primitive meshes (cube, sphere, cylinder) and modify with Loop Cut, Extrude and Bevel. Keep topology clean and poly count reasonable — motion graphics rarely need photorealism, just clean form.',
            },
            {
              heading: 'Materials and Lighting',
              body: 'Blender\'s Shader Editor uses node-based materials. For motion graphics, the Principled BSDF shader handles most needs: set Metallic and Roughness for reflective surfaces, Subsurface for organic materials, Emission for self-lit elements. Three-point lighting (key, fill, rim) with Area lights produces clean, broadcast-ready illumination.',
            },
            {
              heading: 'Rendering Passes and After Effects Compositing',
              body: 'Render Blender output as image sequences (EXR for maximum quality) or video files. For compositing flexibility, enable render passes: Combined, Depth, Normal, Mist and Object ID. Import these into After Effects and use them with effects like Camera Lens Blur (depth), Light Wrap (normals) and Set Matte (object ID) for professional-grade 3D-2D integration.',
            },
          ],
          links: [
            {
              title: 'Blender Getting Started Guide',
              url: 'https://docs.blender.org/manual/en/latest/getting_started/index.html',
              sourceName: 'Blender',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Blender Render Output Settings',
              url: 'https://docs.blender.org/manual/en/latest/render/output/index.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'After Effects Importing Image Sequences',
              url: 'https://helpx.adobe.com/after-effects/using/importing-image-sequences.html',
              sourceName: 'Adobe After Effects',
              resourceType: 'tutorial',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Why do motion designers render Blender output as EXR image sequences rather than MP4 video files?',
            options: [
              'EXR files are smaller than MP4',
              'EXR preserves full bit-depth, multiple render passes and alpha channels for compositing',
              'MP4 files cannot be imported into After Effects',
              'EXR renders faster than MP4',
            ],
            answerIndex: 1,
            explanation:
              'EXR is a high-dynamic-range format that stores multiple render passes (depth, normals, object ID) and alpha channels in a single file, giving compositors maximum flexibility in After Effects.',
          },
        },
      ],
    },
  ],

  practicalExam: {
    title: 'Deliver a Complete Animated Brand Ident with Sound Design',
    coverage: [
      'Keyframe animation and easing curves',
      'Shape layer animation and kinetic typography',
      'Premiere Pro timeline editing',
      'Sound design and audio-visual synchronisation',
      'Compositing with effects and track mattes',
      'Colour grading with Lumetri',
      'Export and broadcast delivery preparation',
    ],
    brief:
      'You have been commissioned by "Kinetic Frame Studios" (your employer) to produce a 15-second animated brand ident for a fictional fintech client called "PulsePay". The ident must feature animated logo text, geometric motion graphics, a music bed with synchronised sound effects, colour grading and final export in both H.264 (web) and ProRes 4444 (broadcast) formats. Produce the entire project across After Effects and Premiere Pro.',
    requirements: [
      'Animate the text "PulsePay" using per-character text animators in After Effects.',
      'Build at least 3 shape layer elements (circles, lines or geometric shapes) with Trim Paths or Repeater animation.',
      'Create a minimum 2 transitions between scenes using at least one custom transition (not a default preset).',
      'Design and apply a colour grade using Lumetri Colour with at least 2 creative adjustments (LUT, curves or colour wheels).',
      'Source or create a music bed and layer at least 3 sound effects synchronised to visual keyframes.',
      'Use at least one track matte or mask-based reveal in the composite.',
      'Export a 1920×1080 H.264 at 20 Mbps for web and a ProRes 4444 with alpha for broadcast.',
      'Include a shot list document describing each scene, its duration and the techniques used.',
    ],
    expectedOutput:
      'A ZIP archive containing the H.264 MP4, the ProRes 4444 MOV, the After Effects project file and a shot list document.',
    rubric: [
      {
        skill: 'Animation Quality',
        weight: 25,
        criteria: 'Smooth, intentional keyframe animation with effective easing; timing feels purposeful and polished.',
      },
      {
        skill: 'Motion Graphics Technique',
        weight: 20,
        criteria: 'Shape layers and text animators used skillfully; motion graphics add narrative value, not decoration.',
      },
      {
        skill: 'Sound Design',
        weight: 15,
        criteria: 'Sound effects are well-chosen, layered and precisely synchronised to visual motion; audio mix is balanced.',
      },
      {
        skill: 'Compositing and Effects',
        weight: 15,
        criteria: 'Track mattes, masks and effects are used cleanly; the composite integrates all elements seamlessly.',
      },
      {
        skill: 'Colour Grading',
        weight: 10,
        criteria: 'Colour grade is consistent, intentional and enhances the brand mood without over-processing.',
      },
      {
        skill: 'Export and Delivery',
        weight: 15,
        criteria: 'Both export formats are correctly configured; resolution, codec, bitrate and colour space are appropriate for each target.',
      },
    ],
    passScore: 70,
  },

  assignments: [
    {
      title: 'Build a 10-Second Kinetic Typography Piece',
      stage: 'Beginner',
      objective:
        'Animate a short text-based motion graphic in After Effects using text animators, shape accents and easing curves to demonstrate foundational motion design skills.',
      requirements: [
        'Animate a chosen phrase using at least 2 different text animators (e.g. position + opacity).',
        'Include at least 2 shape layer accents (lines, circles or bars) that complement the text.',
        'Apply easing to all keyframes using the Graph Editor.',
        'Keep the composition under 10 seconds at 30 fps.',
        'Export as H.264 MP4 at 1920×1080.',
      ],
      skillsEvaluated: [
        'Text animator usage',
        'Shape layer animation',
        'Graph editor easing',
        'Timing and pacing',
      ],
      dueDays: 7,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions:
          'Submit the exported MP4 and the After Effects project file (.aep). Include a brief text describing your text animator choices and timing rationale.',
        textLabel: 'Animation rationale',
        minTextLength: 120,
      },
    },
    {
      title: 'Produce a 30-Second Animated Explainer with Sound',
      stage: 'Intermediate',
      objective:
        'Create a short animated explainer video that combines motion graphics, Premiere Pro editing and synchronised sound design into a cohesive piece.',
      requirements: [
        'Build motion graphics in After Effects for at least 3 distinct scenes.',
        'Edit and assemble scenes in Premiere Pro with transitions.',
        'Add a music bed and at least 4 synchronised sound effects.',
        'Apply Lumetri Colour grading across the timeline.',
        'Export H.264 MP4 at 1920×1080 with audio.',
      ],
      skillsEvaluated: [
        'Multi-scene motion graphics',
        'Premiere Pro editing and transitions',
        'Sound design and synchronisation',
        'Colour grading with Lumetri',
      ],
      dueDays: 12,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions:
          'Submit the exported MP4, the After Effects project and the Premiere Pro project. Include a text description of your sound design choices.',
        textLabel: 'Sound design notes',
        minTextLength: 150,
      },
    },
    {
      title: 'Deliver a Broadcast-Ready Animated Logo Reveal with 3D Element',
      stage: 'Advanced',
      objective:
        'Produce a professional logo reveal that integrates 2D After Effects animation with a 3D Blender render, colour graded and exported to broadcast specifications.',
      requirements: [
        'Model and animate a simple 3D element in Blender (e.g. a rotating geometric shape or product mockup).',
        'Render the 3D element as an EXR image sequence with at least 2 render passes.',
        'Composite the 3D render into an After Effects composition with 2D motion graphics.',
        'Apply a cohesive colour grade using Lumetri across the full composition.',
        'Export ProRes 4444 with alpha for broadcast and H.264 for web.',
        'Prepare a delivery document listing codecs, colour spaces and intended platforms.',
      ],
      skillsEvaluated: [
        'Blender modelling and rendering',
        '3D-2D compositing workflow',
        'Advanced After Effects compositing',
        'Broadcast delivery specifications',
        'Colour management across tools',
      ],
      dueDays: 14,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions:
          'Submit the ProRes MOV, the H.264 MP4, the Blender file (.blend), the After Effects project and the delivery document.',
        textLabel: 'Delivery specifications',
        minTextLength: 200,
      },
    },
  ],

  simTasks: [
    {
      title: 'Rescue a Rush Social Media Animation for a Product Launch',
      context:
        'The marketing lead at "PulsePay" messages you at 3 PM: "Our animator just went offline. We need a 15-second animated social post for tomorrow\'s product launch. Can you take this over?" The storyboard and script are approved, but no animation has started.',
      requirements: [
        'Review the approved storyboard and script within 15 minutes.',
        'Build the motion graphics in After Effects, prioritising speed and clarity.',
        'Add basic sound effects from a stock library.',
        'Colour grade and export H.264 MP4 at 1080×1080 for Instagram.',
        'Deliver via the agreed shared drive with a brief status note.',
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput:
        'An Instagram-ready H.264 MP4 (1080×1080) and a short status note delivered to the marketing lead.',
      skills: ['Rapid animation', 'Time management under pressure', 'Social media export specs', 'Stakeholder communication'],
    },
    {
      title: 'Animate a Product Demo from Static Storyboard Frames',
      context:
        'The creative director hands you 5 static storyboard panels for a product demo video. The client wants these animated as a 20-second motion piece with text callouts and transitions, to be delivered as an editable After Effects project for the in-house team to extend later.',
      requirements: [
        'Import storyboard panels as reference layers and animate over them.',
        'Build text callouts with text animators and shape layer highlights.',
        'Add transitions between all 5 panels.',
        'Organise the project with pre-compositions, clear naming and label colours.',
        'Export H.264 for review and provide the structured .aep for handoff.',
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput:
        'A review MP4 and a well-organised After Effects project file ready for team extension.',
      skills: ['Storyboard-to-animation translation', 'Project organisation', 'Text animation', 'Cross-team handoff'],
    },
    {
      title: 'Create a Reusable Motion Graphics Template Pack',
      context:
        'The motion design team lead asks you to build a set of 3 After Effects Motion Graphics Templates (.mogrt) — a lower third, an end card and a transition pack — that non-animators on the team can customise in Premiere Pro by editing text and colour controls.',
      requirements: [
        'Design a lower third with editable text fields and a colour picker control.',
        'Design an end card with logo placeholder and social media text fields.',
        'Create a set of 3 animated transitions with adjustable speed controls.',
        'Expose Essential Graphics controls in each template for text, colour and timing.',
        'Test each template in Premiere Pro to confirm non-animator usability.',
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput:
        'Three .mogrt files packaged with a usage guide document and preview renders of each template.',
      skills: ['Motion Graphics Template design', 'Essential Graphics panel', 'User-friendly template design', 'Cross-tool integration'],
    },
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Sara Lindqvist',
      personaRole: 'Creative Director',
      situation:
        'Sara reviewed your latest animation for a client presentation and feels the pacing is too fast for the target audience. She wants you to slow the piece down, but you designed the timing specifically to match the music beat.',
      openingMessage:
        'The animation looks great technically, but I\'m worried the pacing might overwhelm our audience. Can we slow it down a bit?',
      expectedPoints: [
        'Acknowledge Sara\'s concern about audience experience.',
        'Explain the original timing rationale tied to the music beat structure.',
        'Propose a compromise: stretch specific sections while preserving beat-sync on key moments.',
        'Offer a quick revision with adjusted timing for comparison.',
        'Agree on a revised pace that balances audience comprehension with musical rhythm.',
      ],
    },
    {
      kind: 'client',
      personaName: 'Daniel Voss',
      personaRole: 'Marketing Director, PulsePay',
      situation:
        'Daniel has received the first draft of the animated brand ident. He likes the motion but wants the colour palette changed to match a recent rebrand, which involves replacing the blue tones with a warmer orange-coral palette.',
      openingMessage:
        'Love the energy of the animation — great work. But our brand colours just shifted to a warmer palette. Can we update the grade?',
      expectedPoints: [
        'Thank Daniel for the positive feedback on the animation itself.',
        'Request the updated brand guidelines and specific colour values (hex, RGB).',
        'Explain how the colour change will affect the Lumetri grade and any element-specific adjustments.',
        'Estimate the revision timeline for the palette swap.',
        'Deliver a revised version with the new palette and confirm alignment with the brand guide.',
      ],
    },
    {
      kind: 'team',
      personaName: 'Marco Reyes',
      personaRole: 'Junior Motion Designer',
      situation:
        'Marco is learning After Effects expressions and asks for help understanding why his wiggle expression is producing unwanted movement on a property he intended to keep static.',
      openingMessage:
        'I applied a wiggle expression to my position property, but it\'s making things jump around way more than I expected. What am I doing wrong?',
      expectedPoints: [
        'Ask Marco to share the exact expression and the property values he started with.',
        'Explain the wiggle(frequency, amplitude) parameters and how they interact with existing keyframes.',
        'Recommend separating dimensions (right-click > Separate Dimensions) for independent X/Y control.',
        'Suggest using a slider control linked via pick whip for adjustable amplitude without editing the expression.',
          'Offer to pair on a quick session to build a controlled wiggle rig together.',
      ],
    },
    {
      kind: 'client',
      personaName: 'Elena Kuznetsova',
      personaRole: 'Agency Producer, BrightWave Media',
      situation:
        'Elena\'s agency needs the final broadcast file for a TVC they are submitting to a network, but the delivered file has a frame rate mismatch (25 fps delivered, 29.97 fps required by the network).',
      openingMessage:
        'The network rejected our submission — they need 29.97 fps and we received 25 fps. This needs to be fixed urgently before the deadline.',
      expectedPoints: [
        'Acknowledge the urgency and take responsibility for the frame rate issue.',
        'Explain why 25 fps was used (possibly PAL region assumption) and how to prevent it in future briefs.',
        'Immediately re-render from the After Effects project at 29.97 fps — keyframe positions need verification.',
        'Deliver the corrected file within the deadline and offer a quality check call.',
        'Suggest adding a delivery specification checklist to the project intake process for future work.',
      ],
    },
  ],

  workplaceScenarios: [
    {
      category: 'Tooling & Process',
      situation:
        'The motion design team uses a mix of After Effects versions (2022, 2023, 2024) and different render settings. Projects frequently fail to open on other team members\' machines due to version incompatibility and missing plugins.',
      requiredActions: [
        {
          action: 'Audit the team\'s current After Effects versions, plugins and render settings across all workstations.',
          good: true,
          note: 'Understanding the full scope of version and plugin discrepancies is necessary before proposing a standardisation plan.',
        },
        {
          action: 'Propose a team-wide version policy with a maximum of one version behind the latest release, and document required plugins.',
          good: true,
          note: 'A controlled version window balances access to new features with project compatibility across machines.',
        },
        {
          action: 'Mandate that everyone immediately upgrade to the latest version without testing compatibility first.',
          good: false,
          note: 'Forcing immediate upgrades risks breaking existing projects and introducing new bugs without a testing phase.',
        },
        {
          action: 'Ignore the issue and let each designer manage their own setup independently.',
          good: false,
          note: 'Without a shared standard, version conflicts will continue to disrupt handoffs and waste production time.',
        },
      ],
    },
    {
      category: 'Client Management',
      situation:
        'A long-term client keeps requesting additional deliverables beyond the original scope — "Can you also make a square version?" "Can you add a vertical cut?" — without adjusting the project budget.',
      requiredActions: [
        {
          action: 'Review the original brief and contract to confirm what was scoped and what constitutes an addition.',
          good: true,
          note: 'The signed scope is the contractual reference point. Revisiting it provides an objective basis for the conversation.',
        },
        {
          action: 'Prepare a summary of all additional requests with time estimates and propose a change order with revised pricing.',
          good: true,
          note: 'Quantifying extra work in concrete hours and a formal change order protects the studio\'s margins professionally.',
        },
        {
          action: 'Quietly absorb the extra work to avoid upsetting the client.',
          good: false,
          note: 'Unpaid scope creep devalues the team\'s expertise and creates a precedent where the client expects extra work for free.',
        },
        {
          action: 'Refuse all further requests without discussion.',
          good: false,
          note: 'An adversarial stance risks losing the client entirely. The goal is to manage scope, not reject collaboration.',
        },
      ],
    },
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Walk me through your After Effects project setup process when starting a new motion graphics project from scratch. What are the first things you configure and why?',
      guidancePoints: [
        'Set composition resolution, frame rate and duration based on the delivery target.',
        'Create a folder structure in the Project panel (Comps, Assets, Solids, Exports).',
        'Import and organise source assets with consistent naming conventions.',
        'Set up a colour workspace appropriate for the output (sRGB for web, Rec. 709 for broadcast).',
        'Create a template composition with placeholder layers for efficient reuse.',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your After Effects project has become sluggish — RAM previews are slow and the timeline stutters. How do you diagnose and resolve performance issues?',
      guidancePoints: [
        'Check composition resolution and reduce the preview quality to Quarter during editing.',
        'Enable Disk Cache and allocate sufficient RAM to After Effects in Preferences.',
        'Pre-render heavy effect chains or 3D elements as image sequences.',
        'Reduce the number of visible layers by pre-composing completed sections.',
        'Close unnecessary panels and background applications to free system resources.',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'When would you choose to create motion graphics in After Effects versus building them in Blender as 3D objects? What factors drive that decision?',
      guidancePoints: [
        'Flat, graphic-style animations (kinetic type, shape-based motion) are faster and more natural in After Effects.',
        'Rotating objects, product renders and volumetric effects require 3D tools like Blender.',
        'Consider the final output: does the piece need photorealistic depth or stylised flatness?',
        'Factor in render time: 3D renders are slower; 2D shape layers render near-instantly.',
        'Hybrid approaches combine both: 3D elements rendered from Blender composited in After Effects.',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'Describe a situation where you had to explain a technical limitation to a non-technical client. How did you make it understandable?',
      guidancePoints: [
        'Avoid jargon — translate technical terms into business outcomes the client cares about.',
        'Use analogies: "Rendering is like developing film — each frame needs processing time."',
        'Present the limitation alongside what IS possible, not just what is not.',
        'Offer alternative approaches that achieve a similar result within the constraint.',
        'Follow up with a written summary so the client can share the explanation internally.',
      ],
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between After Effects\' Classic 3D renderer and the Cinema 4D renderer. When would you use each?',
      guidancePoints: [
        'Classic 3D is faster and supports basic 3D layers, lights and cameras but no geometry extrusion.',
        'Cinema 4D renderer enables text and shape layer extrusion with bevels and collapsed transformations.',
        'Use Classic 3D for simple parallax effects and layer-based 3D compositions.',
        'Use Cinema 4D renderer when you need extruded text or dimensional shape layers.',
        'Consider Element 3D or Blender as alternatives for more complex 3D needs.',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'A client sends you footage that was shot at the wrong frame rate for your project. The motion graphics you\'ve already built are at 30 fps but the footage is 25 fps. How do you resolve this?',
      guidancePoints: [
        'Interpret the 25 fps footage at 30 fps (Right-click > Interpret Footage) and accept the slight speed change if acceptable.',
        'Alternatively, re-time the footage using Optical Flow or Time Remapping for smooth retiming.',
        'Adjust keyframe timing on the motion graphics to match the footage frame rate if retiming the footage is not viable.',
        'Communicate the frame rate mismatch to the client immediately and propose the best solution.',
        'Document the resolution to prevent the same issue on future projects.',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you decide when to use After Effects expressions versus manual keyframes for an animation?',
      guidancePoints: [
        'Expressions excel at procedural, repeating or data-driven animation (loops, wiggles, linked properties).',
        'Manual keyframes are better for bespoke, hand-crafted motion that responds to specific creative intent.',
        'Consider maintainability: expressions are easier to adjust for clients who need tweaks after delivery.',
        'Factor in project complexity: hundreds of similar elements benefit from expressions; a single logo reveal may not.',
        'Combining both — expressions for base motion, keyframes for overrides — is common professional practice.',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'You are presenting a motion graphics concept to a client and they say "I\'ll know it when I see it" without providing clear direction. How do you handle this?',
      guidancePoints: [
        'Offer to create 2–3 short style frames or animatics to give the client concrete options to react to.',
        'Provide a mood board or reference video collection to narrow the aesthetic range before animation begins.',
        'Set a revision budget: "Let\'s agree on 2 rounds of style exploration before moving into full production."',
        'Document the approved direction with written and visual references to anchor future discussions.',
        'Frame the exploration as a collaborative process rather than a sign of unclear brief.',
      ],
    },

  ]
  ,
}
