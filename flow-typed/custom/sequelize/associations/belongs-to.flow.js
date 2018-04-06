
/**
 * Options provided when associating models with belongsTo relationship
 * @see  Association class belongsTo method
*/
declare export type BelongsToOptions = {

/**
 * The name of the field to use as the key for the association in the target table. Defaults to the primary
 * key of the target table
*/
targetKey?: string,

/**
 * A string or a data type to represent the identifier in the table
*/
keyType?: DataType
} & AssociationOptions
declare module.exports: typeof BelongsTo
/**
 * The options for the getAssociation mixin of the belongsTo association.
 * @see  BelongsToGetAssociationMixin
*/
declare export type BelongsToGetAssociationMixinOptions = {

/**
 * Apply a scope on the related model, or remove its default scope by passing false.
*/
scope?: string | string[] | boolean
} & FindOptions

/**
 * The getAssociation mixin applied to models with belongsTo.
 * An example of usage is as follows:

```js

User.belongsTo(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttrib>, UserAttrib {
    getRole: Sequelize.BelongsToGetAssociationMixin<RoleInstance>;
    // setRole...
    // createRole...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/belongs-to/
 * @see  Instance
*/
declare export type BelongsToGetAssociationMixin<TModel> = (options?: BelongsToGetAssociationMixinOptions) => Promise<TModel>;
/**
 * The options for the setAssociation mixin of the belongsTo association.
 * @see  BelongsToSetAssociationMixin
*/
declare export type BelongsToSetAssociationMixinOptions = {

/**
 * Skip saving this after setting the foreign key if false.
*/
save?: boolean
} & SaveOptions

/**
 * The setAssociation mixin applied to models with belongsTo.
 * An example of usage is as follows:

```js

User.belongsTo(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRole...
    setRole: Sequelize.BelongsToSetAssociationMixin<RoleInstance, RoleId>;
    // createRole...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/belongs-to/
 * @see  Instance
*/
declare export type BelongsToSetAssociationMixin<TModel, TPrimaryKey> = (
newAssociation?: TModel | TPrimaryKey,
options?: BelongsToSetAssociationMixinOptions) => Promise<void>;
/**
 * The options for the createAssociation mixin of the belongsTo association.
 * @see  BelongsToCreateAssociationMixin
*/
declare export type BelongsToCreateAssociationMixinOptions = {} & CreateOptions & BelongsToSetAssociationMixinOptions

/**
 * The createAssociation mixin applied to models with belongsTo.
 * An example of usage is as follows:

```js

User.belongsTo(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRole...
    // setRole...
    createRole: Sequelize.BelongsToCreateAssociationMixin<RoleAttributes>;
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/belongs-to/
 * @see  Instance
*/
declare export type BelongsToCreateAssociationMixin<TModel> = (
values?: {
[attribute: string]: any
},
options?: BelongsToCreateAssociationMixinOptions) => Promise<TModel>;