import {setLastNotifyMessageId} from '../chat.js';
import {message} from '../director/l18e-loader.js';
import {botAdminComposer, bot, handleSendMessageError} from '../lib/bot.js';
import {chatStorageEngine} from '../lib/storage.js';

botAdminComposer.command('notify', async (ctx) => {
  const messageText = ctx.commandArgs;
  if (messageText == null) {
    await ctx.replyToChat(message('command_notify_empty_message'));
    return;
  }

  for (const chat of chatStorageEngine.allObject()) {
    const response = await bot.sendMessage(
        +chat.id,
        messageText,
        undefined,
        handleSendMessageError,
    );
    if (response == null) continue;
    setLastNotifyMessageId(+chat.id, response.message_id);
  }

  ctx.replyToChat(message('command_notify_success'));
});
