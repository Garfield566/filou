import { describe, expect, it } from 'vitest';
import { grade, normalize, tokenize } from './grade';

describe('grade', () => {
  it('ignores case, punctuation, spacing and curly apostrophes', () => {
    expect(grade(['I am lost'], '  i  AM lost!')).toBe('correct');
  });

  it('treats contractions and full forms as the same answer', () => {
    expect(grade(['I am lost'], 'I’m lost.')).toBe('correct');
    expect(grade(["We don't know"], 'we do not know')).toBe('correct');
    expect(grade(['She cannot swim'], "she can't swim")).toBe('correct');
  });

  it('keeps a possessive apostrophe-s intact', () => {
    expect(normalize("Tom's bag")).toBe("tom's bag");
  });

  it('rejects wrong and empty answers', () => {
    expect(grade(['I am lost'], 'I am last')).toBe('wrong');
    expect(grade(['I am lost'], '   ')).toBe('wrong');
  });

  it('accepts German spelled without umlauts or ß', () => {
    expect(grade(['Für zwei Nächte'], 'fur zwei nachte')).toBe('correct');
    expect(grade(['Ich heiße Tom'], 'ich heisse tom')).toBe('correct');
  });

  it('forgives a slip inside a long word only when asked', () => {
    expect(grade(['I have a brother'], 'I have a brohter', { allowTypo: true })).toBe('typo');
    expect(grade(['I have a brother'], 'I have a brohter')).toBe('wrong');
  });

  it('never treats short words or word endings as typos', () => {
    const allowTypo = { allowTypo: true };
    expect(grade(['She is my sister'], 'He is my sister', allowTypo)).toBe('wrong');
    expect(grade(['Ich habe einen Bruder'], 'Ich habe einem Bruder', allowTypo)).toBe('wrong');
    expect(grade(['Das ist meine Mutter'], 'Das ist meinen Mutter', allowTypo)).toBe('wrong');
  });

  it('requires umlauts when grammar depends on them', () => {
    const exact = { exactAccents: true };
    expect(grade(['hätte'], 'hatte', exact)).toBe('wrong');
    expect(grade(['hätte'], 'hätte', exact)).toBe('correct');
    expect(grade(['größer'], 'GRÖSSER', exact)).toBe('correct');
  });
});

describe('tokenize', () => {
  it('drops punctuation, including the spaced kind used in French', () => {
    expect(tokenize('Hello, Tom!')).toEqual(['Hello', 'Tom']);
    expect(tokenize("Comment t'appelles-tu ?")).toEqual(['Comment', "t'appelles-tu"]);
  });
});
