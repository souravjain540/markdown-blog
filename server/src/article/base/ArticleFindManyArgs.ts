import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ArticleWhereInput } from "./ArticleWhereInput";
import { Type } from "class-transformer";
import { ArticleOrderByInput } from "./ArticleOrderByInput";

@ArgsType()
class ArticleFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ArticleWhereInput,
  })
  @Field(() => ArticleWhereInput, { nullable: true })
  @Type(() => ArticleWhereInput)
  where?: ArticleWhereInput;

  @ApiProperty({
    required: false,
    type: ArticleOrderByInput,
  })
  @Field(() => ArticleOrderByInput, { nullable: true })
  @Type(() => ArticleOrderByInput)
  orderBy?: ArticleOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { ArticleFindManyArgs };
