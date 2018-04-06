
/**
 * Options provided when associating models with hasOne relationship
*/
declare export type HasOneOptions = {

/**
 * A string or a data type to represent the identifier in the table
*/
keyType?: DataType
} & AssociationOptions
declare export class HasOne mixins Association {
accessors: SingleAssociationAccessors;
constructor(source: typeof Model, target: typeof Model, options: HasOneOptions): this
}
/**
 * The options for the getAssociation mixin of the hasOne association.
 * @see  HasOneGetAssociationMixin
*/
declare export type HasOneGetAssociationMixinOptions = {

/**
 * Apply a scope on the related model, or remove its default scope by passing false.
*/
scope?: string | string[] | boolean
} & FindOptions

/**
 * The getAssociation mixin applied to models with hasOne.
 * An example of usage is as follows:

```js

User.hasOne(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttrib>, UserAttrib {
    getRole: Sequelize.HasOneGetAssociationMixin<RoleInstance>;
    // setRole...
    // createRole...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/has-one/
 * @see  Instance
*/
declare export type HasOneGetAssociationMixin<TModel> = (options?: HasOneGetAssociationMixinOptions) => Promise<TModel>;
/**
 * The options for the setAssociation mixin of the hasOne association.
 * @see  HasOneSetAssociationMixin
*/
declare export type HasOneSetAssociationMixinOptions = {

/**
 * Skip saving this after setting the foreign key if false.
*/
save?: boolean
} & HasOneGetAssociationMixinOptions & SaveOptions

/**
 * The setAssociation mixin applied to models with hasOne.
 * An example of usage is as follows:

```js

User.hasOne(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRole...
    setRole: Sequelize.HasOneSetAssociationMixin<RoleInstance, RoleId>;
    // createRole...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/has-one/
 * @see  Instance
*/
declare export type HasOneSetAssociationMixin<TModel, TModelPrimaryKey> = (
newAssociation?: TModel | TModelPrimaryKey,
options?: HasOneSetAssociationMixinOptions) => Promise<void>;
/**
 * The options for the createAssociation mixin of the hasOne association.
 * @see  HasOneCreateAssociationMixin
*/
declare export type HasOneCreateAssociationMixinOptions = {} & HasOneSetAssociationMixinOptions & CreateOptions

/**
 * The createAssociation mixin applied to models with hasOne.
 * An example of usage is as follows:

```js

User.hasOne(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRole...
    // setRole...
    createRole: Sequelize.HasOneCreateAssociationMixin<RoleAttributes>;
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/has-one/
 * @see  Instance
*/
declare export type HasOneCreateAssociationMixin<TModel> = (
values?: {
[attribute: string]: any
},
options?: HasOneCreateAssociationMixinOptions) => Promise<TModel>;