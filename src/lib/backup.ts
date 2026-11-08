import { initialProgress, type Progress } from './progress';

/**
 * A backup code holds the whole progress, compressed: Filou has no server, so the code itself carries the data.
 * It is copied on one device and pasted on another (by email or a message to oneself), or saved as a file.
 */
const PREFIX = 'FILOU1-';

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(text: string): Uint8Array {
  const base64 = text.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64 + '='.repeat((4 - (base64.length % 4)) % 4));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function through(bytes: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const output = new Blob([bytes]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(output).arrayBuffer());
}

export async function backupCode(progress: Progress): Promise<string> {
  const json = new TextEncoder().encode(JSON.stringify(progress));
  return PREFIX + toBase64Url(await through(json, new CompressionStream('deflate')));
}

export class BackupError extends Error {}

/** The progress inside a code. Spaces and line breaks added while copying are ignored. */
export async function restoreBackup(code: string, now: number): Promise<Progress> {
  const clean = code.replace(/\s+/g, '');
  if (!clean.startsWith(PREFIX)) throw new BackupError('Ce texte n’est pas un code de sauvegarde Filou.');
  let data: unknown;
  try {
    const bytes = await through(fromBase64Url(clean.slice(PREFIX.length)), new DecompressionStream('deflate'));
    data = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new BackupError('Ce code est incomplet ou abîmé : recopie-le en entier.');
  }
  if (!data || typeof data !== 'object' || typeof (data as Progress).memory !== 'object' || !Array.isArray((data as Progress).completedLessons)) {
    throw new BackupError('Ce code ne contient pas de progression Filou.');
  }
  // Fields added by later versions of Filou get their default value.
  return { ...initialProgress(now), ...(data as Partial<Progress>) };
}
