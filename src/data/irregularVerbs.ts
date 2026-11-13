import type { VerbFamily } from '../types';
import german from './verbs/de.json';
import english from './verbs/en.json';

/**
 * The complete lists of irregular verbs, built by scripts/verbs/ (Wiktionary, then reviewed) and checked by
 * scripts/verbs/publish.py: every verb taught before keeps its name and forms, so its reviews carry on.
 * Each family is a unit of the verbs path; rare verbs come last.
 */
export const ENGLISH_FORM_LABELS = ['prétérit', 'participe passé'];
export const GERMAN_FORM_LABELS = ['3e personne', 'Präteritum', 'Perfekt'];

export const englishVerbFamilies: VerbFamily[] = english.families;
export const germanVerbFamilies: VerbFamily[] = german.families;
