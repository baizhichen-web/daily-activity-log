export function buildEntryJsonLd(
  entry: Record<string, unknown>,
  kind: "writing" | "project",
  opts?: { siteUrl?: string; authorName?: string; authorAlias?: string },
): Record<string, unknown>;
