import 'source-map-support/register';
import { Context } from 'koishi';
import { PicSourceLoliconPlugin } from './plugin';
import { PicSourceLoliconPluginConfigLike } from './config';
export * from './config';
export * from './plugin';

export const name = 'picsource-lolicon';
const plugin = new PicSourceLoliconPlugin();
export const schema = plugin.schema;
export function apply(ctx: Context, config: PicSourceLoliconPluginConfigLike) {
  ctx.plugin(plugin, config);
}
