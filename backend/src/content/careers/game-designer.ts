import type { CareerDef } from '../framework.js'

export const gameDesigner: CareerDef = {
  slug: 'game-designer',
  name: 'Game Designer',
  category: 'Creative',
  order: 48,
  description:
    'Designs play — mechanics, loops, levels, balancing, narrative and documentation tested with real players.',
  difficulty: 'Intermediate',
  pathSummary:
    'Game design theory and core loops → mechanics prototyping and systems thinking → level design and difficulty balancing → narrative integration, documentation and playtesting.',
  mainSkills: [
    'Core loop and progression design',
    'Mechanics prototyping and iteration',
    'Level design and spatial storytelling',
    'Difficulty balancing and tuning',
    'Game design documentation (GDD)',
    'Player psychology and motivation',
    'Playtesting and feedback analysis',
    'Narrative design for interactive systems',
  ],
  sourcePlatforms: [
    'Unity Documentation',
    'Unreal Engine Documentation',
    'Godot Documentation',
    'GDC Resources',
    'Official Engine Learning Resources',
  ],
  companyName: 'Axiom Interactive',
  roleTitle: 'Game Designer',

  chapters: [
    {
      slug: 'game-design-foundations',
      stage: 'Beginner',
      title: 'Game Design Foundations',
      description:
        'Establish a solid understanding of what game design is, why core loops matter, and how player psychology drives every design decision.',
      topics: [
        {
          slug: 'what-game-design-is',
          title: 'What Game Design Is',
          minutes: 25,
          objectives: [
            'Define game design as the craft of creating rules, systems and experiences that produce meaningful player engagement',
            'Distinguish game design from game development, programming and art',
            'Identify the key roles and responsibilities of a game designer on a development team',
          ],
          sections: [
            {
              heading: 'Game design as a discipline',
              body: 'Game design is the deliberate engineering of player experiences through rules, feedback loops, and meaningful choices. It is not the same as game development — a programmer implements what the designer specifies, and an artist brings the visual world to life. The designer asks the question "what should the player feel, think and do at every moment?" and then builds systems that make that happen.',
            },
            {
              heading: 'Roles on a design team',
              body: 'On larger teams, design roles specialise: systems designers balance numbers and mechanics, level designers shape spaces and encounters, narrative designers write branching dialogue and world lore, and UX designers ensure the interface communicates clearly. At indie studios, one person often fills several of these hats. GDC talks frequently emphasise that the unifying thread across all design roles is advocating for the player experience.',
            },
            {
              heading: 'The designer\'s toolkit',
              body: 'Game designers communicate through documents, prototypes and playtests more than code. A typical workflow begins with a concept document, moves to a prototype in Unity or Godot, then iterates through playtesting data. The most important tool is not software — it is the ability to observe players, interpret their behaviour, and refine the design accordingly.',
            },
          ],
          links: [
            { title: 'Introduction to game design', url: 'https://learn.unity.com/pathway/game-design', sourceName: 'Official Engine Learning Resources', resourceType: 'course', relationship: 'primary' },
            { title: 'What is game design?', url: 'https://dev.epicgames.com/documentation/en-us/ue5/what-is-game-design', sourceName: 'Unreal Engine Documentation', resourceType: 'article', relationship: 'supporting' },
            { title: 'The role of a game designer', url: 'https://www.gamedeveloper.com/design/what-does-a-game-designer-actually-do-', sourceName: 'GDC Resources', resourceType: 'article', relationship: 'supporting' },
          ],
          quiz: {
            prompt: 'Which of the following best describes the primary role of a game designer?',
            options: [
              'Writing production code for game engines',
              'Creating all visual assets and textures for a project',
              'Crafting rules, systems and experiences that engage players',
              'Managing the project budget and release schedule',
            ],
            answerIndex: 2,
            explanation:
              'A game designer focuses on the player experience — defining rules, mechanics, loops and systems that create engagement. Programming, art and production are separate roles that support the design vision.',
          },
        },
        {
          slug: 'core-loops-and-progression',
          title: 'Core Loops & Progression',
          minutes: 30,
          objectives: [
            'Define the core loop, meta loop and progression arc in a game design context',
            'Map a core loop for an existing game and identify how each action feeds the next',
            'Design a simple progression system with unlockable rewards and pacing gates',
          ],
          sections: [
            {
              heading: 'The anatomy of a core loop',
              body: 'The core loop is the fundamental cycle of actions a player repeats during gameplay. In a farming game the loop might be: plant seeds, water crops, harvest, sell, buy upgrades, repeat. Each beat of the loop must deliver its own small reward while also feeding a larger arc. If any step feels unrewarding or pointless, the entire loop collapses. Designers call this the "verb cycle" — every verb should either provide immediate feedback or contribute to meaningful progression.',
            },
            {
              heading: 'Meta loops and long-term motivation',
              body: 'While the core loop handles moment-to-moment play, the meta loop governs long-term engagement: seasonal events, unlockable content, skill trees and narrative milestones. Good meta loops give players aspirational goals that recontextualise the core loop. A player who has unlocked a new ability sees familiar encounters differently. GDC sessions on live-service games stress that the meta loop must evolve over time to sustain engagement across months.',
            },
            {
              heading: 'Progression pacing and gates',
              body: 'Progression pacing determines when players gain access to new mechanics, areas or abilities. Too fast and the player is overwhelmed; too slow and they are bored. Pacing gates — level requirements, currency thresholds, story triggers — control the flow. A well-paced game introduces a new mechanic, lets the player master it, then combines it with an existing one before adding another layer. This layering approach is visible in games from Mario to Hollow Knight.',
            },
          ],
          links: [
            { title: 'Designing core game loops', url: 'https://learn.unity.com/pathway/game-design', sourceName: 'Official Engine Learning Resources', resourceType: 'course', relationship: 'primary' },
            { title: 'Core loop design patterns', url: 'https://docs.godotengine.org/en/stable/tutorials/best_practices/scenes_versus_scripts.html', sourceName: 'Godot Documentation', resourceType: 'guide', relationship: 'supporting' },
            { title: 'Player motivation and progression', url: 'https://www.gamedeveloper.com/design/the-chemistry-of-game-design', sourceName: 'GDC Resources', resourceType: 'article', relationship: 'supporting' },
          ],
          quiz: {
            prompt: 'What is the primary purpose of a core loop in game design?',
            options: [
              'To render the game world in real time',
              'To create a repeating cycle of actions that delivers rewards and drives engagement',
              'To manage multiplayer server connections',
              'To store player save data persistently',
            ],
            answerIndex: 1,
            explanation:
              'The core loop defines the fundamental cycle of player actions and rewards. It is the heartbeat of moment-to-moment gameplay — if the loop is not satisfying, no amount of polish will save the experience.',
          },
        },
        {
          slug: 'player-psychology',
          title: 'Player Psychology & Motivation',
          minutes: 25,
          objectives: [
            'Apply Self-Determination Theory (autonomy, competence, relatedness) to game design decisions',
            'Identify intrinsic and extrinsic motivators and how they drive player retention',
            'Recognise common psychological pitfalls such as reward fatigue and frustration loops',
          ],
          sections: [
            {
              heading: 'Self-Determination Theory in games',
              body: 'SDT identifies three innate psychological needs: autonomy (feeling in control), competence (feeling skilled) and relatedness (feeling connected to others). Games that satisfy all three see higher retention. An open-world RPG satisfies autonomy through free exploration, competence through skill progression and relatedness through co-op or guild systems. When any one of these needs goes unmet, players disengage — even if the other two are strong.',
            },
            {
              heading: 'Intrinsic vs. extrinsic motivation',
              body: 'Intrinsic motivation comes from the activity itself — the joy of mastering a combat system, the curiosity to explore a hidden area. Extrinsic motivation comes from external rewards —XP, achievements, leaderboard rank. Over-reliance on extrinsic rewards creates a fragile experience: remove the reward and the player leaves. The best designs use extrinsic rewards to draw players in and intrinsic engagement to keep them. This balance is a recurring theme in GDC talks on live-service design.',
            },
            {
              heading: 'Frustration and flow',
              body: 'Mihaly Csikszentmihalyi\'s flow theory describes the optimal zone between boredom and frustration. Game designers manipulate difficulty curves to keep players in this zone. Too-easy content triggers boredom; too-hard content triggers quitting. Dynamic difficulty adjustment, optional challenge modes and well-placed checkpoints are common tools for maintaining flow. The key insight is that flow is not a fixed difficulty — it shifts as the player grows more skilled.',
            },
          ],
          links: [
            { title: 'Player psychology fundamentals', url: 'https://learn.unity.com/pathway/game-design', sourceName: 'Official Engine Learning Resources', resourceType: 'course', relationship: 'primary' },
            { title: 'Motivation and game design', url: 'https://www.gamedeveloper.com/design/motivation-game-design', sourceName: 'GDC Resources', resourceType: 'article', relationship: 'primary' },
            { title: 'Flow state in interactive design', url: 'https://dev.epicgames.com/documentation/en-us/ue5/engines-and-tools', sourceName: 'Unreal Engine Documentation', resourceType: 'guide', relationship: 'supporting' },
          ],
          quiz: {
            prompt: 'According to Self-Determination Theory, which three psychological needs drive intrinsic motivation in players?',
            options: [
              'Speed, accuracy and reflexes',
              'Autonomy, competence and relatedness',
              'Score, rank and unlockables',
              'Graphics, sound and story',
            ],
            answerIndex: 1,
            explanation:
              'SDT identifies autonomy (choice and control), competence (mastery and skill growth) and relatedness (social connection) as the three pillars of intrinsic motivation. Games that satisfy all three create the strongest long-term engagement.',
          },
        },
      ],
    },
    {
      slug: 'mechanics-and-systems',
      stage: 'Foundation',
      title: 'Mechanics, Prototyping & Systems Thinking',
      description:
        'Learn to design individual mechanics, build playable prototypes and think in systems that produce emergent gameplay.',
      topics: [
        {
          slug: 'mechanics-design',
          title: 'Mechanics Design',
          minutes: 30,
          objectives: [
            'Define a game mechanic as a rule-governed player action with defined inputs, outputs and feedback',
            'Design an original mechanic by combining existing verbs in a novel context',
            'Evaluate a mechanic for clarity, depth and emergent potential',
          ],
          sections: [
            {
              heading: 'What makes a mechanic',
              body: 'A mechanic is the smallest unit of interactive design: a player action constrained by rules that produces a predictable or semi-predictable outcome. Jumping, shooting, crafting, dialogue choices — these are all mechanics. The designer\'s job is not just to invent the action but to define its boundaries: what can the player do, what can they not do, and what happens as a result. Clarity matters more than novelty — a confusing mechanic, no matter how clever, will frustrate players.',
            },
            {
              heading: 'Combining verbs for novelty',
              body: 'Most mechanics are not invented from scratch — they are recombined. "Aim and shoot" is familiar; "aim and shoot while mid-air after wall-jumping" creates a novel feel. The designer\'s art lies in choosing which existing verbs to combine and in what context. GDC talks on games like Spelunky and Dead Cells show how a small set of mechanics creates massive variety through combination and procedural context.',
            },
            {
              heading: 'Evaluating mechanical depth',
              body: 'A good mechanic has a low skill floor (easy to learn) and a high skill ceiling (hard to master). Evaluating depth means asking: does this mechanic have multiple valid uses? Can it be combined with other mechanics in interesting ways? Does mastery feel rewarding? If a mechanic has only one correct use, it will feel repetitive after a few encounters. Depth comes from context-dependent decision-making, not from button complexity.',
            },
          ],
          links: [
            { title: 'Mechanics design in Unity', url: 'https://learn.unity.com/pathway/game-design', sourceName: 'Official Engine Learning Resources', resourceType: 'course', relationship: 'primary' },
            { title: 'Designing combat mechanics', url: 'https://dev.epicgames.com/documentation/en-us/ue5/gameplay-framework', sourceName: 'Unreal Engine Documentation', resourceType: 'guide', relationship: 'primary' },
            { title: 'Mechanic prototyping in Godot', url: 'https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html', sourceName: 'Godot Documentation', resourceType: 'tutorial', relationship: 'supporting' },
          ],
          quiz: {
            prompt: 'What is the "skill floor" of a game mechanic?',
            options: [
              'The maximum skill a player can achieve',
              'The minimum skill required to use the mechanic effectively',
              'The lowest score a player can earn',
              'The number of inputs required per second',
            ],
            answerIndex: 1,
            explanation:
              'The skill floor is the barrier to entry — how easy it is for a new player to understand and use the mechanic. A low skill floor means the mechanic is accessible; a high skill floor means it requires significant learning before it becomes useful.',
          },
        },
        {
          slug: 'systems-thinking',
          title: 'Systems Thinking',
          minutes: 30,
          objectives: [
            'Map a game system as a set of interacting components with inputs, outputs and feedback loops',
            'Identify positive and negative feedback loops and their effect on game balance',
            'Predict emergent behaviours from simple system interactions',
          ],
          sections: [
            {
              heading: 'Systems as interconnected loops',
              body: 'A game system is a collection of mechanics that interact with each other. The economy system feeds the progression system, which unlocks new abilities that change how the player engages with the combat system. Systems thinking means seeing these connections rather than designing each system in isolation. When you change the gold drop rate, you affect the shop economy, which affects upgrade pacing, which affects difficulty perception. Every change ripples.',
            },
            {
              heading: 'Feedback loops: positive and negative',
              body: 'A positive feedback loop amplifies a trend — the rich get richer. In multiplayer games, a player who is winning gains better gear, which makes them win more. This creates excitement but can snowball out of control. A negative feedback loop dampens a trend — the trailing player gets a catch-up mechanism. Mario Kart\'s item distribution is a classic negative feedback loop: players in last place receive better items. Designers choose which loops to use based on the intended experience.',
            },
            {
              heading: 'Emergent gameplay',
              body: 'Emergence is when simple systems produce complex, unplanned behaviours. A stealth game with line-of-sight mechanics and physics-based shadows creates emergent shadow-stealing strategies that the designer never explicitly coded. Designers who build modular, composable systems create more emergence. The key is to build systems that are simple individually but interact in surprising ways — this is where the deepest gameplay discoveries live.',
            },
          ],
          links: [
            { title: 'Systems design overview', url: 'https://learn.unity.com/pathway/game-design', sourceName: 'Official Engine Learning Resources', resourceType: 'course', relationship: 'primary' },
            { title: 'Systems thinking for games', url: 'https://www.gamedeveloper.com/design/systems-thinking-game-design', sourceName: 'GDC Resources', resourceType: 'article', relationship: 'primary' },
            { title: 'Building systems in Godot', url: 'https://docs.godotengine.org/en/stable/tutorials/best_practices/node_alternatives.html', sourceName: 'Godot Documentation', resourceType: 'guide', relationship: 'supporting' },
          ],
          quiz: {
            prompt: 'In Mario Kart, players in last place receive more powerful items. This is an example of…',
            options: [
              'A positive feedback loop',
              'A negative feedback loop',
              'Emergent gameplay',
              'A core loop violation',
            ],
            answerIndex: 1,
            explanation:
              'A negative feedback loop dampens the current trend — trailing players receive better items to close the gap. This keeps races competitive and prevents the winner from pulling irreversibly ahead.',
          },
        },
        {
          slug: 'prototyping-and-iteration',
          title: 'Prototyping & Iteration',
          minutes: 25,
          objectives: [
            'Build a playable paper or digital prototype that tests a specific design hypothesis',
            'Conduct a structured playtest and gather actionable feedback',
            'Apply iteration cycles: prototype, test, evaluate, refine',
          ],
          sections: [
            {
              heading: 'Why prototype before building',
              body: 'Prototyping answers the question "is this fun?" before committing engineering resources. A paper prototype — tokens, index cards, dice — can test a core loop in thirty minutes. A digital prototype in Unity or Godot can validate a mechanic in a day. Building a full game around an untested idea is the most common cause of wasted development time. GDC postmortems repeatedly cite early prototyping as the single most valuable process change studios made.',
            },
            {
              heading: 'Structured playtesting',
              body: 'A playtest is only useful if it is structured. Define what you are testing before you watch anyone play. Ask players to think aloud so you hear their reasoning. Watch for moments of confusion, frustration or delight — those are your data points. Avoid leading questions ("Did you enjoy it?") and instead ask open-ended ones ("What was going through your mind during that encounter?"). Five playtesters will surface eighty percent of usability issues.',
            },
            {
              heading: 'The iteration cycle',
              body: 'Prototype, playtest, evaluate, refine — then repeat. Each cycle should test one change at a time so you know what caused the improvement or regression. Document what you changed and why. Over multiple cycles, the prototype converges on a design that is proven fun, not just theorised to be fun. Resist the urge to add features during iteration — focus on making the existing mechanic as satisfying as possible before layering complexity.',
            },
          ],
          links: [
            { title: 'Prototyping in Unity', url: 'https://learn.unity.com/pathway/game-design', sourceName: 'Official Engine Learning Resources', resourceType: 'course', relationship: 'primary' },
            { title: 'Playtesting best practices', url: 'https://www.gamedeveloper.com/design/playtesting-best-practices', sourceName: 'GDC Resources', resourceType: 'article', relationship: 'primary' },
            { title: 'Rapid prototyping in Godot', url: 'https://docs.godotengine.org/en/stable/getting_started/step_by_step/index.html', sourceName: 'Godot Documentation', resourceType: 'tutorial', relationship: 'supporting' },
          ],
          quiz: {
            prompt: 'Why is it recommended to test one change at a time during iteration?',
            options: [
              'It saves time on documentation',
              'It makes the code run faster',
              'It lets you isolate the effect of each change on player experience',
              'It prevents the prototype from becoming too large',
            ],
            answerIndex: 2,
            explanation:
              'Testing one variable at a time lets you attribute improvements or regressions to specific changes. If you change five things at once and the game feels better, you cannot determine which change caused the improvement.',
          },
        },
      ],
    },
    {
      slug: 'level-design-and-balancing',
      stage: 'Intermediate',
      title: 'Level Design & Difficulty Balancing',
      description:
        'Shape player journeys through space, craft encounters and tune difficulty curves that keep players in the flow zone.',
      topics: [
        {
          slug: 'level-design-principles',
          title: 'Level Design Principles',
          minutes: 30,
          objectives: [
            'Apply spatial storytelling techniques to guide player attention without explicit instruction',
            'Design a level layout that teaches mechanics through environmental cues',
            'Use landmarks, sightlines and pacing breaks to create readable spaces',
          ],
          sections: [
            {
              heading: 'Guiding the player through space',
              body: 'Level design is invisible direction. Light leads the eye — a bright opening in a dark corridor pulls the player forward. Architecture implies path — a ramp suggests upward movement, a locked door suggests a key nearby. The best levels never need a waypoint marker because the environment itself tells the player where to go. This is spatial storytelling: the level communicates through geometry, lighting and object placement rather than text or UI prompts.',
            },
            {
              heading: 'Teaching through level layout',
              body: 'The first encounter with a new mechanic should be safe. Place a pit where falling costs nothing, then place a pit where falling means restarting — the player learns to jump without a tutorial text box. This "teach, test, combine" pattern is the foundation of level-based pedagogy. Games like Mega Man and Celeste are masterclasses in teaching mechanics through encounter design. The level is the tutorial.',
            },
            {
              heading: 'Landmarks and wayfinding',
              body: 'A landmark is a visually distinct element that helps players orient themselves: a tower, a statue, a brightly coloured building. Landmarks serve as reference points in open spaces and reduce player frustration with navigation. Sightlines — long visual corridors that show the player their next destination — work alongside landmarks to create intuitive wayfinding. Together they form a visual language that makes complex spaces feel navigable.',
            },
          ],
          links: [
            { title: 'Level design fundamentals', url: 'https://learn.unity.com/pathway/game-design', sourceName: 'Official Engine Learning Resources', resourceType: 'course', relationship: 'primary' },
            { title: 'Level design in Unreal Engine', url: 'https://dev.epicgames.com/documentation/en-us/ue5/level-design', sourceName: 'Unreal Engine Documentation', resourceType: 'guide', relationship: 'primary' },
            { title: 'Designing levels in Godot', url: 'https://docs.godotengine.org/en/stable/tutorials/3d/index.html', sourceName: 'Godot Documentation', resourceType: 'tutorial', relationship: 'supporting' },
          ],
          quiz: {
            prompt: 'What is the "teach, test, combine" pattern in level design?',
            options: [
              'Introduce all mechanics at once and let the player figure them out',
              'Place a safe encounter to teach, a challenging one to test, then combine mechanics in a later encounter',
              'Only introduce one mechanic per game',
              'Remove mechanics after testing them',
            ],
            answerIndex: 1,
            explanation:
              'This pattern introduces a mechanic in a safe context, then tests the player\'s understanding under pressure, then combines it with existing mechanics for increased complexity — building mastery gradually.',
          },
        },
        {
          slug: 'difficulty-balancing',
          title: 'Difficulty Balancing',
          minutes: 30,
          objectives: [
            'Construct a difficulty curve that maintains player flow across a play session',
            'Apply tuning parameters: enemy health, damage, spawn rate, resource availability',
            'Use data from playtesting to identify and fix difficulty spikes',
          ],
          sections: [
            {
              heading: 'The difficulty curve',
              body: 'A difficulty curve plots challenge against progression. A well-designed curve rises gradually, with periodic dips that let the player relax before the next challenge. The curve should match the player\'s growing skill — as they learn new mechanics and master existing ones, the game demands more from them. Flat curves feel boring; steep curves feel punishing. The ideal shape is a gentle staircase with rest beats.',
            },
            {
              heading: 'Tuning parameters',
              body: 'Difficulty is controlled by measurable parameters: enemy health, enemy damage, player damage output, spawn frequency, resource drops, time limits and checkpoint spacing. Adjusting any one of these changes the feel of an encounter. For example, reducing enemy health by fifteen percent makes a fight feel faster without changing the player\'s damage — the same weapon now kills in fewer hits. These knobs should be exposed in data tables so designers can iterate without recompiling.',
            },
            {
              heading: 'Finding and fixing spikes',
              body: 'A difficulty spike is a sudden, disproportionate jump in challenge that breaks the flow curve. Spikes are identified by watching playtesters — if most players die repeatedly at the same point, that point is a spike. Fixes include adding checkpoints, reducing enemy count, increasing resource drops nearby or providing an alternative path. The goal is never to remove challenge — it is to ensure the challenge matches the player\'s current capability.',
            },
          ],
          links: [
            { title: 'Balancing game systems', url: 'https://learn.unity.com/pathway/game-design', sourceName: 'Official Engine Learning Resources', resourceType: 'course', relationship: 'primary' },
            { title: 'Difficulty tuning strategies', url: 'https://www.gamedeveloper.com/design/difficulty-balancing', sourceName: 'GDC Resources', resourceType: 'article', relationship: 'primary' },
            { title: 'Data-driven balancing in Godot', url: 'https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html', sourceName: 'Godot Documentation', resourceType: 'guide', relationship: 'supporting' },
          ],
          quiz: {
            prompt: 'What is the most reliable way to identify a difficulty spike in your game?',
            options: [
              'Checking if the code has any bugs',
              'Asking your programmer if the numbers feel right',
              'Watching multiple playtesters and noting where most players get stuck or quit',
              'Comparing your game to a competitor\'s difficulty settings',
            ],
            answerIndex: 2,
            explanation:
              'Playtesting is the primary tool for identifying difficulty spikes. When multiple players consistently fail or express frustration at the same point, that point is a spike that needs redesigning or retuning.',
          },
        },
        {
          slug: 'encounter-design',
          title: 'Encounter Design',
          minutes: 25,
          objectives: [
            'Design a combat or challenge encounter with a clear start, escalation and resolution',
            'Balance encounter pacing with rest beats and narrative context',
            'Create variant encounters that reuse mechanics in new contexts to build mastery',
          ],
          sections: [
            {
              heading: 'The encounter arc',
              body: 'Every encounter has a three-part arc: introduction, escalation and resolution. The introduction presents the threat and gives the player a moment to assess. The escalation increases pressure — reinforcements arrive, the arena shrinks, the enemy changes phase. The resolution is the payoff — the defeat of the enemy, the opening of a door, the reward. A flat encounter that is the same intensity from start to finish feels exhausting. Arcs create rhythm.',
            },
            {
              heading: 'Rest beats and pacing',
              body: 'Between encounters, players need breathing room. A rest beat is a safe space — a corridor, a room with a save point, a narrative moment — that lets the player process what happened and prepare for what is next. Without rest beats, encounters blur together and the player becomes fatigued. The spacing of rest beats is a tuning tool: closer together for easier games, further apart for intense experiences.',
            },
            {
              heading: 'Encounter variation and mastery',
              body: 'The best encounters reuse familiar mechanics in unfamiliar contexts. A flying enemy becomes dangerous when combined with a narrow platform. A fire trap becomes lethal when placed alongside a timed door. This variation tests whether the player truly understands the mechanics or is just memorising a pattern. It is the difference between "I know how to dodge this" and "I know how to handle anything this system throws at me."',
            },
          ],
          links: [
            { title: 'Encounter design patterns', url: 'https://www.gamedeveloper.com/design/encounter-design-patterns', sourceName: 'GDC Resources', resourceType: 'article', relationship: 'primary' },
            { title: 'Combat system design', url: 'https://dev.epicgames.com/documentation/en-us/ue5/gameplay-framework', sourceName: 'Unreal Engine Documentation', resourceType: 'guide', relationship: 'primary' },
            { title: 'Enemy AI design in Godot', url: 'https://docs.godotengine.org/en/stable/tutorials/navigation/index.html', sourceName: 'Godot Documentation', resourceType: 'tutorial', relationship: 'supporting' },
          ],
          quiz: {
            prompt: 'What is the purpose of a "rest beat" between game encounters?',
            options: [
              'To load the next level in the background',
              'To give the player a safe space to process and prepare for the next challenge',
              'To increase the overall difficulty of the game',
              'To reduce the game\'s file size',
            ],
            answerIndex: 1,
            explanation:
              'Rest beats provide pacing relief — a safe moment where the player can recover, reflect on what they learned and prepare mentally for the next encounter. Without them, gameplay feels relentless and exhausting.',
          },
        },
      ],
    },
    {
      slug: 'narrative-documentation-playtesting',
      stage: 'Advanced',
      title: 'Narrative Design, Documentation & Playtesting',
      description:
        'Integrate narrative into mechanical systems, write professional game design documents and run rigorous playtests that produce actionable data.',
      topics: [
        {
          slug: 'narrative-design',
          title: 'Narrative Design for Games',
          minutes: 30,
          objectives: [
            'Design a branching dialogue tree with meaningful consequences and player agency',
            'Integrate narrative directly into mechanics so that story emerges from gameplay',
            'Apply environmental storytelling techniques to build world lore without exposition',
          ],
          sections: [
            {
              heading: 'Branching narrative and player agency',
              body: 'Game narrative differs from film narrative because the player makes choices. A branching dialogue tree gives the player agency — their words shape relationships, unlock or close off paths, and alter the story\'s outcome. But branching is expensive: every choice doubles the content. Smart designers create "branching and merging" structures where different choices lead to different scenes but reconverge at key story beats. This gives the illusion of infinite possibility while remaining scope-feasible.',
            },
            {
              heading: 'Mechanics as narrative',
              body: 'The most powerful game stories are told through mechanics, not cutscenes. In a survival game, the mechanic of rationing food tells a story about scarcity and desperation. In a stealth game, the mechanic of avoiding combat tells a story about vulnerability. When mechanics and narrative align, the player does not just witness the story — they live it. This is what GDC speakers call "ludonarrative harmony," the opposite of the infamous ludonarrative dissonance where gameplay contradicts story.',
            },
            {
              heading: 'Environmental storytelling',
              body: 'An overturned chair, a trail of blood leading to a locked door, a child\'s drawing on a wall — these environmental details tell stories without a single word of dialogue. Environmental storytelling is the art of placing objects in a space so that players infer what happened. It rewards exploration, builds atmosphere and respects the player\'s intelligence. Dark Souls is the canonical example: nearly every item description and room arrangement tells a piece of a larger story.',
            },
          ],
          links: [
            { title: 'Narrative design in games', url: 'https://www.gamedeveloper.com/design/narrative-design-game-dev', sourceName: 'GDC Resources', resourceType: 'article', relationship: 'primary' },
            { title: 'Branching dialogue systems', url: 'https://learn.unity.com/pathway/game-design', sourceName: 'Official Engine Learning Resources', resourceType: 'course', relationship: 'primary' },
            { title: 'Dialogue trees in Godot', url: 'https://docs.godotengine.org/en/stable/tutorials/scripting/resources/index.html', sourceName: 'Godot Documentation', resourceType: 'tutorial', relationship: 'supporting' },
          ],
          quiz: {
            prompt: 'What is "ludonarrative harmony" in game design?',
            options: [
              'When the game\'s soundtrack matches the visual style',
              'When gameplay mechanics reinforce and support the narrative themes',
              'When two players agree on the story\'s meaning',
              'When the game has no story and relies entirely on mechanics',
            ],
            answerIndex: 1,
            explanation:
              'Ludonarrative harmony occurs when what the player does (gameplay) aligns with what the story says (narrative). When mechanics reinforce theme — for example, a game about loss where the player must sacrifice progress — the experience feels cohesive and powerful.',
          },
        },
        {
          slug: 'gdd-documentation',
          title: 'Game Design Documentation',
          minutes: 25,
          objectives: [
            'Structure a Game Design Document (GDD) with clear sections: vision, mechanics, systems, levels, narrative and art direction',
            'Write design specifications that are precise enough for programmers and artists to implement',
            'Maintain a living document that evolves with the project without becoming outdated',
          ],
          sections: [
            {
              heading: 'Anatomy of a GDD',
              body: 'A Game Design Document communicates the design vision to the entire team. A standard GDD includes: a one-page vision summary, detailed mechanics descriptions, system diagrams, level overviews, narrative outline and art direction references. The document must be clear enough for a new team member to read and understand the project without a verbal briefing. GDC speakers advise keeping the GDD concise — a hundred pages of prose will not be read; a ten-page structured document will.',
            },
            {
              heading: 'Writing for implementation',
              body: 'Design docs must be actionable. Instead of writing "the combat should feel responsive," write "input buffer window: 100ms before landing, 150ms after landing. Hitstop duration: 30ms for light attacks, 60ms for heavy attacks." Specificity eliminates ambiguity and prevents implementation drift. The best design documents read like specifications, not fiction — they describe exact behaviours, edge cases and error states.',
            },
            {
              heading: 'Keeping docs alive',
              body: 'A GDD that is never updated becomes worse than useless — it becomes misleading. The solution is a living document practice: update the GDD as part of every design iteration cycle, not as a separate chore. Use version control for the document, add change logs and mark sections as "approved," "draft" or "deprecated." Treat the GDD with the same discipline as the codebase.',
            },
          ],
          links: [
            { title: 'Writing a GDD', url: 'https://www.gamedeveloper.com/design/game-design-document', sourceName: 'GDC Resources', resourceType: 'article', relationship: 'primary' },
            { title: 'Design documentation best practices', url: 'https://learn.unity.com/pathway/game-design', sourceName: 'Official Engine Learning Resources', resourceType: 'course', relationship: 'primary' },
            { title: 'Project organisation in Godot', url: 'https://docs.godotengine.org/en/stable/tutorials/best_practices/project_organization.html', sourceName: 'Godot Documentation', resourceType: 'guide', relationship: 'supporting' },
          ],
          quiz: {
            prompt: 'Why should a GDD use specific numerical values instead of vague adjectives?',
            options: [
              'Numbers make the document longer and more impressive',
              'Specific values give programmers clear implementation targets and reduce ambiguity',
              'Vague adjectives are not professional',
              'Numbers prevent designers from changing their minds',
            ],
            answerIndex: 1,
            explanation:
              'Specific numerical specifications — buffer windows, damage values, timing ranges — give programmers precise targets to implement. Vague descriptions like "responsive" or "tight" leave room for misinterpretation and wasted implementation cycles.',
          },
        },
        {
          slug: 'playtesting-methodology',
          title: 'Playtesting Methodology',
          minutes: 30,
          objectives: [
            'Design a playtest plan that targets specific design hypotheses',
            'Conduct both qualitative (observation, interviews) and quantitative (telemetry, completion rates) playtests',
            'Translate playtest data into prioritised design changes',
          ],
          sections: [
            {
              heading: 'Designing a playtest plan',
              body: 'A playtest plan defines what you are testing, who your testers are, what you will measure and how you will interpret results. Without a plan, playtesting devolves into "watch someone play and hope for insights." Before the session, write down your hypothesis: "I believe players will find the second level too difficult because of the enemy density." Then design the test to confirm or reject that hypothesis. Focus your questions and observation on that specific concern.',
            },
            {
              heading: 'Qualitative vs. quantitative data',
              body: 'Qualitative data comes from watching and talking: facial expressions, verbalised thoughts, post-session interviews. It tells you why something happened. Quantitative data comes from telemetry and measurement: completion rates, death counts, time-per-level, drop-off points. It tells you what happened. The strongest playtest analysis uses both: the numbers show where the problem is, and the interviews reveal why it is happening. GDC sessions on live-service games stress that neither form alone is sufficient.',
            },
            {
              heading: 'From data to action',
              body: 'After the playtest, synthesise findings into a prioritised list of changes. Use an impact-effort matrix: high-impact low-effort changes first. Document each finding with a specific recommendation, not just a complaint. "Players die at the bridge encounter — reduce enemy count from six to four and add a health pickup before the bridge" is actionable. "The bridge is too hard" is not. Close the loop by retesting after changes to confirm the fix worked.',
            },
          ],
          links: [
            { title: 'Playtesting methodology', url: 'https://www.gamedeveloper.com/design/playtesting-methodology', sourceName: 'GDC Resources', resourceType: 'article', relationship: 'primary' },
            { title: 'Player analytics in Unity', url: 'https://learn.unity.com/pathway/game-design', sourceName: 'Official Engine Learning Resources', resourceType: 'course', relationship: 'primary' },
            { title: 'Telemetry and debugging in Godot', url: 'https://docs.godotengine.org/en/stable/tutorials/debug/index.html', sourceName: 'Godot Documentation', resourceType: 'guide', relationship: 'supporting' },
          ],
          quiz: {
            prompt: 'Which of the following is an example of an actionable playtest finding?',
            options: [
              '"The game is not fun"',
              '"Players die at the bridge encounter — reduce enemy count and add a health pickup before the bridge"',
              '"The graphics could be better"',
              '"We need more content"',
            ],
            answerIndex: 1,
            explanation:
              'An actionable finding identifies the specific problem (bridge encounter deaths), proposes a concrete fix (reduce enemy count, add health pickup) and can be tested after implementation. Vague complaints like "not fun" do not point to a solution.',
          },
        },
      ],
    },
  ],

  practicalExam: {
    title: 'Design a Complete Game Mechanic — From Concept to Playtest',
    coverage: [
      'Core loop design',
      'Mechanics prototyping',
      'Systems thinking',
      'Level design',
      'Difficulty balancing',
      'GDD documentation',
      'Playtesting and iteration',
    ],
    brief:
      'You are tasked with designing and prototyping a complete core mechanic for a 2D action-platformer: a wall-climbing system. The player character can cling to specific surfaces, climb vertically, and launch off walls. You must produce a design document, a playable prototype in Unity or Godot, and a playtest report that documents at least two rounds of iteration based on real player feedback.',
    requirements: [
      'Write a GDD section describing the wall-climb mechanic: inputs, rules, limitations, animations and interaction with other mechanics (jump, dash, attack)',
      'Build a playable prototype with at least two test levels: one tutorial room and one challenge room',
      'Tune the mechanic parameters (climb speed, stamina drain, launch distance) and document your rationale',
      'Conduct two rounds of playtesting with at least three testers each and record quantitative data (completion rate, death count, retry count)',
      'Deliver a final iteration report: what you changed between rounds, why, and what the data showed',
    ],
    expectedOutput:
      'A complete package: a GDD section for the wall-climb mechanic, a playable prototype (Unity or Godot project), and an iteration report with playtest data and rationale for each design decision.',
    rubric: [
      { skill: 'Core Loop Design', weight: 15, criteria: 'The wall-climb mechanic integrates cleanly with jump and movement to form a satisfying core loop' },
      { skill: 'Mechanics Design', weight: 20, criteria: 'Inputs, rules and limitations are clearly defined and the mechanic feels responsive' },
      { skill: 'Systems Thinking', weight: 15, criteria: 'The mechanic interacts meaningfully with other systems (combat, exploration, stamina)' },
      { skill: 'Level Design', weight: 15, criteria: 'Test levels teach the mechanic through environment and escalate challenge appropriately' },
      { skill: 'Difficulty Balancing', weight: 10, criteria: 'Parameters are tuned to maintain flow; evidence of tuning decisions in the documentation' },
      { skill: 'Documentation', weight: 10, criteria: 'GDD section is structured, specific and implementation-ready' },
      { skill: 'Playtesting & Iteration', weight: 15, criteria: 'Two rounds of playtesting with data, analysis and documented changes' },
    ],
    passScore: 70,
  },

  assignments: [
    {
      title: 'Core Loop Design Document',
      stage: 'Beginner',
      objective: 'Design a complete core loop for an original game concept and document it in a structured GDD section.',
      requirements: [
        'Define the game concept: genre, target audience, platform and one-sentence hook',
        'Map the core loop: list every player verb and how each feeds the next',
        'Design the meta loop: progression system, unlockables and long-term goals',
        'Write a one-page GDD vision summary that communicates the design intent',
        'Include at least one diagram or flowchart illustrating the loop structure',
      ],
      skillsEvaluated: ['Core Loop Design', 'Game Design Documentation', 'Systems Thinking'],
      dueDays: 10,
      difficulty: 'Foundational',
      submissionSpec: {
        instructions: 'Submit the complete GDD section including concept summary, core loop map, meta loop description and vision statement.',
        textLabel: 'Core loop design document',
        minTextLength: 1500,
      },
    },
    {
      title: 'Playable Mechanic Prototype',
      stage: 'Intermediate',
      objective: 'Build a playable prototype of an original game mechanic in Unity or Godot, accompanied by a design rationale document.',
      requirements: [
        'Implement one original mechanic with clear inputs, outputs and feedback',
        'Create two test rooms: a safe introduction room and a challenge room',
        'Document the design rationale: why this mechanic, why these parameters, what the intended feel is',
        'Conduct at least one playtest with three players and record their feedback',
        'Make one iteration based on feedback and document the change and its rationale',
      ],
      skillsEvaluated: ['Mechanics Prototyping', 'Level Design', 'Playtesting', 'Engine Proficiency'],
      dueDays: 14,
      difficulty: 'Intermediate',
      submissionSpec: {
        instructions: 'Submit the game project (Unity or Godot), a design rationale document and the playtest report with iteration notes.',
        textLabel: 'Design rationale and playtest report',
        minTextLength: 1200,
        linkLabels: ['Link to project repository or build'],
      },
    },
    {
      title: 'Full Game Design Pitch',
      stage: 'Advanced',
      objective: 'Develop and present a complete game design pitch for an original title, including mechanics, levels, narrative, art direction and a playable vertical slice.',
      requirements: [
        'Write a full GDD covering vision, mechanics, systems, level plan, narrative outline and art direction',
        'Build a vertical slice: one complete level or section that demonstrates the core experience',
        'Design a difficulty curve for the vertical slice with documented tuning rationale',
        'Conduct two rounds of playtesting and produce an iteration report with quantitative data',
        'Deliver a five-minute pitch presentation summarising the design vision and playtest findings',
      ],
      skillsEvaluated: ['Game Design Documentation', 'Level Design', 'Narrative Design', 'Difficulty Balancing', 'Playtesting', 'Communication'],
      dueDays: 21,
      difficulty: 'Advanced',
      submissionSpec: {
        instructions: 'Submit the full GDD, vertical slice build, iteration report and pitch presentation slides.',
        textLabel: 'GDD and iteration report',
        minTextLength: 3000,
        linkLabels: ['Link to vertical slice build', 'Link to pitch presentation'],
      },
    },
  ],

  simTasks: [
    {
      title: 'Emergency balance hotfix',
      context: 'Players are reporting that a boss fight in Chapter 3 is causing an 85% quit rate. The boss has too much health and its attack pattern has no safe windows. The lead designer needs a fix within the day.',
      requirements: [
        'Analyse the boss encounter parameters: health, damage, attack speed and safe windows',
        'Propose specific numerical changes with clear rationale grounded in flow theory',
        'Document the before/after comparison and expected impact on quit rate',
        'Communicate the fix to the lead designer with implementation notes',
      ],
      priority: 'critical',
      dueDayOffset: 1,
      expectedOutput: 'A balance fix document with specific parameter changes, rationale and implementation notes for the Chapter 3 boss encounter.',
      skills: ['Difficulty Balancing', 'Systems Thinking', 'Communication', 'Problem Solving'],
    },
    {
      title: 'Playtest synthesis report',
      context: 'The team just completed a three-hour external playtest session with twelve participants. Raw notes, video timestamps and session recordings are available. The producer needs a synthesis report by tomorrow.',
      requirements: [
        'Categorise observations into themes: difficulty, clarity, engagement, bugs',
        'Identify the top three design issues supported by both qualitative quotes and quantitative data',
        'Prioritise issues using an impact-effort framework',
        'Write specific, actionable recommendations for each issue',
      ],
      priority: 'high',
      dueDayOffset: 2,
      expectedOutput: 'A structured playtest synthesis report with themed categories, prioritised issues and actionable recommendations.',
      skills: ['Playtesting', 'Data Analysis', 'Game Design Documentation', 'Prioritisation'],
    },
    {
      title: 'New mechanic pitch for sprint review',
      context: 'The team is planning the next sprint and the creative director has asked for a pitch on a new traversal mechanic — a grapple hook — for the upcoming jungle biome.',
      requirements: [
        'Write a one-page mechanic brief: concept, player verbs, limitations and intended feel',
        'Sketch or describe two test encounters that teach and then challenge the mechanic',
        'Identify potential system interactions (combat, exploration, puzzle-solving)',
        'Estimate implementation complexity (low / medium / high) with reasoning',
      ],
      priority: 'normal',
      dueDayOffset: 4,
      expectedOutput: 'A mechanic pitch document covering concept, encounters, system interactions and implementation estimate.',
      skills: ['Mechanics Design', 'Level Design', 'Systems Thinking', 'Communication'],
    },
  ],

  commScenarios: [
    {
      kind: 'team',
      personaName: 'Lena Zhao',
      personaRole: 'Lead Programmer',
      situation: 'The lead programmer says the wall-climb mechanic you designed is too complex to implement within the sprint and wants to cut it.',
      openingMessage:
        'I have looked at the wall-climb spec and honestly, the stamina system, the cling-and-launch, the surface detection — it is a lot for one sprint. Can we simplify it to just wall-jumping and drop the stamina drain? We can add the rest later.',
      expectedPoints: [
        'Acknowledges the implementation concern and respects the programmer\'s timeline assessment',
        'Explains which elements are essential to the mechanic\'s feel and which are optional',
        'Proposes a phased implementation: core wall-jump first, stamina and cling in the next sprint',
        'Documents the agreed scope and defers the full spec to a future iteration',
      ],
    },
    {
      kind: 'client',
      personaName: 'Marcus Reed',
      personaRole: 'Publishing Partner',
      situation: 'The publishing partner wants to add a monetised cosmetics system to a single-player narrative game, which conflicts with the design vision.',
      openingMessage:
        'Our monetisation team reviewed the build and they think there is a strong opportunity for cosmetic microtransactions. The character already has outfit variations — can we gate some behind a purchase model? It could significantly boost revenue.',
      expectedPoints: [
        'Respectfully explains the design philosophy and why forced monetisation would undermine the narrative experience',
        'Proposes an alternative: earnable cosmetics through gameplay achievements that respect player investment',
        'Offers to provide data from playtests showing player engagement with progression-based rewards',
        'Escalates to the creative director if the pressure continues, rather than making the decision alone',
      ],
    },
    {
      kind: 'team',
      personaName: 'Aisha Patel',
      personaRole: 'Level Designer',
      situation: 'The level designer disagrees with your difficulty tuning for the jungle biome and believes the encounters are too easy.',
      openingMessage:
        'I have been playtesting the jungle encounters and honestly, they feel too forgiving. Players are breezing through without using the grapple hook at all. I think we need to increase enemy count and reduce the safe zones. What do you think?',
      expectedPoints: [
        'Asks to see the specific playtest data — completion times, death counts, mechanic usage rates',
        'Considers whether the issue is difficulty or mechanic visibility (players may not know they can grapple)',
        'Proposes a middle ground: keep enemy count but reduce safe zones to encourage grapple use',
        'Agrees to a side-by-side playtest comparison to settle the design direction with evidence',
      ],
    },
    {
      kind: 'client',
      personaName: 'Sophie Laurent',
      personaRole: 'External QA Lead',
      situation: 'The QA lead reports that the difficulty spike at the waterfall level is causing test failures and wants it reduced immediately.',
      openingMessage:
        'We ran the QA regression suite and the waterfall level is failing — only three of twelve testers can clear it within the time limit. The current design requires perfect grapple timing and we are recommending an immediate difficulty reduction.',
      expectedPoints: [
        'Thanks QA for the data and asks for specific failure points (where testers die, how many retries)',
        'Evaluates whether the issue is the intended difficulty or an unintended bug in the encounter',
        'Proposes a targeted fix: widen the grapple window slightly and add one checkpoint, not a full redesign',
        'Schedules a follow-up QA pass after the fix to confirm it resolves the regression without overcorrecting',
      ],
    },
  ],

  workplaceScenarios: [
    {
      category: 'Design conflict',
      situation:
        'The creative director overrides your carefully tuned difficulty curve to make the game harder, citing personal preference rather than playtest data. The milestone review with the publisher is in one week.',
      requiredActions: [
        { action: 'Request the creative director share the rationale and any data supporting the change', good: true, note: 'Grounding the discussion in evidence rather than opinion protects the design process.' },
        { action: 'Run a rapid playtest with three internal testers to measure the impact of the change on completion rate', good: true, note: 'Quick empirical data gives the team a shared basis for decision-making.' },
        { action: 'Implement the change silently without documenting it, hoping the publisher does not notice', good: false, note: 'Undocumented changes create accountability gaps and make regression testing impossible.' },
        { action: 'Present the playtest data to the creative director and propose a compromise that respects both the vision and the data', good: true, note: 'A data-backed compromise demonstrates professional maturity and protects the player experience.' },
      ],
    },
    {
      category: 'Scope management',
      situation:
        'The producer adds a requirement for a procedural level generation system mid-sprint, claiming "it was always part of the plan," despite no mention in the original GDD or sprint planning.',
      requiredActions: [
        { action: 'Refer to the approved GDD and sprint plan to verify the original scope', good: true, note: 'Documentation is the designer\'s best defence against scope creep.' },
        { action: 'Estimate the effort required for procedural generation and communicate the impact on the current sprint', good: true, note: 'Transparent effort estimation prevents hidden overcommitment and missed deadlines.' },
        { action: 'Agree to add the feature without adjusting scope, working overtime to compensate', good: false, note: 'Accepting scope additions without negotiation erodes sustainable pacing and sets a precedent.' },
        { action: 'Propose moving procedural generation to the next sprint with a formal scope change request', good: true, note: 'Formal change requests create accountability and protect team wellbeing.' },
      ],
    },
  ],

  interviewQuestions: [
    {
      dimension: 'technical_knowledge',
      prompt: 'Walk me through how you would design a core loop for a mobile puzzle game. What verbs, rewards and progression systems would you include and why?',
      guidancePoints: [
        'Identify the primary verb (e.g., match, swipe, place) and supporting verbs',
        'Define immediate rewards (points, animations, sound) and delayed rewards (level unlocks, meta progression)',
        'Describe the progression arc: difficulty ramp, new mechanic introductions, pacing gates',
        'Explain how the loop sustains engagement across sessions without relying solely on monetisation',
      ],
    },
    {
      dimension: 'technical_knowledge',
      prompt: 'You have been asked to balance an economy system where players earn gold from combat and spend it on upgrades. How do you approach tuning the earn and spend rates?',
      guidancePoints: [
        'Define the target play session length and desired progression speed',
        'Calculate gold-per-minute earn rate based on average combat encounters',
        'Set upgrade costs relative to earn rate so that each upgrade feels earned but not grindy',
        'Introduce gold sinks or variable rewards to prevent inflation and maintain long-term balance',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'Playtest data shows that 70% of players quit during the second level. You watch the recordings and see players dying to the same pitfall repeatedly. How do you diagnose and fix this?',
      guidancePoints: [
        'Identify whether the issue is lack of teaching, unclear visual cues or excessive difficulty',
        'Evaluate whether the mechanic is introduced safely before being tested under pressure',
        'Consider environmental storytelling fixes: lighting, signage, safer practice opportunities',
        'Propose a specific fix and plan a follow-up playtest to validate the improvement',
      ],
    },
    {
      dimension: 'problem_solving',
      prompt: 'A playtester says the game "feels easy" but your telemetry data shows a 60% death rate on the same level. How do you reconcile this discrepancy?',
      guidancePoints: [
        'Recognise that subjective feel and objective data can diverge — both are valid signals',
        'Investigate whether the deaths feel earned (good challenge) or cheap (frustrating)',
        'Consider that the player may be skilled but the deaths may still feel unfair due to design issues',
        'Use both the qualitative and quantitative data together to identify the root cause',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'Your GDD specifies a feature that the lead programmer says is technically impossible within the engine constraints. How do you handle this?',
      guidancePoints: [
        'Listen to the technical constraint and understand the specific limitation',
        'Explore alternative designs that achieve the same player experience within the constraint',
        'Collaborate with the programmer to find a creative solution rather than insisting on the original spec',
        'Update the GDD to reflect the revised design and document the reasoning',
      ],
    },
    {
      dimension: 'professional_reasoning',
      prompt: 'You discover during playtesting that a mechanic you designed is fundamentally not fun, despite weeks of iteration. How do you handle this professionally?',
      guidancePoints: [
        'Acknowledge the finding honestly rather than defending the original design',
        'Present the playtest evidence to the team and propose a design pivot',
        'Suggest a rapid prototyping sprint for an alternative mechanic before the next milestone',
        'Document what was learned from the failed design so the team benefits from the effort',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'The art director wants to add a cinematic cutscene to explain the story, but you believe the story should be told through gameplay. How do you present your perspective?',
      guidancePoints: [
        'Acknowledge the art director\'s creative intent and the value of cinematic storytelling',
        'Propose a specific gameplay-driven alternative that achieves the same narrative beat',
        'Reference design examples where environmental storytelling was more effective than exposition',
        'Suggest a compromise: a short cinematic for the opening, with gameplay-driven narrative for the rest',
      ],
    },
    {
      dimension: 'communication',
      prompt: 'You need to explain to a non-technical stakeholder why a feature that seems simple is actually complex to implement. How do you communicate this without technical jargon?',
      guidancePoints: [
        'Use an analogy from everyday life to explain the technical complexity',
        'Focus on the player-visible outcome rather than the implementation details',
        'Provide a realistic timeline estimate with clear milestones',
        'Offer an alternative that delivers most of the value within a shorter timeframe',
      ],
    },

  ]
  ,
}
