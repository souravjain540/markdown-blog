import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ArticleService } from "./article.service";
import { ArticleControllerBase } from "./base/article.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("articles")
@common.Controller("articles")
export class ArticleController extends ArticleControllerBase {
  constructor(
    protected readonly service: ArticleService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
