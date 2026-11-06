import { useEffect, useState } from 'react';

const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

function voiceFor(languageTag: string): SpeechSynthesisVoice | undefined {
  if (!supported) return undefined;
  const language = languageTag.split('-')[0].toLowerCase();
  return window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang.toLowerCase().replace('_', '-').split('-')[0] === language);
}

/** Without a matching voice, browsers read the text with another language's voice, or not at all. */
export function hasVoice(languageTag: string): boolean {
  return voiceFor(languageTag) !== undefined;
}

/** Follows the voice list, which browsers load after the page. */
export function useHasVoice(languageTag: string): boolean {
  const [available, setAvailable] = useState(() => hasVoice(languageTag));

  useEffect(() => {
    if (!supported) return;
    const update = () => setAvailable(hasVoice(languageTag));
    update();
    window.speechSynthesis.addEventListener('voiceschanged', update);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', update);
  }, [languageTag]);

  return available;
}

export function speak(text: string, languageTag: string, rate = 0.95): void {
  const voice = voiceFor(languageTag);
  if (!voice) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}
