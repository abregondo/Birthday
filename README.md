# A Private Birthday Surprise ❤️

A romantic, cinematic birthday website built as a personal gift. Three stages:

1. **Secret passcode entrance** — an elegant locked invitation
2. **Birthday countdown** — ticking toward December 1, 2026, 12:00 AM (Asia/Manila)
3. **Midnight reveal** — a cinematic birthday greeting, photo gallery, video memories, a love letter, and a final message

Built with **React · TypeScript · Tailwind CSS · Framer Motion · Lucide React**.

---

## Quick start

```bash
npm install
npm run dev
```

Other commands:

```bash
npm run build    # type-check + production build → dist/
npm run lint     # oxlint
npm run preview  # serve the production build locally
```

---

## ⚙️ Everything personal lives in one file

**`src/config/site.config.ts`**

| What | Where |
|---|---|
| Passcode (currently `0515`) | `PASSCODE` |
| The love letter | `LETTER_MESSAGE` |
| Photos + categories | `PHOTOS` |
| Videos + titles | `VIDEOS` |
| Final-section copy | `FINAL_LINES` |

### Adding photos

1. Drop image files into `public/photos/` (e.g. `public/photos/1.jpg`)
2. In `site.config.ts`, set the entry's `src`:

```ts
{ src: 'photos/1.jpg', category: 'Her Beautiful Moments', size: 'tall' }
```

- `size`: `'normal'` (square) · `'tall'` (portrait) · `'wide'` (landscape)
- `category`: `'Her Beautiful Moments'` | `'Our Memories'` | `'Special Occasions'` | `'Pictures I Love'`
- Leave `src: ''` to show an elegant placeholder frame — **no stock photos are ever used**

### Adding videos

1. Drop MP4 files into `public/videos/` (e.g. `public/videos/clip-1.mp4`)
2. In `site.config.ts`:

```ts
{ src: 'videos/clip-1.mp4', title: 'Our first road trip', thumbnail: 'videos/clip-1-thumb.jpg' }
```

- `thumbnail` is optional (a poster image; otherwise a decorative gradient is shown)
- Videos **never autoplay** — they only play when she presses play in the modal

### Changing the passcode

```ts
export const PASSCODE = '0515'
```

Any length works (the input boxes adapt).

---

## ⏱️ How the countdown & midnight reveal work

- The birthday is stored as **one fixed timestamp**:
  `Date.UTC(2026, 10, 30, 16, 0, 0)` = **December 1, 2026, 00:00:00 Asia/Manila (UTC+8)**
- Every tick compares `Date.now()` against that timestamp — accurate across refreshes, timezones, and device sleep. It is **not** a manually decreasing timer.
- When the countdown reaches zero the reveal starts **automatically** (no refresh needed).
- If the site is opened **at or after** midnight, it goes straight to the reveal — never a negative countdown.
- The unlock persists for the browser session (`sessionStorage`), so a refresh mid-countdown doesn't ask for the passcode again.

### Testing the midnight transition (before Dec 1)

In **development only**, add `?sim=45` to the URL to make the birthday arrive in 45 seconds:

```
http://localhost:5173/?sim=45
```

The parameter is ignored in production builds.

---

## 🔐 Security note about the passcode

The passcode is **client-side only**. It is a playful, personal gate — **not real authentication**. Anyone who views the website's source code can find the passcode. That is expected and acceptable for a private personal gift, but:

- Do **not** reuse this passcode for anything that needs actual security
- Do **not** treat this site as private hosting — anyone with the URL can open it

---

## 🚀 Deploying

The build uses **relative asset paths** (`base: './'`), so it works anywhere.

### Netlify

1. Push the project to GitHub
2. New site → import the repo
3. Build command: `npm run build` · Publish directory: `dist`
4. (No redirect rules needed — there is no client-side router)

### GitHub Pages

1. Push to GitHub
2. Build locally with `npm run build`
3. Publish the contents of `dist/` to your Pages branch (or use the *Actions* workflow approach with `actions/upload-pages-artifact`)
4. Because assets are relative, it works at `https://<user>.github.io/<repo>/` with no config changes

> Tip: `index.html` already sets `noindex, nofollow` so search engines won't surface the site.

---

## 📁 Project structure

```
src/
├── config/site.config.ts          # ALL personal content (edit this)
├── lib/time.ts                    # single source of truth for the birthday timestamp
├── hooks/useCountdown.ts          # accurate ticking against the target
├── hooks/useStage.ts              # passcode → countdown → reveal flow
├── components/
│   ├── stages/PasscodePage.tsx    # Stage 1 — secret entrance
│   ├── stages/CountdownPage.tsx   # Stage 2 — countdown landing
│   ├── stages/BirthdayReveal.tsx  # Stage 3 — orchestrates the reveal
│   ├── countdown/CountdownTimer.tsx
│   ├── reveal/BirthdayGreeting.tsx# cinematic midnight greeting
│   ├── sections/MemoryGallery.tsx # photo gallery + filters
│   ├── sections/VideoMemories.tsx # video cards
│   ├── sections/LoveLetter.tsx    # envelope → letter animation
│   ├── sections/FinalMessage.tsx  # closing message + replay
│   └── ui/                        # particles, lightbox, modal, ornaments
public/
├── photos/                        # put her pictures here
└── videos/                        # put MP4 clips here
```

---

Made with love. Happy birthday. 🥂
