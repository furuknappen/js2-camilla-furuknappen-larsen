export function cleanUpTags(tags: string[]) {
  // const tags = post.tags as string[];
  const tagPill = document.createElement("span");
  tags.forEach((tag) => {
    if (tag.includes(" ")) {
      const splitTags = tag.split(/\s+/).filter((t) => t.length > 0);
      splitTags.forEach((singleTag) => {
        const cleanTag = `#${singleTag.replace(/^#+/, " ")}`;
        tagPill.append(cleanTag + " ");
      });
    } else {
      const cleanTag = `#${tag.replace(/^#+/, " ")}`;
      tagPill.append(cleanTag + " ");
    }
  });

  return tagPill;
}
