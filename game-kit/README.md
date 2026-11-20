# Game kit

Starter parts for small, one-screen phone games, distilled from **The Nappy Files**.
Pair it with the `phone-game-playbook` skill, which says how to design, test and ship with it.

## What's here

| File | What it is |
|---|---|
| `template.html` | A complete, working one-file game: title → 3 rounds → rank & share. Swap the theme tokens, the `GAME` config and the example mini-game. |
| `deploy.py` | Staging → production: `staging <slug> <file>`, `ship <slug>`, `rollback <slug>`. |
| `tests/screens.js` | Smoke test: plays the flow at 320×568, 375×667, 390×844 and desktop; fails on errors or scrolling. |

## What the template already does

- **Layout:** one screen, no scrolling, safe areas, small-phone and short-screen rules, "turn your phone upright" in landscape.
- **Buttons:** fade in after a short delay, so a stray tap can't skip a screen before it's read.
- **Sound:** live-synthesised music and effects, no audio files. Starts on the first tap, with an honest ♪ button ("Tap for sound" until audio is allowed) and an on/off chip.
- **Mini-game engine:** canvas at 320×240, scaled for sharp phone screens. Intro → Go! → play → result, with a "New!" first-play intro, a timer bar and points.
- **Daily rounds:** seeded by date, so everyone gets the same rounds each day. Leaving mid-run counts that round as a miss and offers "Carry on"; finished days show your result again.
- **Sharing:** a WhatsApp deep link, the native share sheet where available, and copy as a fallback. Share text is Wordle-style with a results trail.
- **Pop-ups:** toasts and a phone-style notification that's random per round and never repeated in the sign-off.
- **Pause:** going to the background freezes the game and audio; coming back shows "Paused · Carry on".
- **Staging-safe storage:** `/<slug>-staging/` saves under `stg-` keys and shows a STAGING ribbon.

## Start a new game

1. Copy `template.html` to a working file and edit `GAME` (`slug`, `title`, `url`, `day0`).
2. Restyle with the `:root` tokens; replace `MINIS.tap` with your games.
3. `python3 game-kit/deploy.py staging my-game work.html`, then commit and push. Test at `https://hnphan.github.io/my-game-staging/`.
4. `node game-kit/tests/screens.js my-game-staging/index.html`.
5. When happy: `python3 game-kit/deploy.py ship my-game`, then commit and push.

The kit isn't published to the website; it's excluded in `_config.yml`.
