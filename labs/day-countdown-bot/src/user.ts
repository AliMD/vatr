import {logger} from './config.js';
import {chatStorageEngine} from './lib/storage.js';

import type {User} from './type.js';

/**
 * Make disabled property in User true!
 */
export function deleteUser(chatId: string | number): void {
  logger.logMethodArgs('deleteUser', {chatId});
  chatStorageEngine.delete(chatId.toString());
}

export function isSubscribed(chatId: string | number): boolean {
  logger.logMethodArgs('isSubscribed', {chatId});
  return chatStorageEngine.has(chatId.toString());
}

export function setLastNotifyMessageId(chatId: string | number, messageId: number): void {
  logger.logMethodArgs('setLastNotifyMessageId', {chatId, messageId});
  const user = chatStorageEngine.get(chatId.toString()) as User;
  user.lastNotifyMessageId = messageId;
  chatStorageEngine.set(user);
}