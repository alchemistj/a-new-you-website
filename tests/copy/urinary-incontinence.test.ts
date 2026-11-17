import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { serviceLabels } from '../../src/data/nav';
import { page } from '../../src/data/pages/urinary-incontinence';
import { page as vaginal } from '../../src/data/pages/vaginal-wellness';
import { rich } from '../../src/lib/rich';
import type { Section } from '../../src/types/page';

const copy = readFileSync(resolve(__dirname, '../../docs/client/urinary-incontinence-copy-from-cindy.md'), 'utf8');

function normCopyLine(line: string): string {
  return line
    .replace(/^#{1,3} /, '')
    .replace(/^- /, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\*\*([\s\S]+)\*\*$/, '$1')
    .replace(/^\*([\s\S]+)\*$/, '$1');
}

function normPage(s: string): string {
  return s
    .replace(/<a\s+href="[^"]+"[^>]*>/g, '')
    .replace(/<\/a>/g, '')
    .replace(/<\/?strong>/g, '')
    .replace(/<\/?em>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

function bodyStrings(sections: Section[]): string[] {
  const out: string[] = [page.hero.h1];
  for (const s of sections) {
    if (s.kind === 'faq' || s.kind === 'cta') continue;
    if ('heading' in s && s.heading) out.push(s.heading);
    if (s.kind === 'prose') out.push(...s.paragraphs);
    if (s.kind === 'list') {
      if (s.intro) out.push(s.intro);
      out.push(...s.items);
      if (s.outro) out.push(s.outro);
    }
  }
  return out.map(normPage);
}

describe('urinary incontinence page', () => {
  const h1At = copy.indexOf('# Urinary Incontinence in Springfield, MO and What You Can Do About It');
  const bodyLines = copy
    .slice(h1At)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map(normCopyLine);

  it('uses her title, description, route and the vaginal wellness cross-link', () => {
    expect(page.slug).toBe('urinary-incontinence');
    expect(page.route).toBe('/urinary-incontinence/');
    expect(page.publish).toBe(true);
    expect(page.template).toBe('service');
    expect(page.oldUrls).toEqual([]);
    expect(page.seo.title).toBe(copy.match(/\*\*SEO title:\*\* (.+)/)?.[1]);
    expect(page.seo.description).toBe(copy.match(/\*\*Meta description:\*\* (.+)/)?.[1]);
    expect(page.hero.h1).toBe('Urinary Incontinence in Springfield, MO and What You Can Do About It');
    expect(page.hero.primaryCta).toMatchObject({
      label: 'Schedule an Appointment',
      href: 'https://anewyouwomensclinic.myaestheticrecord.com/online-booking',
    });
    expect(page.hero.image?.src).toBe('pages/vaginal-wellness/consultation.jpg');
    expect(page.related).toEqual(['vaginal-wellness', 'menopause', 'perimenopause']);
    expect(page.serviceArea).toContain('Springfield');
    expect(vaginal.related).toContain('urinary-incontinence');
    const labels = Object.keys(serviceLabels);
    expect(labels[labels.indexOf('vaginal-wellness') + 1]).toBe('urinary-incontinence');
  });

  it('keeps every sentence from her copy and adds none in the body', () => {
    expect(bodyStrings(page.sections).sort()).toEqual(bodyLines.sort());
  });

  it('FAQ answers are her exact sentences from the copy file', () => {
    const faq = page.sections.find((s) => s.kind === 'faq');
    expect(faq?.kind).toBe('faq');
    if (faq?.kind !== 'faq') return;
    expect(faq.items.length).toBeGreaterThanOrEqual(4);
    expect(faq.items.length).toBeLessThanOrEqual(6);
    const questions = [
      'What is urinary incontinence?',
      'What is stress incontinence?',
      'What is urge incontinence?',
      'Do I need to know what type I have before I call?',
      'Are VTone, FormaV and Morpheus8V proven cures?',
      'When should I seek care right away?',
    ];
    expect(faq.items.map((item) => item.q)).toEqual(questions);
    for (const item of faq.items) {
      expect(item.a.length).toBeGreaterThan(0);
      for (const answer of item.a) {
        expect(answer, answer).not.toMatch(/[<*]/);
        expect(copy.includes(answer), answer).toBe(true);
      }
    }
  });

  it('opens her eight sources in a new tab', () => {
    const sources = page.sections.find((s) => s.kind === 'list' && s.heading === 'Sources and Further Reading');
    expect(sources?.kind).toBe('list');
    if (sources?.kind !== 'list') return;
    const urls = [...copy.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1]);
    expect(sources.items).toHaveLength(8);
    expect(urls).toHaveLength(8);
    sources.items.forEach((item, i) => {
      const html = rich(item);
      expect(html).toContain(`href="${urls[i]}"`);
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener"');
      expect(html).not.toContain('target="_blank" target');
    });
  });

  it('links vaginal wellness once, inside Where Vaginal Wellness Fits In', () => {
    const where = page.sections.find((s) => s.kind === 'prose' && s.heading === 'Where Vaginal Wellness Fits In');
    expect(where?.kind).toBe('prose');
    if (where?.kind !== 'prose') return;
    const linked = where.paragraphs.filter((p) => p.includes('[vaginal wellness](/vaginal-rejuvenation/)'));
    expect(linked).toEqual([
      'Because these concerns can occur together, we describe this as [vaginal wellness](/vaginal-rejuvenation/)—our focus is your vaginal wellness as part of your overall health and comfort.',
    ]);
    const body = JSON.stringify(page.sections.filter((s) => s.kind !== 'faq'));
    expect(body.split('/vaginal-rejuvenation/').length - 1).toBe(1);
    expect(body).toContain('In the Meantime Stay Beautiful & Be Well.');
  });
});
