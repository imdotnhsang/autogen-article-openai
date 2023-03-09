import "./register.js";
import openaiService from "./services/openai.js";
import webflowService from "./services/webflow.js";

const getOnePost = async () => {
  const { name, slug, excerpt, richText } = await openaiService.createContent();

  const coverUrl = await openaiService.createCoverUrl(name);

  return {
    name,
    slug,
    excerpt,
    richText,
    coverUrl,
  };
};

const createdPost = await getOnePost();

const createdPostOnWebflow = await webflowService.createOnePostOnWebflow(
  createdPost
);

await webflowService.publishOnePostOnWebflow(createdPostOnWebflow.data._id);