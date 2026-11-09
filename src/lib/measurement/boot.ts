import { captureAttributionOnEntry } from '../attribution/storage';
import { startJourneyTracking } from './bootstrap';

/**
 * Runs from a deferred module, after the document is parsed. Page views wait
 * for `load`. Nothing here is inline in the above-the-fold gap.
 */
export function bootJourneyTracking(): void {
  if (typeof window === 'undefined') return;
  captureAttributionOnEntry(window.location.pathname, window.location.search);
  startJourneyTracking();
}
