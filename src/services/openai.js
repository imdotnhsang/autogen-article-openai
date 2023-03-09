import { Configuration, OpenAIApi } from "openai";

import { createLog } from "./logger.js";
import { Regex } from "../utils/constants/index.js";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const createContent = async () => {
  const res = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Write a random topic post with the following fields: Name, Slug, Excerpt, Rich Text (about 100 words)?",
    max_tokens: 3999,
  });

  createLog(res?.data);

  const {
    groups: { name, slug, excerpt, richText },
  } = Regex.POST.exec(JSON.stringify(res?.data?.choices?.[0]?.text));

  return {
    name,
    slug,
    excerpt,
    richText,
  };
};

const createCoverUrl = async (name) => {
  const res = await openai.createImage({
    prompt: name,
    n: 1,
    size: "512x512",
  });

  return res?.data?.data?.[0]?.url;
};

export default {
  createContent,
  createCoverUrl,
};
