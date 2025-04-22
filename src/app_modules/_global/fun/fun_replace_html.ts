export function funReplaceHtml({html}:{ html: string }) {
  return html.replace(/<[^>]+>/g, "");
}