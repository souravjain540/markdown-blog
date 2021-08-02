import { ArticleWhereInput } from "./ArticleWhereInput";
import { ArticleOrderByInput } from "./ArticleOrderByInput";

export type ArticleFindManyArgs = {
  where?: ArticleWhereInput;
  orderBy?: ArticleOrderByInput;
  skip?: number;
  take?: number;
};
