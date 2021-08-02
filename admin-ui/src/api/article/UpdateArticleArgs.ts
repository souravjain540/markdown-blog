import { ArticleWhereUniqueInput } from "./ArticleWhereUniqueInput";
import { ArticleUpdateInput } from "./ArticleUpdateInput";

export type UpdateArticleArgs = {
  where: ArticleWhereUniqueInput;
  data: ArticleUpdateInput;
};
