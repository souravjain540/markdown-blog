import { SortOrder } from "../../util/SortOrder";

export type ArticleOrderByInput = {
  content?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  shortDescription?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
};
