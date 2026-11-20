/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — everything personal lives in this file.
 *
 *  • PASSCODE         → change the digits that unlock the site
 *  • LETTER_MESSAGE   → your full love letter (plain text, blank
 *                       line = new paragraph)
 *  • PHOTOS           → drop files into  public/photos/  then
 *                       list them below
 *  • VIDEOS           → drop MP4 files into  public/videos/
 *
 *  ⚠ SECURITY NOTE: this passcode is CLIENT-SIDE only. It is a
 *  playful gate, not real authentication — anyone who views the
 *  website's source code can find it. That is expected and
 *  acceptable for a private personal gift, but do not reuse this
 *  passcode for anything that needs actual security.
 * ─────────────────────────────────────────────────────────────
 */

export const PASSCODE = '0515'

export interface Photo {
  /** Path relative to public/ — e.g. "photos/us-1.jpg". Empty string = elegant placeholder. */
  src: string
  /** Optional size hint for the masonry layout */
  size?: 'normal' | 'tall' | 'wide'
}

export interface VideoItem {
  /** Path relative to public/ — e.g. "videos/clip-1.mp4" */
  src: string
  title: string
  /** Optional poster image relative to public/ — e.g. "videos/thumb-1.jpg" */
  thumbnail?: string
}

/* ── Photos ──────────────────────────────────────────────────
   Files live in  public/photos/                              */
export const PHOTOS: Photo[] = [
  { src: 'photos/pic1.jpg', size: 'tall' },
  { src: 'photos/pic2.jpg', size: 'tall' },
  { src: 'photos/pic5.jpg', size: 'tall' },
  { src: 'photos/pic3.jpg', size: 'wide' },
  { src: 'photos/pic6.jpg', size: 'tall' },
  { src: 'photos/pic7.jpg', size: 'wide' },
  { src: 'photos/pic4.jpg', size: 'tall' },
  { src: 'photos/pic8.jpg', size: 'wide' },
  { src: 'photos/pic9.jpg', size: 'tall' },
  { src: 'photos/pic10.jpg', size: 'wide' },
]

/* ── Videos ────────────────────────────────────────────────
   Files live in  public/videos/  — edit any title.          */
export const VIDEOS: VideoItem[] = [
  { src: 'videos/vid1.mp4', title: 'A moment with you' },
  { src: 'videos/vid2.mp4', title: 'One of my favorites' },
  { src: 'videos/vid3.mp4', title: 'Us, being us' },
  { src: 'videos/vid4.mp4', title: 'A little piece of forever' },
  { src: 'videos/vid5.mp4', title: 'Your favorite kind of day' },
  { src: 'videos/vid6.mp4', title: 'Just because I love you' },
  { src: 'videos/vid7.mp4', title: 'A memory I keep close' },
  { src: 'videos/vid8.mp4', title: 'The best of us' },
]

/* ── The letter ────────────────────────────────────────────
   Blank line = new paragraph. Edit every word of this.        */
export const LETTER_MESSAGE = `Happy Birthday, my baby.

I hope you know how special you are to me. I made this little website because I wanted to give you something different, something you can open and revisit whenever you want.

Thank you for being part of my life, for all the memories we've made, and for all the little things that make you special.

I may not always have the perfect words, but I hope my actions remind you how much I love and appreciate you.

I wish you happiness, good health, success, and everything your heart wishes for.

I love you so much.

Happy Birthday, my baby. ❤️`

/* ── Final section copy ──────────────────────────────────── */
export const FINAL_LINES = {
  wish: "My only wish is that someday soon, I'll get to celebrate every birthday with you as your husband. I can't wait for the day when our dreams become our reality, when I get to wake up beside you and call you my wife. I don't just want you in my today; I want you in all of my tomorrows.",
  
  closing: 'Happy Birthday, My Baby! ❤️',
  date: 'December 1, 2026',
}
