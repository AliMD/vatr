import {addAdmin, isAdmin} from '../admin.js';
import {config} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {userComposer} from '../lib/bot.js';

userComposer.command('setAdmin', async (ctx) => {
  const token = ctx.commandArgs;
  if (token == null || token !== config.telegramBot.adminToken) return; // incorrect token

  ctx.isAdminCallback = isAdmin;
  if (ctx.isAdmin) {
    await ctx.replyToChat(message('command_set_admin_added_before'));
  }
  else {
    addAdmin(ctx.chatId as number);
    await ctx.replyToChat(message('command_set_admin_success'));
  }
});