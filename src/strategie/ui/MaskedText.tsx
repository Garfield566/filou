import { useMemo, useState } from 'react';
import { gameRules, gameVocabulary } from '../content';
import { interpreterCost } from '../core/technologies';
import { maskText } from '../language/mask';
import type { GameText, VisibleSegment } from '../types';
import { useGame } from './GameContext';
import { inkParts } from './text';

interface Props {
  text: GameText;
  /** Offer the interpreter. Off for an extract of a text that already offers it. */
  interpreter?: boolean;
  /** Off once the game is over: the rules no longer open a blot. */
  interactive?: boolean;
  /** Segments shown in clear and highlighted, for the end-of-game review. */
  highlight?: number[];
}

function plural(count: number, word: string): string {
  return `${count} ${word}${count > 1 ? 's' : ''}`;
}

function Ink({ length }: { length: number }) {
  return <span className="st-ink" style={{ width: `${length}ch` }} aria-hidden="true" />;
}

export function MaskedText({ text, interpreter = true, interactive = true, highlight = [] }: Props) {
  const { state, act, wordInfo } = useGame();
  const [openWord, setOpenWord] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const segments = useMemo(
    () => maskText(text, state.profile, gameVocabulary, state.revealedWords),
    [text, state.profile, state.revealedWords],
  );

  const cost = interpreterCost(state, gameRules);
  const translated = state.translatedTexts.includes(text.id);
  const open = openWord ? wordInfo(openWord) : undefined;

  const consult = (wordId: string) => {
    if (act({ type: 'lookUp', itemId: wordId })) {
      setOpenWord(wordId);
      setNotice(null);
    } else {
      setNotice(state.dictionaryLeft <= 0 ? 'Dictionnaire épuisé pour cette saison.' : 'Ce mot ne peut pas être consulté.');
    }
  };

  const renderBlot = (segment: VisibleSegment, key: number) =>
    inkParts(segment.text).map((part, index) => {
      if ('gap' in part) return part.gap;
      const label = `Mot masqué de ${plural(part.ink, 'lettre')}`;
      const { wordId } = segment;
      if (!interactive || !wordId) {
        return (
          <span key={`${key}-${index}`} className="st-blot" role="img" aria-label={label}>
            <Ink length={part.ink} />
          </span>
        );
      }
      return (
        <button
          key={`${key}-${index}`}
          type="button"
          className="st-blot st-blot-button"
          aria-label={`${label} : consulter le dictionnaire (reste ${state.dictionaryLeft})`}
          onClick={() => consult(wordId)}
        >
          <Ink length={part.ink} />
        </button>
      );
    });

  const renderSegment = (segment: VisibleSegment, index: number) => {
    if (highlight.includes(index)) return <mark key={index}>{segment.text}</mark>;
    if (segment.display === 'tache') return renderBlot(segment, index);
    const { wordId } = segment;
    if (interactive && wordId && state.revealedWords.includes(wordId)) {
      return (
        <button
          key={index}
          type="button"
          className="st-revealed"
          aria-label={`${segment.text} : revoir la traduction`}
          onClick={() => setOpenWord(wordId)}
        >
          {segment.text}
        </button>
      );
    }
    if (segment.display === 'transparent') {
      return (
        <span key={index} className="st-transparent">
          {segment.text}
        </span>
      );
    }
    return <span key={index}>{segment.text}</span>;
  };

  return (
    <div className="st-text">
      <p className="st-english" lang="en">
        {segments.map(renderSegment)}
      </p>
      {open && (
        <p className="st-gloss" role="status">
          <span lang="en">{open.target}</span> : {open.fr}
        </p>
      )}
      {notice && (
        <p className="st-gloss" role="status">
          {notice}
        </p>
      )}
      {translated && (
        <p className="st-interpreted">
          <span className="st-label">Interprète :</span> {text.fr}
        </p>
      )}
      {interpreter && interactive && !translated && (
        <button
          type="button"
          className="st-button st-button-small"
          disabled={state.colony.deniers < cost}
          onClick={() => act({ type: 'useInterpreter', textId: text.id })}
        >
          Interprète · {plural(cost, 'denier')}
        </button>
      )}
    </div>
  );
}
