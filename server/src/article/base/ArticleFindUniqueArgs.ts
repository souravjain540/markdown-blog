import { ArgsType, Field } from "@nestjs/graphql";
import { ArticleWhereUniqueInput } from "./ArticleWhereUniqueInput";

@ArgsType()
class ArticleFindUniqueArgs {
  @Field(() => ArticleWhereUniqueInput, { nullable: false })
  where!: ArticleWhereUniqueInput;
}

export { ArticleFindUniqueArgs };
