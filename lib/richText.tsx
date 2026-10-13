import { Fragment, type ReactNode } from "react";

/**
 * Splits a translated string on `{token}` placeholders and substitutes each
 * with the matching React node — used instead of next-intl's `t.rich()`,
 * which needs `<tag>...</tag>` pairs in the message text to work. Our
 * messages use bare `{token}` placeholders (so translators can move the
 * surrounding words freely without touching markup), so this does the
 * substitution as a plain string split instead.
 */
export function interpolateNodes(text: string, nodes: Record<string, ReactNode>): ReactNode {
  const parts = text.split(/(\{[a-zA-Z0-9]+\})/g);
  return parts.map((part, i) => {
    const match = /^\{([a-zA-Z0-9]+)\}$/.exec(part);
    if (match && nodes[match[1]] !== undefined) {
      return <Fragment key={i}>{nodes[match[1]]}</Fragment>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
