import 'source-map-support/register';
import { DefineSchema, UseSchema } from 'koishi-utils-schemagen';
import { PicSourceConfig } from 'koishi-plugin-pics';

export class PicSourceLoliconPluginConfig extends PicSourceConfig {
  @DefineSchema({ desc: '图源名称', default: 'lolicon' })
  name: string;

  @DefineSchema({
    desc: '图片类型， 0 = 非 R18 ，1 = R18 ，2 = 混合',
    default: 2,
  })
  r18: number;

  @DefineSchema({
    type: 'object',
    allowUnknown: true,
    default: {},
    hidden: true,
    desc:
      '额外的 POST 参数，参照 [Lolicon 文档](https://api.lolicon.app/#/setu?id=%e8%af%b7%e6%b1%82)',
  })
  extraConfig: any;

  @DefineSchema({
    desc: 'Lolicon POST 地址',
    default: 'https://api.lolicon.app/setu/v2',
    hidden: true,
  })
  endpoint: string;
}

export type PicSourceLoliconPluginConfigLike = Partial<PicSourceLoliconPluginConfig>;
