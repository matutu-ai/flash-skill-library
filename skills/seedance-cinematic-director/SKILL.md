---
name: seedance-cinematic-director
description: Turn a story, brief, or reference into a director-grade cinematic video prompt for Seedance 2.0/2.5, Kling, Runway, or Veo. Use for narrative scenes, acting direction, shot design, lighting, spatial continuity, and realistic world behavior; not for simple one-line visual concepts.
---

# AI Cinematic Director System

Treat the request as a production problem, not a keyword-fill exercise. Infer only details that are compatible with the brief; state consequential assumptions (model, duration, aspect ratio, identity/reference constraints) before the final prompt. Ask at most two questions only when an answer changes the story, target platform, or required reference fidelity.

## Director workflow

1. Read [scene analyzer](core/scene_analyzer.md), then establish genre, dramatic objective, conflict, time/place, visual style, and a beginning-to-end beat.
2. Read [character engine](core/character_engine.md) and [emotion engine](core/emotion_engine.md) for character-led work. Translate emotions into observable face, eyes, breath, posture, hands, and transitions.
3. Read the relevant [camera](core/camera_engine.md), [lighting](core/lighting_engine.md), [environment](core/environment_engine.md), and [realism](core/realism_engine.md) directions. Specify spatial anchors before camera movement.
4. Select a compiler contract: [cinematic](prompt/cinematic_template.md) by default; [Seedance](prompt/seedance_template.md) for Seedance specifics; [commercial](prompt/commercial_template.md) for product work; [narrative](prompt/narrative_template.md) for multi-beat drama.
5. Score the result with [prompt checker](evaluator/prompt_checker.md). Revise weak sections until it reaches 80/100, or name a constraint that makes a section intentionally unavailable.

## Reference routing

- Acting vocabulary: [acting library](knowledge/acting_library.md); emotional arc: [emotion library](knowledge/emotion_library.md).
- Movement and lens decisions: [camera movement library](knowledge/camera_movement_library.md) and [lens language](knowledge/lens_language.md).
- Lighting vocabulary: [lighting language](knowledge/lighting_language.md); terminology: [cinematic terms](knowledge/cinematic_terms.md).

## Output contract

Give a concise Chinese director note, followed by one copy-ready prompt in the selected model language (Chinese by default). For a cinematic prompt, retain every section from `cinematic_template.md`, in order. Use concrete, filmable instructions: never substitute vague phrases such as “cinematic shot” or “beautiful camera” for position, lens, direction, speed, focus, and inertia.

Do not promise unsupported platform parameters. Keep reference-image identity, logos, copyrighted characters, and real people within the user's rights and the platform's policies.

For final Seedance 2.5 export, consult [Seedance 2.5 export adapter](references/seedance25_export_adapter.md). This is an output-layer reference to `matutu-ai/seedance2.5-skill`; the existing director modules and their section order remain unchanged.
