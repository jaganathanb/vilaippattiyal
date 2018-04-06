declare module.exports: typeof Transactiondeclare export interface TransactionLock {
UPDATE: 'UPDATE',
SHARE: 'SHARE',
KEY_SHARE: 'KEY SHARE',
NO_KEY_UPDATE: 'NO KEY UPDATE'
} declare export type TransactionType = 'DEFERRED' | 'IMMEDIATE' | 'EXCLUSIVE';declare export var TYPES: {
DEFERRED: 'DEFERRED',
IMMEDIATE: 'IMMEDIATE',
EXCLUSIVE: 'EXCLUSIVE'
};declare export var ISOLATION_LEVELS: {
READ_UNCOMMITTED: 'READ UNCOMMITTED',
READ_COMMITTED: 'READ COMMITTED',
REPEATABLE_READ: 'REPEATABLE READ',
SERIALIZABLE: 'SERIALIZABLE'
};
/**
 * Options provided when the transaction is created
*/
declare export type TransactionOptions = {
autocommit?: boolean,

/**
 * See `Sequelize.Transaction.ISOLATION_LEVELS` for possible options
*/
isolationLevel?: string,
type?: TransactionType,
deferrable?: string
} & Logging
