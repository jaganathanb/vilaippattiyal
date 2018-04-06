
/**
 * Options provided when associating models with hasMany relationship
*/
declare export type HasManyOptions = {

/**
 * A string or a data type to represent the identifier in the table
*/
keyType?: DataType
} & ManyToManyOptions
declare export class HasMany mixins Association {
accessors: MultiAssociationAccessors;
constructor(source: typeof Model, target: typeof Model, options: HasManyOptions): this
}
/**
 * The options for the getAssociations mixin of the hasMany association.
 * @see  HasManyGetAssociationsMixin
*/
declare export type HasManyGetAssociationsMixinOptions = {

/**
 * Apply a scope on the related model, or remove its default scope by passing false.
*/
scope?: string | string[] | boolean
} & FindOptions

/**
 * The getAssociations mixin applied to models with hasMany.
 * An example of usage is as follows:

```js

User.hasMany(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    getRoles: Sequelize.HasManyGetAssociationsMixin<RoleInstance>;
    // setRoles...
    // addRoles...
    // addRole...
    // createRole...
    // removeRole...
    // removeRoles...
    // hasRole...
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/has-many/
 * @see  Instance
*/
declare export type HasManyGetAssociationsMixin<TModel> = (options?: HasManyGetAssociationsMixinOptions) => Promise<TModel[]>;
/**
 * The options for the setAssociations mixin of the hasMany association.
 * @see  HasManySetAssociationsMixin
*/
declare export type HasManySetAssociationsMixinOptions = {} & FindOptions & InstanceUpdateOptions

/**
 * The setAssociations mixin applied to models with hasMany.
 * An example of usage is as follows:

```js

User.hasMany(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    setRoles: Sequelize.HasManySetAssociationsMixin<RoleInstance, RoleId>;
    // addRoles...
    // addRole...
    // createRole...
    // removeRole...
    // removeRoles...
    // hasRole...
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/has-many/
 * @see  Instance
*/
declare export type HasManySetAssociationsMixin<TModel, TModelPrimaryKey> = (
newAssociations?: (TModel | TModelPrimaryKey)[],
options?: HasManySetAssociationsMixinOptions) => Promise<void>;
/**
 * The options for the addAssociations mixin of the hasMany association.
 * @see  HasManyAddAssociationsMixin
*/
declare export type HasManyAddAssociationsMixinOptions = {} & InstanceUpdateOptions

/**
 * The addAssociations mixin applied to models with hasMany.
 * An example of usage is as follows:

```js

User.hasMany(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    addRoles: Sequelize.HasManyAddAssociationsMixin<RoleInstance, RoleId>;
    // addRole...
    // createRole...
    // removeRole...
    // removeRoles...
    // hasRole...
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/has-many/
 * @see  Instance
*/
declare export type HasManyAddAssociationsMixin<TModel, TModelPrimaryKey> = (
newAssociations?: (TModel | TModelPrimaryKey)[],
options?: HasManyAddAssociationsMixinOptions) => Promise<void>;
/**
 * The options for the addAssociation mixin of the hasMany association.
 * @see  HasManyAddAssociationMixin
*/
declare export type HasManyAddAssociationMixinOptions = {} & InstanceUpdateOptions

/**
 * The addAssociation mixin applied to models with hasMany.
 * An example of usage is as follows:

```js

User.hasMany(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    // addRoles...
    addRole: Sequelize.HasManyAddAssociationMixin<RoleInstance, RoleId>;
    // createRole...
    // removeRole...
    // removeRoles...
    // hasRole...
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/has-many/
 * @see  Instance
*/
declare export type HasManyAddAssociationMixin<TModel, TModelPrimaryKey> = (
newAssociation?: TModel | TModelPrimaryKey,
options?: HasManyAddAssociationMixinOptions) => Promise<void>;
/**
 * The options for the createAssociation mixin of the hasMany association.
 * @see  HasManyCreateAssociationMixin
*/
declare export type HasManyCreateAssociationMixinOptions = {} & CreateOptions

