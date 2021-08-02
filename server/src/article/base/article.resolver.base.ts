import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateArticleArgs } from "./CreateArticleArgs";
import { UpdateArticleArgs } from "./UpdateArticleArgs";
import { DeleteArticleArgs } from "./DeleteArticleArgs";
import { ArticleFindManyArgs } from "./ArticleFindManyArgs";
import { ArticleFindUniqueArgs } from "./ArticleFindUniqueArgs";
import { Article } from "./Article";
import { ArticleService } from "../article.service";

@graphql.Resolver(() => Article)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ArticleResolverBase {
  constructor(
    protected readonly service: ArticleService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "read",
    possession: "any",
  })
  async _articlesMeta(
    @graphql.Args() args: ArticleFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Article])
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "read",
    possession: "any",
  })
  async articles(
    @graphql.Args() args: ArticleFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Article[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Article",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Article, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "read",
    possession: "own",
  })
  async article(
    @graphql.Args() args: ArticleFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Article | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Article",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Article)
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "create",
    possession: "any",
  })
  async createArticle(
    @graphql.Args() args: CreateArticleArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Article> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Article",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Article"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Article)
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "update",
    possession: "any",
  })
  async updateArticle(
    @graphql.Args() args: UpdateArticleArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Article | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Article",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Article"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Article)
  @nestAccessControl.UseRoles({
    resource: "Article",
    action: "delete",
    possession: "any",
  })
  async deleteArticle(
    @graphql.Args() args: DeleteArticleArgs
  ): Promise<Article | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
