import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { BackupError, backupCode, restoreBackup } from '../lib/backup';
import type { Progress } from '../lib/progress';

interface Props {
  progress: Progress;
  setProgress: Dispatch<SetStateAction<Progress>>;
  onBack: () => void;
}

/** Moves the progress from one device to another: no account, no server, the code carries everything. */
export function Backup({ progress, setProgress, onBack }: Props) {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [pasted, setPasted] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    backupCode(progress).then(setCode);
  }, [progress]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setMessage('La copie automatique est bloquée : sélectionne le code et copie-le à la main.');
    }
  };

  const download = () => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([code], { type: 'text/plain' }));
    link.download = `filou-sauvegarde-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const restore = async (text: string) => {
    try {
      const restored = await restoreBackup(text, Date.now());
      if (!window.confirm('Remplacer la progression de cet appareil par celle du code ?')) return;
      setProgress(restored);
      setPasted('');
      setMessage(`Progression restaurée : ${restored.xp} XP, ${restored.completedLessons.length} leçons terminées.`);
    } catch (error) {
      setMessage(error instanceof BackupError ? error.message : 'Ce code n’a pas pu être lu.');
    }
  };

  return (
    <div className="home backup">
      <button className="back" onClick={onBack}>
        Retour
      </button>
      <h1>Sauvegarde</h1>
      <p>
        Pour continuer sur un autre appareil : copie ton code, envoie-le-toi (courriel, message), puis colle-le sur l’autre
        appareil. Le code contient toute ta progression ; il est long, c’est normal.
      </p>

      <section>
        <h2>Mon code</h2>
        <textarea readOnly value={code} rows={4} aria-label="Mon code de sauvegarde" onFocus={(event) => event.target.select()} />
        <div className="backup-buttons">
          <button className="primary" disabled={!code} onClick={copy}>
            {copied ? 'Code copié' : 'Copier mon code'}
          </button>
          <button disabled={!code} onClick={download}>
            Télécharger en fichier
          </button>
        </div>
        <small>Le code change à chaque progrès : recopie-le avant de changer d’appareil.</small>
      </section>

      <section>
        <h2>Reprendre ma progression</h2>
        <textarea value={pasted} rows={4} placeholder="Colle ici ton code FILOU1-…" aria-label="Code à restaurer" onChange={(event) => setPasted(event.target.value)} />
        <div className="backup-buttons">
          <button className="primary" disabled={!pasted.trim()} onClick={() => restore(pasted)}>
            Restaurer
          </button>
          <label className="file-button">
            Ouvrir un fichier
            <input type="file" accept=".txt,text/plain" onChange={(event) => event.target.files?.[0]?.text().then(restore)} />
          </label>
        </div>
      </section>

      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
