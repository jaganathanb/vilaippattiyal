
/**
 * Can be used to
 * make foreign key constraints deferrable and to set the constaints within a
transaction. This is only supported in PostgreSQL.

The foreign keys can be configured like this. It will create a foreign key
that will check the constraints immediately when the data was inserted.

```js
sequelize.define('Model', {
   foreign_id: {
     type: Sequelize.INTEGER,
     references: {
       model: OtherModel,
       key: 'id',
       deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
     }
   }
});
```

The constraints can be configured in a transaction like this. It will
trigger a query once the transaction has been started and set the constraints
to be checked at the very end of the transaction.

```js
sequelize.transaction({
   deferrable: Sequelize.Deferrable.SET_DEFERRED
});
```
*/
declare export interface AbstractDeferrableStatic {
new (): AbstractDeferrable,
(): AbstractDeferrable
} declare export interface AbstractDeferrable {
toString(): string,
toSql(): string
} declare export type InitiallyDeferredDeferrableStatic = {
new (): InitiallyDeferredDeferrable,
(): InitiallyDeferredDeferrable
} & AbstractDeferrableStatic
declare export type InitiallyDeferredDeferrable = {} & AbstractDeferrable
declare export var INITIALLY_DEFERRED: InitiallyDeferredDeferrableStatic;declare export type InitiallyImmediateDeferrableStatic = {
new (): InitiallyImmediateDeferrable,
(): InitiallyImmediateDeferrable
} & AbstractDeferrableStatic
declare export type InitiallyImmediateDeferrable = {} & AbstractDeferrable
declare export var INITIALLY_IMMEDIATE: InitiallyImmediateDeferrableStatic;declare export type NotDeferrableStatic = {
new (): NotDeferrable,
(): NotDeferrable
} & AbstractDeferrableStatic
declare export interface NotDeferrable {} declare export var NOT: NotDeferrableStatic;declare export type SetDeferredDeferrableStatic = {

/**
 * 
 * @param  An array of constraint names. Will defer all constraints by default.
*/
new (constraints: string[]): SetDeferredDeferrable,

/**
 * 
 * @param  An array of constraint names. Will defer all constraints by default.
*/
(constraints: string[]): SetDeferredDeferrable
} & AbstractDeferrableStatic
declare export interface SetDeferredDeferrable {} declare export var SET_DEFERRED: SetDeferredDeferrableStatic;declare export type SetImmediateDeferrableStatic = {

/**
 * 
 * @param  An array of constraint names. Will defer all constraints by default.
*/
new (constraints: string[]): SetImmediateDeferrable,

/**
 * 
 * @param  An array of constraint names. Will defer all constraints by default.
*/
(constraints: string[]): SetImmediateDeferrable
} & AbstractDeferrableStatic
declare export interface SetImmediateDeferrable {} declare export var SET_IMMEDIATE: SetImmediateDeferrableStatic;