import { ArgsType, Field } from "@nestjs/graphql";
import { ArticleWhereUniqueInput } from "./ArticleWhereUniqueInput";

@ArgsType()
class DeleteArticleArgs {
  @Field(() => ArticleWhereUniqueInput, { nullable: false })
  where!: ArticleWhereUniqueInput;
}

export { DeleteArticleArgs };
