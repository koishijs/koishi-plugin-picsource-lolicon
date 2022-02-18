import { Context } from 'koishi';
import PicsPlugin from 'koishi-plugin-pics';

export default class ExtrasInDev {
  constructor(ctx: Context) {
    ctx.plugin(PicsPlugin);
  }
}
