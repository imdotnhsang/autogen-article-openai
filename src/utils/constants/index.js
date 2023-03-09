const Regex = {
  POST: /\\n\\nName: (?<name>.*)\\nSlug: (?<slug>.*)\\nExcerpt: (?<excerpt>.*)\\nRich Text: (?<richText>.*)/gm,
};

export { Regex };
