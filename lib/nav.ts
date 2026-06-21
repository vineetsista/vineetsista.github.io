import { PROJECTS, SECTIONS } from './content';

export function scrollToSection(id: string): boolean {
  if (typeof document === 'undefined') return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

export function resolveSectionId(query: string): string | null {
  const q = query.trim().toLowerCase();
  const match = SECTIONS.find((s) => s.id === q || s.label === q);
  return match ? match.id : null;
}

export function findProject(query: string) {
  const q = query.trim().toLowerCase();
  return PROJECTS.find(
    (p) =>
      p.ticker.toLowerCase() === q ||
      p.name.toLowerCase() === q ||
      p.name.toLowerCase().includes(q),
  );
}

export function openExternal(url: string): void {
  if (typeof window !== 'undefined') window.open(url, '_blank', 'noopener,noreferrer');
}

export async function copyEmail(email: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(email);
    return true;
  } catch {
    return false;
  }
}
