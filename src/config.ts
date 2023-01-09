import { DefineSchema, RegisterSchema } from 'koishi-thirdeye';

@RegisterSchema()
export class PicSourceLoliconPluginConfig {
  constructor(config: Partial<PicSourceLoliconPluginConfig>) {}

  @DefineSchema({ description: '图源名称', default: 'lolicon' })
  name: string;

  @DefineSchema({
    description: '图片类型， 0 = 非 R18 ，1 = R18 ，2 = 混合。',
    default: 2,
  })
  r18: number;

  @DefineSchema({
    type: 'object',
    default: {},
    hidden: true,
    description:
      '额外的 POST 参数，参照 [Lolicon 文档](https://api.lolicon.app/#/setu?id=%e8%af%b7%e6%b1%82) 。',
  })
  extraConfig: any;

  @DefineSchema({
    description: 'Lolicon POST 地址。',
    default: 'https://api.lolicon.app/setu/v2',
    hidden: true,
    role: 'url',
  })
  endpoint: string;

  @DefineSchema({ description: '使用的镜像站，不包含协议。' })
  mirror: string;

  getExactUrl(url: string): string {
    if (!this.mirror) {
      return url;
    }
    return url.replace(
      'https://i.pixiv.cat',
      this.mirror.startsWith('http') ? this.mirror : `https://${this.mirror}`,
    );
  }
}

export type PicSourceLoliconPluginConfigLike =
  Partial<PicSourceLoliconPluginConfig>;
