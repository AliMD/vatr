import {sendMessage} from '../bot/send-message.js';
import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

// Send message to admin
nanoServer.route('POST', '/', notify);

async function notify(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('notify');

  const bodyJson = await connection.requireJsonBody<{to: string, message: string}>();
  if (bodyJson == null) return;

  if (connection.requireToken(config.nanoServer.token))

  await sendMessage(bodyJson.to, bodyJson.message);

  connection.reply({
    ok: true,
    data: {},
  });
}
