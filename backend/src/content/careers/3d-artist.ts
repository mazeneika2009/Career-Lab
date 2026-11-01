import type { CareerDef } from '../framework.js'

export const threeDArtist: CareerDef = {
  slug: '3d-artist',
  name: '3D Artist',
  category: 'Creative',
  order: 44,
  description:
    'Models, textures, lights and renders production assets in Blender and Substance 3D for games and media.',
  difficulty: 'Intermediate',
  pathSummary:
    '3D Artists begin by mastering viewport navigation and mesh fundamentals in Blender, progress through UV unwrapping and PBR texturing in Substance 3D, advance to hard-surface modeling and rendering pipelines, and culminate in exporting game-ready assets and assembling scenes in Unreal Engine and Unity.',
  mainSkills: [
    '3D polygon modeling in Blender',
    'UV unwrapping and topology',
    'PBR texturing in Substance 3D',
    'Lighting and camera composition',
    'Real-time rendering in Unreal Engine and Unity',
    'Retopology and mesh optimization',
    'Scene assembly and level art',
    'Asset export and pipeline integration',
  ],
  sourcePlatforms: [
    'Blender',
    'Autodesk',
    'Adobe Substance 3D',
    'Unreal Engine',
    'Unity',
  ],
  companyName: 'VoxelForge Studios',
  roleTitle: '3D Artist',

  chapters: [
    {
      slug: '3d-fundamentals',
      stage: 'Beginner',
      title: '3D Fundamentals',
      description:
        'Get comfortable navigating the Blender viewport, understanding mesh primitives, and setting up basic scenes with lights and cameras.',
      topics: [
        {
          slug: 'viewport-and-mesh-basics',
          title: 'Viewport Navigation and Mesh Primitives',
          minutes: 28,
          objectives: [
            'Navigate the Blender viewport using orbit, pan, and zoom controls confidently.',
            'Identify and create mesh primitives (cube, sphere, cylinder, plane) and understand their use cases.',
            'Apply basic transform operations — move, rotate, scale — and use the properties panel for precision.',
          ],
          sections: [
            {
              heading: 'Blender Viewport Controls',
              body: 'The Blender viewport is your workspace. Middle-mouse button orbits, Shift + middle-mouse pans, and the scroll wheel zooms. The number pad keys snap to orthographic views (front, side, top). Learning these shortcuts is the single biggest productivity boost for a new 3D artist, as toggling between menus breaks creative flow.',
            },
            {
              heading: 'Mesh Primitives and Their Roles',
              body: 'Every complex model starts from a primitive. The cube is the default starting point for hard-surface work, the sphere for organic forms, the cylinder for pipes and columns, and the plane for flat surfaces like walls or floors. Understanding polygon density — a UV sphere has more vertices at the poles — helps you choose the right primitive for the job.',
            },
            {
              heading: 'Transform Operations and Precision',
              body: 'Press G to grab, R to rotate, and S to scale in Blender. Typing a number after a transform key applies an exact value (S 2 doubles the size). The N panel displays exact location, rotation, and scale values. Locking axes with X, Y, or Z after a transform key constrains the operation to one dimension.',
            },
          ],
          links: [
            {
              title: 'Blender Manual — Interface and Controls',
              url: 'https://docs.blender.org/manual/en/latest/interface/index.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Blender Beginner Tutorial Series',
              url: 'https://www.blender.org/support/tutorials/',
              sourceName: 'Blender',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Autodesk — Introduction to 3D Modeling Concepts',
              url: 'https://www.autodesk.com/education/edu-software/overview?filters=auto-desk',
              sourceName: 'Autodesk',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'In Blender, which key combination constrains a transformation to a single axis?',
            options: [
              'Ctrl + axis key',
              'Shift + axis key',
              'Axis key (X, Y, or Z) after the transform key',
              'Alt + axis key',
            ],
            answerIndex: 2,
            explanation:
              'After pressing G, R, or S, pressing X, Y, or Z constrains the operation to that axis. For example, G then Z moves the object vertically only.',
          },
        },
        {
          slug: 'geometry-and-topology',
          title: 'Geometry, Topology, and Edge Flow',
          minutes: 30,
          objectives: [
            'Define vertices, edges, faces, and normals and explain their role in 3D modeling.',
            'Distinguish between quads, tris, and n-gons and their impact on subdivision and deformation.',
            'Use Blender\'s edge loop and knife tools to redirect topology on a simple model.',
          ],
          sections: [
            {
              heading: 'The Building Blocks of 3D Geometry',
              body: 'Every polygonal model consists of vertices (points in space), edges (lines connecting vertices), and faces (polygons formed by edges). Normals are vectors perpendicular to each face that determine how light interacts with the surface. Flipped or inconsistent normals cause shading artifacts, making them one of the first things to check when a model looks wrong.',
            },
            {
              heading: 'Quad, Tri, and N-gon Topology',
              body: 'Quads (four-sided faces) are preferred for subdivision surfaces because they subdivide predictably and deform smoothly. Tris (three-sided) are acceptable in game engines but can cause pinching artifacts. N-gons (five or more sides) cause unpredictable subdivisions and are generally avoided in production. Knowing when each is acceptable — quads for animation, tris for static game props — is a fundamental production skill.',
            },
            {
              heading: 'Edge Flow and Loop Cuts',
              body: 'Edge flow is the direction in which edge loops travel across a surface. Good edge flow follows the natural contours of the object and supports deformation in animation. Blender\'s Ctrl+R shortcut adds loop cuts, and the knife tool (K) allows freehand rerouting. Redirecting edge flow around a corner or hole is essential for clean topology.',
            },
          ],
          links: [
            {
              title: 'Blender Manual — Mesh Edit Mode',
              url: 'https://docs.blender.org/manual/en/latest/modeling/meshes/editing/index.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Autodesk Maya — Topology Best Practices',
              url: 'https://knowledge.autodesk.com/support/maya/learn-explore/caas/CloudHelp/cloudhelp/2023/ENU/MAYA-Modeling/files/GUID-DEB3A42A-9E1A-4B62-87E4-F85A48B7B630-htm.html',
              sourceName: 'Autodesk',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Blender Topology Guide',
              url: 'https://docs.blender.org/manual/en/latest/modeling/meshes/editing/mesh/face_context_face_corner_normals.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Why are quads generally preferred over n-gons for subdivision surface modeling?',
            options: [
              'Quads render faster in real-time engines',
              'Quads subdivide predictably and deform smoothly without artifacts',
              'Quads use less memory than triangles',
              'Quads automatically generate UV coordinates',
            ],
            answerIndex: 1,
            explanation:
              'Quads subdivide evenly with the Catmull-Clark algorithm used by subdivision surfaces, producing smooth, artifact-free results. N-gons create unpredictable subdivisions and shading errors.',
          },
        },
        {
          slug: 'lighting-and-camera-setup',
          title: 'Lighting and Camera Setup',
          minutes: 27,
          objectives: [
            'Place and configure the three-point light setup (key, fill, rim) in a Blender scene.',
            'Set camera focal length, depth of field, and resolution for a product-shot render.',
            'Explain the difference between point, area, sun, and spot light types in Blender.',
          ],
          sections: [
            {
              heading: 'Three-Point Lighting',
              body: 'The classic three-point setup uses a key light (primary illumination at 45 degrees), a fill light (softer, opposite side to reduce shadows), and a rim light (behind the subject for edge separation). This setup is the foundation of product visualization, portrait rendering, and game asset presentation.',
            },
            {
              heading: 'Light Types in Blender',
              body: 'Point lights emit omnidirectionally like a bare bulb. Area lights emit from a flat surface, producing soft shadows ideal for product shots. Sun lights simulate parallel rays for outdoor scenes with consistent shadow direction. Spot lights project a cone with adjustable edge falloff, useful for dramatic or focused lighting.',
            },
            {
              heading: 'Camera Configuration',
              body: 'The camera in Blender is an object you place and aim. Focal length (default 50mm) controls perspective distortion — wider lenses (24–35mm) exaggerate depth, telephoto (85mm+) flattens it. Depth of field blurs out-of-focus areas by setting an aperture (f-stop) and focus distance. Rendering at production resolution (1920×1080 or 3840×2160) ensures output meets deliverable standards.',
            },
          ],
          links: [
            {
              title: 'Blender Manual — Rendering with Cycles',
              url: 'https://docs.blender.org/manual/en/latest/render/cycles/index.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — Lighting Fundamentals',
              url: 'https://docs.unrealengine.com/5.0/en-US/lighting-overview-in-unreal-engine/',
              sourceName: 'Unreal Engine',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Unity — Lighting Overview',
              url: 'https://docs.unity3d.com/Manual/LightingOverview.html',
              sourceName: 'Unity',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which Blender light type produces the softest shadows and is most commonly used for product visualization?',
            options: ['Point light', 'Spot light', 'Area light', 'Sun light'],
            answerIndex: 2,
            explanation:
              'Area lights emit from a flat surface, producing soft, diffuse shadows that closely mimic studio softboxes. They are the go-to choice for product rendering.',
          },
        },
      ],
    },

    {
      slug: 'texturing-and-materials',
      stage: 'Foundation',
      title: 'Texturing and Materials',
      description:
        'Master UV unwrapping, PBR material workflows in Substance 3D, and learn to paint textures that hold up under close inspection.',
      topics: [
        {
          slug: 'uv-unwrapping',
          title: 'UV Unwrapping Fundamentals',
          minutes: 29,
          objectives: [
            'Unwrap a simple props model in Blender using seam-based and project-based methods.',
            'Explain texel density and maintain consistent density across UV islands.',
            'Use Blender\'s UV editor to straighten, pack, and overlap UV islands for efficiency.',
          ],
          sections: [
            {
              heading: 'What Are UVs?',
              body: 'UVs are a 2D coordinate system mapped onto a 3D surface. Each vertex gets a U (horizontal) and V (vertical) coordinate that tells the renderer where to sample a texture. Without proper UVs, textures stretch, smear, or display incorrectly. UV unwrapping is the process of cutting the 3D surface along seams and flattening it into a 2D layout.',
            },
            {
              heading: 'Seam Placement and Strategy',
              body: 'Seams should be placed along hard edges, hidden faces (bottom of a shoe, inside a door), and natural material boundaries. In Blender, select edges and press Ctrl+E to mark seams. The goal is to minimize visible seams while creating islands that flatten without excessive distortion. Blender\'s "Follow Active Quads" mode straightens rectangular islands for cleaner texture alignment.',
            },
            {
              heading: 'Texel Density and Packing',
              body: 'Texel density is the number of texture pixels per unit of 3D surface area. Consistent density ensures one object doesn\'t look sharper than another in the same scene. After unwrapping, use "Average Islands Scale" to normalize density, then "Pack Islands" to arrange them efficiently in the UV space. Overlapping UVs should only be used for identical mirrored surfaces.',
            },
          ],
          links: [
            {
              title: 'Blender Manual — UV Unwrapping',
              url: 'https://docs.blender.org/manual/en/latest/modeling/meshes/editing/uv/index.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Adobe Substance 3D — UV Workflow',
              url: 'https://helpx.adobe.com/substance-3d/discover/uv-workflow.html',
              sourceName: 'Adobe Substance 3D',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Autodesk Maya — UV Toolkit Documentation',
              url: 'https://knowledge.autodesk.com/support/maya/learn-explore/caas/CloudHelp/cloudhelp/2024/ENU/MAYA-Modeling/files/GUID-A2C3B0F0-4B4C-4C9F-B3D6-0E5B4C6B0E5B-htm.html',
              sourceName: 'Autodesk',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is texel density and why is it important when UV unwrapping multiple objects in a scene?',
            options: [
              'The number of UV islands per object; important for file organization',
              'The texture resolution per unit of 3D surface area; ensures consistent sharpness across assets',
              'The total pixel count of a texture; determines file size',
              'The angle of UV seams; prevents visible texture seams',
            ],
            answerIndex: 1,
            explanation:
              'Texel density (pixels per world unit) ensures all objects in a scene have consistent texture sharpness. Mismatched density makes some objects look crisp while others appear blurry.',
          },
        },
        {
          slug: 'pbr-material-workflow',
          title: 'PBR Material Workflow in Substance 3D',
          minutes: 30,
          objectives: [
            'Explain the PBR material model: base color, roughness, metallic, and normal maps.',
            'Create a basic PBR material in Substance 3D Painter using layers and fill layers.',
            'Bake mesh maps (ambient occlusion, curvature, world-space normals) for detail projection.',
          ],
          sections: [
            {
              heading: 'The PBR Material Model',
              body: 'Physically Based Rendering (PBR) simulates how light interacts with real surfaces. The core maps are base color (albedo without shadows), roughness (how diffuse or glossy the surface is), metallic (binary: dielectric or metal), and normal (surface detail without extra geometry). This model is standard across Blender, Unreal Engine, Unity, and Substance 3D.',
            },
            {
              heading: 'Substance 3D Painter Layer System',
              body: 'Substance 3D Painter uses a layer stack similar to Photoshop. Fill layers set material properties uniformly; paint layers add hand-painted detail. Masks (black hides, white reveals) control where each layer is visible. Smart masks use baked maps like curvature and ambient occlusion to automatically apply wear to edges and dirt to crevices.',
            },
            {
              heading: 'Mesh Map Baking',
              body: 'Before adding detail, bake high-poly mesh information onto the low-poly UV layout. Ambient occlusion captures soft contact shadows, curvature identifies edges and cavities, and world-space normals record surface orientation. These baked maps drive generators and smart masks, enabling realistic weathering and detail without manual painting.',
            },
          ],
          links: [
            {
              title: 'Adobe Substance 3D Painter — Getting Started',
              url: 'https://helpx.adobe.com/substance-3d/painter/user-guide.html',
              sourceName: 'Adobe Substance 3D',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — PBR Material Reference',
              url: 'https://docs.unrealengine.com/5.0/en-US/physically-based-materials-in-unreal-engine/',
              sourceName: 'Unreal Engine',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Blender Manual — Material Nodes',
              url: 'https://docs.blender.org/manual/en/latest/render/shader_nodes/index.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'In the PBR workflow, what does the metallic map control?',
            options: [
              'How rough or smooth a surface appears',
              'Whether a surface behaves as a metal or a dielectric (non-metal)',
              'The base color of the material',
              'The surface relief and fine geometric detail',
            ],
            answerIndex: 1,
            explanation:
              'The metallic map is typically a binary mask: white for metal (conductors), black for dielectric (non-metals). Metals tint their reflections with their base color; dielectrics have white specular reflections.',
          },
        },
        {
          slug: 'texture-painting',
          title: 'Texture Painting and Detail Enhancement',
          minutes: 28,
          objectives: [
            'Paint hand-authored color and roughness details in Substance 3D Painter using brush tools.',
            'Use generators and procedurals to add realistic edge wear, dirt, and grime automatically.',
            'Export a complete PBR texture set from Substance 3D for use in a game engine.',
          ],
          sections: [
            {
              heading: 'Hand-Painted Detail',
              body: 'While procedurals cover broad surface variation, hand-painted strokes add the specific character that makes an asset unique. Substance 3D Painter offers standard brushes with pressure-sensitive opacity and size, as well as projection painting for wrapping strokes across UV seams. Painting on roughness and metallic maps individually — not just color — is what separates amateur from professional textures.',
            },
            {
              heading: 'Generators and Smart Masks',
              body: 'Generators use baked maps to drive mask output. The "Metal Edge Wear" generator highlights exposed edges using the curvature map; the "Dirt" generator accumulates in cavities using ambient occlusion. Layering multiple generators with different blend modes and opacity levels creates complex, realistic weathering that would take hours to paint by hand.',
            },
            {
              heading: 'Texture Export for Game Engines',
              body: 'Substance 3D Painter exports texture sets with pre-configured templates for Unreal Engine, Unity, and others. Each template packages the correct maps (base color, ORM packed channel for occlusion-roughness-metallic, normal, emissive) at the right bit depth and color space. Choosing the correct template ensures materials look identical in-engine.',
            },
          ],
          links: [
            {
              title: 'Adobe Substance 3D Painter — Painting Tools',
              url: 'https://helpx.adobe.com/substance-3d/painter/user-guide.html',
              sourceName: 'Adobe Substance 3D',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unity — Importing Textures',
              url: 'https://docs.unity3d.com/Manual/class-TextureImporter.html',
              sourceName: 'Unity',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — Texture Asset Guidelines',
              url: 'https://docs.unrealengine.com/5.0/en-US/texture-optimization-for-unreal-engine/',
              sourceName: 'Unreal Engine',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the benefit of packing occlusion, roughness, and metallic into a single ORM texture channel?',
            options: [
              'It increases the texture resolution',
              'It reduces the number of texture samples and memory usage in the game engine',
              'It makes the texture easier to paint in Substance 3D',
              'It allows the texture to be used across multiple engines',
            ],
            answerIndex: 1,
            explanation:
              'Packing three grayscale maps into one RGB texture means the shader samples one texture instead of three, reducing GPU memory bandwidth and draw calls — critical for real-time performance.',
          },
        },
      ],
    },

    {
      slug: 'modeling-and-rendering',
      stage: 'Intermediate',
      title: 'Advanced Modeling and Rendering',
      description:
        'Tackle hard-surface modeling techniques, learn rigging basics for prop animation, and produce portfolio-quality renders in Cycles and EEVEE.',
      topics: [
        {
          slug: 'hard-surface-modeling',
          title: 'Hard-Surface Modeling Techniques',
          minutes: 29,
          objectives: [
            'Model a detailed mechanical prop using boolean operations and bevel modifiers in Blender.',
            'Apply crease weights and supporting edge loops to control subdivision smoothing on hard edges.',
            'Evaluate topology quality using Blender\'s mesh analysis overlays.',
          ],
          sections: [
            {
              heading: 'Boolean Workflow',
              body: 'Booleans (union, difference, intersection) combine or subtract mesh volumes, enabling complex cutouts and mechanical forms that would be tedious to model vertex-by-vertex. Blender\'s Bool Tool addon adds shortcuts for quick operations. The trade-off is messy topology at intersection boundaries, which requires cleanup or supporting modifiers to resolve.',
            },
            {
              heading: 'Crease Weights and Supporting Loops',
              body: 'Subdivision surfaces smooth everything equally by default. Crease weights (Shift+E) tell the algorithm to preserve specific edges at a given sharpness (0–1). Alternatively, placing edge loops close to hard edges creates natural support that the subdivision algorithm cannot smooth away. Combining both techniques gives precise control over the final surface.',
            },
            {
              heading: 'Mesh Analysis and Quality Checks',
              body: 'Blender\'s mesh analysis overlay highlights issues: non-manifold edges, flipped normals, loose vertices, and triangulated faces. Running a full analysis before export ensures models are production-ready. Non-manifold geometry causes problems in 3D printing, boolean operations, and game engine collision detection.',
            },
          ],
          links: [
            {
              title: 'Blender Manual — Boolean Modifier',
              url: 'https://docs.blender.org/manual/en/latest/modeling/modifiers/generate/boolean.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Autodesk Maya — Hard Surface Modeling Guide',
              url: 'https://knowledge.autodesk.com/support/maya/learn-explore/caas/CloudHelp/cloudhelp/2024/ENU/MAYA-Modeling/files/GUID-F5D1C1D1-4E4E-4B84-B8C1-2F7A4C3D0E6C-htm.html',
              sourceName: 'Autodesk',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Blender Manual — Mesh Analysis Overlay',
              url: 'https://docs.blender.org/manual/en/latest/editors/3dview/display/overlays.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the primary advantage of using crease weights over edge loops to sharpen subdivision surface edges?',
            options: [
              'Crease weights are faster to render than edge loops',
              'Crease weights avoid adding extra geometry while still controlling edge sharpness',
              'Crease weights automatically fix non-manifold geometry',
              'Crease weights are required for boolean operations to work',
            ],
            answerIndex: 1,
            explanation:
              'Crease weights modify the subdivision algorithm\'s influence on an edge without inserting additional geometry. This keeps polygon counts lower than using supporting edge loops for the same visual result.',
          },
        },
        {
          slug: 'rigging-and-prop-animation',
          title: 'Rigging and Prop Animation Basics',
          minutes: 27,
          objectives: [
            'Create a simple bone rig for a mechanical prop (hinged door or articulated arm) in Blender.',
            'Use constraint-driven animation (Copy Rotation, Limit Angle) for mechanical motion.',
            'Set keyframes and preview a short animation loop in Blender\'s timeline.',
          ],
          sections: [
            {
              heading: 'Armature Fundamentals',
              body: 'An armature is a skeleton of bones used to deform or drive mesh geometry. For mechanical props, bones are typically parented in a hierarchy that mirrors the physical assembly — a base bone, a rotating joint bone, and an extending segment bone. Each bone corresponds to a specific degree of freedom in the mechanism.',
            },
            {
              heading: 'Constraints for Mechanical Motion',
              body: 'Blender constraints replace manual keyframing for repetitive or rule-based motion. The Copy Rotation constraint makes one bone follow another\'s rotation; the Limit Rotation constraint restricts a joint to its real-world range (e.g., a hinge only rotates 90 degrees on the Z axis). These constraints ensure animations are physically plausible without constant manual adjustment.',
            },
            {
              heading: 'Keyframing and Timeline',
              body: 'Press I in the 3D viewport to insert a keyframe on the current frame. The Dope Sheet displays all keyframes, while the Graph Editor exposes interpolation curves. Setting the interpolation to Linear for mechanical motion (constant speed) or Bezier for organic motion (ease in/out) controls the feel of the animation. The NLA Editor combines actions into non-linear sequences.',
            },
          ],
          links: [
            {
              title: 'Blender Manual — Armatures and Rigging',
              url: 'https://docs.blender.org/manual/en/latest/animation/armatures/index.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — Skeletal Animation Overview',
              url: 'https://docs.unrealengine.com/5.0/en-US/skeletal-mesh-animation-system/',
              sourceName: 'Unreal Engine',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Unity — Animation System Manual',
              url: 'https://docs.unity3d.com/Manual/AnimationSection.html',
              sourceName: 'Unity',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which Blender constraint is most appropriate for restricting a mechanical hinge to rotate only within a defined angle range?',
            options: [
              'Copy Location',
              'Limit Rotation',
              'Track To',
              'Child Of',
            ],
            answerIndex: 1,
            explanation:
              'The Limit Rotation constraint lets you set minimum and maximum rotation values per axis, ensuring a mechanical hinge stays within its physically plausible range of motion.',
          },
        },
        {
          slug: 'rendering-pipelines',
          title: 'Rendering with Cycles and EEVEE',
          minutes: 28,
          objectives: [
            'Configure a Blender scene for path-traced rendering in Cycles with appropriate sample counts.',
            'Set up a real-time preview render in EEVEE using screen-space reflections and ambient occlusion.',
            'Compare Cycles and EEVEE outputs and explain when each renderer is appropriate.',
          ],
          sections: [
            {
              heading: 'Cycles Path Tracing',
              body: 'Cycles is Blender\'s physically accurate path tracer. It simulates light bounces, caustics, global illumination, and volumetric effects. The trade-off is render time — a clean 1080p frame may take minutes depending on scene complexity. Denoising (OpenImageDenoise or OptiX) reduces required samples from 4096 to 256–512 while maintaining quality.',
            },
            {
              heading: 'EEVEE Real-Time Rendering',
              body: 'EEVEE is a real-time rasterizer built on OpenGL/Vulkan. It excels at fast previews, stylized rendering, and game-asset visualization. Screen-space reflections (SSR) and screen-space ambient occlusion (SSAO) approximate effects that Cycles calculates physically. EEVEE is ideal for iteration speed and presentations where absolute accuracy is less critical.',
            },
            {
              heading: 'When to Use Each Renderer',
              body: 'Use Cycles for final production renders, portfolio images, and any scene requiring accurate glass, SSS, or caustics. Use EEVEE for real-time previews, rapid iteration, stylized projects, and assets destined for game engines where the in-engine renderer (Unreal, Unity) handles final quality. Many pipelines use EEVEE for layout and Cycles for final output.',
            },
          ],
          links: [
            {
              title: 'Blender Manual — Cycles Render Engine',
              url: 'https://docs.blender.org/manual/en/latest/render/cycles/index.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Blender Manual — EEVEE Render Engine',
              url: 'https://docs.blender.org/manual/en/latest/render/eevee/index.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unity — Real-Time Rendering Pipeline',
              url: 'https://docs.unity3d.com/Manual/UniversalRP.html',
              sourceName: 'Unity',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Which feature allows Cycles to produce clean images with significantly fewer path-traced samples?',
            options: [
              'Ambient occlusion baking',
              'Screen-space reflections',
              'Denoising (OpenImageDenoise or OptiX)',
              'Motion blur',
            ],
            answerIndex: 2,
            explanation:
              'Denoising algorithms analyze the noisy render output and intelligently remove noise artifacts, allowing clean final images from as few as 256–512 samples instead of thousands.',
          },
        },
      ],
    },

    {
      slug: 'game-ready-pipeline',
      stage: 'Advanced',
      title: 'Game-Ready Asset Pipeline',
      description:
        'Optimize meshes for real-time performance, export assets to game engines, and assemble visually rich scenes in Unreal Engine and Unity.',
      topics: [
        {
          slug: 'retopology-and-optimization',
          title: 'Retopology and Mesh Optimization',
          minutes: 30,
          objectives: [
            'Perform manual retopology on a high-poly sculpt in Blender to produce a clean low-poly mesh.',
            'Calculate and apply normal map baking from high-poly to low-poly using Blender\'s Cycles bake panel.',
            'Evaluate polygon budgets andLOD strategies for game-ready assets.',
          ],
          sections: [
            {
              heading: 'Why Retopology Matters',
              body: 'High-poly sculpts contain millions of polygons — far too many for real-time rendering. Retopology is the process of building a new, clean mesh over the sculpt that captures the silhouette with a fraction of the polygons. The retopologized mesh gets UV-unwrapped, and the high-poly detail is baked into normal and displacement maps that simulate the original sculpt on the low-poly surface.',
            },
            {
              heading: 'Baking Normal and Detail Maps',
              body: 'Blender\'s Cycles bake panel supports normal map baking by comparing ray distances between the high-poly and low-poly meshes. Cage objects ensure rays capture the correct surface. The resulting normal map encodes surface-facing direction in RGB, allowing the low-poly mesh to simulate the high-poly detail under any lighting condition.',
            },
            {
              heading: 'LOD and Polygon Budgets',
              body: 'Game engines use Level of Detail (LOD) systems that swap meshes at different distances. A hero asset might be 10k triangles up close, 3k at medium range, and 500 at distance. Polygon budgets — total triangle count allowed per scene — force artists to prioritize silhouette and visual impact over unnecessary detail. Understanding these constraints early prevents rework.',
            },
          ],
          links: [
            {
              title: 'Blender Manual — Bake Panel',
              url: 'https://docs.blender.org/manual/en/latest/render/cycles/baking.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — LOD and Optimization',
              url: 'https://docs.unrealengine.com/5.0/en-US/static-mesh-lod-setup/',
              sourceName: 'Unreal Engine',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Unity — LOD Groups and Optimization',
              url: 'https://docs.unity3d.com/Manual/class-LODGroup.html',
              sourceName: 'Unity',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'What is the primary purpose of normal map baking in a game asset pipeline?',
            options: [
              'To reduce the file size of the texture',
              'To transfer high-poly surface detail onto a low-poly mesh via an RGB map',
              'To automatically unwrap UV coordinates',
              'To generate collision geometry for the game engine',
            ],
            answerIndex: 1,
            explanation:
              'Normal map baking captures the surface direction detail from a high-poly mesh and encodes it in an RGB texture. When applied to the low-poly mesh, it simulates the visual complexity without the polygon cost.',
          },
        },
        {
          slug: 'exporting-for-game-engines',
          title: 'Asset Export and Engine Integration',
          minutes: 28,
          objectives: [
            'Export a Blender model as FBX with correct scale, axis orientation, and material assignments.',
            'Import and configure the asset in Unreal Engine with collision, LOD, and material setup.',
            'Import and configure the asset in Unity with correct import settings and material mapping.',
          ],
          sections: [
            {
              heading: 'FBX Export from Blender',
              body: 'The FBX format is the standard interchange format for game engines. Key export settings in Blender include: scale (1.0 for Unreal, 0.01 for Unity depending on version), forward axis (-Y for Unreal, +Z for Unity), and applying transforms (Ctrl+A → All Transforms). Embedding textures or using a separate texture folder keeps projects organized.',
            },
            {
              heading: 'Unreal Engine Import',
              body: 'Unreal Engine\'s FBX importer reads mesh, material slots, and skeletal data. After import, set up auto-generated collision (Complex vs Simple), configure LOD settings if multiple meshes were exported, and assign materials using the PBR maps from Substance 3D. The "Convert Scene" option adjusts axis and scale automatically for Blender exports.',
            },
            {
              heading: 'Unity Import',
              body: 'Unity\'s Model Import Inspector reads the FBX and lets you configure: scale factor (1.0 for modern Unity), mesh compression level, material naming (use the "Use Embedded Materials" option or map externally), and animation import settings. Setting the "Read/Write Enabled" flag is necessary if the mesh will be modified at runtime.',
            },
          ],
          links: [
            {
              title: 'Blender Manual — FBX Export',
              url: 'https://docs.blender.org/manual/en/latest/addons/import_export/scene_fbx.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — FBX Import Pipeline',
              url: 'https://docs.unrealengine.com/5.0/en-US/fbx-import-pipeline/',
              sourceName: 'Unreal Engine',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unity — FBX Import Settings',
              url: 'https://docs.unity3d.com/Manual/class-FBXImporter.html',
              sourceName: 'Unity',
              resourceType: 'documentation',
              relationship: 'primary',
            },
          ],
          quiz: {
            prompt: 'What is a common issue when exporting FBX from Blender to Unreal Engine, and how is it resolved?',
            options: [
              'The mesh always exports as triangulated — there is no fix',
              'The model appears rotated or at the wrong scale — resolve by applying transforms before export',
              'FBX files cannot contain textures — textures must always be separate',
              'Blender materials never import into Unreal — use a third-party plugin',
            ],
            answerIndex: 1,
            explanation:
              'Blender and Unreal use different default axis orientations and scale systems. Applying all transforms (Ctrl+A) in Blender before exporting, and enabling "Convert Scene" in Unreal\'s FBX importer, resolves most orientation and scale issues.',
          },
        },
        {
          slug: 'scene-assembly-and-level-art',
          title: 'Scene Assembly and Level Art',
          minutes: 29,
          objectives: [
            'Assemble a small environment scene in Unreal Engine using modular assets and landscape tools.',
            'Apply lighting, post-process effects, and fog to create mood and depth in a scene.',
            'Use vertex painting and material instances to add variation across repeated assets.',
          ],
          sections: [
            {
              heading: 'Modular Asset Assembly',
              body: 'Level artists build environments from modular pieces — wall segments, floor tiles, pillars, and trim — that snap together on a consistent grid. This approach ensures seamless connections, reduces unique asset count, and allows rapid iteration. Unreal Engine\'s snapping and alignment tools, combined with grid-based placement, make modular assembly efficient.',
            },
            {
              heading: 'Lighting and Atmosphere',
              body: 'Scene mood comes from the interplay of direct lighting (directional sunlight, spot lights), indirect illumination (bounced light via Lumen in Unreal or baked lightmaps), and atmospheric effects (exponential height fog, volumetric fog, sky atmosphere). Post-process volumes control exposure, color grading, bloom, and vignette, tying the visual look together.',
            },
            {
              heading: 'Vertex Painting and Material Variation',
              body: 'Vertex painting stores color data per vertex on a mesh. In shaders, this data drives blends between materials — a wall mesh can blend between clean plaster and damaged concrete based on painted vertex colors. This technique breaks up the repetition of modular assets without requiring unique textures for each instance, dramatically reducing texture memory usage.',
            },
          ],
          links: [
            {
              title: 'Unreal Engine — Level Design and Assembly',
              url: 'https://docs.unrealengine.com/5.0/en-US/level-design-in-unreal-engine/',
              sourceName: 'Unreal Engine',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Unity — Scene Building and Prefabs',
              url: 'https://docs.unity3d.com/Manual/CreatingPrefabs.html',
              sourceName: 'Unity',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Blender Manual — Vertex Colors',
              url: 'https://docs.blender.org/manual/en/latest/modeling/meshes/vertex_colors.html',
              sourceName: 'Blender',
              resourceType: 'documentation',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'Why are modular assets preferred over unique meshes for constructing large game environments?',
            options: [
              'Modular assets always have higher polygon counts',
              'Modular assets reuse geometry and textures, reducing memory usage and enabling rapid iteration',
              'Modular assets cannot be lit by real-time lights',
              'Modular assets are required by all game engines',
            ],
            answerIndex: 1,
            explanation:
              'Modular assets share geometry and texture atlases across many instances, drastically reducing memory footprint. Their grid-compatible design allows level designers to quickly assemble, rearrange, and test environments.',
          },
        },
      ],
    },
  ],

  practicalExam: {
    title: 'Game-Ready Props Production Pipeline',
    coverage: [
      'Polygon modeling and hard-surface techniques',
      'UV unwrapping with consistent texel density',
      'PBR texturing in Substance 3D Painter',
      'High-poly to low-poly normal map baking',
      'LOD and polygon budget management',
      'FBX export with correct settings',
      'Unreal Engine or Unity import and material setup',
      'Scene presentation with lighting',
    ],
    brief:
      'You are tasked with producing two game-ready props — a sci-fi crate and a vending machine — from concept sketches. Deliver a complete production pipeline: model both props in Blender, UV unwrap with consistent texel density, create PBR materials in Substance 3D Painter (including wear and weathering), bake normal maps from high-poly sculpts, export as FBX, import into Unreal Engine or Unity, apply materials, and render a final presentation image of both props arranged in a small environment scene with lighting.',
    requirements: [
      'Two distinct props modeled in Blender with clean quad topology where possible.',
      'UV unwrapped with consistent texel density across both props (512×512 or 1024×1024 texel density).',
      'High-poly versions sculpted for each prop; normal maps baked onto low-poly meshes.',
      'PBR materials created in Substance 3D Painter: base color, roughness, metallic, and normal maps.',
      'At least one smart mask or generator used for edge wear and one for dirt accumulation.',
      'FBX exported with correct scale (1.0 for Unreal, 0.01 for Unity) and axis orientation.',
      'Both props imported into a game engine with assigned materials and simple collision setup.',
      'A final presentation render showing both props in a lit scene with at least one directional light and ambient fill.',
    ],
    expectedOutput:
      'A deliverable package containing: Blender source file, Substance 3D Painter project, exported FBX files, texture sets, and a game engine project (Unreal or Unity) with a presentation scene rendering both props.',
    rubric: [
      {
        skill: '3D Modeling Quality',
        weight: 20,
        criteria: 'Clean topology with appropriate polygon density; silhouette matches concept; boolean artifacts resolved.',
      },
      {
        skill: 'UV Unwrapping',
        weight: 15,
        criteria: 'Consistent texel density across both props; minimal stretching; seams placed at hidden edges.',
      },
      {
        skill: 'PBR Texturing',
        weight: 20,
        criteria: 'Physically plausible material response; base color, roughness, and metallic values are within realistic ranges; detail enhances visual story.',
      },
      {
        skill: 'Normal Map Baking',
        weight: 15,
        criteria: 'Normal maps capture high-poly detail without artifacts; cage setup avoids over-baking; no visible seams in baked result.',
      },
      {
        skill: 'Engine Integration',
        weight: 15,
        criteria: 'FBX imports cleanly; materials assigned correctly; collision generated; no missing textures or scale errors.',
      },
      {
        skill: 'Presentation',
        weight: 15,
        criteria: 'Final render demonstrates good composition, lighting, and material response; scene feels cohesive.',
      },
    ],
    passScore: 70,
  },

  assignments: [
    {
      title: 'Model and UV a Game-Ready Weapon Prop',
      stage: 'Beginner',
      objective:
        'Model a sci-fi pistol in Blender using hard-surface techniques, UV unwrap it with consistent texel density, and prepare it for texturing.',
      requirements: [
        'Model the pistol from a reference image using Blender mesh primitives and modifiers.',
        'Maintain quad topology where possible; tris acceptable only on flat, non-deforming surfaces.',
        'UV unwrap with seams along hard edges and hidden faces.',
        'Verify consistent texel density using Blender\'s UV overlay.',
        'Export the low-poly mesh as FBX with correct scale and axis settings.',
      ],
      skillsEvaluated: [
        'Hard-surface modeling in Blender',
        'Modifier stack usage (Boolean, Bevel, Mirror)',
        'UV unwrapping and seam placement',
        'Texel density consistency',
        'FBX export configuration',
      ],
      dueDays: 7,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions:
          'Submit the Blender file (.blend) and exported FBX. Include a screenshot of the UV layout in Blender\'s UV Editor.',
        textLabel: 'Process reflection',
        minTextLength: 120,
      },
    },
    {
      title: 'PBR Texturing a Environment Tile Set',
      stage: 'Intermediate',
      objective:
        'Create a set of four modular wall and floor tiles with PBR materials in Substance 3D Painter, including weathering and variation.',
      requirements: [
        'Four modular pieces: floor tile, wall panel, corner piece, and trim strip.',
        'Each piece UV unwrapped with shared texel density.',
        'PBR materials created in Substance 3D Painter with at least 3 layers per material (base, wear, dirt).',
        'Use at least two smart masks (edge wear and cavity dirt) driven by baked maps.',
        'Export texture sets using the correct engine preset (Unreal or Unity).',
      ],
      skillsEvaluated: [
        'Modular asset creation',
        'Substance 3D Painter layer and mask workflow',
        'Mesh map baking for detail projection',
        'PBR material correctness',
        'Texture export pipeline',
      ],
      dueDays: 10,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions:
          'Submit Substance 3D Painter project file, exported texture sets (PNG or TGA), and a Blender file showing the four models with UV layouts.',
        textLabel: 'Material rationale',
        minTextLength: 150,
      },
    },
    {
      title: 'Complete Character Accessory Pipeline',
      stage: 'Advanced',
      objective:
        'Produce a fully textured, game-ready character backpack — from high-poly sculpt to engine-imported asset — demonstrating the complete production pipeline.',
      requirements: [
        'High-poly sculpt of the backpack in Blender with organic and hard-surface details.',
        'Low-poly retopology with optimized polygon count (under 5k triangles).',
        'UV unwrapped with consistent texel density and minimal visible seams.',
        'Normal map baked from high-poly to low-poly in Blender Cycles.',
        'Full PBR material set created in Substance 3D Painter with realistic wear patterns.',
        'Exported and imported into Unreal Engine or Unity with materials assigned.',
        'A turntable render or screenshot demonstrating the asset from multiple angles.',
      ],
      skillsEvaluated: [
        'Digital sculpting and retopology',
        'Normal map baking technique',
        'Complete PBR texturing pipeline',
        'LOD consideration and polygon budgeting',
        'Engine integration and material mapping',
      ],
      dueDays: 14,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions:
          'Submit all source files: Blender files (high and low poly), Substance 3D Painter project, exported textures, FBX, and the game engine project or screenshots.',
        textLabel: 'Pipeline reflection',
        minTextLength: 200,
      },
    },
  ],

  simTasks: [
    {
      title: 'Fix Normal Map Artifacts on an Imported Asset',
      context:
        'A teammate imports a Blender-exported sword into Unreal Engine and notices the blade has black shading patches along its edges. You have 90 minutes to diagnose and fix the issue before the next sprint review.',
      requirements: [
        'Inspect the mesh in Blender for flipped normals and non-manifold geometry using mesh analysis overlays.',
        'Correct any flipped normals by selecting faces and pressing Shift+N (Recalculate Outside).',
        'Re-bake the normal map in Cycles with adjusted cage extrusion to eliminate ray artifacts.',
        'Re-export the FBX and verify the fix in Unreal Engine.',
        'Document the root cause and the steps taken to fix it for the team knowledge base.',
      ],
      priority: 'high',
      dueDayOffset: 1,
      expectedOutput:
        'A corrected FBX file, updated normal map texture, and a brief document describing the cause (flipped normals / cage issue) and the fix applied.',
      skills: ['Mesh analysis', 'Normal map baking', 'Troubleshooting', 'Engine verification'],
    },
    {
      title: 'Optimize a High-Poly Scene for Real-Time Performance',
      context:
        'The art director wants to present a scene in Unreal Engine for a client meeting tomorrow, but the current scene runs at 15 FPS on the target hardware. You need to optimize it to 60 FPS without visibly degrading quality.',
      requirements: [
        'Profile the scene using Unreal\'s stat commands to identify the most expensive assets.',
        'Replace the highest-poly meshes with LOD versions (LOD0, LOD1, LOD2).',
        'Combine small props into texture atlases to reduce draw calls.',
        'Convert distant static lights to baked lighting where possible.',
        'Verify the optimized scene maintains the intended visual mood and composition.',
      ],
      priority: 'critical',
      dueDayOffset: 2,
      expectedOutput:
        'An optimized Unreal Engine scene achieving at least 60 FPS on target hardware, with before/after performance statistics and a changelog of optimizations applied.',
      skills: ['Performance profiling', 'LOD creation', 'Draw call optimization', 'Time management'],
    },
    {
      title: 'Re-Texture an Asset for a Different Art Style',
      context:
        'The game\'s art style shifts from realistic to stylized for a spinoff title. You receive a realistic sci-fi crate model and need to re-texture it in a painterly, hand-painted style using Substance 3D Painter while keeping the existing UV layout.',
      requirements: [
        'Create a new material in Substance 3D Painter using the existing UV layout.',
        'Replace PBR-accurate textures with stylized, hand-painted color maps.',
        'Reduce roughness variation and metallic contrast to suit the stylized aesthetic.',
        'Add hand-painted edge highlights and shadow detail directly on the color map.',
        'Export the new texture set and import into the game engine for comparison with the original.',
      ],
      priority: 'normal',
      dueDayOffset: 3,
      expectedOutput:
        'A new set of stylized textures applied to the existing crate model, with side-by-side comparison screenshots of the realistic vs. stylized versions in the game engine.',
      skills: ['Material restyling', 'Hand-painted texturing', 'Art direction interpretation', 'Adaptability'],
    },
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Alex Kowalski',
      personaRole: 'Technical Artist',
      situation:
        'Alex reviews your Blender file and finds that several meshes have inconsistent scale — some parts are 100× larger than others, causing physics and lighting issues in Unreal Engine.',
      openingMessage:
        'Hey, I pulled your props into Unreal and the scale is all over the place — some pieces are enormous. Can we take a look at the Blender file together?',
      expectedPoints: [
        'Acknowledge the scale inconsistency and take ownership of the issue.',
        'Walk through the Blender file and identify which objects were not scaled uniformly.',
        'Apply all transforms (Ctrl+A → All Transforms) on each object and explain why this matters for FBX export.',
        'Re-export the corrected FBX with proper scale settings and verify in Unreal.',
        'Agree on a pre-export checklist to prevent this from recurring (apply transforms, check unit settings).',
      ],
    },
    {
      kind: 'client',
      personaName: 'Naomi Takahashi',
      personaRole: 'Creative Director, Film Studio',
      situation:
        'Naomi\'s team commissioned a batch of 3D environment assets for a previsualization reel. She reports that the textures look flat and lack the visual richness shown in your portfolio.',
      openingMessage:
        'The models look great in terms of shape, but the textures feel too clean and uniform. We need more visual story — wear, grime, scratches. Can you enhance them?',
      expectedPoints: [
        'Ask Naomi for specific references that capture the level of weathering she expects.',
        'Propose a two-pass approach: broad procedural weathering (edge wear, dirt) followed by hand-painted detail.',
        'Explain how Substance 3D generators and smart masks accelerate this process.',
        'Offer a revised delivery timeline that accounts for the additional texture passes.',
        'Set up a review checkpoint after the first asset is re-textured to confirm alignment before batch processing.',
      ],
    },
    {
      kind: 'team',
      personaName: 'Samuel Osei',
      personaRole: 'Junior 3D Artist',
      situation:
        'Samuel has been manually unwrapping every model by hand and spending 3+ days on UVs alone. His approach is technically correct but extremely slow for production deadlines.',
      openingMessage:
        'I\'ve been spending three full days on UV unwrapping for each prop. Is there a faster way to do this without sacrificing quality?',
      expectedPoints: [
        'Validate Samuel\'s attention to quality as a strength, then address the efficiency issue.',
        'Demonstrate Blender\'s "Smart UV Project" for automatic unwrapping as a starting point.',
        'Show seam-based manual unwrap combined with "Pack Islands" for the final layout.',
        'Explain when automatic unwrap is acceptable (background props) vs. when manual unwrap is required (hero assets).',
        'Suggest establishing time targets per asset type (prop: 30 min UVs, hero: 1–2 hours) for production planning.',
      ],
    },
    {
      kind: 'client',
      personaName: 'Oliver Petrov',
      personaRole: 'Game Producer, Indie Studio',
      situation:
        'Oliver\'s team needs the final FBX files by end of week, but you realize your current models have too many polygons for their mobile target platform (5k triangles per prop maximum).',
      openingMessage:
        'We\'re targeting mobile — 5k tris max per prop. Your current models are at 15k. Can you hit the budget without losing the look?',
      expectedPoints: [
        'Review the polygon count breakdown and identify which parts of the mesh can be simplified.',
        'Propose removing interior geometry not visible from outside and merging coplanar faces.',
        'Suggest baking high-poly detail into normal maps on the optimized low-poly to preserve the visual quality.',
        'Offer a revised delivery schedule for the optimized versions with a milestone check-in.',
        'Document the optimization decisions and polygon counts per asset for Oliver\'s team to verify.',
      ],
    },
  ],

  workplaceScenarios: [
    {
      category: 'Tooling & Process',
      situation:
        'Your studio uses both Blender and Autodesk Maya across different teams. Asset handoff between the two tools frequently causes scale, axis, and material assignment issues.',
      requiredActions: [
        {
          action: 'Document the known export settings for both Blender→FBX and Maya→FBX pipelines with screenshots.',
          good: true,
          note: 'A shared reference document eliminates guesswork and reduces recurring import errors.',
        },
        {
          action: 'Create a standardized Blender and Maya exporter preset that enforces correct axis and scale settings.',
          good: true,
          note: 'Preset files ensure all artists export with identical settings, removing per-person variation.',
        },
        {
          action: 'Tell each team to "just use one tool" to avoid the problem.',
          good: false,
          note: 'Ignoring organizational tool diversity is unrealistic. Standardizing the interchange format is the correct solution.',
        },
        {
          action: 'Blame the Maya team for not using Blender.',
          good: false,
          note: 'Cross-tool friction is a process issue, not a people issue. Blame damages team trust.',
        },
      ],
    },
    {
      category: 'Cross-Team Collaboration',
      situation:
        'The gameplay programmer tells you that the collision meshes on your props are too complex, causing physics calculations to slow down the game. They need simplified collision geometry.',
      requiredActions: [
        {
          action: 'Ask the programmer for specific performance targets and which colliders are causing bottlenecks.',
          good: true,
          note: 'Understanding the exact constraint (triangle count, convex hull count) guides the optimization approach.',
        },
        {
          action: 'Create simplified collision meshes (convex hulls or box/cylinder primitives) for each prop in Blender.',
          good: true,
          note: 'Game engines support separate collision meshes; simple primitives are far cheaper for physics calculations.',
        },
        {
          action: 'Use the detailed render mesh as the collision mesh since it "looks more accurate."',
          good: false,
          note: 'High-poly collision meshes are prohibitively expensive for real-time physics. Accuracy is not the goal — performance is.',
        },
        {
          action: 'Ignore the programmer\'s request since "collision is not my job."',
          good: false,
          note: 'Artists are responsible for delivering game-ready assets, which includes usable collision geometry. Refusing to collaborate harms the project.',
        },
      ],
    },
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the PBR material workflow. What maps are typically included, and what does each one control?',
      guidancePoints: [
        'List the core PBR maps: base color, roughness, metallic, normal, and optionally ambient occlusion and emissive.',
        'Explain base color as the diffuse albedo without lighting information.',
        'Describe roughness as controlling the micro-surface detail that determines highlight sharpness.',
        'Explain the metallic map as a binary mask separating conductors (metals) from dielectrics (non-metals).',
        'Describe normal maps as encoding surface-facing direction to simulate geometric detail without extra polygons.',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'You notice that textures on your imported asset look blurry in the game engine despite being high-resolution in Substance 3D Painter. How do you troubleshoot this?',
      guidancePoints: [
        'Check the texture import settings in the engine — compression format and mipmap settings can reduce quality.',
        'Verify that the texture resolution matches the expected output (e.g., 2048×2048 not downscaled to 512).',
        'Inspect the UV layout for excessive island scaling that causes low effective texel density.',
        'Check if the engine is applying runtime texture compression (BC7 vs ASTC) that degrades quality.',
        'Compare the Substance 3D Painter viewport render with the engine to identify pipeline-specific differences.',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'A client requests a realistic medieval sword but provides only a written description with no reference images. How do you approach this?',
      guidancePoints: [
        'Research historical medieval swords to understand period-accurate proportions, materials, and construction.',
        'Gather reference images from museums, historical archives, and 3D art communities.',
        'Create a mood board and concept sketch to present to the client for approval before modeling begins.',
        'Establish a checkpoint after the blocking phase to confirm silhouette and proportions with the client.',
        'Document all approved references and feedback to prevent scope changes later.',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'Describe how you would present a portfolio piece to a potential employer, explaining both the artistic and technical decisions behind it.',
      guidancePoints: [
        'Lead with the final render to capture attention, then walk through the production process.',
        'Explain the polygon budget and why specific topology decisions were made.',
        'Show UV layouts and texture maps to demonstrate technical competence.',
        'Discuss challenges encountered and how they were solved — this shows problem-solving ability.',
        'Tailor the presentation to the employer\'s focus (game studio vs. film vs. archviz).',
      ],
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'What is the difference between baking a normal map from a cage versus ray projection, and when would you choose each method?',
      guidancePoints: [
        'Cage-based baking projects rays from an inflated cage mesh outward, capturing the nearest high-poly surface.',
        'Ray projection casts rays from the low-poly surface along its normals up to a maximum distance.',
        'Cage baking is preferred for complex overlapping geometry where ray direction matters.',
        'Ray projection is simpler and works well for convex, non-overlapping assets.',
        'Explain that cage setup requires manual adjustment but produces more predictable results for hard-surface models.',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'Your team is behind schedule and you need to texture 12 props in one week. How do you prioritize and maintain quality?',
      guidancePoints: [
        'Triage props by screen time — hero assets get full detail; background props can share material atlases.',
        'Create a reusable base material in Substance 3D Painter that can be cloned and modified for each prop.',
        'Use generators and smart masks aggressively for weathering instead of hand-painting every detail.',
        'Set a time budget per asset (e.g., 2 hours for props, 4 hours for hero assets) and track progress daily.',
        'Communicate the trade-offs to the art director early — reduced texture resolution on background props is better than missed deadlines.',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'How do you decide the appropriate polygon budget for an asset? What factors influence this decision?',
      guidancePoints: [
        'Identify the target platform (mobile, console, PC) and its rendering capabilities.',
        'Consider the asset\'s role in the scene — hero props warrant more polygons than background clutter.',
        'Evaluate the asset\'s silhouette complexity — curved forms need more polygons to hold a smooth silhouette.',
        'Account for LOD requirements — the closest LOD level determines the maximum polygon count.',
        'Reference engine-specific guidelines (Unreal\'s recommended triangle counts per scene, Unity\'s mobile budgets).',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'You discover that an asset you delivered two sprints ago has a UV mapping error that causes texture stretching. How do you handle this?',
      guidancePoints: [
        'Own the mistake immediately — inform the team lead and the person who discovered the issue.',
        'Assess the severity: is the asset visible to the player, or is it in a non-critical area?',
        'Fix the UV mapping in Blender, re-bake or re-export affected textures, and re-import into the engine.',
        'Deliver the corrected asset with a changelog documenting what was fixed and why it was missed.',
        'Propose a UV validation step in the export checklist to catch this class of error in future deliveries.',
      ],
    },

  ]
  ,
}
