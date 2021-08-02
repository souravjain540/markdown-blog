import { ArgsType, Field } from "@nestjs/graphql";
import { ArticleWhereUniqueInput } from "./ArticleWhereUniqueInput";
import { ArticleUpdateInput } from "./ArticleUpdateInput";

@ArgsType()
class UpdateArticleArgs {
  @Field(() => ArticleWhereUniqueInput, { nullable: false })
  where!: ArticleWhereUniqueInput;
  @Field(() => ArticleUpdateInput, { nullable: false })
  data!: ArticleUpdateInput;
}

export { UpdateArticleArgs };
