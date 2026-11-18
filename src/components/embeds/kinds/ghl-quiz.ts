import type { EmbedDef } from '../embeds';

const GHL_HOST = 'https://link.aestheticrecord.com';
const GHL_SURVEY_ID = 'NgxRM6NWFTi1Q8AS8XFU';

export const embed: EmbedDef = {
  type: 'iframe',
  src: `${GHL_HOST}/widget/survey/${GHL_SURVEY_ID}`,
  script: `${GHL_HOST}/js/form_embed.js`,
  attrs: { id: GHL_SURVEY_ID, scrolling: 'no' },
  title: 'Free 2-Minute Quiz',
  heightMobile: 720,
  heightDesktop: 640,
  fallback: { href: `${GHL_HOST}/widget/survey/${GHL_SURVEY_ID}`, label: 'Take Our Free 2-Minute Quiz' },
};
