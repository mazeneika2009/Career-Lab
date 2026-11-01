import type { CareerDef } from '../framework.js'

export const videoEditor: CareerDef = {
  slug: 'video-editor',
  name: 'Video Editor',
  category: 'Creative',
  order: 46,
  description:
    'Edits compelling video — timeline craft, pacing, audio, color grading in Premiere Pro and DaVinci Resolve.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'Timeline & editing fundamentals → audio mixing & sound design → color correction & grading → multi-camera workflows & professional delivery.',
  mainSkills: [
    'Timeline editing and story pacing',
    'Audio mixing and sound design',
    'Color correction and grading',
    'Multi-camera editing',
    'Export and delivery specifications',
    'Premiere Pro and DaVinci Resolve fluency',
    'Client collaboration and revision management',
    'Visual effects and compositing basics',
  ],
  sourcePlatforms: [
    'Adobe Premiere Pro',
    'DaVinci Resolve',
    'Blackmagic Design',
    'Adobe Documentation',
  ],
  companyName: 'FrameForge Post',
  roleTitle: 'Video Editor',

  chapters: [
    {
      slug: 'timeline-and-editing-fundamentals',
      stage: 'Beginner',
      title: 'Timeline & Editing Fundamentals',
      description:
        'Navigate the NLE workspace, master the essential tools for cutting and arranging clips, and develop an instinct for story structure and pacing.',
      topics: [
        {
          slug: 'timeline-basics-and-workspace-navigation',
          title: 'Timeline Basics & Workspace Navigation',
          minutes: 27,
          objectives: [
            'Configure a new sequence with correct resolution, frame rate and audio settings',
            'Navigate the Premiere Pro and DaVinci Resolve workspaces efficiently',
            'Import, organise and label media using bins, keywords and colour tags',
          ],
          sections: [
            {
              heading: 'Sequence Settings',
              body: 'Every edit starts with a sequence whose resolution, frame rate and audio sample rate must match the intended delivery. A 1080p project at 24 fps for web, a 4K UHD timeline at 25 fps for broadcast, or a vertical 9:16 sequence for social — each requires different settings. Getting these wrong early means re-exporting everything later.',
            },
            {
              heading: 'Workspace Layouts',
              body: 'Both Premiere Pro and DaVinci Resolve ship with workspace presets optimised for different tasks: Assembly, Editing, Colour, Audio and Export. Learn what panels live where and how to customise layouts with keyboard shortcuts. A clean workspace with the timeline, source monitor and program monitor visible eliminates wasted mouse travel.',
            },
            {
              heading: 'Media Organisation',
              body: 'Professional editors never dump all footage into one flat bin. Create folder structures by day, scene or camera type. Use colour labels to flag selects, rejects and b-roll. In Resolve, use Smart Collections to auto-sort by resolution or codec. Ten minutes of upfront organisation saves hours of searching during a long edit.',
            },
          ],
          links: [
            {
              title: 'Premiere Pro getting started guide',
              url: 'https://helpx.adobe.com/premiere-pro/user-guide.html',
              sourceName: 'Adobe Documentation',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'DaVinci Resolve user manual',
              url: 'https://www.blackmagicdesign.com/products/davinciresolve',
              sourceName: 'Blackmagic Design',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Premiere Pro project organisation',
              url: 'https://helpx.adobe.com/premiere-pro/using/setting-up-projects.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'tutorial',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Why is it critical to match your sequence frame rate to your source footage frame rate?',
            options: [
              'It makes the export file smaller',
              'Mismatched rates cause dropped frames, stuttering or speed changes',
              'It automatically applies colour correction',
              'Frame rate only matters for audio sync',
            ],
            answerIndex: 1,
            explanation:
              'When sequence and footage frame rates differ, the NLE must interpolate or drop frames, resulting in visible stutter, smoothness loss or playback speed shifts that cannot be fixed in post.',
          },
        },
        {
          slug: 'cuts-trims-and-transitions',
          title: 'Cuts, Trims & Transitions',
          minutes: 30,
          objectives: [
            'Perform ripple, roll, slip and slide edits with keyboard shortcuts',
            'Choose the correct transition for the narrative moment',
            'Avoid common amateur transition mistakes that distract from the story',
          ],
          sections: [
            {
              heading: 'The Four Trim Modes',
              body: 'Ripple trims a clip and shifts all following clips to close the gap. Roll trims the edit point between two clips without changing total duration. Slip moves a clip\'s in/out points within its own media range. Slide moves a clip and adjusts the neighbouring clips to accommodate it. Mastering these four modes — and their keyboard shortcuts — is the single biggest speed improvement an editor can make.',
            },
            {
              heading: 'Hard Cuts and When to Use Them',
              body: 'A hard cut is the default: one clip ends, the next begins instantly. Hard cuts work for dialogue, action and any moment where rhythm matters more than mood. The eye expects a cut every 3–6 seconds in fast-paced content and every 8–15 seconds in slower pieces. Learn to feel the rhythm before reaching for a dissolve.',
            },
            {
              heading: 'Transitions as Storytelling',
              body: 'Cross-dissolves imply time passing. Dip-to-black signals a chapter change. Wipes feel retro or comedic. J-cuts and L-cuts — where audio leads or trails the visual cut — create seamless dialogue flow. Every transition should have a narrative reason; if you cannot articulate why it is there, use a hard cut instead.',
            },
          ],
          links: [
            {
              title: 'Premiere Pro trim editing',
              url: 'https://helpx.adobe.com/premiere-pro/using/trimming-clips.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'DaVinci Resolve trim and edit modes',
              url: 'https://www.blackmagicdesign.com/products/davinciresolve',
              sourceName: 'DaVinci Resolve',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Adobe video transitions reference',
              url: 'https://helpx.adobe.com/premiere-pro/using/adding-transitions.html',
              sourceName: 'Adobe Documentation',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'An L-cut is an edit where…',
            options: [
              'Both the video and audio cut at the same point',
              'The audio from the next clip begins before the video cuts to it',
              'A dissolve is applied only to the video track',
              'The clip plays in reverse for a brief moment',
            ],
            answerIndex: 1,
            explanation:
              'In an L-cut the outgoing clip\'s video continues while the incoming clip\'s audio starts first, creating a seamless dialogue or narration handoff that feels natural to the viewer.',
          },
        },
        {
          slug: 'story-structure-and-pacing',
          title: 'Story Structure & Pacing',
          minutes: 28,
          objectives: [
            'Apply three-act structure to organise raw footage into a coherent narrative',
            'Use pacing techniques — jump cuts, montages and breaths — to control energy',
            'Identify and remove footage that does not serve the story',
          ],
          sections: [
            {
              heading: 'Three-Act Structure in Editing',
              body: 'Act one establishes context and hooks the viewer within the first 3–5 seconds. Act two develops tension, conflict or information. Act three resolves and delivers the payoff. Even a 60-second social video follows this arc. Assemble your best establishing shots for act one, build progression in act two, and end with the strongest footage for act three.',
            },
            {
              heading: 'Pacing and Rhythm',
              body: 'Cut length controls perceived speed: short cuts (0.5–2 seconds) feel energetic; long holds (5–10 seconds) feel contemplative. Mix cut lengths to create dynamic rhythm — a pattern of short-short-long keeps viewers engaged. Match cuts to music beats for music-driven content, but never force a cut to a beat if it damages the story.',
            },
            {
              heading: 'Killing Your Darlings',
              body: 'Every editor has a favourite clip that does not fit the story. Professional discipline means cutting it. If a shot does not advance the narrative, inform the viewer or create an emotional beat, it is dead weight — no matter how beautiful. Ask: "If I remove this, does the story still work?" If yes, cut it.',
            },
          ],
          links: [
            {
              title: 'DaVinci Resolve editing fundamentals',
              url: 'https://www.blackmagicdesign.com/products/davinciresolve',
              sourceName: 'DaVinci Resolve',
              resourceType: 'course',
              relationship: 'primary',
            },
            {
              title: 'Premiere Pro storytelling techniques',
              url: 'https://helpx.adobe.com/premiere-pro/user-guide.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Blackmagic training and certification',
              url: 'https://www.blackmagicdesign.com/training',
              sourceName: 'Blackmagic Design',
              resourceType: 'course',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'A montage sequence is best used when…',
            options: [
              'You need to fill time because you ran out of dialogue',
              'You want to compress time and show progression through a series of related shots',
              'The footage quality is too low for individual clips to stand alone',
              'You want to avoid using any transitions',
            ],
            answerIndex: 1,
            explanation:
              'Montages compress time by showing a curated series of moments that collectively communicate a longer process, journey or emotional shift without showing every step in real time.',
          },
        },
      ],
    },

    {
      slug: 'audio-and-sound-design',
      stage: 'Foundation',
      title: 'Audio & Sound Design',
      description:
        'Mix dialogue, music and effects to professional levels, design soundscapes that support the visuals, and sync audio precisely to picture.',
      topics: [
        {
          slug: 'audio-levels-and-mixing',
          title: 'Audio Levels & Mixing',
          minutes: 30,
          objectives: [
            'Set dialogue, music and effects to industry-standard loudness levels',
            'Use keyframes and audio track mixer for smooth volume transitions',
            'Apply noise reduction and EQ to clean up production audio',
          ],
          sections: [
            {
              heading: 'Loudness Standards',
              body: 'Dialogue should sit around -12 dBFS with peaks no higher than -6 dBFS. Music beds typically run -18 to -24 dBFS under dialogue, rising to -12 dBFS in music-only moments. Effects land between -12 and -18 dBFS depending on prominence. These levels prevent clipping and give downstream tools headroom to work.',
            },
            {
              heading: 'Keyframing Volume',
              body: 'Static volume levels feel robotic. Keyframe volume envelopes to duck music under dialogue, swell effects during action and fade audio across transitions. In Premiere Pro, use the Pen tool directly on clip audio; in Resolve, use the Fairlight page\'s automation lanes. A well-keyframed mix breathes with the edit.',
            },
            {
              heading: 'Cleaning Production Audio',
              body: 'Shot audio always needs cleanup. Apply a high-pass filter at 80 Hz to remove rumble. Use a noise reduction plugin (Adobe Audition\'s DeNoise, Fairlight\'s noise reduction) to suppress ambient hiss. Notch out specific problem frequencies with a parametric EQ. Clean audio is the invisible foundation of a professional edit.',
            },
          ],
          links: [
            {
              title: 'Premiere Pro audio mixing overview',
              url: 'https://helpx.adobe.com/premiere-pro/using/audio-mixing.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'DaVinci Resolve Fairlight audio',
              url: 'https://www.blackmagicdesign.com/products/davinciresolve',
              sourceName: 'DaVinci Resolve',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Adobe Audition noise reduction',
              url: 'https://helpx.adobe.com/audition/using/noise-reduction.html',
              sourceName: 'Adobe Documentation',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'When mixing dialogue with background music, the music level should generally sit at least how many dB below the dialogue?',
            options: [
              '0 dB — they should be equal',
              '6 dB below dialogue',
              '6–12 dB below dialogue',
              '30 dB below dialogue',
            ],
            answerIndex: 2,
            explanation:
              'Music beds typically run 6–12 dB below dialogue level, ensuring speech clarity while maintaining atmospheric presence. The exact amount depends on the music\'s density and the scene\'s emotional needs.',
          },
        },
        {
          slug: 'sound-design-and-foley',
          title: 'Sound Design & Foley',
          minutes: 29,
          objectives: [
            'Layer ambient soundscapes to establish setting and mood',
            'Record and place Foley elements that match on-screen action',
            'Use sound design to bridge cuts and smooth transitions',
          ],
          sections: [
            {
              heading: 'Building Ambient Layers',
              body: 'Every scene has an ambient bed — room tone, city hum, forest birdsong, office chatter. Layer two to three ambient tracks at different volumes to create depth: a low bed for atmosphere, a mid layer for texture and a high layer for occasional detail. Without ambient beds, cuts between shots feel jarring and artificial.',
            },
            {
              heading: 'Foley Fundamentals',
              body: 'Foley artists recreate everyday sounds — footsteps, cloth rustle, object handling — in sync with picture. Even if you do not have a Foley stage, recording basic elements (keys jangling, footsteps on different surfaces, fabric movement) with a portable recorder adds production value that library effects cannot match. Timing is everything: the sound must land within two frames of the visual.',
            },
            {
              heading: 'Sound as Transition',
              body: 'Audio can bridge visual cuts where a hard cut would feel abrupt. Starting the audio from the next scene two to four frames before the visual cut (a J-cut audio lead) pulls the viewer forward. A rising whoosh or tonal swell across a cut creates momentum. Sound bridges are invisible when done well and obvious when done poorly.',
            },
          ],
          links: [
            {
              title: 'Fairlight sound design tools',
              url: 'https://www.blackmagicdesign.com/products/davinciresolve',
              sourceName: 'Blackmagic Design',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Premiere Pro audio effects reference',
              url: 'https://helpx.adobe.com/premiere-pro/using/audio-effects.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'DaVinci Resolve training — Fairlight',
              url: 'https://www.blackmagicdesign.com/training',
              sourceName: 'Blackmagic Design',
              resourceType: 'course',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Room tone is essential between dialogue takes primarily because…',
            options: [
              'It sounds pleasant in the final mix',
              'It provides a consistent ambient bed that allows clean cuts between takes',
              'It replaces the need for noise reduction',
              'It is required by broadcast standards',
            ],
            answerIndex: 1,
            explanation:
              'Room tone fills the silence gap between edits, ensuring the background ambience remains consistent across cuts and preventing jarring drops to dead silence.',
          },
        },
        {
          slug: 'music-selection-and-sync',
          title: 'Music & Sync',
          minutes: 27,
          objectives: [
            'Select and edit music tracks that complement the visual tone and pacing',
            'Sync cuts to musical beats without feeling mechanical',
            'Handle music licensing considerations for commercial projects',
          ],
          sections: [
            {
              heading: 'Music Selection',
              body: 'Music sets emotional context before a single word is spoken. Match the track\'s tempo, instrumentation and energy to the scene\'s mood: acoustic guitar for warmth, electronic pulses for tension, orchestral swells for epic scale. Preview tracks at full volume with the picture — a track that sounds great in isolation may fight the visuals.',
            },
            {
              heading: 'Editing to the Beat',
              body: 'Mark beat points in your timeline with markers before cutting. Align key visual transitions — shot changes, title reveals, action moments — to these markers. Vary the alignment: cut on the beat for emphasis, cut just before the beat for anticipation, or hold past the beat for surprise. Mechanical beat-matching feels cheap; intentional sync feels professional.',
            },
            {
              heading: 'Music Licensing Basics',
              body: 'Royalty-free libraries (Artlist, Epidemic Sound, Musicbed) offer per-seat or per-project licences. Standard licences cover most commercial use; extended licences cover broadcast and large-audience distribution. Always verify the licence covers the project\'s distribution channels before editing to a track. Using unlicensed music in commercial work is a legal and financial risk.',
            },
          ],
          links: [
            {
              title: 'Adobe Premiere Pro audio editing',
              url: 'https://helpx.adobe.com/premiere-pro/using/audio-overview.html',
              sourceName: 'Adobe Documentation',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'DaVinci Resolve music and timing',
              url: 'https://www.blackmagicdesign.com/products/davinciresolve',
              sourceName: 'DaVinci Resolve',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Blackmagic Design audio training',
              url: 'https://www.blackmagicdesign.com/training',
              sourceName: 'Blackmagic Design',
              resourceType: 'course',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'When cutting a montage to music, cutting slightly before the beat rather than exactly on it creates a feeling of…',
            options: [
              'Laziness and sloppiness',
              'Anticipation and forward momentum',
              'The editor is out of sync',
              'Slower pacing',
            ],
            answerIndex: 1,
            explanation:
              'Anticipating the beat — placing the visual cut a frame or two before the audio hit — creates a sense of propulsion and keeps the viewer leaning forward, as opposed to the more settled feeling of cutting exactly on the beat.',
          },
        },
      ],
    },

    {
      slug: 'color-correction-and-grading',
      stage: 'Intermediate',
      title: 'Color Correction & Grading',
      description:
        'Correct footage to neutral, consistent colour, then apply creative grades that establish mood, brand identity and cinematic tone.',
      topics: [
        {
          slug: 'color-correction-fundamentals',
          title: 'Color Correction Fundamentals',
          minutes: 30,
          objectives: [
            'Use waveform, vectorscope and parade monitors to evaluate colour objectively',
            'Balance white, exposure and contrast across shots for continuity',
            'Apply primary corrections using lift, gamma and gain controls',
          ],
          sections: [
            {
              heading: 'Reading Scopes',
              body: 'Monitors lie — every screen shows colour differently. Scopes do not. The waveform monitor shows luminance distribution (0 at black, 100 at white). The vectorscope shows chrominance position relative to the Rec. 709 colour targets. The RGB parade shows channel balance. Learn to edit with scopes open at all times and trust them over your eyes.',
            },
            {
              heading: 'White Balance and Exposure',
              body: 'Set white balance first using a grey card or white reference in the footage. Adjust exposure so the subject\'s face sits around 70 IRE on the waveform. Set the black point so shadows sit just above 0 IRE without crushing. These three moves — white balance, exposure and black point — correct 80 percent of colour issues.',
            },
            {
              heading: 'Shot-to-Shot Continuity',
              body: 'Footage from the same scene must look consistent even if it was shot at different times. Match the scopes between shots: same luminance range, same white point, same skin tone position on the vectorscope. A reference still from your hero shot, saved as a PowerGrade in Resolve or a saved preset in Premiere, keeps the grade consistent across the timeline.',
            },
          ],
          links: [
            {
              title: 'DaVinci Resolve color page overview',
              url: 'https://www.blackmagicdesign.com/products/davinciresolve',
              sourceName: 'DaVinci Resolve',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Premiere Pro Lumetri color tool',
              url: 'https://helpx.adobe.com/premiere-pro/using/color-correction.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Blackmagic color science training',
              url: 'https://www.blackmagicdesign.com/training',
              sourceName: 'Blackmagic Design',
              resourceType: 'course',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'On a waveform monitor, skin tones in a properly exposed shot typically sit around…',
            options: [
              '0 IRE (the black floor)',
              '50 IRE',
              '70 IRE',
              '100 IRE (peak white)',
            ],
            answerIndex: 2,
            explanation:
              'Well-exposed skin tones generally land around 70 IRE on the waveform, providing enough headroom for highlights while keeping the subject clearly visible and naturally lit.',
          },
        },
        {
          slug: 'creative-color-grading',
          title: 'Color Grading for Mood',
          minutes: 30,
          objectives: [
            'Build a creative grade using colour wheels, curves and LUTs intentionally',
            'Apply cinematic looks — teal and orange, desaturated drama, vintage warmth — with restraint',
            'Maintain skin tone integrity while pushing creative colour shifts',
          ],
          sections: [
            {
              heading: 'Colour Wheels and Curves',
              body: 'Lift shadows toward teal, push highlights toward warm amber, and desaturate the midtones slightly — the classic cinematic grade. Use Resolve\'s colour wheels for broad tonal shifts and the custom curve for fine control. In Premiere Pro, the Lumetri colour panel offers the same tools in a different layout. The key is subtlety: if the grade is the first thing the viewer notices, you have gone too far.',
            },
            {
              heading: 'LUTs as Starting Points',
              body: 'A LUT (Look-Up Table) remaps colour values to produce a predefined look. Apply LUTs at the correct stage: technical LUTs (camera log to Rec. 709) first, creative LUTs second. Never stack multiple LUTs — each one crushes data. Use a LUT at reduced opacity or as a reference point, then build your grade manually for full control.',
            },
            {
              heading: 'Protecting Skin Tones',
              body: 'The human eye is extremely sensitive to unnatural skin. Use a skin tone qualifier in Resolve or a HSL key in Premiere to isolate skin and check it against the vectorscope\'s skin tone indicator line. Push background and environmental colours as far as you like, but keep skin within the natural range unless the project explicitly calls for a stylised look.',
            },
          ],
          links: [
            {
              title: 'DaVinci Resolve color grading tools',
              url: 'https://www.blackmagicdesign.com/products/davinciresolve',
              sourceName: 'DaVinci Resolve',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Premiere Pro creative LUTs',
              url: 'https://helpx.adobe.com/premiere-pro/using/lumetri-color.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Blackmagic Resolve training — color',
              url: 'https://www.blackmagicdesign.com/training',
              sourceName: 'Blackmagic Design',
              resourceType: 'course',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'When applying a creative LUT to log footage, the correct order of operations is…',
            options: [
              'Creative LUT first, then technical conversion LUT',
              'Technical conversion LUT first, then creative LUT',
              'Both LUTs applied simultaneously on the same node',
              'LUT order does not matter',
            ],
            answerIndex: 1,
            explanation:
              'The technical LUT converts log footage to a standard display space (Rec. 709) first, providing a correct baseline. The creative LUT is then applied on top to style the image. Reversing this order produces unpredictable and often undesirable colour shifts.',
          },
        },
        {
          slug: 'basic-visual-effects-and-compositing',
          title: 'Basic Visual Effects & Compositing',
          minutes: 28,
          objectives: [
            'Apply motion tracking, stabilization and speed ramping within the NLE',
            'Use basic compositing with masks and blend modes for simple VFX shots',
            'Integrate After Effects or Fusion for text tracking and screen replacements',
          ],
          sections: [
            {
              heading: 'Stabilization and Tracking',
              body: 'Shaky handheld footage can be rescued with the Warp Stabilizer in Premiere Pro or the Stabilizer in Resolve. Both analyze motion vectors and smooth the clip, though over-stabilization creates a warping, rubbery feel. For shots that need element tracking — text on a moving surface, a graphic following a person — use the built-in motion trackers and apply the data to a null or adjustment layer.',
            },
            {
              heading: 'Masking and Compositing Basics',
              body: 'Power Windows in Resolve and mask paths in Premiere Pro isolate regions for colour correction, blurring or replacement. Combine masks with blend modes and opacity for simple composites: sky replacements, screen inserts, logo placements. Every composite requires matching grain, colour temperature and lighting direction between layers to be convincing.',
            },
            {
              heading: 'Dynamic Link and Fusion',
              body: 'Adobe Dynamic Link sends a clip from Premiere Pro to After Effects without rendering an intermediate file — ideal for text tracking, green-screen keying and complex composites. In Resolve, the Fusion page provides node-based compositing built into the application. Learn which tool suits the complexity of the shot and avoid over-complicating simple fixes.',
            },
          ],
          links: [
            {
              title: 'Premiere Pro warp stabilizer',
              url: 'https://helpx.adobe.com/premiere-pro/using/stabilize-motion.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'DaVinci Resolve Fusion overview',
              url: 'https://www.blackmagicdesign.com/products/davinciresolve',
              sourceName: 'DaVinci Resolve',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Adobe After Effects and Dynamic Link',
              url: 'https://helpx.adobe.com/premiere-pro/using/dynamic-link.html',
              sourceName: 'Adobe Documentation',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Over-applying the Warp Stabilizer at high smoothness values typically produces…',
            options: [
              'A perfectly steady, professional result',
              'A warping, jelly-like distortion in the background',
              'Sharper footage',
              'Faster render times',
            ],
            answerIndex: 1,
            explanation:
              'Excessive stabilization forces the algorithm to compensate for too much motion, warping the image to keep the subject locked — creating a distinctive rubbery distortion especially visible at frame edges.',
          },
        },
      ],
    },

    {
      slug: 'professional-post-production',
      stage: 'Advanced',
      title: 'Professional Post-Production',
      description:
        'Handle multi-camera edits, deliver files to exact broadcast and web specifications, and manage client collaboration through revision rounds professionally.',
      topics: [
        {
          slug: 'multi-camera-editing',
          title: 'Multi-Camera Editing',
          minutes: 30,
          objectives: [
            'Sync multiple camera angles using timecode, audio waveform or manual markers',
            'Perform a multi-camera edit using the live-switching interface in Premiere Pro and Resolve',
            'Refine a multi-cam edit with individual angle adjustments after the initial switch',
          ],
          sections: [
            {
              heading: 'Syncing Multi-Camera Footage',
              body: 'Timecode is the most accurate sync method when cameras share a sync source (genlock or wireless sync). When timecode is unavailable, audio waveform sync — matching the scratch audio across all cameras — works reliably. Premiere Pro\'s "Synchronise" function and Resolve\'s "Auto Sync Audio" both automate this. Always verify sync by checking a clap or sharp audio transient at the head of the timeline.',
            },
            {
              heading: 'Live Switching in the Multi-Cam Monitor',
              body: 'Both Premiere Pro and Resolve display all angles simultaneously and let you click to switch in real time during playback. Edit in real time first to capture the instinctive cuts, then refine. The multi-cam workflow is dramatically faster than manually stacking and cutting angles on separate tracks.',
            },
            {
              heading: 'Post-Switch Refinement',
              body: 'After the initial multi-cam switch, individual angles may need colour matching, audio level adjustment or timing tweaks. In Premiere, double-click a clip on the multi-cam track to open the original source. In Resolve, use the Swap Camera feature to change an angle without losing timing. Colour match across angles is critical — different cameras and lenses produce different colour science.',
            },
          ],
          links: [
            {
              title: 'Premiere Pro multi-camera editing',
              url: 'https://helpx.adobe.com/premiere-pro/using/multi-camera-editing.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'DaVinci Resolve multi-cam workflow',
              url: 'https://www.blackmagicdesign.com/products/davinciresolve',
              sourceName: 'DaVinci Resolve',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Blackmagic multi-camera training',
              url: 'https://www.blackmagicdesign.com/training',
              sourceName: 'Blackmagic Design',
              resourceType: 'course',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'The most reliable method for syncing multi-camera footage when all cameras share a genlock signal is…',
            options: [
              'Audio waveform matching',
              'Manual marker alignment',
              'Matching embedded timecode',
              'Visual clap alignment',
            ],
            answerIndex: 2,
            explanation:
              'When cameras share a genlock signal, their timecodes are frame-accurate to each other, making timecode sync the fastest and most precise method — no manual intervention required.',
          },
        },
        {
          slug: 'export-and-delivery-specifications',
          title: 'Export & Delivery Specifications',
          minutes: 30,
          objectives: [
            'Configure export presets for broadcast, web and social media delivery',
            'Understand codec, container, bitrate and colour space requirements for different platforms',
            'Use the media encoder queue to batch-export multiple versions efficiently',
          ],
          sections: [
            {
              heading: 'Codec and Container Fundamentals',
              body: 'H.264 and H.265 (HEVC) are lossy codecs optimised for distribution — small files, wide compatibility. ProRes and DNxHR are intermediate codecs for editing and archiving — larger files that preserve quality. Containers (.mov, .mp4, .mkv) hold the codec, audio tracks and metadata. Understanding what the client or platform demands — and delivering exactly that — prevents rejection and re-exports.',
            },
            {
              heading: 'Platform-Specific Requirements',
              body: 'YouTube recommends 4K H.264 at 35–45 Mbps. Instagram Reels want 1080×1920 at under 30 Mbps in H.264. Broadcast delivery typically requires ProRes 422 HQ or DNxHR HQ with specific loudness standards (-24 LUFS for broadcast). Each platform has its own safe area, duration limits and colour space (Rec. 709 for SDR, Rec. 2020 for HDR). Maintain a cheat sheet of these specs.',
            },
            {
              heading: 'Batch Exporting',
              body: 'When a project needs five deliverables — 4K master, 1080p web, vertical social, square social and a textless version — use Adobe Media Encoder or Resolve\'s render queue. Set up each preset, add them to the queue and let them render overnight. Naming files with a consistent convention (Project_Title_Resolution_Codec_Date) prevents the "which file is which?" problem.',
            },
          ],
          links: [
            {
              title: 'Premiere Pro export settings reference',
              url: 'https://helpx.adobe.com/premiere-pro/using/export-media.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'DaVinci Resolve delivery page',
              url: 'https://www.blackmagicdesign.com/products/davinciresolve',
              sourceName: 'DaVinci Resolve',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Adobe Media Encoder batch export',
              url: 'https://helpx.adobe.com/media-encoder/using/encoding-exporting.html',
              sourceName: 'Adobe Documentation',
              resourceType: 'tutorial',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'For a master archive file that will be re-edited in the future, the best codec choice is…',
            options: [
              'H.264 at high bitrate',
              'ProRes 422 HQ or DNxHR HQ',
              'H.265 at maximum quality',
              'MP4 with AAC audio',
            ],
            answerIndex: 1,
            explanation:
              'ProRes 422 HQ and DNxHR HQ are visually lossless intermediate codecs designed for editing and archiving. They preserve full quality for future re-edits, unlike lossy delivery codecs such as H.264 and H.265 which degrade with each re-encode.',
          },
        },
        {
          slug: 'client-workflow-and-collaboration',
          title: 'Client Workflow & Collaboration',
          minutes: 28,
          objectives: [
            'Set up a review and approval workflow using frame.io or similar platforms',
            'Manage revision rounds professionally and avoid scope creep',
            'Present and defend editorial decisions with clear rationale',
          ],
          sections: [
            {
              heading: 'Review Platforms',
              body: 'Frame.io (integrated into Premiere Pro), Resolve\'s built-in review tools and services like Wipster let clients comment directly on specific frames. Upload a cut, share a link, and receive timestamped feedback — no more "at the part where the thing happens" emails. Establish the review cadence upfront: rough cut, fine cut, picture lock, final delivery.',
            },
            {
              heading: 'Managing Revisions',
              body: 'Define the number of included revision rounds in the project scope before production begins. Typical structures include two rounds of feedback plus a final polish. Log every change request in a shared document with timestamps. When feedback contradicts itself or the original brief, raise it immediately rather than silently implementing conflicting notes.',
            },
            {
              heading: 'Presenting Editorial Decisions',
              body: 'When a client questions a cut choice, explain the reasoning: "I held this shot longer to let the emotional beat land before the transition." Anchor decisions in the brief\'s goals — audience, tone, platform. Offer alternatives when appropriate, but do not fold on every note without discussion. Professional editors are hired for their judgment, not just their technical skill.',
            },
          ],
          links: [
            {
              title: 'Premiere Pro frame.io integration',
              url: 'https://helpx.adobe.com/premiere-pro/using/frame-io.html',
              sourceName: 'Adobe Premiere Pro',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'DaVinci Resolve collaboration tools',
              url: 'https://www.blackmagicdesign.com/products/davinciresolve',
              sourceName: 'DaVinci Resolve',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Adobe video collaboration overview',
              url: 'https://helpx.adobe.com/premiere-pro/user-guide.html',
              sourceName: 'Adobe Documentation',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'When a client provides feedback that contradicts the original project brief, the best approach is to…',
            options: [
              'Implement all feedback immediately to keep the client happy',
              'Ignore the feedback and deliver your version',
              'Reference the brief, explain the conflict and seek clarification before editing',
              'Send an invoice for the additional scope',
            ],
            answerIndex: 2,
            explanation:
              'Grounding the conversation in the agreed brief protects both the project\'s creative integrity and your time. Clarifying contradictions upfront prevents wasted revisions and ensures the final deliverable matches the client\'s actual intent.',
          },
        },
      ],
    },
  ],

  practicalExam: {
    title: 'Short-Form Documentary Edit — Post-Production Delivery',
    coverage: [
      'Timeline editing and story structure',
      'Audio mixing and sound design',
      'Color correction and grading',
      'Export and delivery specifications',
      'Client workflow and collaboration',
      'Multi-camera editing',
    ],
    brief:
      'You have received raw footage for a 2–3 minute short-form documentary about a local coffee roaster. The package includes two camera angles, external audio from a lavalier mic, music tracks and b-roll. Deliver a polished edit with corrected colour, mixed audio and exports optimised for YouTube and Instagram Reels.',
    requirements: [
      'Assemble a coherent story using three-act structure with clear beginning, middle and end',
      'Sync and clean dialogue audio: noise reduction, EQ, consistent levels around -12 dBFS',
      'Mix music bed at least 6 dB below dialogue with keyframed ducking',
      'Apply primary colour correction using scopes for consistency across shots',
      'Apply a subtle creative grade that matches the warm, artisanal tone of the subject',
      'Use at least one J-cut or L-cut to smooth dialogue transitions',
      'Export a YouTube master: 1080p H.264 at 16 Mbps with -14 LUFS loudness',
      'Export a vertical Instagram Reels version: 1080×1920 at under 30 Mbps',
    ],
    expectedOutput:
      'A ZIP archive containing the YouTube master file, the Instagram Reels export, the project file (Premiere Pro or Resolve) with organised bins and labelled tracks, and a brief document explaining editorial and colour decisions.',
    rubric: [
      { skill: 'Story Structure', weight: 20, criteria: 'Clear three-act arc, logical shot order, effective pacing with varied cut lengths' },
      { skill: 'Audio Mix', weight: 20, criteria: 'Clean dialogue, properly ducked music, consistent loudness, no clipping or distortion' },
      { skill: 'Color Correction & Grade', weight: 20, criteria: 'Neutral correction across shots, intentional creative grade, protected skin tones, scopes used' },
      { skill: 'Editing Technique', weight: 15, criteria: 'Precise cuts, effective use of J/L-cuts, smooth transitions, no visible jump cuts in dialogue' },
      { skill: 'Export Quality', weight: 15, criteria: 'Correct codecs and bitrates for each platform, proper loudness levels, clean file naming' },
      { skill: 'Organisation & Documentation', weight: 10, criteria: 'Named bins and tracks, consistent file structure, clear decision rationale in documentation' },
    ],
    passScore: 70,
  },

  assignments: [
    {
      title: 'Dialogue Scene Assembly with Audio Cleanup',
      stage: 'Beginner',
      objective:
        'Assemble a two-minute dialogue scene from raw footage, clean the production audio, and deliver a technically correct export.',
      requirements: [
        'Import and organise all footage into labelled bins by camera and scene',
        'Sync external audio to camera footage using waveform matching',
        'Apply noise reduction and high-pass filter to clean dialogue audio',
        'Set dialogue levels to -12 dBFS with peaks no higher than -6 dBFS',
        'Add a subtle ambient room tone bed beneath the dialogue',
        'Export a 1080p H.264 file at appropriate bitrate',
      ],
      skillsEvaluated: [
        'Media organisation',
        'Audio sync and cleanup',
        'Level setting and mixing',
        'Export configuration',
      ],
      dueDays: 7,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions:
          'Submit the exported video file and a brief text describing the audio cleanup steps you applied, including specific plugins and settings used.',
        textLabel: 'Audio cleanup notes',
        minTextLength: 300,
      },
    },
    {
      title: 'Music-Driven Montage Edit',
      stage: 'Intermediate',
      objective:
        'Edit a 60–90 second montage sequence synchronised to a music track, applying colour correction and a creative grade.',
      requirements: [
        'Select a royalty-free music track that matches the desired energy and tone',
        'Edit b-roll footage to the music with intentional beat-synced cuts',
        'Apply primary colour correction across all clips for consistency',
        'Apply a creative grade that establishes a distinct mood',
        'Include at least two speed ramps or time remapping effects',
        'Export a 4K master and a 1080p web version',
      ],
      skillsEvaluated: [
        'Music selection and beat-sync editing',
        'Colour correction and grading',
        'Time remapping and speed effects',
        'Multi-resolution export',
      ],
      dueDays: 12,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions:
          'Submit both export files and a text document explaining your music choice, colour grade rationale and any licensing details for the music track.',
        textLabel: 'Creative rationale',
        minTextLength: 500,
        linkLabels: ['Link to 4K master', 'Link to 1080p web version'],
      },
    },
    {
      title: 'Multi-Cam Interview with Full Post-Production',
      stage: 'Advanced',
      objective:
        'Perform a multi-camera edit of a two-person interview, apply full audio post-production, colour grade and deliver broadcast-ready files.',
      requirements: [
        'Sync three camera angles using timecode or audio waveform matching',
        'Perform a multi-cam switch using the live-switching interface',
        'Refine the edit with individual angle colour matching and audio levels',
        'Apply full audio post: noise reduction, EQ, compression, limiting',
        'Apply primary correction and a broadcast-appropriate creative grade',
        'Deliver a ProRes 422 HQ master and an H.264 web version',
        'Include a delivery document with technical specifications for each file',
      ],
      skillsEvaluated: [
        'Multi-camera workflow',
        'Advanced audio post-production',
        'Colour matching across angles',
        'Broadcast delivery specifications',
        'Professional documentation',
      ],
      dueDays: 18,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions:
          'Submit both master files, the project file with organised timeline, and a comprehensive delivery document listing codec, resolution, frame rate, loudness and colour space for each deliverable.',
        textLabel: 'Delivery document',
        minTextLength: 800,
        linkLabels: ['ProRes master link', 'H.264 web version link'],
      },
    },
  ],

  simTasks: [
    {
      title: 'Emergency Re-Edit for Client Presentation',
      context:
        'The producer messages you at 3 PM: "The client just changed the entire narrative direction for tomorrow morning\'s screening. We need a re-cut of the 90-second brand film with a new opening and closing by 8 AM." The current edit is picture-locked but needs structural changes.',
      requirements: [
        'Re-arrange the opening three shots and closing two shots to match the new narrative direction',
        'Adjust audio levels and music cues to fit the restructured timeline',
        'Re-export the updated version at broadcast spec (ProRes 422 HQ, -24 LUFS)',
        'Update the review link on frame.io with the new version and a change log',
        'Confirm delivery to the producer via message with a summary of changes made',
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput:
        'A re-edited 90-second video in ProRes 422 HQ with updated frame.io link and change log delivered to the producer.',
      skills: ['Rapid re-editing', 'Audio adjustment under pressure', 'Broadcast export', 'Client communication'],
    },
    {
      title: 'Colour Match Across Mixed Camera Sources',
      context:
        'The edit uses footage from a Sony FX3 and a Canon R5 shot on the same day. The skin tones and overall colour science are noticeably different between the two cameras. The client expects a seamless, unified look.',
      requirements: [
        'Apply primary correction to each camera source independently using scopes',
        'Match skin tone position on the vectorscope between both camera sources',
        'Use a reference still from the hero shot to maintain consistency across the timeline',
        'Apply a unified creative grade over the corrected footage',
        'Deliver a side-by-side comparison showing before and after matching',
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput:
        'A colour-matched timeline export and a before/after comparison image demonstrating the skin tone and exposure match.',
      skills: ['Cross-camera colour matching', 'Scope reading', 'Grade consistency', 'Attention to detail'],
    },
    {
      title: 'Platform-Specific Export Package',
      context:
        'The marketing team needs the finished brand video delivered in four formats: a 4K YouTube master, a 1080p Instagram feed version (60 seconds max), a 9:16 Instagram Reels version (30 seconds), and a square LinkedIn version (60 seconds). All must include burned-in captions.',
      requirements: [
        'Re-edit and trim the master to fit each platform\'s duration requirements',
        'Reframe the 9:16 and 1:1 versions to keep subjects centred and key information visible',
        'Add burned-in captions using Premiere Pro\'s Essential Graphics or Resolve\'s subtitle tools',
        'Export each version with platform-appropriate codec, bitrate and resolution',
        'Create a delivery sheet listing every file with its specs and intended platform',
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput:
        'Four exported video files, each named and formatted for its target platform, plus a delivery specification sheet.',
      skills: ['Multi-platform delivery', 'Reframing and re-timing', 'Caption creation', 'Export management'],
    },
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Maya Chen',
      personaRole: 'Creative Director',
      situation:
        'Maya reviewed the first rough cut and feels the pacing is too slow for the target audience. She wants shorter cuts and more dynamic energy throughout.',
      openingMessage:
        'The content is solid, but it feels like it drags in the middle section. Our audience has a short attention span — can we tighten the pacing without losing the story?',
      expectedPoints: [
        'Acknowledge the pacing concern and ask which specific sections feel slow',
        'Propose targeted trimming of the middle section rather than a full re-cut',
        'Suggest adjusting music tempo or adding visual rhythm to increase energy',
        'Estimate the impact on timeline and confirm any deadline implications',
        'Show a revised rough cut focusing on the flagged sections for approval before re-cutting the entire piece',
      ],
    },
    {
      kind: 'client',
      personaName: 'Daniel Russo',
      personaRole: 'Marketing Manager, Artisan Coffee Co.',
      situation:
        'Daniel loves the edit but wants to add customer testimonial clips that were not part of the original scope. The testimonials are on his phone in poor quality.',
      openingMessage:
        'The video is looking great! We managed to get a couple of quick customer testimonials on video — could we weave them in? They are just phone clips, but the quotes are really good.',
      expectedPoints: [
        'Express enthusiasm for the testimonials and their value to the story',
        'Address the quality limitation honestly — phone footage may not match the production standard',
        'Suggest alternatives: using the audio as voiceover with b-roll, or adding text cards with the quotes',
        'Clarify that adding new footage constitutes scope change and provide an estimate',
        'Offer a quick quality assessment of the clips to determine the best integration approach',
      ],
    },
    {
      kind: 'team',
      personaName: 'Liam Torres',
      personaRole: 'Junior Editor',
      situation:
        'Liam is working on a separate project and is struggling with audio sync issues. He asks for help troubleshooting before the client deadline.',
      openingMessage:
        'I am having an audio drift problem in my timeline — the dialogue starts in sync but drifts out by the end of the clip. I have a deadline in four hours and I am stuck.',
      expectedPoints: [
        'Ask whether the footage and external audio have different frame rates or sample rates',
        'Suggest checking the audio sample rate settings in the sequence versus the source files',
        'Recommend using the synchronize function with waveform matching as a fresh approach',
          'Offer to jump on a quick screen-share to diagnose the issue live',
        'Help prioritise: identify what can be delivered now versus what can be refined after the deadline',
      ],
    },
    {
      kind: 'client',
      personaName: 'Sarah Kim',
      personaRole: 'Content Lead, Wellness Brand',
      situation:
        'Sarah is unhappy with the colour grade, saying it looks "too cinematic" for her brand\'s bright, clean aesthetic. The edit is due in two days.',
      openingMessage:
        'The editing is wonderful, but the colour feels too dark and moody for us. Our brand is all about light, fresh and clean. Can we rework the grade?',
      expectedPoints: [
        'Acknowledge the brand alignment concern as valid and important',
        'Ask for specific brand references — previous content, a mood board or style guide',
        'Propose a revised grade: lifted shadows, reduced contrast, desaturated warmth for a clean look',
        'Confirm this is a revision round within scope or clarify if it constitutes additional work',
        'Deliver a one-shot colour test within a few hours for approval before regrading the full piece',
      ],
    },
  ],

  workplaceScenarios: [
    {
      category: 'Deadline management',
      situation:
        'You are editing a 10-minute corporate video with a hard delivery deadline on Friday. On Wednesday afternoon, the client sends five additional b-roll clips and asks you to "work them in where appropriate" without extending the deadline.',
      requiredActions: [
        {
          action: 'Assess the additional footage and estimate the time required to integrate it properly',
          good: true,
          note: 'Understanding the actual effort before committing ensures you can make an informed decision about the timeline.',
        },
        {
          action: 'Communicate a realistic revised timeline to the client, explaining what can be done by Friday and what would benefit from additional time',
          good: true,
          note: 'Transparency about capacity builds trust and prevents last-minute quality issues.',
        },
        {
          action: 'Drop everything to integrate all five clips immediately, sacrificing sleep and quality',
          good: false,
          note: 'Sacrificing quality to meet an unrealistic deadline damages your professional reputation more than a short extension.',
        },
        {
          action: 'Integrate the best two or three clips that genuinely improve the edit and defer the rest',
          good: true,
          note: 'Curating additions based on editorial value rather than blindly implementing all requests demonstrates professional judgment.',
        },
      ],
    },
    {
      category: 'Tool proficiency',
      situation:
        'The post-production house you work with is transitioning from Premiere Pro to DaVinci Resolve for all editing and colour work. You have two weeks before the switch is mandatory and you have limited Resolve experience.',
      requiredActions: [
        {
          action: 'Complete DaVinci Resolve\'s official free training modules to build baseline proficiency',
          good: true,
          note: 'Structured training provides the fastest path to functional competence in a new tool.',
        },
        {
          action: 'Start your next project in Resolve while keeping Premiere available as a safety net',
          good: true,
          note: 'Learning by doing on a real project accelerates retention, and having a fallback prevents missed deadlines.',
        },
        {
          action: 'Refuse to use Resolve and continue editing in Premiere Pro exclusively',
          good: false,
          note: 'Resisting mandatory tooling changes marks you as inflexible and risks your position on the team.',
        },
        {
          action: 'Ask a Resolve-experienced colleague for a one-hour orientation covering the most-used features',
          good: true,
          note: 'Peer guidance surfaces practical shortcuts and gotchas that formal training often skips.',
        },
      ],
    },
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Walk me through your process for cleaning up production audio recorded on location. What tools and techniques do you apply and in what order?',
      guidancePoints: [
        'Start with a high-pass filter at 80 Hz to remove low-end rumble',
        'Apply noise reduction to suppress ambient hiss without damaging dialogue',
        'Use a parametric EQ to notch out specific problem frequencies',
        'Apply light compression to even out volume fluctuations',
        'Set final dialogue levels to industry standard (-12 dBFS)',
      ],
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between colour correction and colour grading. Why are they treated as separate steps in the pipeline?',
      guidancePoints: [
        'Colour correction neutralises inconsistencies: white balance, exposure, contrast',
        'Colour grading applies an intentional creative look for mood and tone',
        'Correction must happen first to provide a neutral baseline',
        'Grading on top of uncorrected footage produces unpredictable results',
        'Scopes are essential for correction; creative intent guides grading',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'You receive footage where the external audio recorder failed and you only have camera scratch audio of terrible quality. How do you salvage the edit?',
      guidancePoints: [
        'Assess whether the scratch audio is usable at all after processing',
        'Apply aggressive noise reduction and EQ to extract intelligible dialogue',
        'Consider using the scratch audio as a guide to re-record or source replacement audio',
        'Explore AI-based audio restoration tools as a last resort',
        'Communicate the limitation to the client early with a proposed solution',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'A client asks you to edit a 5-minute video using only iPhone footage shot in mixed lighting. How do you approach the colour correction challenge?',
      guidancePoints: [
        'Apply noise reduction first, as phone footage in low light is noisy',
        'Correct white balance per shot using scopes, not just eyeballing',
        'Match exposure across shots using the waveform monitor',
        'Use a unifying creative grade to mask remaining inconsistencies',
        'Advise the client on better shooting practices for future projects',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you decide between using Adobe Premiere Pro and DaVinci Resolve for a given project?',
      guidancePoints: [
        'Resolve excels when colour grading is the primary focus of the project',
        'Premiere Pro integrates better with the broader Adobe ecosystem (After Effects, Audition)',
        'Consider team familiarity and the client\'s existing toolchain',
          'Resolve\'s free version is a strong option for budget-constrained projects',
        'Some workflows benefit from splitting: edit in Premiere, grade in Resolve via round-trip',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you approach pricing and scoping an editing project? What factors influence your estimate?',
      guidancePoints: [
        'Assess footage volume and quality — more footage and poorer quality means more time',
        'Factor in the number of deliverables and their platform-specific requirements',
        'Estimate revision rounds and build them into the timeline and price',
        'Consider the complexity of audio, colour and VFX requirements',
        'Reference industry day rates and adjust for project complexity and urgency',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'A client gives you vague feedback: "It just does not feel right." How do you extract actionable direction from that response?',
      guidancePoints: [
        'Ask specific questions: is it the pacing, the music, the colour or the story structure?',
        'Show the client two alternate versions with different approaches to narrow down the issue',
        'Reference the original brief as an anchor for the conversation',
        'Offer concrete options rather than asking an open-ended question back',
        'Confirm the agreed direction in writing before starting revisions',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'Walk me through how you would present your rough cut to a stakeholder who has never been involved in a video production before.',
      guidancePoints: [
        'Set expectations before playback: explain what a rough cut is and is not',
        'Guide them through what to focus on: story flow, not colour or audio polish',
        'Take notes on their feedback in real time so they feel heard',
        'Summarise the feedback and proposed next steps immediately after viewing',
        'Follow up with a written summary to prevent miscommunication',
      ],
    },

  ]
  ,
}
