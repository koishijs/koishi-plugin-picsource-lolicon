// import 'source-map-support/register';
import { PicSourceLoliconPluginConfig } from './config';
import { PicResult, PicSourcePlugin } from 'koishi-plugin-pics';
import { LoliconReturnMessage } from './def';
import { DefinePlugin } from 'koishi-thirdeye';

@DefinePlugin({
  name: 'picsource-lolicon',
  schema: PicSourceLoliconPluginConfig,
})
export default class PicSourceLolicon extends PicSourcePlugin<PicSourceLoliconPluginConfig> {
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
      this.logger.warn(
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
      url: this.config.getExactUrl(data.urls.original),
      description: `PID:${data.pid} ${data.title} by ${data.author}`,
    };
  }
}
