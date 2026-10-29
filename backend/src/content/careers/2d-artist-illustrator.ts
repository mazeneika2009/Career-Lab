import type { CareerDef } from '../framework.js'

export const twoDArtistIllustrator: CareerDef = {
  slug: '2d-artist-illustrator',
  name: '2D Artist / Illustrator',
  category: 'Creative',
  order: 43,
  description: 'Illustrates professionally — vector and raster craft in Illustrator, Photoshop, Procreate and Clip Studio Paint.',
  difficulty: 'Beginner-friendly',
  pathSummary:
    '2D Artists begin with vector and raster drawing fundamentals in Illustrator and Photoshop, develop colour theory and character design foundations, master advanced brushwork and tool-specific workflows in Procreate and Clip Studio, and culminate in print-ready delivery, client asset management, and portfolio curation.',
  mainSkills: [
    'Vector drawing with the Pen tool and shape builders',
    'Raster painting, masking and blending modes',
    'Colour theory and palette construction',
    'Character design and visual storytelling',
    'Custom brush creation and texture techniques',
    'Print-ready and digital asset file preparation',
    'Portfolio presentation and client communication',
  ],
  sourcePlatforms: [
    'Adobe Illustrator',
    'Adobe Photoshop',
    'Procreate',
    'Clip Studio Paint',
  ],
  companyName: 'Luminary Illustration Co.',
  roleTitle: '2D Artist / Illustrator',

  chapters: [
    {
      slug: 'vector-and-raster-fundamentals',
      stage: 'Beginner',
      title: 'Vector & Raster Fundamentals',
      description:
        'Master the core tools of digital illustration: vector paths and shapes in Illustrator, raster brushes and layers in Photoshop, and clean inking techniques that translate across both worlds.',
      topics: [
        {
          slug: 'vector-drawing-in-illustrator',
          title: 'Vector Drawing in Illustrator',
          minutes: 28,
          objectives: [
            'Navigate the Illustrator workspace and configure a new artboard for illustration.',
            'Use the Pen tool to create precise Bézier curves, anchors and paths.',
            'Combine shapes with the Shape Builder tool to form complex vector compositions.',
          ],
          sections: [
            {
              heading: 'The Illustrator Workspace',
              body: 'Adobe Illustrator organises work around artboards, panels and toolbars. The Control bar changes context with each tool, while the Properties panel shows live options for the selected object. Understanding panels — Layers, Swatches, Brushes, Pathfinder — is the first step toward efficient illustration.',
            },
            {
              heading: 'The Pen Tool and Bézier Curves',
              body: 'The Pen tool places anchor points connected by path segments. Clicking creates straight segments; clicking and dragging pulls out Bézier handles that define curvature. Illustrator\'s smooth and corner points give full control. Practising the Pen tool on simple shapes — a leaf, a mug silhouette — builds muscle memory faster than tracing complex art.',
            },
            {
              heading: 'Shape Builder and Pathfinder',
              body: 'For geometric compositions, overlapping shapes combined with the Shape Builder tool (Shift+M) let you merge, subtract or extract regions by dragging across them. Pathfinder panels offer the same Boolean operations as buttons. Both approaches produce clean, scalable outlines essential for logo and icon work.',
            },
          ],
          links: [
            {
              title: 'Illustrator Getting Started Guide',
              url: 'https://helpx.adobe.com/illustrator/user-guide.html',
              sourceName: 'Adobe Illustrator',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Drawing with the Pen Tool',
              url: 'https://helpx.adobe.com/illustrator/using/drawing-pen-curve-segments.html',
              sourceName: 'Adobe Illustrator',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Combine objects with the Shape Builder tool',
              url: 'https://helpx.adobe.com/illustrator/using/shapebuilder-tool.html',
              sourceName: 'Adobe Illustrator',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What happens when you click and drag with the Pen tool instead of just clicking?',
            options: [
              'It creates a straight line segment',
              'It pulls out Bézier handles to define a curved path',
              'It deletes the previous anchor point',
              'It switches to the Brush tool',
            ],
            answerIndex: 1,
            explanation:
              'Dragging with the Pen tool extends directional handles from the anchor point, allowing you to shape the curvature of the incoming and outgoing path segments.',
          },
        },
        {
          slug: 'raster-painting-in-photoshop',
          title: 'Raster Painting in Photoshop',
          minutes: 30,
          objectives: [
            'Configure a new document with appropriate resolution and colour mode for illustration.',
            'Use brush presets, opacity and flow to control paint application.',
            'Organise layers, layer groups and blending modes for non-destructive painting.',
          ],
          sections: [
            {
              heading: 'Document Setup for Illustration',
              body: 'Illustration files typically start at 300 DPI for print or 72–144 DPI for screen. The colour mode matters: RGB for digital-only work, CMYK when print output is planned from the start. Photoshop\'s New Document dialog offers illustration presets, but understanding resolution and mode yourself prevents costly rework.',
            },
            {
              heading: 'Brush Controls',
              body: 'The Brush tool applies colour with pressure-sensitive dynamics. Opacity controls transparency of each stroke; Flow controls the rate of paint build-up within a single stroke. Hardness determines edge sharpness. Combining pen-tablet pressure with opacity jitter creates natural-looking painterly effects.',
            },
            {
              heading: 'Layers and Blending Modes',
              body: 'Layers stack transparent sheets of artwork. Name and group them for sanity. Blending modes — Multiply for shadows, Screen for highlights, Overlay for colour grading — determine how each layer\'s pixels combine with those beneath. Adjustment layers for Hue/Saturation and Curves add global colour control without destructive edits.',
            },
          ],
          links: [
            {
              title: 'Photoshop Brush Basics',
              url: 'https://helpx.adobe.com/photoshop/using/brush-tools.html',
              sourceName: 'Adobe Photoshop',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Blend Modes Reference',
              url: 'https://helpx.adobe.com/photoshop/using/blending-modes.html',
              sourceName: 'Adobe Photoshop',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Photoshop Layers Overview',
              url: 'https://helpx.adobe.com/photoshop/using/layers.html',
              sourceName: 'Adobe Photoshop',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which blending mode is most commonly used for painting shadows onto a layer beneath it?',
            options: ['Screen', 'Overlay', 'Multiply', 'Soft Light'],
            answerIndex: 2,
            explanation:
              'Multiply darkens the underlying colours by multiplying their values, making it ideal for transparent shadow layers that darken without obscuring detail.',
          },
        },
        {
          slug: 'digital-inking-and-line-art',
          title: 'Digital Inking & Line Art',
          minutes: 27,
          objectives: [
            'Create clean line art using vector paths or raster brush stabilisation.',
            'Apply varying line weights to suggest depth and form.',
            'Prepare line art layers ready for colouring in Illustrator or Photoshop.',
          ],
          sections: [
            {
              heading: 'Choosing Your Inking Method',
              body: 'Vector inking in Illustrator with the Pen or Blob Brush produces infinitely scalable outlines — ideal for logos, merch and animation assets. Raster inking in Photoshop or Clip Studio with stabilised brushes gives a more organic, hand-drawn feel. Professional illustrators often use both: vectors for final deliverables, raster for exploratory sketching.',
            },
            {
              heading: 'Line Weight and Hierarchy',
              body: 'Varying line thickness communicates depth: thicker outlines on foreground elements, thinner on distant ones. Contour lines define form, while thinner detail lines suggest texture. Brush tapering — achieved through pressure sensitivity or Illustrator\'s Width tool — adds dynamism without extra passes.',
            },
            {
              heading: 'Preparing Lines for Colour',
              body: 'In Illustrator, expand strokes and use Live Paint to fill enclosed regions. In Photoshop, place line art on a Multiply layer and colour on separate layers beneath it. Both workflows keep lines independent of colour, allowing easy edits to either without destroying the other.',
            },
          ],
          links: [
            {
              title: 'Illustrator Width Tool',
              url: 'https://helpx.adobe.com/illustrator/using/width-tool.html',
              sourceName: 'Adobe Illustrator',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Photoshop Painting Techniques',
              url: 'https://helpx.adobe.com/photoshop/using/painting-tools.html',
              sourceName: 'Adobe Photoshop',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Clip Studio Paint Inking Features',
              url: 'https://www.clipstudio.com/en/features',
              sourceName: 'Clip Studio Paint',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'When inking in Photoshop, what layer blending mode lets you colour beneath the line art without painting over the lines?',
            options: ['Normal', 'Multiply', 'Darken', 'Color Burn'],
            answerIndex: 1,
            explanation:
              'Setting the line art layer to Multiply makes white areas transparent while keeping dark lines opaque, so colour painted on layers beneath shows through cleanly.',
          },
        },
      ],
    },

    {
      slug: 'colour-composition-and-character',
      stage: 'Foundation',
      title: 'Colour, Composition & Character',
      description:
        'Build the artistic foundations that separate snapshots from illustrations — deliberate colour palettes, strong compositions, and character design that communicates personality.',
      topics: [
        {
          slug: 'colour-theory-for-illustration',
          title: 'Colour Theory for Illustration',
          minutes: 29,
          objectives: [
            'Identify and use complementary, analogous and triadic colour harmonies.',
            'Build a limited palette that serves mood, readability and brand consistency.',
            'Apply temperature and value contrast to guide the viewer\'s eye.',
          ],
          sections: [
            {
              heading: 'Colour Harmonies',
              body: 'A colour wheel maps relationships between hues. Complementary pairs (red/green) create vibrant contrast; analogous groups (blue/teal/green) produce calm cohesion; triadic schemes (red/yellow/blue) balance variety with structure. Choosing a harmony before painting prevents palette drift and keeps illustrations visually unified.',
            },
            {
              heading: 'Limited Palettes',
              body: 'Professional illustrators work with 3–5 core colours plus neutrals. A limited palette enforces hierarchy: the accent colour draws attention to focal points, while muted tones support. Tools like Adobe Color and Coolors help generate harmonious swatches, but the discipline is in editing down, not adding more.',
            },
            {
              heading: 'Temperature and Value',
              body: 'Warm colours (reds, oranges) advance; cool colours (blues, purples) recede. Value — how light or dark a colour is — carries more structural information than hue. A grayscale thumbnail that reads clearly will produce a strong colour illustration. Check value structure early by sampling your canvas in grayscale preview.',
            },
          ],
          links: [
            {
              title: 'Adobe Color Wheel',
              url: 'https://color.adobe.com/',
              sourceName: 'Adobe Illustrator',
              resourceType: 'reference',
              relationship: 'primary',
            },
            {
              title: 'Photoshop Colour Adjustments',
              url: 'https://helpx.adobe.com/photoshop/using/adjusting-color-tone.html',
              sourceName: 'Adobe Photoshop',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Clip Studio Paint Colour Mixing',
              url: 'https://www.clipstudio.com/en/features',
              sourceName: 'Clip Studio Paint',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which colour relationship sits directly opposite on the colour wheel and produces the strongest contrast?',
            options: ['Analogous', 'Triadic', 'Complementary', 'Split-complementary'],
            answerIndex: 2,
            explanation:
              'Complementary colours are opposite each other on the wheel. Their juxtaposition creates maximum contrast and vibrancy, making them powerful for focal points.',
          },
        },
        {
          slug: 'composition-and-visual-storytelling',
          title: 'Composition & Visual Storytelling',
          minutes: 28,
          objectives: [
            'Apply the rule of thirds and golden ratio to place focal points.',
            'Use leading lines and framing to direct the viewer\'s gaze.',
            'Design a thumbnail composition that communicates the narrative at small size.',
          ],
          sections: [
            {
              heading: 'Rule of Thirds and Focal Placement',
              body: 'Dividing the canvas into a 3×3 grid and placing key elements at intersections or along lines creates natural balance. The rule of thirds is a starting point, not a law — breaking it deliberately (centred symmetry, extreme off-centre) creates tension when the narrative calls for it.',
            },
            {
              heading: 'Leading Lines and Framing',
              body: 'Converging lines — roads, arm gestures, gaze direction — funnel attention toward the focal point. Framing elements (doorways, foliage, architectural arches) create depth layers and isolate the subject. Together, these tools transform a flat image into a staged scene.',
            },
            {
              heading: 'Thumbnail Sketching',
              body: 'Before committing to a full illustration, sketch 4–6 tiny compositions (2–3 inches). At small scale, only the strongest arrangements survive — value contrast, silhouette readability and narrative clarity are immediately visible. This step saves hours of painting over a fundamentally weak composition.',
            },
          ],
          links: [
            {
              title: 'Procreate Composition Guides',
              url: 'https://procreate.com/handbook/procreate/guides/',
              sourceName: 'Procreate',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Illustrator Artboard and Grid Setup',
              url: 'https://helpx.adobe.com/illustrator/using/artboards.html',
              sourceName: 'Adobe Illustrator',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Clip Studio Paint Perspective Rulers',
              url: 'https://www.clipstudio.com/en/features',
              sourceName: 'Clip Studio Paint',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Why do illustrators create small thumbnail sketches before starting a full painting?',
            options: [
              'They are faster to sell to clients',
              'Small scale reveals only strong compositions with clear value structure',
              'Thumbnails use less memory',
              'They are required by copyright law',
            ],
            answerIndex: 1,
            explanation:
              'At thumbnail scale, weak compositions are immediately obvious because fine detail cannot compensate for poor arrangement of values and shapes.',
          },
        },
        {
          slug: 'character-design-fundamentals',
          title: 'Character Design Fundamentals',
          minutes: 30,
          objectives: [
            'Construct a character from basic geometric shapes to establish silhouette.',
            'Use exaggerated proportions to communicate personality and role.',
            'Design an expression sheet showing key emotional states.',
          ],
          sections: [
            {
              heading: 'Shape Language',
              body: 'Every character starts as circles, squares and triangles. Circles suggest friendliness and softness; squares imply stability and strength; triangles convey speed or menace. Combining these shapes in the torso, head and limbs creates a silhouette that reads at a glance — critical for animation, games and editorial illustration.',
            },
            {
              heading: 'Proportions and Exaggeration',
              body: 'Realistic proportions (7–8 heads tall) suit editorial work; stylised proportions (2–4 heads tall) suit mascots and children\'s media. Exaggerating specific features — oversized hands for a labourer, elongated limbs for a dancer — reinforces narrative without text. Reference sheets document these choices for consistency.',
            },
            {
              heading: 'Expression and Pose Sheets',
              body: 'An expression sheet shows the character\'s face in 5–8 emotional states: neutral, happy, angry, surprised, sad, focused. A pose sheet captures 3–4 full-body attitudes: idle, action, relaxed, alert. These sheets are the contract between illustrators, animators and modelers that keep the character on-model across scenes.',
            },
          ],
          links: [
            {
              title: 'Procreate Brush Library for Character Work',
              url: 'https://procreate.com/handbook/procreate/brushes/',
              sourceName: 'Procreate',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Clip Studio Paint Character Tools',
              url: 'https://www.clipstudio.com/en/features',
              sourceName: 'Clip Studio Paint',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Photoshop Transform and Warp Tools',
              url: 'https://helpx.adobe.com/photoshop/using/transforming-objects.html',
              sourceName: 'Adobe Photoshop',
              resourceType: 'tutorial',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'In shape language, which geometric shape most commonly conveys friendliness and approachability?',
            options: ['Triangle', 'Square', 'Circle', 'Pentagon'],
            answerIndex: 2,
            explanation:
              'Circles lack sharp edges and feel soft and organic, which is why round shapes are used for friendly characters, mascots and children\'s illustration.',
          },
        },
      ],
    },

    {
      slug: 'advanced-techniques-and-tool-mastery',
      stage: 'Intermediate',
      title: 'Advanced Techniques & Tool Mastery',
      description:
        'Level up your craft with custom brushes, texture work, Procreate and Clip Studio specialised features, and illustration styles that set your work apart.',
      topics: [
        {
          slug: 'advanced-brushwork-and-texture',
          title: 'Advanced Brushwork & Texture',
          minutes: 29,
          objectives: [
            'Build custom brush presets in Photoshop and Procreate for specific textures.',
            'Apply texture overlays and clipping masks to add surface variation.',
            'Use noise, grain and halftone effects to enrich flat digital colour.',
          ],
          sections: [
            {
              heading: 'Custom Brush Creation',
              body: 'Photoshop\'s Brush Settings panel exposes shape dynamics, scattering, texture, dual brush and transfer controls. Procreate\'s Brush Studio adds granularity for tilt, pressure and azimuth. Designing a brush starts with a source stamp — a leaf, a chalk mark, a bristle stroke — then tuning spacing, jitter and opacity dynamics until the mark feels natural.',
            },
            {
              heading: 'Texture Overlays and Clipping Masks',
              body: 'Scan or download paper textures, fabric weaves, concrete surfaces. Place them on a layer above your painting and set the blending mode to Overlay or Soft Light at reduced opacity. A clipping mask confines the texture to the shape beneath it. This technique adds tactile richness that flat digital colour alone cannot achieve.',
            },
            {
              heading: 'Grain, Noise and Halftone',
              body: 'Film grain (Photoshop\'s Add Noise filter at 2–4%) adds subtle organic variation to smooth gradients. Halftone patterns evoke print and retro aesthetics. Both effects bridge the gap between digital perfection and the imperfections the eye finds pleasing. Apply sparingly — a little goes a long way.',
            },
          ],
          links: [
            {
              title: 'Procreate Brush Studio Handbook',
              url: 'https://procreate.com/handbook/procreate/brushes/studio/',
              sourceName: 'Procreate',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Photoshop Brush Settings Reference',
              url: 'https://helpx.adobe.com/photoshop/using/brush-painting-options.html',
              sourceName: 'Adobe Photoshop',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Clip Studio Paint Material Library',
              url: 'https://www.clipstudio.com/en/features',
              sourceName: 'Clip Studio Paint',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the primary purpose of placing a texture layer with a clipping mask above a painted shape?',
            options: [
              'To delete the texture from the canvas',
              'To confine the texture effect to the boundaries of the shape beneath',
              'To convert the shape to a vector path',
              'To lock the layer\'s transparency',
            ],
            answerIndex: 1,
            explanation:
              'A clipping mask uses the transparency of the base layer to mask the layer above, so the texture only appears within the painted shape.',
          },
        },
        {
          slug: 'procreate-and-clip-studio-workflows',
          title: 'Procreate & Clip Studio Workflows',
          minutes: 30,
          objectives: [
            'Configure a Procreate canvas with correct DPI, colour profile and layer limits.',
            'Use Clip Studio Paint\'s vector layers and perspective rulers for structured illustration.',
            'Export files from both apps in formats suitable for print and digital delivery.',
          ],
          sections: [
            {
              heading: 'Procreate Canvas Setup',
              body: 'Procreate\'s canvas resolution directly impacts layer count — a 4000×3000 px canvas at 300 DPI gives fewer layers than a 3000×2000 px canvas at the same DPI. Choose your largest output size first, then work backwards. The Colour Dynamics panel lets you shift hue, saturation and brightness with pencil pressure for expressive painting.',
            },
            {
              heading: 'Clip Studio Vector Layers and Rulers',
              body: 'Clip Studio\'s vector layers store strokes as editable paths, letting you resize and adjust line weight after the fact — a unique advantage for comic and manga workflows. Perspective rulers snap drawings to one-, two- or three-point perspective grids, ensuring architectural backgrounds are geometrically correct without manual measurement.',
            },
            {
              heading: 'Exporting for Delivery',
              body: 'Procreate exports PSD, TIFF, PDF and JPEG. For handoff to a designer, always send PSD to preserve layers. Clip Studio adds PNG and SVG exports. For print, use TIFF at 300 DPI CMYK; for web, use sRGB PNG or JPEG at 72–144 DPI. Name files with project, version and date for organised delivery.',
            },
          ],
          links: [
            {
              title: 'Procreate Canvas Handbook',
              url: 'https://procreate.com/handbook/procreate/canvas/',
              sourceName: 'Procreate',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Clip Studio Paint Vector Layers',
              url: 'https://www.clipstudio.com/en/features',
              sourceName: 'Clip Studio Paint',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Procreate Export and Share Handbook',
              url: 'https://procreate.com/handbook/procreate/share/',
              sourceName: 'Procreate',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Why does increasing canvas resolution in Procreate reduce the number of available layers?',
            options: [
              'Procreate limits layers based on file age',
              'Higher resolution canvases consume more memory, reducing how many layers fit in RAM',
              'Smaller canvases always use fewer layers by default',
              'Layer count is unrelated to canvas size',
            ],
            answerIndex: 1,
            explanation:
              'Procreate allocates a fixed amount of iPad memory to each canvas. More pixels per layer means fewer layers can fit before the memory limit is reached.',
          },
        },
        {
          slug: 'typography-and-logo-illustration',
          title: 'Typography & Logo Illustration',
          minutes: 28,
          objectives: [
            'Illustrate hand-lettered typography using vector or raster techniques.',
            'Design a simple logo mark that scales from favicon to billboard.',
            'Prepare vector logo files with proper anchor points and clean paths.',
          ],
          sections: [
            {
              heading: 'Hand-Lettered Typography',
              body: 'Hand-lettering bridges illustration and type design. Start by sketching the word in pencil, then trace in Illustrator with the Pen tool or in Procreate with a clean inking brush. Kerning (spacing between letter pairs) is more forgiving in illustration than strict type setting — optical balance matters more than mathematical metrics.',
            },
            {
              heading: 'Logo Mark Design',
              body: 'A strong logo mark reduces an idea to its most recognisable silhouette. Work in black and white first — colour is added only after the form reads clearly. Test at 16×16 px (favicon) and at poster size; if it fails at either extreme, simplify the shape. Geometric construction (circles, grids) ensures optical consistency.',
            },
            {
              heading: 'Vector Path Cleanup',
              body: 'Hand-traced or auto-traced logos need path cleanup: remove stray anchors, convert smooth curves to consistent handle lengths, and ensure closed paths for fill. Illustrator\'s Simplify and Smooth tools reduce point count without visible quality loss. Clean vectors scale infinitely — the fundamental promise of vector illustration.',
            },
          ],
          links: [
            {
              title: 'Illustrator Pen Tool and Path Editing',
              url: 'https://helpx.adobe.com/illustrator/using/drawing-pen-curve-segments.html',
              sourceName: 'Adobe Illustrator',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Procreate Drawing Guides',
              url: 'https://procreate.com/handbook/procreate/guides/',
              sourceName: 'Procreate',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Clip Studio Paint Symmetry Rulers',
              url: 'https://www.clipstudio.com/en/features',
              sourceName: 'Clip Studio Paint',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'When designing a logo, why should you test it at a very small size such as 16×16 pixels?',
            options: [
              'Small sizes reveal colour accuracy',
              'It ensures the mark remains recognisable as a favicon or app icon',
              'Vector paths are only visible at small sizes',
              'Printers require favicon-size proofs',
            ],
            answerIndex: 1,
            explanation:
              'Logos must function at every size from favicons to billboards. If fine detail disappears or the shape becomes ambiguous at 16×16 px, the mark needs simplification.',
          },
        },
      ],
    },

    {
      slug: 'professional-delivery-and-portfolio',
      stage: 'Advanced',
      title: 'Professional Delivery & Portfolio',
      description:
        'Deliver illustration work that clients can actually use — print-ready files, licensed digital assets, and a portfolio that lands the next gig.',
      topics: [
        {
          slug: 'print-ready-file-preparation',
          title: 'Print-Ready File Preparation',
          minutes: 27,
          objectives: [
            'Convert artwork from RGB to CMYK without destructive colour shifts.',
            'Add bleeds, crop marks and resolve overprint issues for commercial printing.',
            'Export press-quality PDFs with embedded fonts and correct resolution.',
          ],
          sections: [
            {
              heading: 'RGB to CMYK Conversion',
              body: 'Screens display RGB; presses print CMYK. Converting between them shifts colours — vivid RGB blues and greens often dull. Use ICC profiles (e.g. Fogra39 for European print, GRACoL for North American) to predict the shift. Adjust problematic colours with Proof Colours preview before flattening.',
            },
            {
              heading: 'Bleeds, Trim and Crop Marks',
              body: 'Bleed extends artwork 3 mm (or 0.125 in) beyond the trim edge so white paper doesn\'t show at cut lines. Crop marks indicate where the printer trims. Illustrator\'s Print dialog and PDF export both support these. Forgetting bleeds is the most common print-prep mistake and the easiest to avoid.',
            },
            {
              heading: 'Exporting Press PDFs',
              body: 'Use PDF/X-1a:2001 for maximum compatibility. Flatten transparency, embed all fonts, and embed the CMYK profile. Check the Document Info panel for RGB objects or missing fonts before sending. A 300 DPI raster baseline ensures photographic elements print sharply.',
            },
          ],
          links: [
            {
              title: 'Illustrator Print and Export Guide',
              url: 'https://helpx.adobe.com/illustrator/using/printing.html',
              sourceName: 'Adobe Illustrator',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Photoshop CMYK and Colour Management',
              url: 'https://helpx.adobe.com/photoshop/using/color-management.html',
              sourceName: 'Adobe Photoshop',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Procreate Colour Profile Settings',
              url: 'https://procreate.com/handbook/procreate/canvas/',
              sourceName: 'Procreate',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the standard bleed distance added beyond the trim edge for commercial print in most regions?',
            options: ['0.5 mm', '3 mm (0.125 in)', '10 mm', '25 mm'],
            answerIndex: 1,
            explanation:
              'A 3 mm (0.125 in) bleed gives the printer enough margin to account for slight cutting variations without showing unprinted paper at the edge.',
          },
        },
        {
          slug: 'digital-asset-delivery-for-clients',
          title: 'Digital Asset Delivery for Clients',
          minutes: 26,
          objectives: [
            'Export a complete asset pack: source files, PNGs, SVGs and usage documentation.',
            'Write a concise licence and usage agreement for commissioned illustration.',
            'Organise file naming and folder structures that clients can navigate independently.',
          ],
          sections: [
            {
              heading: 'Asset Pack Contents',
              body: 'A professional delivery includes: editable source files (PSD, AI, Procreate .procreate), flattened PNGs at 1× and 2× for digital use, vector SVGs where applicable, and a ReadMe file explaining formats, colour profiles and usage rights. Clients should never need to ask what a file is for.',
            },
            {
              heading: 'Licensing and Usage Rights',
              body: 'Define the licence clearly: exclusive vs non-exclusive, duration (perpetual or time-limited), media (print, digital, social), and territory. An exclusive illustration for a book cover differs from a non-exclusive social media illustration. Scope creep on licensing is where illustrator earnings are most commonly lost.',
            },
            {
              heading: 'File Naming and Folder Structure',
              body: 'Use a consistent naming convention: [project]_[asset]_[variant]_[size].[ext]. Organise folders as: /Source, /Export/PNG, /Export/SVG, /Export/PDF, /Documentation. ZIP the final package and include a manifest listing every file. This professionalism prevents the "which file do I use?" follow-up email.',
            },
          ],
          links: [
            {
              title: 'Illustrator Export Options',
              url: 'https://helpx.adobe.com/illustrator/using/exporting-artwork.html',
              sourceName: 'Adobe Illustrator',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Photoshop Export and Save for Web',
              url: 'https://helpx.adobe.com/photoshop/using/save-optimize-web-images.html',
              sourceName: 'Adobe Photoshop',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Procreate Share and Export Handbook',
              url: 'https://procreate.com/handbook/procreate/share/',
              sourceName: 'Procreate',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which licence type gives a client sole usage rights and prevents the illustrator from selling the same work to others?',
            options: [
              'Non-exclusive licence',
              'Exclusive licence',
              'Creative Commons licence',
              'Open-source licence',
            ],
            answerIndex: 1,
            explanation:
              'An exclusive licence grants sole usage rights to the licensee for the agreed scope. The illustrator retains copyright but cannot license the same work to competitors during the exclusivity period.',
          },
        },
        {
          slug: 'portfolio-curation-and-self-promotion',
          title: 'Portfolio Curation & Self-Promotion',
          minutes: 28,
          objectives: [
            'Select 8–12 strongest pieces that demonstrate range and specialisation.',
            'Write case studies that explain the brief, process and outcome for each project.',
            'Build a consistent social media presence that attracts client inquiries.',
          ],
          sections: [
            {
              heading: 'Curating Your Best Work',
              body: 'Quality over quantity: 10 strong pieces outperform 50 mixed ones. Include the type of work you want to be hired for. If you want book covers, lead with book covers — not personal fan art. Review your portfolio every quarter; remove anything older than two years unless it remains your strongest piece.',
            },
            {
              heading: 'Case Studies',
              body: 'Each portfolio piece benefits from a short case study: the client brief (or personal prompt), the creative process (thumbnails, sketches, colour studies), the final artwork, and the outcome (published, installed, metrics). Case studies demonstrate thinking, not just output — and thinking is what clients pay for.',
            },
            {
              heading: 'Social Media for Illustrators',
              body: 'Platforms like Instagram, ArtStation and Behance serve different audiences. Instagram excels at process videos and community engagement; ArtStation targets industry recruiters; Behance suits long-form project presentations. Post consistently (3–5 times per week), use relevant hashtags, and engage with comments to build a following that converts to inquiries.',
            },
          ],
          links: [
            {
              title: 'Procreate Timelapse Replay for Process Videos',
              url: 'https://procreate.com/handbook/procreate/gallery/',
              sourceName: 'Procreate',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Illustrator Artboard Export for Portfolio Pieces',
              url: 'https://helpx.adobe.com/illustrator/using/exporting-artwork.html',
              sourceName: 'Adobe Illustrator',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Clip Studio Paint Portfolio Export',
              url: 'https://www.clipstudio.com/en/features',
              sourceName: 'Clip Studio Paint',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'When curating a professional portfolio, the strongest strategy is to…',
            options: [
              'Include every piece you have ever made to show range',
              'Lead with the type of work you want to be hired for',
              'Only show personal projects to demonstrate creativity',
              'Keep the same portfolio for years without updating',
            ],
            answerIndex: 1,
            explanation:
              'A portfolio is a marketing tool. Showing the work you want more of attracts the clients and projects you actually want, rather than diluting your positioning with irrelevant pieces.',
          },
        },
      ],
    },
  ],

  practicalExam: {
    title: 'Deliver a Multi-Format Editorial Illustration Package',
    coverage: [
      'Vector and raster illustration technique',
      'Colour theory and palette construction',
      'Composition and visual storytelling',
      'Advanced brushwork and texture',
      'Print-ready file preparation',
      'Digital asset export and naming',
      'Licensing and usage documentation',
      'Portfolio case study writing',
    ],
    brief:
      'You have been commissioned by "Horizon Magazine" to create a full-page editorial illustration on the theme "The Future of Urban Green Spaces." The illustration must be delivered as a print-ready CMYK file and a set of digital assets for the magazine\'s website and social channels. Produce the artwork in your primary illustration tool, prepare all deliverables, and document the project as a portfolio case study.',
    requirements: [
      'Create a 220×300 mm illustration at 300 DPI in CMYK colour mode.',
      'Use a deliberate composition technique (rule of thirds, leading lines or framing).',
      'Apply a limited palette of no more than 5 core colours plus neutrals.',
      'Incorporate at least one texture overlay or custom brush effect for surface richness.',
      'Export a press-ready PDF/X-1a with 3 mm bleeds and crop marks.',
      'Export digital PNGs at 1× (1200×1636 px) and 2× (2400×3272 px) in sRGB.',
      'Export a vector SVG version of the focal element for web animation.',
      'Include a ReadMe file listing every delivered file, its format and intended use.',
    ],
    expectedOutput:
      'A ZIP archive containing the press-ready PDF, digital PNGs at two sizes, the SVG focal element, a ReadMe document, and a one-page case study covering brief, process and outcome.',
    rubric: [
      {
        skill: 'Illustration Quality',
        weight: 25,
        criteria: 'Strong composition, clear focal point, confident line work and intentional brushwork that serves the narrative.',
      },
      {
        skill: 'Colour and Palette',
        weight: 15,
        criteria: 'Limited palette used consistently; value structure is readable in grayscale; colour temperature supports mood.',
      },
      {
        skill: 'Texture and Technique',
        weight: 15,
        criteria: 'Texture overlays or custom brushes add tactile richness without overwhelming the subject.',
      },
      {
        skill: 'Print Preparation',
        weight: 15,
        criteria: 'CMYK conversion handled correctly; bleeds present; PDF is press-ready with embedded fonts and correct resolution.',
      },
      {
        skill: 'Digital Export',
        weight: 15,
        criteria: 'PNGs at correct sizes and colour profile; SVG is clean and functional; file naming is consistent.',
      },
      {
        skill: 'Documentation and Case Study',
        weight: 15,
        criteria: 'ReadMe is clear and complete; case study explains brief, process and outcome professionally.',
      },
    ],
    passScore: 70,
  },

  assignments: [
    {
      title: 'Build a 5-Colour Character Illustration from Thumbnail to Final',
      stage: 'Beginner',
      objective:
        'Take a character concept from thumbnail sketches through to a fully coloured illustration using a deliberate 5-colour palette and clean line art.',
      requirements: [
        'Produce 4 thumbnail compositions exploring different poses and framing.',
        'Select one composition and develop a clean line-art version.',
        'Choose a 5-colour palette (3 hues + 2 neutrals) and apply it consistently.',
        'Use at least 2 blending modes (e.g. Multiply for shadows, Screen for highlights).',
        'Deliver a layered PSD or Procreate file and a flattened PNG export.',
      ],
      skillsEvaluated: [
        'Thumbnail composition',
        'Line art and inking',
        'Colour palette selection',
        'Layer management and blending modes',
      ],
      dueDays: 7,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions:
          'Submit the layered source file (PSD, .procreate or CLIP) and a flattened PNG. Include a brief text describing your palette choices.',
        textLabel: 'Palette rationale',
        minTextLength: 120,
      },
    },
    {
      title: 'Illustrate a Logo Mark and Deliver a Vector Asset Pack',
      stage: 'Intermediate',
      objective:
        'Design a logo mark for a fictional brand using vector tools, and deliver a complete asset package including editable source, SVG and usage documentation.',
      requirements: [
        'Sketch at least 6 logo concepts before selecting a final direction.',
        'Build the final logo in Adobe Illustrator using the Pen tool and shape builders.',
        'Ensure the mark reads clearly at 16×16 px and at 500×500 px.',
        'Export SVG, PNG (transparent, 1× and 2×) and AI source file.',
        'Write a one-page usage guide covering colour variations, minimum size and clear space.',
      ],
      skillsEvaluated: [
        'Concept development and iteration',
        'Vector construction',
        'Scalability testing',
        'Asset export and documentation',
      ],
      dueDays: 10,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions:
          'Submit a ZIP archive containing the AI source, SVG, PNGs, and the usage guide as a PDF or Markdown file.',
        textLabel: 'Design rationale',
        minTextLength: 150,
      },
    },
    {
      title: 'Procreate to Print: Illustrate and Prepare a Poster for Press',
      stage: 'Advanced',
      objective:
        'Create a poster illustration in Procreate, then prepare it for commercial printing with correct CMYK conversion, bleeds and press-ready PDF export.',
      requirements: [
        'Illustrate a 500×700 mm poster at 300 DPI in Procreate.',
        'Use at least one custom brush for texture or special effects.',
        'Transfer to Photoshop or Illustrator for CMYK conversion and print prep.',
        'Add 3 mm bleeds and export a PDF/X-1a press-ready file.',
        'Produce a matching digital version (sRGB PNG) for social media promotion.',
      ],
      skillsEvaluated: [
        'Procreate workflow and custom brushes',
        'Cross-tool file transfer',
        'CMYK conversion and colour management',
        'Press-ready PDF preparation',
        'Multi-format delivery',
      ],
      dueDays: 14,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions:
          'Submit a ZIP containing the press-ready PDF, the social media PNG, and a short document explaining the CMYK conversion decisions.',
        textLabel: 'Print prep notes',
        minTextLength: 200,
      },
    },
  ],

  simTasks: [
    {
      title: 'Rescue a Client\'s Rush Editorial Illustration',
      context:
        'The art director at "Horizon Magazine" messages you at 4 PM: "Our illustrator just dropped the ball. We need a 220×300 mm full-page illustration on \'AI in Agriculture\' by tomorrow morning. Can you step in?" You have until 10 AM the next day.',
      requirements: [
        'Rapidly sketch 3 thumbnails and select the strongest composition within 30 minutes.',
        'Produce a black-and-white value study to confirm readability.',
        'Illustrate the final piece using your strongest tool (Illustrator, Photoshop, Procreate or Clip Studio).',
        'Prepare a print-ready PDF with 3 mm bleeds and CMYK colour.',
        'Deliver with a brief note explaining what the client receives and how to use each file.',
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput:
        'A print-ready PDF/X-1a and a short ReadMe delivered to the art director via the agreed channel.',
      skills: ['Rapid ideation', 'Tool fluency under pressure', 'Print preparation', 'Client communication'],
    },
    {
      title: 'Convert a Raster Illustration to Vector for Merch',
      context:
        'A clothing brand client wants your raster character illustration printed on T-shirts and tote bags. They need a vector version that scales to any size without quality loss. Your original is a layered Photoshop file.',
      requirements: [
        'Analyse the raster artwork to identify regions suitable for vector tracing.',
        'Recreate the illustration as clean vector paths in Adobe Illustrator.',
        'Match the original colour palette as closely as possible using CMYK swatches.',
        'Export SVG for screen printing and PDF for direct-to-garment printing.',
        'Deliver a side-by-side comparison showing raster original and vector recreation.',
      ],
      priority: 'high',
      dueDayOffset: 3,
      expectedOutput:
        'SVG and PDF vector files plus a comparison image, delivered to the client with a brief explanation of vector advantages for print.',
      skills: ['Vector recreation', 'Colour matching', 'Print file formats', 'Client expectations management'],
    },
    {
      title: 'Create a Texture Brush Pack for the Team',
      context:
        'The illustration team lead asks you to build a set of 5 custom brushes — chalk, charcoal, ink splatter, watercolour wash and halftone — for use across Photoshop and Procreate. The brushes should feel organic and respond to pressure.',
      requirements: [
        'Design 5 brush stamps with distinct textures (scan or create from scratch).',
        'Configure each brush in Photoshop\'s Brush Settings panel with pressure dynamics.',
        'Recreate the same brushes in Procreate\'s Brush Studio.',
        'Test each brush on a sample canvas and export preview images.',
        'Package the .abr and .brush files with a one-page usage guide.',
      ],
      priority: 'normal',
      dueDayOffset: 5,
      expectedOutput:
        'A brush pack containing .abr (Photoshop) and .brush (Procreate) files, preview images and a usage guide.',
      skills: ['Brush design', 'Cross-platform tool knowledge', 'Pressure sensitivity configuration', 'Documentation'],
    },
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Nadia Petrova',
      personaRole: 'Art Director',
      situation:
        'Nadia reviewed your latest character illustration and feels the colour palette is too muted for the children\'s book series it\'s intended for. She wants more vibrancy but you chose the palette deliberately for a specific mood.',
      openingMessage:
        'I love the composition and line work, but the colours feel a bit sombre for our 6–8 age group. Can we brighten things up?',
      expectedPoints: [
        'Acknowledge Nadia\'s concern about audience appropriateness.',
        'Explain the original palette rationale (mood, narrative context).',
        'Propose a compromise: shift specific accent colours while retaining the overall harmony.',
        'Show a quick colour variation (even a rough Photoshop adjustment) for comparison.',
        'Agree on a revised palette that serves both the story and the age group.',
      ],
    },
    {
      kind: 'client',
      personaName: 'Tomas Eriksen',
      personaRole: 'Marketing Manager, GreenTech Start-up',
      situation:
        'Tomas commissioned a set of 3 social media illustrations. Two weeks later, he asks to also use them on printed flyers without having specified print use in the original brief.',
      openingMessage:
        'We love the illustrations so much we want to print them on A5 flyers for a trade show next week. Is that okay?',
      expectedPoints: [
        'Express appreciation that the work resonated enough for additional use.',
        'Explain that the original licence covers digital social media only.',
        'Outline what a print licence addendum would include (CMYK conversion, bleed prep, fee).',
        'Offer to prepare print-ready files quickly given the tight deadline.',
        'Recommend updating the contract to cover future print rights proactively.',
      ],
    },
    {
      kind: 'team',
      personaName: 'James Oduya',
      personaRole: 'Junior Illustrator',
      situation:
        'James is struggling with his line art — his strokes are shaky and lack confidence. He asks for feedback on his technique and tool settings.',
      openingMessage:
        'My line art always looks wobbly no matter how many times I redo it. Do you have any tips for getting cleaner strokes?',
      expectedPoints: [
        'Ask about his hardware (tablet model, pen pressure settings) to rule out configuration issues.',
        'Recommend enabling brush stabilisation in Clip Studio or Photoshop.',
        'Suggest practising long single strokes rather than short overlapping segments.',
        'Share the technique of drawing at a faster speed to reduce jitter.',
          'Offer to pair on a short inking session to demonstrate techniques live.',
      ],
    },
    {
      kind: 'client',
      personaName: 'Aisha Khan',
      personaRole: 'Creative Director, Publishing House',
      situation:
        'Aisha\'s team needs the final illustration files for a book cover, but the deadline is in 3 days and you are still finalising texture details.',
      openingMessage:
        'We need the final press files by Friday for the printer. Where are we on the cover illustration?',
      expectedPoints: [
        'Give an honest status update on what is complete and what remains.',
        'Identify which remaining details are essential versus polish that can happen in parallel.',
        'Propose delivering the core illustration now and a refined version within 48 hours.',
        'Ensure the current version already meets print specifications (CMYK, bleeds, resolution).',
        'Set up a checkpoint call to confirm the final delivery timeline.',
      ],
    },
  ],

  workplaceScenarios: [
    {
      category: 'Tooling & Process',
      situation:
        'The illustration team uses a mix of Photoshop, Procreate and Clip Studio Paint. File handoffs between tools are causing colour shifts and layer-naming confusion. Leadership asks you to propose a unified workflow.',
      requiredActions: [
        {
          action: 'Audit the current file exchange pain points by interviewing each illustrator about their most recent handoff issues.',
          good: true,
          note: 'Understanding real-world friction points before proposing solutions ensures the workflow addresses actual problems.',
        },
        {
          action: 'Document a standardised file-naming convention and folder structure for all projects.',
          good: true,
          note: 'Consistent naming and structure reduce miscommunication and speed up handoffs between tools.',
        },
        {
          action: 'Mandate that everyone switch to a single tool to eliminate cross-platform issues.',
          good: false,
          note: 'Forcing a single tool ignores individual strengths and may reduce productivity. Standardise the exchange process, not the tools.',
        },
        {
          action: 'Ignore the problem, assuming each illustrator should figure out their own workflow.',
          good: false,
          note: 'Without a shared standard, the confusion compounds with each new team member and project.',
        },
      ],
    },
    {
      category: 'Client Management',
      situation:
        'A long-term client has been requesting "just one more small revision" on every delivered illustration, adding scope without adjusting the fee. The revisions are no longer minor.',
      requiredActions: [
        {
          action: 'Review the original contract to confirm the agreed revision policy and number of included rounds.',
          good: true,
          note: 'The contract is the reference point. Revisiting it grounds the conversation in agreed terms.',
        },
        {
          action: 'Prepare a summary of all revisions requested versus those originally scoped, with time estimates for each.',
          good: true,
          note: 'Quantifying the additional work provides objective evidence for the scope conversation.',
        },
        {
          action: 'Send an invoice for all extra revisions without discussing it with the client first.',
          good: false,
          note: 'Surprise invoices damage client relationships. Always communicate scope changes before billing.',
        },
        {
          action: 'Continue accepting revisions for free to maintain the relationship.',
          good: false,
          note: 'Unpaid scope creep devalues the illustrator\'s work and sets a precedent that invites further exploitation.',
        },
      ],
    },
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Walk me through your process for converting a raster illustration created in Photoshop into a print-ready CMYK file. What are the key steps and pitfalls?',
      guidancePoints: [
        'Start with the original layered PSD to preserve editability.',
        'Convert from RGB to CMYK using an appropriate ICC profile (e.g. Fogra39 or GRACoL).',
        'Check for out-of-gamut colours and adjust selectively before flattening.',
        'Add 3 mm bleeds beyond the trim edge on all sides.',
        'Flatten transparency and embed fonts before exporting PDF/X-1a.',
        'Verify the result with a soft proof or printed proof sheet.',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'You are given a client\'s rough sketch as a reference for an illustration, but the anatomy and perspective are clearly incorrect. How do you handle this diplomatically?',
      guidancePoints: [
        'Acknowledge the client\'s vision and creative intent behind the sketch.',
        'Identify what the sketch communicates well (mood, composition, subject) versus what needs correction.',
        'Propose an alternative composition that preserves the narrative intent with correct anatomy.',
        'Show a side-by-side comparison to make the improvement tangible.',
        'Document the agreed direction to prevent further misunderstandings.',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you decide between vector (Illustrator) and raster (Photoshop/Procreate) for a given illustration project?',
      guidancePoints: [
        'Consider the final output format: scalable logos and icons favour vector; painterly textures favour raster.',
        'Evaluate the client\'s future needs: will the artwork be resized across many contexts?',
        'Assess the illustration style: flat graphic styles suit vector; detailed rendering suits raster.',
        'Factor in the team\'s tool proficiency and the project timeline.',
        'Some projects benefit from a hybrid approach: vector base with raster texture overlays.',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'Describe a time you had to push back on a client\'s creative direction. What was the situation and how did you handle it?',
      guidancePoints: [
        'Frame the pushback in terms of the audience or business outcome, not personal preference.',
        'Present data, references or precedent to support your alternative recommendation.',
        'Offer options rather than a single correction, giving the client agency.',
        'Acknowledge the client\'s expertise in their domain while asserting your illustration expertise.',
        'Document the final decision and rationale for the project record.',
      ],
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between the Pen tool in Illustrator and the Brush tool in Procreate. When would you reach for each?',
      guidancePoints: [
        'The Pen tool creates precise Bézier paths with editable anchors — ideal for clean, scalable vector work.',
        'The Brush tool applies pressure-sensitive raster strokes — ideal for organic, painterly illustration.',
        'Use the Pen tool for logos, icons, flat illustrations and anything requiring infinite scalability.',
        'Use the Brush tool for character art, environments, textures and expressive mark-making.',
        'Many professionals combine both: vector structure with raster detail.',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'A client asks you to match the exact colour of a printed brand swatch in your digital illustration. Your screen cannot reproduce the colour accurately. What do you do?',
      guidancePoints: [
        'Request the client\'s brand colour specifications (Pantone, CMYK, hex) rather than relying on screen matching.',
        'Use the Pantone Colour Bridge or equivalent tool to find the closest screen-safe equivalent.',
        'Soft-proof the CMYK values against the target ICC profile to predict print output.',
        'Communicate the limitation clearly: "On-screen approximation is X; printed result will be Y."',
        'Suggest a proof print for final colour approval before full production.',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you price an illustration project? Walk me through the factors you consider.',
      guidancePoints: [
        'Assess usage scope: where will the illustration appear, for how long, and in what media?',
        'Evaluate exclusivity: non-exclusive use costs less than a sole-licence buyout.',
        'Factor in complexity: detail level, number of characters/elements, background complexity.',
        'Consider timeline: rush delivery justifies a premium.',
        'Reference industry benchmarks (e.g. Graphic Artists Guild Handbook) and adjust for experience level.',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'You discover midway through a project that the illustration style the client approved in the mood board is not working for the actual subject matter. How do you communicate this?',
      guidancePoints: [
        'Raise the issue early with visual evidence: a rough comparison showing the style applied to the subject.',
        'Explain the specific mismatch (e.g. the style\'s simplicity loses the subject\'s complexity).',
        'Propose a revised direction with 2–3 alternative style approaches.',
        'Offer a small free exploration to demonstrate the recommended direction.',
        'Document the pivot and get written confirmation before proceeding.',
      ],
    },

  ]
  ,
}
