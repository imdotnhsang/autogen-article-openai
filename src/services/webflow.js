import Webflow from "webflow-api";

const webflow = new Webflow({ token: process.env.WEBFLOW_API_KEY });

const createOnePostOnWebflow = async ({
  name,
  slug,
  excerpt,
  richText,
  coverUrl,
}) => {
  return webflow.post("collections/6404b4d39d73413ba2b167e8/items", {
    fields: {
      _archived: false,
      _draft: false,
      name: name,
      slug: slug?.toLowerCase(),
      "blog-post-richt-text": richText?.replace(
        /\\n|\\r\\n|\\n\\r|\\r/g,
        "<br>"
      ),
      "blog-post-category": "6404b68ab73c119f6535a0a8",
      "blog-post-author": "6404da3fbac13628018bf619",
      "blog-post-excerpt": excerpt?.replace(/\\n/g, ""),
      "blog-post-featured-image-photo": { url: coverUrl },
      "blog-post-thumbnail-image-photo": { url: coverUrl },
    },
  });
};

const publishOnePostOnWebflow = async (id) => {
  return webflow.put("/collections/6404b4d39d73413ba2b167e8/items/publish", {
    itemIds: [id],
  });
};

export default {
  createOnePostOnWebflow,
  publishOnePostOnWebflow
};
