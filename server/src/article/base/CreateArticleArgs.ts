import { ArgsType, Field } from "@nestjs/graphql";
import { ArticleCreateInput } from "./ArticleCreateInput";

@ArgsType()
class CreateArticleArgs {
  @Field(() => ArticleCreateInput, { nullable: false })
  data!: ArticleCreateInput;
}

export { CreateArticleArgs };
