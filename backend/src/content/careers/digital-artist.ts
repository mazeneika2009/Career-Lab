import type { CareerDef } from '../framework.js'

export const digitalArtist: CareerDef = {
  slug: 'digital-artist',
  name: 'Digital Artist',
  category: 'Creative',
  order: 42,
  description:
    'Produces digital paintings and artwork — drawing fundamentals, light, rendering and a professional creative workflow.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    'Drawing fundamentals → shape, form & proportion → light, color & rendering → digital painting workflow → professional portfolio & client delivery.',
  mainSkills: ['Drawing Fundamentals', 'Color Theory', 'Light & Rendering', 'Digital Painting', 'Composition', 'Procreate & Photoshop', 'Art Direction', 'Portfolio Presentation'],
  sourcePlatforms: ['Adobe', 'Procreate', 'Blender', 'Wacom', 'ArtStation Learning'],
  companyName: 'Luminary Forge Studios',
  roleTitle: 'Digital Artist',

  chapters: [
    {
      slug: 'drawing-foundations',
      stage: 'Beginner',
      title: 'Drawing Foundations',
      description: 'The core observational and mark-making skills every digital artist relies on, from gesture through proportion.',
      topics: [
        {
          slug: 'line-and-gesture',
          title: 'Line & Gesture Drawing',
          minutes: 25,
          objectives: [
            'Perform timed gesture sketches to capture motion and energy',
            'Distinguish contour drawing from gesture drawing and choose the right approach',
            'Build a daily warm-up routine using gesture references'
          ],
          sections: [
            {
              heading: 'What gesture drawing captures',
              body: 'Gesture drawing records the action line — the single sweep of energy through a figure or object — rather than outline details. A thirty-second gesture that reads as "reaching" is more valuable than a five-minute contour that looks stiff. Speed forces you to prioritize movement over accuracy.'
            },
            {
              heading: 'Contour versus gesture',
              body: 'Contour drawing traces edges; gesture drawing traces the feel of motion. Professional workflows use both: gesture for thumbnailing and pose exploration, contour for precision work later. Mixing them too early produces work that is simultaneously stiff and imprecise.'
            },
            {
              heading: 'Building a warm-up habit',
              body: 'Set a timer for two minutes per pose across twenty references. Use a single brush with no undo. The goal is not a pretty drawing — it is calibrating your eye-hand connection for the session. Do this before every serious painting and your strokes will feel noticeably more confident.'
            }
          ],
          links: [
            { title: 'Gesture drawing basics', url: 'https://www.artstation.com/learning', sourceName: 'ArtStation Learning', resourceType: 'course', relationship: 'Structured gesture exercises for beginners.' },
            { title: 'Procreate gesture brush set', url: 'https://procreate.com/brushes', sourceName: 'Procreate', resourceType: 'resource', relationship: 'Brushes optimized for quick gesture sketching.' },
            { title: 'Wacom drawing tablet setup', url: 'https://www.wacom.com/en-us/support/getting-started', sourceName: 'Wacom', resourceType: 'guide', relationship: 'Hardware setup for pressure-sensitive gesture work.' }
          ],
          quiz: {
            prompt: 'The primary purpose of a thirty-second gesture sketch is to…',
            options: [
              'Produce a finished line drawing',
              'Capture the action line and energy of the pose',
              'Practice smooth crosshatching',
              'Test color palette options'
            ],
            answerIndex: 1,
            explanation: 'Gesture drawings prioritize movement and flow over detail or outline accuracy — they are a warm-up and exploration tool, not a finishing exercise.'
          }
        },
        {
          slug: 'shape-and-form',
          title: 'Shape & Form',
          minutes: 30,
          objectives: [
            'Simplify complex objects into basic 3D primitives',
            'Use the Loomis method to construct heads from spheres and planes',
            'Draw through forms to establish depth and overlap'
          ],
          sections: [
            {
              heading: 'Construction from primitives',
              body: 'Every complex object — a human head, a chair, a spaceship — breaks down into spheres, cubes, cylinders and cones. Drawing "through" the form, meaning sketching the hidden back edge as if the object were transparent, forces your brain to think volumetrically instead of flat.'
            },
            {
              heading: 'The Loomis head',
              body: 'Andrew Loomis described the head as a sphere with flattened sides, a jaw plane attached below, and feature lines on a center axis and brow line. This construction gives consistent head rotation without memorizing dozens of angle references. Practice it until you can rotate a head freely in your mind.'
            },
            {
              heading: 'Overlap and depth cues',
              body: 'Depth in a flat medium comes from overlap, foreshortening, and relative size. When one form partially covers another, the viewer reads it as closer — this single cue is more powerful than shading for implying depth in line-only drawings.'
            }
          ],
          links: [
            { title: 'Figure drawing: a complete guide', url: 'https://www.artstation.com/learning', sourceName: 'ArtStation Learning', resourceType: 'course', relationship: 'Construction-based figure drawing lessons.' },
            { title: 'Adobe Fresco form studies', url: 'https://www.adobe.com/products/fresco.html', sourceName: 'Adobe', resourceType: 'tool', relationship: 'Digital painting tools for practicing form construction.' },
            { title: 'Procreate perspective drawing', url: 'https://procreate.com/handbook/procreate', sourceName: 'Procreate', resourceType: 'guide', relationship: 'Drawing guides for perspective and form within Procreate.' }
          ],
          quiz: {
            prompt: 'Drawing "through" a form means…',
            options: [
              'Only drawing visible outlines',
              'Sketching hidden edges as if the object is transparent',
              'Erase all guidelines before shading',
              'Using a ruler for every edge'
            ],
            answerIndex: 1,
            explanation: 'Drawing through forces you to consider the full volume of the object, preventing flat-looking construction even when back edges are later erased or hidden.'
          }
        },
        {
          slug: 'proportion-and-anatomy',
          title: 'Proportion & Anatomy',
          minutes: 25,
          objectives: [
            'Apply the eight-head canon for human figure proportion',
            'Identify major skeletal landmarks that define the figure silhouette',
            'Recognize common proportion mistakes and correct them'
          ],
          sections: [
            {
              heading: 'The eight-head canon',
              body: 'A standard proportional guideline divides the standing figure into eight head-heights: chin to chin. Arms reach mid-thigh, elbows align with the waist, and the hands fall at mid-thigh. This is not a rigid rule but a starting scaffold — real people vary, but the canon catches gross errors early.'
            },
            {
              heading: 'Bony landmarks',
              body: 'The silhouette and surface of the figure are defined by bones that sit close to the skin: clavicle, acromion, iliac crest, greater trochanter, and olecranon. Knowing where these are lets you anchor muscles convincingly rather than guessing at bumps.'
            },
            {
              heading: 'Common mistakes',
              body: 'Beginners routinely draw heads too large, arms too short, and hands too small. The fastest diagnostic is to hold your drawing upside-down: proportion errors that your brain glossed over right-side-up become obvious when inverted.'
            }
          ],
          links: [
            { title: 'Figure anatomy for artists', url: 'https://www.artstation.com/learning', sourceName: 'ArtStation Learning', resourceType: 'course', relationship: 'Anatomy-for-artists video curriculum.' },
            { title: 'Blender human reference models', url: 'https://www.blender.org/download/', sourceName: 'Blender', resourceType: 'tool', relationship: 'Free 3D models for checking anatomy from any angle.' },
            { title: 'Adobe Photoshop figure brushes', url: 'https://helpx.adobe.com/photoshop/using/brushes.html', sourceName: 'Adobe', resourceType: 'guide', relationship: 'Setting up brushes for anatomical study sketches.' }
          ],
          quiz: {
            prompt: 'In the eight-head proportional canon, the elbows typically align with…',
            options: [
              'The knees',
              'The waist or navel',
              'The shoulders',
              'The fingertips'
            ],
            answerIndex: 1,
            explanation: 'The elbow joint roughly aligns with the waist or navel in standard proportional canons, making it a reliable landmark for arm length.'
          }
        }
      ]
    },
    {
      slug: 'light-color-rendering',
      stage: 'Foundation',
      title: 'Light, Color & Rendering',
      description: 'How light behaves on surfaces, how color conveys mood, and how to render convincing form digitally.',
      topics: [
        {
          slug: 'light-and-value',
          title: 'Light & Value',
          minutes: 30,
          objectives: [
            'Identify the five value zones: highlight, light, halftone, shadow, reflected light',
            'Render a sphere using a full value scale from cast shadow to highlight',
            'Control value grouping to establish a clear read in compositions'
          ],
          sections: [
            {
              heading: 'The value structure of light',
              body: 'Light hitting a form creates a predictable pattern: a bright highlight where the surface faces the light directly, a broad light area, a soft halftone transition, a core shadow on the turning edge away from light, and reflected light in the shadow from bounced surfaces. Recognizing these zones in reference and applying them deliberately is the foundation of all rendering.'
            },
            {
              heading: 'Value as composition tool',
              body: 'Before color, a painting must read in grayscale. Squint at your canvas — if the focal point blends into the background, you have a value grouping problem. The eye is drawn to the area of highest contrast, so the subject should live there, not in a uniformly lit scene.'
            },
            {
              heading: 'Practicing with a sphere',
              body: 'Painting a sphere on a neutral background teaches everything: core shadow placement, soft halftone blending, the terminator line, and subtle reflected light. It is a small exercise with disproportionate payoff — do it weekly until the value transitions feel automatic.'
            }
          ],
          links: [
            { title: 'Understanding light and shadow', url: 'https://www.artstation.com/learning', sourceName: 'ArtStation Learning', resourceType: 'course', relationship: 'Value studies and light fundamentals curriculum.' },
            { title: 'Procreate luminance brushes', url: 'https://procreate.com/brushes', sourceName: 'Procreate', resourceType: 'resource', relationship: 'Brushes suited for smooth value gradation.' },
            { title: 'Blender lighting reference', url: 'https://www.blender.org/download/', sourceName: 'Blender', resourceType: 'tool', relationship: 'Free 3D renderer for studying light behavior on geometry.' }
          ],
          quiz: {
            prompt: 'The reflected light visible in the shadow side of a sphere comes from…',
            options: [
              'A second light source behind the sphere',
              'Light bouncing off nearby surfaces back into the shadow',
              'The highlight bleeding into shadow',
              'A rendering error'
            ],
            answerIndex: 1,
            explanation: 'Reflected light is caused by illumination bouncing off nearby surfaces (ground plane, walls) back into the shadow region — it should be darker than the halftone, never confused with the light side.'
          }
        },
        {
          slug: 'color-theory-painting',
          title: 'Color Theory for Painters',
          minutes: 30,
          objectives: [
            'Build color harmonies using complementary, analogous and triadic schemes',
            'Apply warm and cool temperature shifts to push form and mood',
            'Mix naturalistic skin tones using a limited palette'
          ],
          sections: [
            {
              heading: 'Color harmony strategies',
              body: 'A harmony is a limited set of color relationships chosen deliberately: complementary pairs create vibrant contrast, analogous sets feel calm, and triadic schemes balance variety with cohesion. Choose your harmony before painting, not after, so every stroke reinforces the mood rather than competing with it.'
            },
            {
              heading: 'Temperature as a tool',
              body: 'Warm colors (yellows, oranges, reds) advance; cool colors (blues, blue-greens, blue-violets) recede. In a portrait, shifting the shadow side slightly cooler than the lit side instantly implies volume. Temperature contrast is often more effective than value contrast for subtle form modeling.'
            },
            {
              heading: 'Mixing skin tones',
              body: 'Naturalistic skin is never a single hue. A limited palette — burnt sienna, cadmium red light, yellow ochre, titanium white and a cool like ultramarine — covers most skin tones through temperature variation. The key is mixing on the canvas in transparent layers rather than seeking one "correct" pre-mixed color.'
            }
          ],
          links: [
            { title: 'Color theory masterclass', url: 'https://www.artstation.com/learning', sourceName: 'ArtStation Learning', resourceType: 'course', relationship: 'Color mixing and harmony lessons for digital painters.' },
            { title: 'Adobe color wheel tool', url: 'https://color.adobe.com/create/color-wheel', sourceName: 'Adobe', resourceType: 'tool', relationship: 'Interactive tool for building harmonies and exploring palettes.' },
            { title: 'Procreate color disc features', url: 'https://procreate.com/handbook/procreate', sourceName: 'Procreate', resourceType: 'guide', relationship: 'Native color picking and palette management in Procreate.' }
          ],
          quiz: {
            prompt: 'In color temperature, cool hues are generally used to…',
            options: [
              'Advance elements toward the viewer',
              'Recede elements and imply shadow or distance',
              'Increase the focal point contrast',
              'Replace black for dark areas'
            ],
            answerIndex: 1,
            explanation: 'Cool colors tend to recede in a composition and are commonly used in shadows and distant elements, while warm colors advance and draw the eye.'
          }
        },
        {
          slug: 'digital-rendering-techniques',
          title: 'Digital Rendering Techniques',
          minutes: 30,
          objectives: [
            'Layer rendering from a flat color block-in to final detail',
            'Use multiply, overlay and screen blending modes for light and shadow',
            'Control edge quality to guide the viewer through a painting'
          ],
          sections: [
            {
              heading: 'Block-in to polish',
              body: 'Professional rendering follows a consistent pipeline: flat color block-in to establish local values, broad light and shadow with large brushes, mid-level form rendering, then fine detail and texture. Skipping the block-in stage to chase details early almost always results in inconsistent lighting and wasted time.'
            },
            {
              heading: 'Blending modes as lighting tools',
              body: 'Multiply darkens a layer while preserving underlying texture — ideal for casting shadows without losing form detail. Overlay boosts contrast for mid-tone accents. Screen adds glowing highlights. These modes replace opaque painting with translucent light, making adjustments non-destructive and fast to revise.'
            },
            {
              heading: 'Edge hierarchy',
              body: 'Edges carry meaning: a sharp edge commands attention; a soft edge recedes. Professional paintings use a hierarchy: one or two hard edges at the focal point, progressively softer edges elsewhere. Uniformly sharp edges make everything fight for attention; uniformly soft edges make everything feel out of focus.'
            }
          ],
          links: [
            { title: 'Photoshop blend modes explained', url: 'https://helpx.adobe.com/photoshop/using/blending-modes.html', sourceName: 'Adobe', resourceType: 'guide', relationship: 'Detailed documentation of every blend mode and its use cases.' },
            { title: 'Procreate layer blending', url: 'https://procreate.com/handbook/procreate', sourceName: 'Procreate', resourceType: 'guide', relationship: 'How to use blending modes within Procreate\'s layer panel.' },
            { title: 'Wacom pressure and tilt settings', url: 'https://www.wacom.com/en-us/support/product-support/drivers', sourceName: 'Wacom', resourceType: 'guide', relationship: 'Pressure curve and tilt configuration for rendering brushwork.' }
          ],
          quiz: {
            prompt: 'When rendering a portrait, placing your sharpest edges at the eyes and letting the ears go soft uses the principle of…',
            options: [
              'Symmetrical composition',
              'Edge hierarchy to direct viewer focus',
              'Color temperature contrast',
              'Value grouping'
            ],
            answerIndex: 1,
            explanation: 'A deliberate edge hierarchy — sharp at the focal point, soft elsewhere — guides the viewer\'s eye and creates depth, even in a single plane of focus.'
          }
        }
      ]
    },
    {
      slug: 'digital-painting-workflow',
      stage: 'Intermediate',
      title: 'Digital Painting Workflow',
      description: 'Organizing a professional canvas from thumbnail to final, managing layers, and producing work efficiently.',
      topics: [
        {
          slug: 'canvas-setup-and-thumbnails',
          title: 'Canvas Setup & Thumbnailing',
          minutes: 25,
          objectives: [
            'Configure canvas resolution, color profile and file structure for print and screen',
            'Generate multiple composition thumbnails before committing to a direction',
            'Evaluate thumbnails using value grouping and focal-point clarity'
          ],
          sections: [
            {
              heading: 'Canvas fundamentals',
              body: 'A painting destined for both print and web should start at 300 DPI with a color profile matching your output: sRGB for screen, Adobe RGB or CMYK for print. Set your canvas at the largest expected print dimension and export downscaled versions later — scaling up always degrades quality.'
            },
            {
              heading: 'Thumbnail exploration',
              body: 'Before painting, produce four to eight small compositional sketches — literally tiny, no larger than a thumb. At this scale you are testing value arrangement and focal placement, not detail. Discard all but two for refinement. The thumbnail is the cheapest stage to make major changes.'
            },
            {
              heading: 'Evaluating compositions',
              body: 'Squint at each thumbnail. The focal point should pop out through contrast alone. Check for tangents — accidental alignments where two edges meet, creating visual confusion. Push elements apart or overlap deliberately. A strong thumbnail makes the final painting dramatically easier to execute.'
            }
          ],
          links: [
            { title: 'Procreate canvas settings', url: 'https://procreate.com/handbook/procreate', sourceName: 'Procreate', resourceType: 'guide', relationship: 'Setting up DPI, color profiles and canvas presets.' },
            { title: 'Photoshop new document presets', url: 'https://helpx.adobe.com/photoshop/using/creating-opening-documents.html', sourceName: 'Adobe', resourceType: 'guide', relationship: 'Document presets for print and screen output.' },
            { title: 'Composition in art', url: 'https://www.artstation.com/learning', sourceName: 'ArtStation Learning', resourceType: 'course', relationship: 'Composition and thumbnailing tutorials for concept artists.' }
          ],
          quiz: {
            prompt: 'Thumbnails should be created at a very small size primarily because…',
            options: [
              'They save disk space',
              'Small scale forces focus on composition and value, not detail',
              'It is faster to share online',
              'Large canvases crash more often'
            ],
            answerIndex: 1,
            explanation: 'Tiny thumbnails constrain you to the big decisions — value, focal point, composition — without getting lost in details that are expensive to change later.'
          }
        },
        {
          slug: 'layer-management',
          title: 'Layer Management & Organization',
          minutes: 30,
          objectives: [
            'Structure layers using groups, masks and naming conventions',
            'Use adjustment layers and clipping masks for non-destructive edits',
            'Flatten selectively for painting while preserving backup groups'
          ],
          sections: [
            {
              heading: 'Layer architecture',
              body: 'A professional file separates concerns: background, base color flats, shadow group, light group, detail and texture overlay. Name every group semantically. A file with fifty unnamed layers is a graveyard of intent — future you will not remember what "Layer 14 copy" was supposed to be.'
            },
            {
              heading: 'Non-destructive editing',
              body: 'Adjustment layers (Curves, Hue/Saturation, Color Balance) let you tweak color and value without painting over original work. Clipping masks confine effects to the shape below, so a shadow layer clips to the body silhouette without manual erasing. These habits keep revisions fast and damage-free.'
            },
            {
              heading: 'Selective flattening',
              body: 'When brush performance slows under excessive layer count, merge layers that no longer need separation — but keep a duplicated backup group at the top of the stack. Professional files balance performance with reversibility, always preserving the ability to step back.'
            }
          ],
          links: [
            { title: 'Photoshop layers and masks', url: 'https://helpx.adobe.com/photoshop/using/layer-basics.html', sourceName: 'Adobe', resourceType: 'guide', relationship: 'Complete reference for layer management in Photoshop.' },
            { title: 'Procreate layer features', url: 'https://procreate.com/handbook/procreate', sourceName: 'Procreate', resourceType: 'guide', relationship: 'Groups, masks and alpha lock in Procreate.' },
            { title: 'ArtStation portfolio organization', url: 'https://www.artstation.com/settings/portfolio', sourceName: 'ArtStation Learning', resourceType: 'guide', relationship: 'How to present organized project breakdowns in your portfolio.' }
          ],
          quiz: {
            prompt: 'Using a clipping mask to apply a shadow layer is better than manually erasing the shadow edges because…',
            options: [
              'It creates sharper edges',
              'It is non-destructive and automatically confined to the shape below',
              'It uses fewer pixels',
              'It removes the need for layer naming'
            ],
            answerIndex: 1,
            explanation: 'Clipping masks automatically constrain a layer to the alpha of the layer below, making edits reversible and cleanup automatic — no manual erasing required.'
          }
        },
        {
          slug: 'painting-from-reference',
          title: 'Painting from Reference',
          minutes: 30,
          objectives: [
            'Gather and organize reference images without infringing copyrights',
            'Translate photographic references into painted interpretations',
            'Combine multiple references into one cohesive scene'
          ],
          sections: [
            {
              heading: 'Building a reference board',
              body: 'Collect references for pose, lighting, color, material and environment separately. Use a tool like PureRef or a dedicated canvas layer to arrange them. Organizing by category — anatomy, architecture, foliage, mood — prevents the common habit of painting from one photo and producing a copy rather than an interpretation.'
            },
            {
              heading: 'Interpreting, not copying',
              body: 'References inform, they do not dictate. Use a photo for its lighting direction, then paint the form in your own style. Use another for its color temperature, and a third for its material texture. Combining three references into one original piece is interpretation; copying one photo pixel-by-pixel is plagiarism with extra steps.'
            },
            {
              heading: 'Legal and ethical use',
              body: 'Reference photos from Unsplash, Pexels and Pixabay are free for commercial use. Personal reference photos you take are always safe. When using another artist\'s work as reference, use it for technique or lighting study only — never for a final piece sold to a client. This protects both your reputation and legal standing.'
            }
          ],
          links: [
            { title: 'ArtStation reference boards', url: 'https://www.artstation.com/learning', sourceName: 'ArtStation Learning', resourceType: 'course', relationship: 'Tutorials on reference gathering and interpretation.' },
            { title: 'Adobe Lightroom reference organizing', url: 'https://helpx.adobe.com/lightroom/using/get-started.html', sourceName: 'Adobe', resourceType: 'guide', relationship: 'Organizing photo references for painting projects.' },
            { title: 'Procreate reference panel', url: 'https://procreate.com/handbook/procreate', sourceName: 'Procreate', resourceType: 'guide', relationship: 'Using the built-in reference window while painting.' }
          ],
          quiz: {
            prompt: 'The most professional approach when using photographic references for a client piece is to…',
            options: [
              'Copy the reference exactly since you paid for it',
              'Combine elements from multiple references into an original composition',
              'Never look at photos at all',
              'Trace over the reference photograph directly'
            ],
            answerIndex: 1,
            explanation: 'Combining references from different sources into an original composition avoids plagiarism concerns while producing unique, professional work that reflects your interpretive skill.'
          }
        }
      ]
    },
    {
      slug: 'professional-practice',
      stage: 'Advanced',
      title: 'Professional Creative Practice',
      description: 'Building a portfolio that wins work, collaborating with clients, and sustaining a creative career long-term.',
      topics: [
        {
          slug: 'portfolio-and-presentations',
          title: 'Portfolio & Presentation',
          minutes: 30,
          objectives: [
            'Curate a portfolio of six to ten pieces that demonstrate range within a cohesive voice',
            'Write project breakdowns showing process from thumbnail to final',
            'Present work effectively on ArtStation and personal portfolio sites'
          ],
          sections: [
            {
              heading: 'Curation over volume',
              body: 'A portfolio is a curated argument for your skill, not a dump of everything you have made. Six to ten of your strongest pieces, each showing a different facet — character, environment, prop, lighting study — tells a clearer story than thirty mediocre ones. Remove your weakest piece every time you add a strong one.'
            },
            {
              heading: 'Process breakdowns',
              body: 'Clients and art directors want to see how you think, not just the final image. Include thumbnail explorations, value studies, color roughs and iteration notes alongside each piece. A breakdown shows problem-solving ability, which is more convincing than a pretty image with no context.'
            },
            {
              heading: 'Presenting on platforms',
              body: 'ArtStation is the industry-standard portfolio platform. Optimize images for fast loading, use the project gallery format with detailed descriptions, and tag your work accurately for searchability. A personal website supplements this with a curated landing page and contact information — do not rely on social media alone.'
            }
          ],
          links: [
            { title: 'ArtStation portfolio setup', url: 'https://www.artstation.com/settings/portfolio', sourceName: 'ArtStation Learning', resourceType: 'guide', relationship: 'Configuring your ArtStation portfolio for maximum visibility.' },
            { title: 'Adobe Portfolio website builder', url: 'https://portfolio.adobe.com/', sourceName: 'Adobe', resourceType: 'tool', relationship: 'Creating a clean personal portfolio site.' },
            { title: 'Wacom pen display for portfolio reviews', url: 'https://www.wacom.com/en-us/products/pen-displays', sourceName: 'Wacom', resourceType: 'resource', relationship: 'Hardware used for live portfolio walkthroughs and demos.' }
          ],
          quiz: {
            prompt: 'A strong digital art portfolio should contain…',
            options: [
              'As many pieces as possible to show volume',
              'Six to ten curated pieces demonstrating range with a cohesive voice',
              'Only your most recent work, nothing older than a month',
              'Only personal projects, never client work'
            ],
            answerIndex: 1,
            explanation: 'Curated portfolios that demonstrate breadth within a consistent artistic voice make a stronger impression than overwhelming quantity or work that lacks coherence.'
          }
        },
        {
          slug: 'client-collaboration',
          title: 'Client Collaboration & Briefs',
          minutes: 30,
          objectives: [
            'Translate a client creative brief into an actionable project plan with milestones',
            'Manage revision rounds professionally without scope creep',
            'Present work with clear rationale tied to the brief\'s goals'
          ],
          sections: [
            {
              heading: 'Reading the brief',
              body: 'A brief specifies audience, mood, technical requirements and deadline. Read it three times: first for the ask, second for unstated constraints (budget implies complexity limit, deadline implies iteration count), and third for tone words you need to interpret visually. Ambiguous briefs require a clarifying call before starting work.'
            },
            {
              heading: 'Milestone and revision management',
              body: 'Structure the project as thumbnail approval, rough color approval, detail pass, and final delivery. Each milestone gets one consolidated round of feedback. Agree on this structure in writing before production begins. Unbounded revision rounds are the most common source of creative burnout and unpaid overtime.'
            },
            {
              heading: 'Presenting with rationale',
              body: 'When showing work, explain the decisions: "This warm palette was chosen because the brief specified approachable and trustworthy." Clients respond better to reasoning than to open-ended "what do you think?" questions. Lead with what was agreed, then invite targeted feedback.'
            }
          ],
          links: [
            { title: 'ArtStation learning: client projects', url: 'https://www.artstation.com/learning', sourceName: 'ArtStation Learning', resourceType: 'course', relationship: 'Lessons on managing client illustration projects.' },
            { title: 'Adobe Creative Cloud collaboration', url: 'https://helpx.adobe.com/creative-cloud/using/invite-others.html', sourceName: 'Adobe', resourceType: 'guide', relationship: 'Sharing files and collecting feedback through Creative Cloud.' },
            { title: 'Procreate sharing and export', url: 'https://procreate.com/handbook/procreate', sourceName: 'Procreate', resourceType: 'guide', relationship: 'Exporting time-lapse and layered files for client review.' }
          ],
          quiz: {
            prompt: 'When a client brief is ambiguous about the desired mood, the best first action is…',
            options: [
              'Choose your favorite mood and proceed',
              'Ask clarifying questions before starting production',
              'Produce three wildly different directions immediately',
              'Skip the brief and paint what feels right'
            ],
            answerIndex: 1,
            explanation: 'Clarifying ambiguity upfront prevents expensive revisions later — a short call or email exchange saves days of misdirected work.'
          }
        },
        {
          slug: 'creative-career-sustainability',
          title: 'Creative Career Sustainability',
          minutes: 25,
          objectives: [
            'Build a sustainable daily routine that prevents creative burnout',
            'Develop income streams beyond client commissions',
            'Set and adjust rates based on scope, complexity and market value'
          ],
          sections: [
            {
              heading: 'Protecting your creativity',
              body: 'Creative work is cognitive labor that depletes with overuse. Schedule personal sketch time, physical movement and days without the stylus. Professionals who treat creativity as a renewable resource maintain output quality over decades; those who do not flame out within years.'
            },
            {
              heading: 'Multiple income streams',
              body: 'Client commissions are one pillar. Teaching courses on platforms like ArtStation Learning, selling brush packs and tutorials, licensing artwork, and selling prints or merchandize create parallel income. A diversified portfolio of income sources stabilizes your career against market shifts.'
            },
            {
              heading: 'Pricing with confidence',
              body: 'Base rates on complexity, usage rights (personal, commercial, exclusive), timeline and deliverable count — not on what you feel you are "worth." A half-day character illustration for a indie game and a full-day hero key art for a AAA box cover are different products with different prices. Document your rate card and communicate it clearly.'
            }
          ],
          links: [
            { title: 'ArtStation marketplace for brushes', url: 'https://www.artstation.com/marketplace', sourceName: 'ArtStation Learning', resourceType: 'marketplace', relationship: 'Selling digital brushes, tutorials and assets.' },
            { title: 'Procreate brush creation', url: 'https://procreate.com/handbook/procreate', sourceName: 'Procreate', resourceType: 'guide', relationship: 'Creating and packaging custom brushes for sale.' },
            { title: 'Blender community marketplace', url: 'https://www.blender.org/download/', sourceName: 'Blender', resourceType: 'resource', relationship: 'Community resources for 3D-assisted digital art workflows.' }
          ],
          quiz: {
            prompt: 'A sustainable creative career is best supported by…',
            options: [
              'Working as many hours as possible to build volume',
              'Diversifying income streams and scheduling recovery time',
              'Never taking days off to stay competitive',
              'Accepting every project regardless of fit'
            ],
            answerIndex: 1,
            explanation: 'Creative output is a renewable but finite resource per day. Combining multiple income streams with intentional rest produces durable, high-quality work across a career.'
          }
        }
      ]
    }
  ],

  practicalExam: {
    title: 'Character Illustration — Digital Painting Task',
    coverage: ['Drawing Fundamentals', 'Light & Value', 'Color Theory', 'Digital Painting Workflow', 'Composition', 'Professional Delivery'],
    brief:
      'You are illustrating a hero character for a fantasy card game. The character is a traveling healer carrying a staff and satchel, standing in warm afternoon light. Deliver a final illustration at 300 DPI with a process breakdown showing thumbnail, value study, color rough and final render.',
    requirements: [
      'Clean silhouette with clear gesture and readable pose',
      'Consistent value structure using a full five-zone light model',
      'Intentional color harmony (specify the scheme used)',
      'Edge hierarchy with sharp edges at the focal point',
      'Process breakdown: thumbnails (minimum three), grayscale value study, color rough and final',
      'Layered file with named groups demonstrating organized workflow'
    ],
    expectedOutput:
      'A final illustration at 300 DPI with a process document showing the thumbnail exploration, value study, color rough and rationale for decisions made. The submission should be clear enough that an art director could evaluate both your skill and your working process.',
    rubric: [
      { skill: 'Drawing Fundamentals', weight: 20, criteria: 'Gesture, proportion and construction accuracy in the character pose' },
      { skill: 'Light & Value', weight: 20, criteria: 'Consistent light direction, full value range, clear core shadow and reflected light' },
      { skill: 'Color Theory', weight: 15, criteria: 'Intentional harmony, effective warm-cool contrast, naturalistic rendering' },
      { skill: 'Digital Painting Technique', weight: 20, criteria: 'Edge hierarchy, blending quality, layer organization, brush economy' },
      { skill: 'Composition', weight: 10, criteria: 'Focal point clarity, silhouette readability, background supporting the subject' },
      { skill: 'Process & Professionalism', weight: 15, criteria: 'Complete process breakdown, clear file organization, deadline adherence' }
    ],
    passScore: 70
  },

  assignments: [
    {
      title: 'Value Study Series',
      stage: 'Beginner',
      objective: 'Produce five grayscale paintings of simple objects under different lighting conditions to build value accuracy.',
      requirements: [
        'Paint five objects: sphere, cube, cylinder, apple and draped fabric',
        'Use a full value range from white to black in each study',
        'Clearly show the five value zones: highlight, light, halftone, shadow, reflected light',
        'Keep each study at a small size (roughly 800px wide) to focus on values',
        'Write a brief self-critique identifying the strongest and weakest study'
      ],
      skillsEvaluated: ['Drawing Fundamentals', 'Light & Value', 'Observation'],
      dueDays: 10,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the five grayscale paintings with your self-critique describing what you observed about value transitions and reflected light in each object.',
        textLabel: 'Self-critique',
        minTextLength: 500
      }
    },
    {
      title: 'Character Concept with Process',
      stage: 'Intermediate',
      objective: 'Design an original character from thumbnail to final color illustration, demonstrating the full digital painting pipeline.',
      requirements: [
        'Create a character brief: name, role, world setting, personality keywords',
        'Produce at least four pose/composition thumbnails',
        'Complete a value study and color rough before the final',
        'Deliver a final color illustration at 300 DPI',
        'Include a process document showing each stage with brief notes on decisions'
      ],
      skillsEvaluated: ['Digital Painting Workflow', 'Color Theory', 'Drawing Fundamentals', 'Composition'],
      dueDays: 18,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the final illustration, process breakdown document and layered source file with named layers.',
        textLabel: 'Process notes',
        minTextLength: 800,
        linkLabels: ['Link to high-resolution final image']
      }
    },
    {
      title: 'Client Brief: Book Cover Illustration',
      stage: 'Advanced',
      objective: 'Respond to a written creative brief by producing a book cover illustration for a fictional novel, managing revisions and delivery professionally.',
      requirements: [
        'Read and interpret the provided creative brief (a separate document will be supplied)',
        'Produce thumbnail explorations and submit for feedback before final rendering',
        'Implement one round of consolidated feedback',
        'Deliver a print-ready file (300 DPI, CMYK profile, bleeds specified) and a web-resolution version',
        'Write a rationale document explaining how each decision maps to the brief'
      ],
      skillsEvaluated: ['Client Collaboration', 'Digital Painting Workflow', 'Professional Delivery', 'Composition'],
      dueDays: 21,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the final print-ready and web-resolution images, rationale document and the original brief for reference.',
        textLabel: 'Rationale document',
        minTextLength: 1000,
        linkLabels: ['Print-ready file link', 'Web-resolution file link']
      }
    }
  ],

  simTasks: [
    {
      title: 'Rapid character turnaround',
      context: 'The art director needs three expression variations of your character for a card game spread — neutral, angry and surprised — by end of day.',
      requirements: [
        'Produce three head-expression studies from the same angle',
        'Maintain consistent lighting and color across all three',
        'Keep each study under thirty minutes to practice speed and efficiency'
      ],
      priority: 'high',
      dueDayOffset: 1,
      expectedOutput: 'Three expression studies on a single canvas with consistent lighting, submitted as a flat PNG.',
      skills: ['Drawing Fundamentals', 'Digital Painting', 'Speed & Efficiency']
    },
    {
      title: 'Background environment rough',
      context: 'The production team needs a rough environment painting for the character scene — a sunlit village square — to establish mood before committing to final detail.',
      requirements: [
        'Produce a loose color rough capturing the warm afternoon light and mood',
        'Use a limited palette of no more than five dominant hues',
        'Keep the painting at thumbnail scale to test composition before committing'
      ],
      priority: 'normal',
      dueDayOffset: 4,
      expectedOutput: 'A small-scale environment color rough with mood notes explaining palette and light choices.',
      skills: ['Color Theory', 'Composition', 'Thumbnailing']
    },
    {
      title: 'Final file delivery package',
      context: 'The client is ready to receive the completed character illustration. They need print and digital versions with properly organized layers.',
      requirements: [
        'Export a print-ready file: 300 DPI, CMYK profile, bleeds marked',
        'Export a web-resolution PNG at 72 DPI with sRGB profile',
        'Organize layered source file with named groups and flatten backup',
        'Write a delivery note listing files, dimensions and color profiles'
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'A delivery package with print and web files, organized source file and delivery note.',
      skills: ['Professional Delivery', 'File Management', 'Client Communication']
    }
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Sam Okoro',
      personaRole: 'Art Director',
      situation: 'The art director wants to change the character\'s color palette after the value study is approved.',
      openingMessage:
        'The value study looks great, but the client wants the healer to feel more "mystical." Can we shift the palette from warm earth tones to cooler purples and teals? I know it means reworking the color rough.',
      expectedPoints: [
        'Acknowledges the creative rationale behind the shift',
        'Asks whether the change applies to the final only or requires revisiting the value study',
        'Estimates the impact on timeline and confirms any deadline changes in writing',
        'Proposes a quick color rough test before committing to a full rework'
      ]
    },
    {
      kind: 'client',
      personaName: 'Rina Patel',
      personaRole: 'Indie Game Studio Founder',
      situation: 'The client wants more detail on the character than the agreed scope covers.',
      openingMessage:
        'The character looks amazing! But we were wondering — could you add more detail to the satchel? Maybe some intricate stitching and charms hanging from it? It is a key item in the game lore.',
      expectedPoints: [
        'Appreciates the enthusiasm while recognizing the scope addition',
        'Clarifies that intricate detail work constitutes additional scope beyond the original brief',
        'Provides a separate estimate for the requested additions',
        'Suggests an alternative: simplified version now, detailed version as a follow-up commission'
      ]
    },
    {
      kind: 'team',
      personaName: 'Jordan Walsh',
      personaRole: 'Producer',
      situation: 'The producer is concerned about the illustration deadline being at risk.',
      openingMessage:
        'We are two days from the milestone and the final render still looks rough. Are you on track? The client review is Thursday — should we prepare them for a delay?',
      expectedPoints: [
        'Provides an honest status assessment with specific remaining tasks',
        'Identifies which tasks can be completed on time and which are at risk',
        'Proposes a realistic revised timeline or a partial delivery for Thursday',
        'Does not overpromise or dismiss the concern'
      ]
    },
    {
      kind: 'client',
      personaName: 'Thomas Berg',
      personaRole: 'Creative Director, Publishing House',
      situation: 'The client provides feedback that conflicts with the original brief.',
      openingMessage:
        'We showed the cover to our marketing team and they want the character facing left instead of right, and the title placement needs to shift to the top. Also, could the colors be brighter overall?',
      expectedPoints: [
        'Acknowledges the feedback and connects it back to the original brief for comparison',
        'Explains the impact of the direction change on existing work (composition, value grouping)',
        'Confirms whether this constitutes a revision round or new scope',
        'Offers a structured plan to address all points without starting from scratch'
      ]
    }
  ],

  workplaceScenarios: [
    {
      category: 'Scope management',
      situation:
        'A client who commissioned a single character illustration emails a week later asking for "just a small background" to accompany it for social media promotion, with no mention of additional payment.',
      requiredActions: [
        { action: 'Confirm the request is additional scope beyond the original agreement', good: true, note: 'Naming the scope clearly before responding prevents silent over-delivery.' },
        { action: 'Provide a written estimate for the background work with a timeline', good: true, note: 'Professional quoting demonstrates business maturity and protects your time.' },
        { action: 'Deliver the background immediately to maintain goodwill', good: false, note: 'Delivering unpaid work sets a precedent that erodes your rate and self-respect.' },
        { action: 'Suggest a bundled package if the client wants ongoing social media art', good: true, note: 'Turning scope creep into a structured package benefits both parties long-term.' }
      ]
    },
    {
      category: 'Creative disagreement',
      situation:
        'The art director asks you to significantly brighten and saturate a moody, atmospheric painting you feel is already strong. The client review is tomorrow.',
      requiredActions: [
        { action: 'Ask the art director what outcome or audience concern is driving the request', good: true, note: 'Understanding the rationale behind creative direction prevents reactive changes.' },
        { action: 'Produce a quick side-by-side comparison to evaluate both versions objectively', good: true, note: 'Visual comparison grounds the discussion in evidence, not taste.' },
        { action: 'Override the art director and submit your version unchanged', good: false, note: 'Ignoring direction without discussion damages trust and team relationships.' },
        { action: 'Document the agreed direction and any remaining concerns in writing', good: true, note: 'A written record of the decision protects everyone if the client review goes poorly.' }
      ]
    }
  ],

  interviewQuestions: [
    { dimension: 'technical_knowledge', prompt: 'Walk me through how you would paint a realistic metallic surface from a blank canvas. What values and edges matter most?', guidancePoints: ['Broad value range with high contrast', 'Sharp edges at the highlight and reflections', 'Reflected environment colors in the shadow', 'Brush economy — subtle strokes imply material'] },
    { dimension: 'technical_knowledge', prompt: 'Explain the difference between multiply, overlay and screen blending modes. When would you use each in a digital painting?', guidancePoints: ['Multiply for shadows and ambient occlusion', 'Overlay for mid-tone contrast and color grading', 'Screen for glowing highlights and light bloom', 'Layering order and opacity control'] },
    { dimension: 'problem_solving', prompt: 'You receive a client brief asking for a "warm, inviting" scene but the reference photos they provide are all cool-toned and moody. How do you resolve this conflict?', guidancePoints: ['Identify the core brief requirement as authoritative', 'Use reference for technique, not mood', 'Propose a color rough demonstrating warm palette', 'Confirm direction with client before final rendering'] },
    { dimension: 'problem_solving', prompt: 'Halfway through a painting you realize the composition feels static and uninteresting. What steps do you take without starting over entirely?', guidancePoints: ['Evaluate the thumbnail for value arrangement and focal point', 'Try cropping, rotating or flipping the canvas', 'Introduce asymmetric elements or a stronger action line', 'Adjust edge hierarchy to redirect the viewer\'s eye'] },
    { dimension: 'professional_reasoning', prompt: 'A client asks for unlimited revisions on a fixed-price illustration project. How do you handle this professionally?', guidancePoints: ['Refer back to the contract or initial scope agreement', 'Propose a structured revision process with defined rounds', 'Explain the impact of unlimited revisions on schedule and quality', 'Offer to expand scope with adjusted pricing if needed'] },
    { dimension: 'professional_reasoning', prompt: 'Describe your process for choosing which pieces go into your portfolio and which do not.', guidancePoints: ['Curate for range and coherence, not volume', 'Evaluate each piece against the role you want', 'Replace the weakest piece when adding a new one', 'Include process breakdowns that show thinking, not just results'] },
    { dimension: 'communication', prompt: 'A client gives vague feedback: "the character just does not feel right." How do you extract actionable information from that response?', guidancePoints: ['Ask specific clarifying questions about mood, energy or pose', 'Offer two or three concrete alternative directions', 'Reference the original brief as an anchor', 'Confirm the revised direction in writing before continuing'] },
    { dimension: 'communication', prompt: 'Walk me through how you would present your work-in-progress to a client who has never worked with a digital artist before.', guidancePoints: ['Explain your pipeline and what each stage represents', 'Set expectations about what feedback is useful at each stage', 'Show the value of the thumbnail and rough stages', 'Use comparison examples to illustrate your decisions'] }

  ]

}
