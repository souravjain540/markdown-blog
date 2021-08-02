import { Article as TArticle } from "../api/article/Article";

export const ARTICLE_TITLE_FIELD = "title";

export const ArticleTitle = (record: TArticle) => {
  return record.title;
};
