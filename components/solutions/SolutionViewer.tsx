"use client";

interface SolutionViewerProps {
  content: string;
}

export function SolutionViewer({ content }: SolutionViewerProps) {
  function renderMarkdown(md: string) {
    const lines = md.trim().split("\n");
    const html: string[] = [];
    let inTable = false;
    let inList = false;
    let listType: "ul" | "ol" = "ul";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Headers
      if (line.startsWith("### ")) {
        if (inList) {
          html.push(listType === "ul" ? "</ul>" : "</ol>");
          inList = false;
        }
        html.push(
          `<h3 class="mt-6 mb-2 text-base font-semibold text-neutral-100">${line.slice(4)}</h3>`,
        );
        continue;
      }
      if (line.startsWith("## ")) {
        if (inList) {
          html.push(listType === "ul" ? "</ul>" : "</ol>");
          inList = false;
        }
        html.push(
          `<h2 class="mt-8 mb-3 text-lg font-bold text-neutral-50">${line.slice(3)}</h2>`,
        );
        continue;
      }

      // Code blocks
      if (line.startsWith("```")) {
        if (inList) {
          html.push(listType === "ul" ? "</ul>" : "</ol>");
          inList = false;
        }
        // Find the closing ```
        const codeLines: string[] = [];
        let j = i + 1;
        while (j < lines.length && !lines[j].startsWith("```")) {
          codeLines.push(lines[j]);
          j++;
        }
        html.push(
          `<pre class="my-4 overflow-x-auto rounded-lg bg-neutral-800/70 border border-neutral-700/50 p-4"><code class="text-xs font-mono text-emerald-300/90">${codeLines.join("\n")}</code></pre>`,
        );
        i = j;
        continue;
      }

      // Table
      if (line.startsWith("|")) {
        if (!inTable) {
          if (inList) {
            html.push(listType === "ul" ? "</ul>" : "</ol>");
            inList = false;
          }
          html.push(
            '<div class="my-4 overflow-x-auto rounded-lg border border-neutral-800/60"><table class="w-full text-sm">',
          );
          inTable = true;
        }
        if (line.match(/^\|[\s-|]+$/)) continue;
        const cells = line
          .split("|")
          .filter(Boolean)
          .map((c) => c.trim());
        const isHeader = html.filter((h) => h.includes("<tr")).length === 0;
        const tag = isHeader ? "th" : "td";
        const cellClass = isHeader
          ? 'class="px-3 py-2 text-left text-xs font-medium text-neutral-400 bg-neutral-900/50"'
          : 'class="px-3 py-2 text-neutral-300 border-t border-neutral-800/40"';
        html.push(
          `<tr>${cells.map((c) => `<${tag} ${cellClass}>${formatInline(c)}</${tag}>`).join("")}</tr>`,
        );
        continue;
      } else if (inTable) {
        html.push("</table></div>");
        inTable = false;
      }

      // Bullet list
      if (line.match(/^- /)) {
        if (!inList) {
          html.push('<ul class="my-2 space-y-1 ml-4">');
          inList = true;
          listType = "ul";
        }
        html.push(
          `<li class="text-sm text-neutral-300 flex gap-2"><span class="text-neutral-600 mt-1.5 shrink-0">•</span><span>${formatInline(line.slice(2))}</span></li>`,
        );
        continue;
      }

      // Numbered list
      if (line.match(/^\d+\. /)) {
        if (!inList) {
          html.push(
            '<ol class="my-2 space-y-1 ml-4 list-decimal list-inside">',
          );
          inList = true;
          listType = "ol";
        }
        const text = line.replace(/^\d+\.\s*/, "");
        html.push(
          `<li class="text-sm text-neutral-300">${formatInline(text)}</li>`,
        );
        continue;
      }

      if (inList) {
        html.push(listType === "ul" ? "</ul>" : "</ol>");
        inList = false;
      }

      // Empty line
      if (!line.trim()) {
        html.push('<div class="h-3"></div>');
        continue;
      }

      // Paragraph
      html.push(
        `<p class="text-sm leading-relaxed text-neutral-300">${formatInline(line)}</p>`,
      );
    }

    if (inTable) html.push("</table></div>");
    if (inList) html.push(listType === "ul" ? "</ul>" : "</ol>");
    return html.join("\n");
  }

  function formatInline(text: string): string {
    return text
      .replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="text-neutral-100 font-semibold">$1</strong>',
      )
      .replace(
        /`(.+?)`/g,
        '<code class="rounded bg-neutral-800 px-1.5 py-0.5 text-xs font-mono text-emerald-400">$1</code>',
      );
  }

  return (
    <article
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}