/**
 * The createAssociation mixin applied to models with hasMany.
 * An example of usage is as follows:

```js

User.hasMany(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    // addRoles...
    // addRole...
    createRole: Sequelize.HasManyCreateAssociationMixin<RoleAttributes>;
    // removeRole...
    // removeRoles...
    // hasRole...
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/has-many/
 * @see  Instance
*/
declare export type HasManyCreateAssociationMixin<TModel> = (
values?: {
[attribute: string]: any
},
options?: HasManyCreateAssociationMixinOptions) => Promise<TModel>;
/**
 * The options for the removeAssociation mixin of the hasMany association.
 * @see  HasManyRemoveAssociationMixin
*/
declare export type HasManyRemoveAssociationMixinOptions = {} & InstanceUpdateOptions

/**
 * The removeAssociation mixin applied to models with hasMany.
 * An example of usage is as follows:

```js

User.hasMany(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    // addRoles...
    // addRole...
    // createRole...
    removeRole: Sequelize.HasManyRemoveAssociationMixin<RoleInstance, RoleId>;
    // removeRoles...
    // hasRole...
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/has-many/
 * @see  Instance
*/
declare export type HasManyRemoveAssociationMixin<TModel, TModelPrimaryKey> = (
oldAssociated?: TModel | TModelPrimaryKey,
options?: HasManyRemoveAssociationMixinOptions) => Promise<void>;
/**
 * The options for the removeAssociations mixin of the hasMany association.
 * @see  HasManyRemoveAssociationsMixin
*/
declare export type HasManyRemoveAssociationsMixinOptions = {} & InstanceUpdateOptions

/**
 * The removeAssociations mixin applied to models with hasMany.
 * An example of usage is as follows:

```js

User.hasMany(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    // addRoles...
    // addRole...
    // createRole...
    // removeRole...
    removeRoles: Sequelize.HasManyRemoveAssociationsMixin<RoleInstance, RoleId>;
    // hasRole...
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/has-many/
 * @see  Instance
*/
declare export type HasManyRemoveAssociationsMixin<TModel, TModelPrimaryKey> = (
oldAssociateds?: (TModel | TModelPrimaryKey)[],
options?: HasManyRemoveAssociationsMixinOptions) => Promise<void>;
/**
 * The options for the hasAssociation mixin of the hasMany association.
 * @see  HasManyHasAssociationMixin
*/
declare export type HasManyHasAssociationMixinOptions = {} & HasManyGetAssociationsMixinOptions

/**
 * The hasAssociation mixin applied to models with hasMany.
 * An example of usage is as follows:

```js

User.hasMany(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    // addRoles...
    // addRole...
    // createRole...
    // removeRole...
    // removeRoles...
    hasRole: Sequelize.HasManyHasAssociationMixin<RoleInstance, RoleId>;
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/has-many/
 * @see  Instance
*/
declare export type HasManyHasAssociationMixin<TModel, TModelPrimaryKey> = (
target: TModel | TModelPrimaryKey,
options?: HasManyHasAssociationMixinOptions) => Promise<boolean>;
/**
 * The options for the hasAssociations mixin of the hasMany association.
 * @see  HasManyHasAssociationsMixin
*/
declare export type HasManyHasAssociationsMixinOptions = {} & HasManyGetAssociationsMixinOptions

/**
 * The removeAssociations mixin applied to models with hasMany.
 * An example of usage is as follows:

```js

User.hasMany(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    // addRoles...
    // addRole...
    // createRole...
    // removeRole...
    // removeRoles
    // hasRole...
    hasRoles: Sequelize.HasManyHasAssociationsMixin<RoleInstance, RoleId>;
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/has-many/
 * @see  Instance
*/
declare export type HasManyHasAssociationsMixin<TModel, TModelPrimaryKey> = (
targets: (TModel | TModelPrimaryKey)[],
options?: HasManyHasAssociationsMixinOptions) => Promise<boolean>;
/**
 * The options for the countAssociations mixin of the hasMany association.
 * @see  HasManyCountAssociationsMixin
*/
declare export type HasManyCountAssociationsMixinOptions = {

/**
 * Apply a scope on the related model, or remove its default scope by passing false.
*/
scope?: string | boolean
} & Transactionable & Filterable

/**
 * The countAssociations mixin applied to models with hasMany.
 * An example of usage is as follows:

```js

User.hasMany(Role);

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    // addRoles...
    // addRole...
    // createRole...
    // removeRole...
    // removeRoles...
    // hasRole...
    // hasRoles...
    countRoles: Sequelize.HasManyCountAssociationsMixin;
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/has-many/
 * @see  Instance
*/
declare export type HasManyCountAssociationsMixin = (options?: HasManyCountAssociationsMixinOptions) => Promise<number>;