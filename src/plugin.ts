import 'source-map-support/register';
import { Context, Schema } from 'koishi';
import {
  PicSourceLoliconPluginConfig,
  PicSourceLoliconPluginConfigLike,
} from './config';
import { schemaFromClass, schemaTransform } from 'koishi-utils-schemagen';
import { PicResult, PicSource } from 'koishi-plugin-pics';
import { LoliconReturnMessage } from './def';

export class PicSourceLolicon extends PicSource {
  constructor(ctx: Context, private config: PicSourceLoliconPluginConfig) {
    super(ctx);
    config.applyTo(this);
  }

  async randomPic(picTags: string[]): Promise<PicResult> {
    if (picTags.length > 3) {
      return;
    }
    const result = await this.ctx.http.post<LoliconReturnMessage>(
      this.config.endpoint,
      {
        r18: this.config.r18,
        num: 1,
        tag: picTags,
        ...this.config.extraConfig,
      },
    );
    if (result.error) {
      this.ctx
        .logger('picsource-lolicon')
        .warn(
          `Failed to get Lolicon random pic ${picTags.join(',')}: ${
            result.error
          }`,
        );
      return;
    }
    if (!result.data?.length) {
      return;
    }
    const data = result.data[0];
    if (!data.urls?.original) {
      return;
    }
    return {
      url: data.urls.original,
      description: `PID:${data.pid} ${data.title} by ${data.author}`,
    };
  }
}

export class PicSourceLoliconPlugin {
  private config: PicSourceLoliconPluginConfig;
  private ctx: Context;
  name = 'picsource-lolicon-main';
  schema: Schema<PicSourceLoliconPluginConfigLike> = schemaFromClass(
    PicSourceLoliconPluginConfig,
  );
  apply(ctx: Context, config: PicSourceLoliconPluginConfigLike) {
    this.ctx = ctx;
    this.config = schemaTransform(PicSourceLoliconPluginConfig, config);
    const source = new PicSourceLolicon(ctx, this.config);
    if (ctx.pics) {
      ctx.pics.addSource(source, ctx);
    }
    ctx.on('service/pics', () => ctx.pics.addSource(source, ctx));
  }
}
