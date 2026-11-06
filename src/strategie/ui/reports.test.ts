import { describe, expect, it } from 'vitest';
import { reportLabels, reports } from '../content';
import type { Report } from '../types';
import { fillReport } from './reports';
import { plainText } from './text';

const context = { labels: reportLabels, npcs: [{ id: 'bailli', name: 'Walter Ashby' }] };
const templateOf = (textId: string) => reports.find((report) => report.textId === textId)!.text;
const fill = (report: Report, position = 0) => fillReport(report, position, templateOf(report.textId), context);

describe('fillReport', () => {
  it('fills numbers in both languages', () => {
    const text = fill({ season: 1, textId: 'rapport.recolte', values: { ble: 2, poisson: 3, laine: 0, deniers: 4 } });
    for (const filled of [plainText(text), text.fr]) expect(filled.match(/\d+/g)).toEqual(['2', '3', '0', '4']);
  });

  it('keeps the word ids of the text', () => {
    const text = fill({ season: 1, textId: 'rapport.recolte', values: { ble: 2, poisson: 3, laine: 0, deniers: 4 } });
    const wordIds = (segments: { wordId?: string }[]) => segments.flatMap((segment) => segment.wordId ?? []);
    expect(wordIds(text.segments)).toEqual(wordIds(templateOf('rapport.recolte').segments));
    expect(wordIds(text.segments)).toContain('en:b:wheat');
  });

  it('fills an id with its label, whose words can still be blotted', () => {
    const text = fill({ season: 1, textId: 'rapport.chantier.impossible', values: { batiment: 'bergerie', raison: 'fonds' } });
    expect(plainText(text)).toBe('We cannot build the sheep farm: we do not have enough money.');
    expect(text.segments.some((segment) => segment.wordId === 'en:b:sheep')).toBe(true);
    expect(text.fr).toContain('bergerie');
    expect(text.fr).toContain("nous n'avons pas assez d'argent");
  });

  it('names the NPC', () => {
    const text = fill({ season: 1, textId: 'rapport.ordre.precision', values: { pnj: 'bailli', verbe: 'construire', objet: 'ferme' } });
    expect(plainText(text)).toMatch(/^Walter Ashby did not understand/);
    expect(text.fr).toMatch(/^Walter Ashby/);
  });

  it('leaves no slot in any report, in either language', () => {
    const values = { ble: 1, poisson: 1, laine: 1, deniers: 1, batiment: 'ferme', raison: 'fonds', x: 1, y: 2, surcout: 2, pnj: 'bailli', attaque: 10, defense: 12 };
    for (const { textId } of reports) {
      const text = fill({ season: 1, textId, values });
      expect(plainText(text)).not.toMatch(/[{}]/);
      expect(text.fr).not.toMatch(/[{}]/);
    }
  });

  it('shows the raw id of an unknown building rather than nothing', () => {
    const text = fill({ season: 1, textId: 'rapport.chantier.impossible', values: { batiment: 'tour', raison: 'inconnu' } });
    expect(plainText(text)).toContain('the tour:');
  });

  it('marks a missing value instead of showing its slot', () => {
    const text = fill({ season: 1, textId: 'rapport.chantier.fini', values: { batiment: 'ferme', x: 1 } });
    expect(plainText(text)).toBe('The work is finished: the new farm stands at 1, ….');
  });

  it('gives each report its own id, so the interpreter is paid again', () => {
    const report = { season: 1, textId: 'rapport.recolte', values: { ble: 1, poisson: 1, laine: 1, deniers: 1 } };
    expect(fill(report).id).not.toBe(fill({ ...report, season: 2 }).id);
    expect(fill(report, 0).id).not.toBe(fill(report, 1).id);
  });

  it('keeps the audio of a fixed text only', () => {
    expect(fill({ season: 1, textId: 'rapport.village', values: {} }).audio).toBeDefined();
    expect(fill({ season: 1, textId: 'rapport.chantier.fini', values: { batiment: 'ferme', x: 1, y: 2 } }).audio).toBeUndefined();
  });
});
