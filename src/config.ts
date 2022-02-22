import 'source-map-support/register';
import { PicSourceConfig } from 'koishi-plugin-pics';
import { DefineSchema, RegisterSchema } from 'koishi-thirdeye';
import { PicSourceInfo } from 'koishi-plugin-pics/dist/src';

@RegisterSchema()
export class PicSourceLoliconPluginConfig
  extends PicSourceConfig
  implements PicSourceInfo
{
  constructor(config: Partial<PicSourceLoliconPluginConfig>) {
    super();
  }

  @DefineSchema({ description: '图源名称', default: 'lolicon' })
  name: string;

  @DefineSchema({
    description: '图片类型， 0 = 非 R18 ，1 = R18 ，2 = 混合',
    default: 2,
  })
  r18: number;

  @DefineSchema({
    type: 'object',
    default: {},
    hidden: true,
    description:
      '额外的 POST 参数，参照 [Lolicon 文档](https://api.lolicon.app/#/setu?id=%e8%af%b7%e6%b1%82)',
  })
  extraConfig: any;

  @DefineSchema({
    description: 'Lolicon POST 地址',
    default: 'https://api.lolicon.app/setu/v2',
    hidden: true,
    role: 'url',
  })
  endpoint: string;
}

export type PicSourceLoliconPluginConfigLike =
  Partial<PicSourceLoliconPluginConfig>;
