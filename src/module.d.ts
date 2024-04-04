declare module "https://esm.sh/shiki@1.0.0" {
  export function codeToHtml(
    code: string,
    options: { lang: string; theme: string }
  ): Promise<string>;
}
