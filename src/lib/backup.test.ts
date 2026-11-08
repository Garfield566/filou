import { describe, expect, it } from 'vitest';
import { BackupError, backupCode, restoreBackup } from './backup';
import { initialProgress, recordReview } from './progress';

const now = new Date(2026, 10, 8, 12).getTime();

describe('backup code', () => {
  const progress = {
    ...recordReview(initialProgress(now), ['en:u:as:time', 'de:b:der Hund'], 'good', now),
    completedLessons: ['en-1-1'],
    vocabularyRank: { en: 5000, de: 2000 },
    xp: 120,
  };

  it('gives back exactly the same progress on another device', async () => {
    const code = await backupCode(progress);
    expect(code.startsWith('FILOU1-')).toBe(true);
    expect(await restoreBackup(code, now + 1000)).toEqual(progress);
  });

  it('survives the spaces and line breaks of a copy', async () => {
    const code = await backupCode(progress);
    const mangled = `  ${code.slice(0, 20)}\n${code.slice(20, 40)} ${code.slice(40)}  `;
    expect(await restoreBackup(mangled, now)).toEqual(progress);
  });

  it('fills in the fields a newer version added', async () => {
    const old = { ...progress } as Record<string, unknown>;
    delete old.readings;
    const restored = await restoreBackup(await backupCode(old as never), now);
    expect(restored.readings).toEqual([]);
  });

  it('refuses a text that is not a code, or a cut code, with a clear message', async () => {
    await expect(restoreBackup('bonjour', now)).rejects.toBeInstanceOf(BackupError);
    const code = await backupCode(progress);
    await expect(restoreBackup(code.slice(0, code.length / 2), now)).rejects.toBeInstanceOf(BackupError);
  });
});
