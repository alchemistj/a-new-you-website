import { describe, expect, it } from 'vitest';
import { rich } from '../../src/lib/rich';

describe('rich text', () => {
  it('escapes plain text and keeps strong, em and markdown links', () => {
    expect(rich('a < b & "c"')).toBe('a &lt; b &amp; &quot;c&quot;');
    expect(rich('<strong>Bold line.</strong>')).toBe('<strong>Bold line.</strong>');
    expect(rich('<em>No embarrassment required.</em>')).toBe('<em>No embarrassment required.</em>');
    expect(rich('See [vaginal wellness](/vaginal-rejuvenation/) here.')).toBe(
      'See <a href="/vaginal-rejuvenation/">vaginal wellness</a> here.',
    );
  });

  it('keeps target and rel only when the anchor asks for them', () => {
    const html = rich('<a href="https://www.niddk.nih.gov/health-information/" target="_blank" rel="noopener">NIDDK</a>');
    expect(html).toBe('<a href="https://www.niddk.nih.gov/health-information/" target="_blank" rel="noopener">NIDDK</a>');
    expect(rich('<a href="https://example.com/">Example</a>')).toBe('<a href="https://example.com/">Example</a>');
    expect(rich('[Order Now](https://example.com/order)')).toBe('<a href="https://example.com/order">Order Now</a>');
  });

  it('does not turn an unsafe href into a link', () => {
    expect(rich('<a href="javascript:alert(1)">x</a>')).toBe('&lt;a href=&quot;javascript:alert(1)&quot;&gt;x&lt;/a&gt;');
  });
});