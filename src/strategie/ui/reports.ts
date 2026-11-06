import type { GameText, ReportLabels, TextSegment } from '../content/schemas';
import type { Npc, Report } from '../types';

const SLOT = /(\{[^}]+\})/;
const MISSING = '…';

type Filler = string | GameText;

export interface ReportContext {
  labels: ReportLabels;
  npcs: Pick<Npc, 'id' | 'name'>[];
}

function fillerOf(slot: string, report: Report, { labels, npcs }: ReportContext): Filler {
  const value = report.values[slot];
  if (value === undefined) return MISSING;
  const id = String(value);
  if (slot === 'batiment') return labels.batiment[id] ?? id;
  if (slot === 'raison') return labels.raison[id] ?? id;
  if (slot === 'pnj') return npcs.find((npc) => npc.id === id)?.name ?? id;
  return id;
}

const slotName = (piece: string): string | null => (piece.startsWith('{') && piece.endsWith('}') ? piece.slice(1, -1) : null);

/** Words and numbers join the text around them; a label keeps its own segments, so its words can be blotted. */
function fillSegment(segment: TextSegment, report: Report, context: ReportContext): TextSegment[] {
  if (!SLOT.test(segment.text)) return [segment];
  const filled: TextSegment[] = [];
  let run = '';
  const closeRun = () => {
    if (run) filled.push({ ...segment, text: run });
    run = '';
  };
  for (const piece of segment.text.split(SLOT)) {
    const slot = slotName(piece);
    const filler = slot === null ? piece : fillerOf(slot, report, context);
    if (typeof filler === 'string') run += filler;
    else {
      closeRun();
      filled.push(...filler.segments);
    }
  }
  closeRun();
  return filled;
}

function fillFrench(text: string, report: Report, context: ReportContext): string {
  return text
    .split(SLOT)
    .map((piece) => {
      const slot = slotName(piece);
      if (slot === null) return piece;
      const filler = fillerOf(slot, report, context);
      return typeof filler === 'string' ? filler : filler.fr;
    })
    .join('');
}

/**
 * A report as the player reads it. Its id names this very report: the interpreter is paid per text,
 * and the harvest of the next season is not the one already translated.
 */
export function fillReport(report: Report, position: number, template: GameText, context: ReportContext): GameText {
  const { audio, ...rest } = template;
  const hasSlots = template.segments.some((segment) => SLOT.test(segment.text));
  return {
    ...rest,
    ...(audio && !hasSlots ? { audio } : {}),
    id: `${template.id}@${report.season}.${position}`,
    segments: template.segments.flatMap((segment) => fillSegment(segment, report, context)),
    fr: fillFrench(template.fr, report, context),
  };
}
