import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ArticleServiceBase } from "./base/article.service.base";

@Injectable()
export class ArticleService extends ArticleServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
