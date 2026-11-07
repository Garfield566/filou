import { audioFile } from './audioFile';

let current: HTMLAudioElement | null = null;
let sequenceToken = 0;

function start(courseId: string, text: string, rate: number): HTMLAudioElement {
  current?.pause();
  const audio = new Audio(`${import.meta.env.BASE_URL}audio/${courseId}/${audioFile(text)}`);
  audio.playbackRate = rate;
  current = audio;
  return audio;
}

export function play(courseId: string, text: string, rate = 1): void {
  sequenceToken++;
  // Browsers may refuse playback before the first interaction; the speaker button still works.
  start(courseId, text, rate).play().catch(() => undefined);
}

export async function playSequence(
  courseId: string,
  texts: string[],
  onLine: (index: number) => void,
): Promise<void> {
  const token = ++sequenceToken;
  for (const [index, text] of texts.entries()) {
    if (token !== sequenceToken) return;
    onLine(index);
    const audio = start(courseId, text, 1);
    await new Promise<void>((resolve) => {
      audio.addEventListener('ended', () => resolve(), { once: true });
      audio.addEventListener('error', () => resolve(), { once: true });
      audio.play().catch(() => resolve());
    });
    await new Promise((resolve) => setTimeout(resolve, 350));
  }
}

/** A whole text, read from its own file. */
export function playFile(path: string): void {
  sequenceToken++;
  current?.pause();
  const audio = new Audio(`${import.meta.env.BASE_URL}${path}`);
  current = audio;
  audio.play().catch(() => undefined);
}

export function stopAudio(): void {
  sequenceToken++;
  current?.pause();
}
