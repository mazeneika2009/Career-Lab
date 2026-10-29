import type { CareerDef } from '../framework.js'

export const gameDeveloper: CareerDef = {
  slug: 'game-developer',
  name: 'Game Developer',
  category: 'Development',
  order: 47,
  description:
    'Programmes games in Unity, Unreal and Godot with C#/C++ — physics, input, UI, audio, optimization, shipping.',
  difficulty: 'Intermediate',
  pathSummary:
    'Game Developers begin with C#/C++ fundamentals and engine project setup, progress through physics, input handling and core gameplay loops, advance to UI systems, audio integration and scene management, and culminate in profiling, optimization and shipping builds to target platforms.',
  mainSkills: [
    'C# scripting in Unity',
    'C++ gameplay programming in Unreal Engine',
    'GDScript and scene design in Godot',
    'Physics and collision systems',
    'Player input and controller mapping',
    'Game UI and HUD implementation',
    'Audio systems and spatial sound',
    'Profiling, optimization and platform builds',
  ],
  sourcePlatforms: [
    'Unity Documentation',
    'Unreal Engine Documentation',
    'Godot Documentation',
    'C# Documentation',
    'C++ Documentation',
  ],
  companyName: 'Ironclad Interactive',
  roleTitle: 'Game Developer',

  chapters: [
    {
      slug: 'engine-and-language-fundamentals',
      stage: 'Beginner',
      title: 'Engine & Language Fundamentals',
      description:
        'Set up projects in Unity, Unreal and Godot while learning the C#/C++ foundations that power game logic.',
      topics: [
        {
          slug: 'csharp-for-games',
          title: 'C# Essentials for Game Scripting',
          minutes: 28,
          objectives: [
            'Write and compile C# scripts with correct class inheritance and method signatures.',
            'Use variables, conditionals, loops and collections to model game state.',
            'Apply encapsulation, LINQ basics and async patterns relevant to game development.',
          ],
          sections: [
            {
              heading: 'Classes, Inheritance and MonoBehaviour',
              body: 'Unity game logic lives in MonoBehaviours — components attached to GameObjects. You inherit from MonoBehaviour, define fields as serialized properties, and hook into lifecycle methods like Start, Update and OnDestroy. Understanding this inheritance model is essential before writing any gameplay code, because every script you attach participates in a component-based architecture.',
            },
            {
              heading: 'Variables, Types and Collections',
              body: 'Game state is held in fields — health, score, inventory. C# provides value types (int, float, bool) and reference types (string, arrays, Lists). Dictionaries map unique keys to values for loot tables or config lookups. Choosing the right collection affects iteration speed, which matters when you loop over entities every frame.',
            },
            {
              heading: 'Encapsulation and Patterns',
              body: 'Private fields with public properties enforce invariants — you cannot set health below zero through a setter guard. Interfaces define contracts for interactables, IDamageable or ICollectable. Early use of these patterns prevents the tangled spaghetti that derails projects as scope grows.',
            },
          ],
          links: [
            {
              title: 'C# Programming Guide',
              url: 'https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/',
              sourceName: 'C# Documentation',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Unity Scripting API — MonoBehaviour',
              url: 'https://docs.unity3d.com/ScriptReference/MonoBehaviour.html',
              sourceName: 'Unity Documentation',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Godot — C# Basics',
              url: 'https://docs.godotengine.org/en/stable/tutorials/scripting/c_sharp/c_sharp_basics.html',
              sourceName: 'Godot Documentation',
              resourceType: 'tutorial',
              relationship: 'secondary',
            },
          ],
          quiz: {
            prompt: 'In Unity, which base class must a script inherit from to be attachable as a component?',
            options: [
              'GameObject',
              'MonoBehaviour',
              'ScriptableObject',
              'Transform',
            ],
            answerIndex: 1,
            explanation:
              'MonoBehaviour is the base class for components that attach to GameObjects and participate in the Unity lifecycle (Start, Update, etc.).',
          },
        },
        {
          slug: 'cpp-for-unreal',
          title: 'C++ in Unreal Engine',
          minutes: 30,
          objectives: [
            'Set up an Unreal Engine C++ project and compile from source or the launcher.',
            'Use UPROPERTY, UFUNCTION and UCLASS macros to expose types to the editor and reflection system.',
            'Implement basic actor logic with BeginPlay, Tick and collision delegates.',
          ],
          sections: [
            {
              heading: 'UE Project Setup and Compilation',
              body: 'Unreal projects compile through the engine build tool (UnrealBuildTool). You create C++ classes from the editor or a template, which generates .h and .cpp files alongside a .Build.cs module file. The hot-reload cycle lets you iterate without fully restarting the editor, but understanding the build dependency graph prevents mysterious compile errors.',
            },
            {
              heading: 'Reflection Macros — UPROPERTY, UFUNCTION, UCLASS',
              body: 'The Unreal Header Tool (UHT) scans your C++ code for U-macros and generates reflection metadata. UPROPERTY(EditAnywhere) exposes a field to the Details panel. UFUNCTION(BlueprintCallable) lets Blueprints call your C++ function. Without these macros the editor cannot see your code, which is the most common confusion for developers coming from standard C++.',
            },
            {
              heading: 'Actors, Components and Delegates',
              body: 'An AActor is any object placed in the world — a character, light or trigger volume. UActorComponents add reusable behavior (health, inventory) without inheritance. Delegates are typed callbacks: OnComponentHit fires when collision occurs. Composition over inheritance is Unreals core architecture principle; favor attaching components to actors over deep class hierarchies.',
            },
          ],
          links: [
            {
              title: 'Unreal Engine C++ Programming Guide',
              url: 'https://docs.unrealengine.com/5.4/en-US/unreal-engine-cpp-programming-guide/',
              sourceName: 'Unreal Engine Documentation',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'C++ Core Guidelines',
              url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines',
              sourceName: 'C++ Documentation',
              resourceType: 'reference',
              relationship: 'supporting',
            },
            {
              title: 'Unreal Engine — Actors Overview',
              url: 'https://docs.unrealengine.com/5.4/en-US/actors-in-unreal-engine/',
              sourceName: 'Unreal Engine Documentation',
              resourceType: 'documentation',
              relationship: 'primary',
            },
          ],
          quiz: {
            prompt: 'Which Unreal macro marks a C++ function as callable from Blueprints?',
            options: [
              'UCLASS',
              'UPROPERTY',
              'UFUNCTION(BlueprintCallable)',
              'GENERATED_BODY',
            ],
            answerIndex: 2,
            explanation:
              'UFUNCTION(BlueprintCallable) exposes a C++ function to the Blueprint editor through the reflection system.',
          },
        },
        {
          slug: 'godot-scene-and-nodes',
          title: 'Godot Scenes, Nodes and GDScript',
          minutes: 27,
          objectives: [
            'Create a Godot project and understand the scene-tree hierarchy.',
            'Write GDScript functions using signals for inter-node communication.',
            'Attach scripts to nodes and differentiate _ready from _process.',
          ],
          sections: [
            {
              heading: 'The Scene Tree Architecture',
              body: 'Everything in Godot is a scene — a tree of nodes. A CharacterBody2D might contain a Sprite2D, CollisionShape2D and Camera2D as children. Scenes compose into larger scenes, which compose into the main game scene. This recursive composition is Godots answer to prefabs: you build reusable units and nest them.',
            },
            {
              heading: 'GDScript Basics and Signals',
              body: 'GDScript reads like Python with static typing hints. You declare variables with var or @export, write functions with func, and connect signals (Godots event system) to respond to node events. Signal.connect(callable) links a signal to a function; signals decouple nodes so the emitter does not need to know who listens.',
            },
            {
              heading: '_ready vs _process',
              body: '_ready runs once when the node enters the scene tree — use it for initialization. _process(delta) runs every frame — use it for continuous behavior like movement or animation. _physics_process(delta) runs at a fixed timestep, which is correct for physics calculations. Confusing these leads to frame-rate-dependent bugs.',
            },
          ],
          links: [
            {
              title: 'Godot — Your First 2D Game',
              url: 'https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html',
              sourceName: 'Godot Documentation',
              resourceType: 'tutorial',
              relationship: 'primary',
            },
            {
              title: 'Godot — GDScript Reference',
              url: 'https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html',
              sourceName: 'Godot Documentation',
              resourceType: 'reference',
              relationship: 'primary',
            },
            {
              title: 'Godot — Scene Tree and Nodes',
              url: 'https://docs.godotengine.org/en/stable/contributing/development/file_formats/tscn.html',
              sourceName: 'Godot Documentation',
              resourceType: 'documentation',
              relationship: 'secondary',
            },
          ],
          quiz: {
            prompt: 'In Godot, which lifecycle method runs once when a node enters the scene tree?',
            options: [
              '_process(delta)',
              '_ready()',
              '_physics_process(delta)',
              '_input(event)',
            ],
            answerIndex: 1,
            explanation:
              '_ready() is called once when the node is fully initialized and has entered the scene tree.',
          },
        },
      ],
    },
    {
      slug: 'physics-and-input',
      stage: 'Foundation',
      title: 'Physics, Collisions & Player Input',
      description:
        'Implement realistic motion, collision detection and responsive player controls across engines.',
      topics: [
        {
          slug: 'rigidbody-and-physics',
          title: 'Rigidbody Physics and Forces',
          minutes: 29,
          objectives: [
            'Configure rigidbodies, colliders and material properties in Unity or Unreal.',
            'Apply forces, impulses and torque to move objects realistically.',
            'Use fixed-timestep simulation to prevent frame-rate-dependent physics.',
          ],
          sections: [
            {
              heading: 'Rigidbodies and Colliders',
              body: 'A rigidbody tells the engine to simulate mass, gravity and velocity for an object. Colliders define the physical shape. In Unity, add a Rigidbody component and a BoxCollider. In Unreal, use a StaticMeshComponent with collision enabled and a PhysicsAsset. Without colliders, rigidbodies pass through everything — shapes and simulation are separate concerns.',
            },
            {
              heading: 'Forces, Impulses and Torque',
              body: 'AddForce pushes continuously (holding a thruster), while AddForceAtPosition or ApplyImpulse delivers an instant burst (an explosion). Torque rotates objects around their center of mass. Forces accumulate in FixedUpdate; applying them in Update produces inconsistent behavior because frame times vary.',
            },
            {
              heading: 'Fixed Timestep and Sub-stepping',
              body: 'Physics engines advance in fixed steps (commonly 0.02s = 50Hz). When the render frame is longer than the physics step, the engine catches up with sub-steps. This is why physics code belongs in FixedUpdate (Unity) or Tick (Unreal physics tick) — mixing frame-dependent logic into physics causes jitter and tunneling at low frame rates.',
            },
          ],
          links: [
            {
              title: 'Unity — Physics Manual',
              url: 'https://docs.unity3d.com/Manual/PhysicsOverview.html',
              sourceName: 'Unity Documentation',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — Physics Simulation',
              url: 'https://docs.unrealengine.com/5.4/en-US/physics-simulation-in-unreal-engine/',
              sourceName: 'Unreal Engine Documentation',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Godot — Using Rigid Bodies',
              url: 'https://docs.godotengine.org/en/stable/tutorials/physics/rigid_body.html',
              sourceName: 'Godot Documentation',
              resourceType: 'tutorial',
              relationship: 'secondary',
            },
          ],
          quiz: {
            prompt: 'In Unity, forces should be applied in which method to ensure physics consistency?',
            options: [
              'Update()',
              'FixedUpdate()',
              'LateUpdate()',
              'OnGUI()',
            ],
            answerIndex: 1,
            explanation:
              'FixedUpdate runs on the fixed physics timestep, ensuring force application is independent of frame rate.',
          },
        },
        {
          slug: 'collision-detection-and-responses',
          trigger: 'Collision Detection and Response',
          title: 'Collision Detection and Response',
          minutes: 28,
          objectives: [
            'Distinguish trigger and solid collisions across Unity and Unreal.',
            'Implement collision callbacks (OnCollisionEnter, OnHit) to react to impacts.',
            'Apply layers, tags and channel filtering to control what collides with what.',
          ],
          sections: [
            {
              heading: 'Triggers vs Solid Colliders',
              body: 'A trigger collider detects overlap without producing a physical response. In Unity, set isTrigger on a Collider and use OnTriggerEnter. In Unreal, set Generate Overlap Events. Solid colliders block movement and fire OnCollisionEnter / OnHit. Triggers are ideal for zones (pickup area, danger zone) where you detect presence, not resistance.',
            },
            {
              heading: 'Collision Callbacks',
              body: 'Callbacks give you the colliding object, contact points and impulse data. In Unity, OnCollisionEnter(Collision col) provides contact.normal and relativeVelocity. In Unreal, OnComponentHit gives the hit result with location, normal and bone name. Always null-check the other object — triggers fire for destroyed actors in the same frame.',
            },
            {
              heading: 'Layers and Channel Filtering',
              body: 'Physics layers let you define which groups interact. In Unity, the Physics Layer Collision Matrix disables collisions between specific layers — enemy bullets ignore other enemies. In Unreal, collision presets define channel responses. This is essential for performance and gameplay correctness in scenes with hundreds of objects.',
            },
          ],
          links: [
            {
              title: 'Unity — Collider Interaction States',
              url: 'https://docs.unity3d.com/Manual/ColliderInteraction.html',
              sourceName: 'Unity Documentation',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — Collision Overview',
              url: 'https://docs.unrealengine.com/5.4/en-US/collision-overview/',
              sourceName: 'Unreal Engine Documentation',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Godot — Physics Layers and Masks',
              url: 'https://docs.godotengine.org/en/stable/tutorials/physics/physics_introduction.html',
              sourceName: 'Godot Documentation',
              resourceType: 'tutorial',
              relationship: 'secondary',
            },
          ],
          quiz: {
            prompt: 'What happens when two solid colliders in Unity overlap?',
            options: [
              'Nothing — they pass through',
              'Unity fires OnTriggerEnter',
              'Unity fires OnCollisionEnter and applies a physical response',
              'The scene reloads',
            ],
            answerIndex: 2,
            explanation:
              'Solid (non-trigger) colliders produce a physical response and fire OnCollisionEnter so you can react programmatically.',
          },
        },
        {
          slug: 'player-input-systems',
          title: 'Player Input and Controller Mapping',
          minutes: 26,
          objectives: [
            'Read keyboard, mouse and gamepad input using the appropriate engine API.',
            'Map actions to bindings using an input action map rather than raw key checks.',
            'Implement buffered input for responsive but forgiving controls.',
          ],
          sections: [
            {
              heading: 'Raw Input vs Action Maps',
              body: 'Checking Input.GetKeyDown(KeyCode.W) works for prototyping but fails when you need rebinding or gamepad support. Action maps (Unity Input System, Unreal Enhanced Input, Godot InputMap) define named actions like Move and Fire, bound to physical inputs. The action map abstracts hardware, enabling rebinding, multiple device support and axis vs button distinction in one layer.',
            },
            {
              heading: 'Axis, Buttons and Dead Zones',
              body: 'Movement axes return float values from -1 to 1. A dead zone (commonly 0.1-0.2) filters stick drift. Buttons are digital: pressed or not. In the Input System, composite bindings combine two axes into a Vector2 for directional movement. Without a dead zone, characters drift on worn controllers.',
            },
            {
              heading: 'Input Buffering for Game Feel',
              body: 'Players press jump a few frames before landing. If you only check input on the exact frame of landing, the press is lost and the game feels unresponsive. An input buffer stores recent inputs for a configurable window (typically 6-10 frames). When the action becomes valid, the buffered input triggers immediately. This is the difference between tight and frustrating platformer feel.',
            },
          ],
          links: [
            {
              title: 'Unity — Input System Package',
              url: 'https://docs.unity3d.com/Packages/com.unity.inputsystem@1.7/manual/index.html',
              sourceName: 'Unity Documentation',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — Enhanced Input',
              url: 'https://docs.unrealengine.com/5.4/en-US/enhanced-input-in-unreal-engine/',
              sourceName: 'Unreal Engine Documentation',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Godot — Input Events',
              url: 'https://docs.godotengine.org/en/stable/tutorials/inputs/inputevent.html',
              sourceName: 'Godot Documentation',
              resourceType: 'tutorial',
              relationship: 'secondary',
            },
          ],
          quiz: {
            prompt: 'Why is a dead zone used on a gamepad analog stick?',
            options: [
              'To make the stick feel heavier',
              'To filter stick drift and small unintended inputs',
              'To increase the maximum speed of movement',
              'To reduce the polling rate of the controller',
            ],
            answerIndex: 1,
            explanation:
              'A dead zone ignores input values below a threshold, filtering minor stick drift that causes unwanted character movement.',
          },
        },
      ],
    },
    {
      slug: 'ui-audio-and-scene-management',
      stage: 'Intermediate',
      title: 'UI Systems, Audio & Scene Management',
      description:
        'Build responsive game interfaces, integrate spatial audio and manage scene transitions cleanly.',
      topics: [
        {
          slug: 'game-ui-and-hud',
          title: 'Game UI and HUD Implementation',
          minutes: 30,
          objectives: [
            'Build a heads-up display showing health, score and minimap using Canvas or UMG.',
            'Implement pausable menus with proper input isolation.',
            'Use responsive layouts that adapt to multiple resolutions and aspect ratios.',
          ],
          sections: [
            {
              heading: 'HUD and Canvas Architecture',
              body: 'A HUD overlays gameplay information — health bars, ammo counts, minimaps. In Unity, a Screen Space Canvas renders UI on top of the camera. In Unreal, Widget Blueprints in UMG serve the same role. Keep the HUD thin: it reads game state, it never writes it. Direct coupling between UI widgets and gameplay systems creates brittle, untestable code.',
            },
            {
              heading: 'Menus and Input Isolation',
              body: 'When a pause menu opens, gameplay input must stop and menu input begin. In Unity, use Time.timeScale = 0 to pause physics while your menu canvas listens on a separate input action map. In Unreal, SetGamePaused stops ticking while the menu widget captures focus. Failing to isolate inputs means players can shoot while navigating options.',
            },
            {
              heading: 'Responsive UI Layouts',
              body: 'Games run on ultrawide monitors, 4K TVs and handheld screens. Use anchor-based layouts (Unity RectTransform anchors, Unreal size boxes) so elements reposition relative to screen edges. Set a reference resolution and use scale factors. Test at 720p and 4K before shipping — broken UIs are the first thing players screenshot and share.',
            },
          ],
          links: [
            {
              title: 'Unity — UI Toolkit Manual',
              url: 'https://docs.unity3d.com/Manual/UIElements.html',
              sourceName: 'Unity Documentation',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — UMG UI Designer',
              url: 'https://docs.unrealengine.com/5.4/en-US/unreal-motion-graphics-ui-designer/',
              sourceName: 'Unreal Engine Documentation',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Godot — GUI Nodes and Controls',
              url: 'https://docs.godotengine.org/en/stable/tutorials/ui/index.html',
              sourceName: 'Godot Documentation',
              resourceType: 'tutorial',
              relationship: 'secondary',
            },
          ],
          quiz: {
            prompt: 'In Unity, which property pauses UI-independent gameplay animation while a menu is open?',
            options: [
              'Time.deltaTime',
              'Time.timeScale = 0',
              'Application.targetFrameRate',
              'RenderSettings.fog',
            ],
            answerIndex: 1,
            explanation:
              'Setting Time.timeScale to 0 pauses time-dependent operations (Update with deltaTime) while your menu runs on an unaffected input layer.',
          },
        },
        {
          slug: 'audio-systems',
          title: 'Audio Systems and Spatial Sound',
          minutes: 28,
          objectives: [
            'Load, play and manage sound effects with pooling to avoid garbage spikes.',
            'Configure spatial audio with attenuation curves and doppler for 3D sources.',
            'Implement a layered music system with crossfading between states.',
          ],
          sections: [
            {
              heading: 'Audio Sources and Pooling',
              body: 'Every sound plays through an audio source. Creating and destroying sources per gunshot causes garbage collection spikes. Instead, pre-instantiate a pool of sources and recycle them. In Unity, AudioSource.PlayClipAtPoint is convenient but unpoolable — write a small AudioManager with a queue of idle sources. In Unreal, Audio Components can be pooled on an Actor.',
            },
            {
              heading: 'Spatial Audio and Attenuation',
              body: '3D spatial sound places audio in world space. Attenuation curves define volume falloff over distance — linear, logarithmic or custom. Doppler shifts pitch as the source moves relative to the listener. In Unity, set the Spatial Blend to 1 (full 3D) and configure the rolloff. In Unreal, Attenuation Settings on the Sound Cue control the same behavior.',
            },
            {
              heading: 'Layered Music and Crossfading',
              body: 'Dynamic music layers intensity based on gameplay — exploration music gains percussion during combat. Implement this by stacking AudioSources for each layer and tweening their volumes. Crossfading between states requires stopping the outgoing track only after the incoming track has faded in. A coroutine or timeline handles the timing without blocking gameplay.',
            },
          ],
          links: [
            {
              title: 'Unity — Audio Source Manual',
              url: 'https://docs.unity3d.com/Manual/class-AudioSource.html',
              sourceName: 'Unity Documentation',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — Audio System',
              url: 'https://docs.unrealengine.com/5.4/en-US/sound-concepts-and-architecture-in-unreal-engine/',
              sourceName: 'Unreal Engine Documentation',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Godot — Audio Bus Layout',
              url: 'https://docs.godotengine.org/en/stable/tutorials/audio/buses.html',
              sourceName: 'Godot Documentation',
              resourceType: 'tutorial',
              relationship: 'secondary',
            },
          ],
          quiz: {
            prompt: 'Why should audio sources be pooled instead of instantiated per sound effect?',
            options: [
              'Pooled sources sound better quality',
              'Creating and destroying sources per trigger causes garbage collection spikes and frame hitches',
              'Pooled sources use less disk space',
              'Audio sources cannot be recycled in game engines',
            ],
            answerIndex: 1,
            explanation:
              'Frequent instantiation and destruction of audio sources triggers garbage collection pauses, which manifest as audible frame hitches.',
          },
        },
        {
          slug: 'scene-management-transitions',
          title: 'Scene Management and Transitions',
          minutes: 27,
          objectives: [
            'Load and unload scenes additively to manage memory efficiently.',
            'Implement loading screens with progress indication for large scenes.',
            'Use DontDestroyOnLoad or persistent nodes for cross-scene managers.',
          ],
          sections: [
            {
              heading: 'Additive Scene Loading',
              body: 'Loading a scene additively stacks it on top of existing scenes — useful for loading a game level while keeping a HUD scene alive. In Unity, SceneManager.LoadScene(path, LoadSceneMode.Additive) loads without destroying current content. In Unreal, LoadStreamLevel handles level streaming. Additive loading avoids the black-screen hitch of full scene replacement.',
            },
            {
              heading: 'Loading Screens and Progress',
              body: 'Loading screens mask scene load time and show progress. Track AsyncOperation.progress in Unity or use loading callbacks in Unreal to update a progress bar. Avoid blocking the main thread during loads — async loading keeps the UI responsive. For large open worlds, combine loading screens with level streaming for seamless transitions.',
            },
            {
              heading: 'Persistent Managers and Scene Lifetime',
              body: 'Some objects must survive scene changes: audio managers, save systems, network managers. In Unity, DontDestroyOnLoad marks a root object as persistent. In Unreal, an instance subsystem or GameInstance serves the same role. Be deliberate — too many persistent objects cause memory leaks and stale references across scenes.',
            },
          ],
          links: [
            {
              title: 'Unity — Scene Management',
              url: 'https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.html',
              sourceName: 'Unity Documentation',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — Level Streaming',
              url: 'https://docs.unrealengine.com/5.4/en-US/level-streaming-in-unreal-engine/',
              sourceName: 'Unreal Engine Documentation',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Godot — Scene Tree and Main Loop',
              url: 'https://docs.godotengine.org/en/stable/tutorials/scripting/scene_tree.html',
              sourceName: 'Godot Documentation',
              resourceType: 'tutorial',
              relationship: 'secondary',
            },
          ],
          quiz: {
            prompt: 'What is the primary benefit of additive scene loading over replacing scenes entirely?',
            options: [
              'It uses less RAM',
              'It keeps existing scenes alive, enabling overlapping content like HUDs and gameplay',
              'It compiles faster',
              'It avoids using scripts entirely',
            ],
            answerIndex: 1,
            explanation:
              'Additive loading keeps current scenes active while new ones load on top, eliminating the black-screen gap and enabling layered architecture.',
          },
        },
      ],
    },
    {
      slug: 'optimization-shipping',
      stage: 'Advanced',
      title: 'Profiling, Optimization & Shipping',
      description:
        'Profile performance, optimize assets and memory, and build release candidates for target platforms.',
      topics: [
        {
          slug: 'profiling-and-performance',
          title: 'Profiling and Performance Analysis',
          minutes: 29,
          objectives: [
            'Use the Unity Profiler and Unreal Insights to identify CPU and GPU bottlenecks.',
            'Interpret frame timing graphs to distinguish CPU-bound from GPU-bound issues.',
            'Apply draw-call batching, LOD systems and object pooling to reduce overhead.',
          ],
          sections: [
            {
              heading: 'CPU vs GPU Profiling',
              body: 'A low frame rate has two root causes: the CPU cannot prepare frames fast enough (CPU-bound) or the GPU cannot render them (GPU-bound). Unity Profiler shows CPU time per category (scripts, physics, rendering). Unreal Insights tracks GPU draw calls and shader complexity. Knowing which side is slow determines whether you optimize code or visuals.',
            },
            {
              heading: 'Draw Calls and Batching',
              body: 'Every unique material on a mesh is a separate draw call. A scene with 500 unbatched objects sends 500 draw calls to the GPU. Dynamic batching merges small meshes sharing the same material at runtime. Static batching combines non-moving objects at build time. GPU Instancing draws thousands of identical meshes in one call. These techniques can turn a 200 FPS scene into a 5 FPS scene without them.',
            },
            {
              heading: 'Object Pooling and Garbage Collection',
              body: 'Instantiating and destroying objects (bullets, particles) triggers garbage collection pauses. Object pooling pre-creates a set and recycles them — deactivated objects are hidden, not destroyed. In Unity, use a Queue<GameObject> of inactive bullets. In Unreal, a TArray with Activate/Deactivate avoids UObject garbage collection overhead entirely.',
            },
          ],
          links: [
            {
              title: 'Unity — Profiler Overview',
              url: 'https://docs.unity3d.com/Manual/ProfilerOverview.html',
              sourceName: 'Unity Documentation',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — Profiling Tools',
              url: 'https://docs.unrealengine.com/5.4/en-US/profiling-tools-in-unreal-engine/',
              sourceName: 'Unreal Engine Documentation',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'C# — Performance Tips',
              url: 'https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/performance',
              sourceName: 'C# Documentation',
              resourceType: 'guide',
              relationship: 'supporting',
            },
          ],
          quiz: {
            prompt: 'If the GPU frame time is high but CPU frame time is low, the game is…',
            options: [
              'CPU-bound',
              'GPU-bound',
              'Memory-bound',
              'Network-bound',
            ],
            answerIndex: 1,
            explanation:
              'When GPU time exceeds CPU time, the graphics pipeline is the bottleneck — the CPU finishes preparing the frame faster than the GPU can render it.',
          },
        },
        {
          slug: 'asset-optimization',
          title: 'Asset Optimization and Memory',
          minutes: 30,
          objectives: [
            'Configure texture compression formats per platform (ASTC, BC7, ETC2).',
            'Set up level-of-detail meshes and occlusion culling to reduce polygon count.',
            'Audit memory budgets and eliminate leaks using engine memory tools.',
          ],
          sections: [
            {
              heading: 'Texture Compression Formats',
              body: 'Textures consume the most GPU memory. ASTC is the modern mobile standard (flexible block sizes). BC7 offers high quality on desktop. ETC2 is a fallback for older Android devices. Choosing the wrong format either wastes memory (uncompressed) or shows visible artifacts (over-compressed). Per-platform override in the import settings handles this without duplicates.',
            },
            {
              heading: 'LOD and Occlusion Culling',
              body: 'Level-of-detail (LOD) meshes swap in lower-poly versions at distance. Three to four LOD levels per asset is typical. The engine fades between them at distance thresholds. Occlusion culling skips rendering objects hidden behind walls. Unity uses Umbra; Unreal uses hardware occlusion queries. Together, LOD and culling can reduce triangle throughput by 60-80% in dense scenes.',
            },
            {
              heading: 'Memory Budgets and Leak Detection',
              body: 'Consoles have hard memory limits (PS5: 16 GB unified). Even PC games should target a budget per category: 2 GB textures, 1 GB audio, 512 MB meshes. Unity Profiler Memory tab and Unreal Memory Insights show allocations by type. Track object counts over time — a steadily rising count indicates a leak. Fix leaks before shipping; they cause crashes hours into a play session.',
            },
          ],
          links: [
            {
              title: 'Unity — Texture Import Settings',
              url: 'https://docs.unity3d.com/Manual/class-TextureImporter.html',
              sourceName: 'Unity Documentation',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — Static Mesh LOD',
              url: 'https://docs.unrealengine.com/5.4/en-US/static-mesh-lod-group/',
              sourceName: 'Unreal Engine Documentation',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Godot — Optimization Guide',
              url: 'https://docs.godotengine.org/en/stable/tutorials/performance/index.html',
              sourceName: 'Godot Documentation',
              resourceType: 'guide',
              relationship: 'secondary',
            },
          ],
          quiz: {
            prompt: 'Which texture format is generally recommended for modern mobile game deployment?',
            options: [
              'BMP',
              'ASTC',
              'PNG uncompressed in VRAM',
              'TIFF',
            ],
            answerIndex: 1,
            explanation:
              'ASTC provides the best balance of quality and memory efficiency on modern mobile GPUs with flexible block sizes for different content.',
          },
        },
        {
          slug: 'shipping-and-builds',
          title: 'Shipping Builds and Platform Deployment',
          minutes: 28,
          objectives: [
            'Configure release build settings with symbol stripping and IL2CPP or C++ shipping targets.',
            'Set up automated CI builds for Windows, Mac, Linux and consoles.',
            'Prepare store listings, certificates, and submission packages correctly.',
          ],
          sections: [
            {
              heading: 'Build Configurations',
              body: 'Debug builds include profilers, symbols and development console access. Release builds strip these out and enable full optimization. In Unity, switch to IL2CPP backend for AOT compilation on consoles and mobile. In Unreal, set the build configuration to Shipping and disable logging. Shipping builds are smaller, faster and do not expose debug tools to players.',
            },
            {
              heading: 'CI/CD for Game Builds',
              body: 'Manual builds are error-prone and slow. Jenkins, GitHub Actions or GitLab CI can trigger builds on every merge. Unity Cloud Build or Unreal BuildGraph automates multi-platform builds. Store build artifacts with version stamps. A CI pipeline that produces Windows, Mac and Linux builds on every commit prevents the nightmare of discovering platform-specific bugs days before launch.',
            },
            {
              heading: 'Store Submission and Certifications',
              body: 'Steam requires a build manifest and depot configuration. PlayStation and Nintendo have technical requirements lists (TRCs/XR) covering error handling, save data and parental controls. Apple and Google require privacy manifests and SDK versions. Each platform has a submission checklist — violating one delays your launch by weeks. Start the submission process early and budget time for certification failures.',
            },
          ],
          links: [
            {
              title: 'Unity — Build Player Settings',
              url: 'https://docs.unity3d.com/Manual/class-PlayerSettings.html',
              sourceName: 'Unity Documentation',
              resourceType: 'documentation',
              relationship: 'primary',
            },
            {
              title: 'Unreal Engine — Packaging and Shipping',
              url: 'https://docs.unrealengine.com/5.4/en-US/packaging-your-project/',
              sourceName: 'Unreal Engine Documentation',
              resourceType: 'guide',
              relationship: 'primary',
            },
            {
              title: 'Godot — Exporting for Multiple Platforms',
              url: 'https://docs.godotengine.org/en/stable/tutorials/export/index.html',
              sourceName: 'Godot Documentation',
              resourceType: 'tutorial',
              relationship: 'secondary',
            },
          ],
          quiz: {
            prompt: 'Why use IL2CPP instead of Mono for a console release build?',
            options: [
              'IL2CPP generates better graphics',
              'IL2CPP compiles C# to C++ then to native code, enabling ahead-of-time compilation required by consoles',
              'IL2CPP is faster to compile during development',
              'Mono supports more platforms than IL2CPP',
            ],
            answerIndex: 1,
            explanation:
              'Consoles require AOT compilation; IL2CPP transpiles C# to C++ which is then compiled to native code, meeting platform certification requirements.',
          },
        },
      ],
    },
  ],

  practicalExam: {
    title: '2D Platformer Core Mechanics Build',
    coverage: [
      'Player Movement and Input',
      'Physics and Collision',
      'UI and HUD',
      'Scene Transitions',
      'Performance Considerations',
    ],
    brief:
      'Implement a 2D platformer prototype with character movement, jump with buffer window, collision with platforms and hazards, a health-based HUD with pause menu, and a scene transition from a title screen to gameplay. The build must run at 60 FPS on mid-range hardware without frame drops.',
    requirements: [
      'Player controller with horizontal movement, jump, coyote time and input buffering',
      'Platform and hazard collision with damage response',
      'HUD displaying health, score and current level name',
      'Pause menu that stops gameplay input while remaining navigable',
      'Title-to-gameplay scene transition with a loading indicator',
      'Object pooling for hazard respawns to avoid GC allocation spikes',
    ],
    expectedOutput:
      'A playable build with annotated source explaining the architecture, physics decisions, UI layout approach and performance considerations.',
    rubric: [
      { skill: 'Input and Movement', weight: 25, criteria: 'Responsive controls with buffering and coyote time; no frame-rate dependence' },
      { skill: 'Physics and Collision', weight: 25, criteria: 'Correct collision response, layer filtering, and no tunneling at high speed' },
      { skill: 'UI and Menus', weight: 20, criteria: 'Functional HUD, pause input isolation, responsive layout' },
      { skill: 'Scene Management', weight: 15, criteria: 'Clean transitions, persistent managers, no leaked references' },
      { skill: 'Performance Awareness', weight: 15, criteria: 'Object pooling used, no GC spikes, stable frame timing' },
    ],
    passScore: 70,
  },

  assignments: [
    {
      title: 'Physics Playground Prototype',
      stage: 'Foundation',
      objective:
        'Build an interactive physics sandbox demonstrating rigidbody forces, collisions and trigger zones.',
      requirements: [
        'Spawn and throw objects with variable force on click',
        'At least two colliders interacting (floor and walls)',
        'A trigger zone that changes object color or destroys on enter',
        'Fixed timestep used correctly for all physics calls',
      ],
      skillsEvaluated: [
        'Rigidbody Physics',
        'Collision Callbacks',
        'Input Handling',
        'FixedUpdate Usage',
      ],
      dueDays: 14,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions:
          'Submit your project with a written walkthrough covering force application, collision setup and trigger behavior. Include screenshots or a short video demonstrating the physics interactions.',
        textLabel: 'Physics playground walkthrough',
        minTextLength: 900,
      },
    },
    {
      title: 'In-Game Shop UI System',
      stage: 'Intermediate',
      objective:
        'Design and implement a functional in-game shop with item browsing, purchase logic and a currency HUD.',
      requirements: [
        'Shop panel with item list, prices and buy buttons',
        'Currency tracked in a HUD that updates on purchase',
        'Duplicate purchase prevention (insufficient funds message)',
        'Keyboard and gamepad navigation within the shop',
        'Responsive layout that works at 720p and 1080p',
      ],
      skillsEvaluated: [
        'Game UI',
        'Input Isolation',
        'State Management',
        'Responsive Design',
      ],
      dueDays: 21,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions:
          'Describe your UI architecture, input routing, state flow between shop and HUD, and how you tested responsiveness across resolutions.',
        textLabel: 'Shop UI engineering notes',
        minTextLength: 1100,
      },
    },
    {
      title: 'Audio Manager with Spatial Sound',
      stage: 'Advanced',
      objective:
        'Build a reusable audio manager that handles pooled sound effects, spatial 3D audio and layered background music.',
      requirements: [
        'AudioManager singleton with pooled AudioSource objects',
        'Spatial sound on at least two 3D-positioned sources',
        'Layered music system with crossfade between exploration and combat states',
        'Master volume, SFX volume and music volume controls in a settings UI',
      ],
      skillsEvaluated: [
        'Audio Systems',
        'Object Pooling',
        'Spatial Audio',
        'Singleton Architecture',
      ],
      dueDays: 28,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions:
          'Submit your AudioManager implementation with architecture notes covering pooling strategy, attenuation setup and crossfade timing logic.',
        textLabel: 'Audio manager documentation',
        minTextLength: 1000,
        linkLabels: ['Audio attenuation configuration screenshots'],
      },
    },
  ],

  simTasks: [
    {
      title: 'Player reports invisible wall bug',
      context:
        'QA reports the player character passes through a wall at high velocity but collides normally at walking speed.',
      requirements: [
        'Identify the cause as collider tunneling',
        'Specify the fix: continuous collision detection or reduced timestep',
        'List regression test scenarios',
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput:
        'Bug report with root cause, proposed fix and test matrix covering velocity thresholds.',
      skills: [
        'Physics',
        'Debugging',
        'QA Methodology',
      ],
    },
    {
      title: 'Add a minimap to the HUD',
      context:
        'The game director wants a minimap showing enemy positions and the player marker for the next sprint. Art provides the assets.',
      requirements: [
        'Plan the rendering approach (camera render texture or UI canvas overlay)',
        'Define update frequency and performance budget',
        'Specify how the minimap handles fog of war or hidden areas',
      ],
      priority: 'high',
      dueDayOffset: 4,
      expectedOutput:
        'Implementation plan covering rendering method, performance considerations and data source.',
      skills: [
        'UI Systems',
        'Performance Budgeting',
        'Technical Planning',
      ],
    },
    {
      title: 'Cross-platform audio settings',
      context:
        'The game ships on PC and Switch. The Switch audio team reports that 3D spatial audio causes CPU spikes in dense combat scenes.',
      requirements: [
        'Audit which 3D sources can be downmixed to 2D',
        'Propose a LOD system for spatial audio distance',
        'Define a memory and CPU budget per platform',
      ],
      priority: 'normal',
      dueDayOffset: 7,
      expectedOutput:
        'Optimization proposal with platform-specific audio budgets and fallback strategies.',
      skills: [
        'Audio Systems',
        'Platform Optimization',
        'Cross-Platform Development',
      ],
    },
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Kai Brennan',
      personaRole: 'Technical Artist',
      situation:
        'The shader the artist created is too expensive on low-end GPUs and needs simplification.',
      openingMessage:
        'Hey — the new character shader uses five texture samples and a world-space noise function. On my test machine (GTX 1060) it drops below 30 FPS with 20 characters on screen. Can we simplify it? I can drop the noise if you think the visual hit is acceptable.',
      expectedPoints: [
        'Quantify the performance cost with profiling data',
        'Propose specific simplifications (reduce texture samples, replace noise with lookup)',
        'Suggest a LOD fallback for the shader on low-end hardware',
        'Keep the collaboration tone — artist input on visual trade-offs matters',
      ],
    },
    {
      kind: 'team',
      personaName: 'Priya Chakraborty',
      personaRole: 'Game Designer',
      situation:
        'The designer requests a major input change mid-playtesting cycle.',
      openingMessage:
        'Playtest feedback says the jump feels unresponsive. I want to add double-jump, wall-jump and dash. How much work is this? We have two weeks to the beta milestone. I know this is a lot — is it feasible or do we need to cut something?',
      expectedPoints: [
        'Assess scope honestly against the milestone deadline',
        'Break the features into independent pieces with effort estimates',
        'Suggest a prioritized phasing: what ships in beta vs post-beta',
        'Raise interaction complexity concerns if features conflict (dash + wall-jump edge cases)',
      ],
    },
    {
      kind: 'client',
      personaName: 'Marcus Webb',
      personaRole: 'Studio Director, NovaStar Publishing',
      situation:
        'The publisher requests a platform change for the release build.',
      openingMessage:
        'We want to add a Nintendo Switch port to the release. The dev kit arrives next month. What do you need from the team to support this, and what is the timeline impact on our October ship date?',
      expectedPoints: [
        'Outline technical requirements (performance targets, controller support, eShop requirements)',
        'Assess timeline impact honestly — Switch optimization and certification take time',
        'Suggest a feature parity vs scaled-back graphics approach',
        'Raise memory and storage constraints specific to the platform',
      ],
    },
    {
      kind: 'client',
      personaName: 'Elena Volkov',
      personaRole: 'Community Manager',
      situation:
        'Community reports audio cutting out during boss fights.',
      openingMessage:
        'Players are flooding the Discord with reports of all audio stopping when the second boss spawns. Some say it persists until restart. This is trending on Twitter — can you investigate urgently?',
      expectedPoints: [
        'Reproduce the issue with the reported conditions',
        'Check audio source pool exhaustion or channel limits',
        'Provide a hotfix estimate and interim workaround',
        'Communicate a status update timeline for the community',
      ],
    },
  ],

  workplaceScenarios: [
    {
      category: 'Technical issue',
      situation:
        'Friday evening: the latest nightly build crashes on startup for 30% of players. Crash reports point to a null reference in the new audio manager. The audio lead is out of office.',
      requiredActions: [
        {
          action: 'Reproduce the crash locally and check crash report signatures before reverting',
          good: true,
          note: 'Reproduction confirms the issue and narrows the fix scope.',
        },
        {
          action: 'Revert the audio manager commit to restore a stable build for weekend playtesters',
          good: true,
          note: 'Availability and playtesting continuity matter more than holding a broken feature.',
        },
        {
          action: 'Rebuild the audio manager without investigating the null reference',
          good: false,
          note: 'Rebuilding without understanding the root cause risks reintroducing the same bug.',
        },
        {
          action: 'File a detailed bug ticket with reproduction steps for the audio lead on Monday',
          good: true,
          note: 'Documenting context while it is fresh prevents lost investigation time.',
        },
      ],
    },
    {
      category: 'Requirement change',
      situation:
        'Three days before gold master, the producer wants to add a new enemy type that requires unique AI, animation and VFX — work estimated at two weeks.',
      requiredActions: [
        {
          action: 'Push back with a clear scope and risk analysis, offering alternatives',
          good: true,
          note: 'Professionals protect the schedule by making trade-offs visible.',
        },
        {
          action: 'Agree silently and work overtime to meet the deadline without telling anyone',
          good: false,
          note: 'Hidden heroism creates burnout and hides real project risk from stakeholders.',
        },
        {
          action: 'Propose a reduced version (palette swap with one new behavior) that ships on time',
          good: true,
          note: 'Finding a compromise that serves the goal without jeopardizing the milestone.',
        },
        {
          action: 'Get written sign-off from the producer that the change extends the timeline or cuts scope elsewhere',
          good: true,
          note: 'Accountability must be documented when scope changes near a milestone.',
        },
      ],
    },
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Explain the difference between Update and FixedUpdate. When would you use each?',
      guidancePoints: [
        'Update runs once per frame with variable delta — use for input polling and non-physics logic',
        'FixedUpdate runs on the physics timestep — use for forces and rigidbody manipulation',
        'Time.deltaTime vs Time.fixedDeltaTime and why mixing them causes frame-rate-dependent bugs',
      ],
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'What is object pooling and when is it essential rather than optional?',
      guidancePoints: [
        'Instantiate/Destroy triggers garbage collection spikes',
        'Pools pre-allocate and recycle objects — hiding, not destroying',
        'Essential for bullets, particles, audio sources and anything spawned frequently in gameplay',
        'Memory trade-off vs GC smoothness',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'Players report the game stutters every 30 seconds for exactly half a second. How do you diagnose this?',
      guidancePoints: [
        'Profile with CPU and GPU profilers to identify the spike source',
        'Check for garbage collection, resource loading, or periodic AI recalculation',
        'Use frame timing graphs to distinguish CPU-bound vs GPU-bound',
        'Look for correlation with gameplay events (enemy spawn, level chunk load)',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'A character passes through a thin wall when moving fast. What is happening and how do you fix it?',
      guidancePoints: [
        'Collider tunneling — the object moves through the wall in a single physics step',
        'Continuous collision detection (CCD) or swept volume checks',
        'Reducing the maximum velocity or increasing the physics substep rate',
        'Thickening the collider as a quick workaround',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'Your lead estimates the feature at one week. You believe it will take three. What do you do?',
      guidancePoints: [
        'Share your estimate with concrete reasoning, not just a different number',
        'Break the work into tasks and identify where the extra time comes from',
        'Propose a phased delivery meeting the earliest milestone',
        'Document the estimate for future calibration',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'When would you choose Unity over Unreal Engine for a new project?',
      guidancePoints: [
        'Unity excels at 2D, mobile, AR/VR and smaller teams with C# familiarity',
        'Unreal excels at AAA 3D visuals, large open worlds, and teams comfortable with C++',
        'Licensing costs, platform support and community ecosystem as factors',
        'Team expertise often outweighs theoretical engine superiority',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'Explain what draw calls are and why reducing them matters, to a non-technical producer.',
      guidancePoints: [
        'Use an analogy (orders to a kitchen, requests to a renderer)',
        'Explain that each draw call has overhead independent of what it draws',
        'Connect the performance impact to player experience (frame rate, smoothness)',
        'Avoid jargon like batching or instancing unless you explain them',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'You discover a critical bug in the final QA pass. The build ships in two hours. Communicate this to the team.',
      guidancePoints: [
        'State the severity and affected scope immediately',
        'Propose a fix with a time estimate and risk assessment',
        'Offer a decision: ship with a known workaround, delay the build, or patch post-launch',
        'Keep it concise — panic spreads through ambiguity',
      ],
    },

  ]
  ,
}
