import { Module } from "@nestjs/common";
import { ArticleModuleBase } from "./base/article.module.base";
import { ArticleService } from "./article.service";
import { ArticleController } from "./article.controller";
import { ArticleResolver } from "./article.resolver";

@Module({
  imports: [ArticleModuleBase],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleResolver],
  exports: [ArticleService],
})
export class ArticleModule {}
