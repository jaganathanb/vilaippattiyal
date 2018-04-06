
/**
 * Used for a association table in n:m associations.
*/
declare export interface ThroughOptions {

/**
 * The model used to join both sides of the N:M association.
*/
model: typeof Model,

/**
 * A key/value set that will be used for association create and find defaults on the through model.
 * (Remember to add the attributes to the through model)
*/
scope?: AssociationScope,

/**
 * If true a unique key will be generated from the foreign keys used (might want to turn this off and create
 * specific unique keys when using scopes)

Defaults to true
*/
unique?: boolean
} 
/**
 * Attributes for the join table
*/
declare export interface JoinTableAttributes {
[attribute: string]: any
} 
/**
 * Options provided when associating models with belongsToMany relationship
*/
declare export type BelongsToManyOptions = {

/**
 * The name of the table that is used to join source and target in n:m associations. Can also be a
 * sequelize model if you want to define the junction table yourself and add extra attributes to it.
*/
through: typeof Model | string | ThroughOptions,

/**
 * The name of the foreign key in the join table (representing the target model) or an object representing
 * the type definition for the other column (see `Sequelize.define` for syntax). When using an object, you
can add a `name` property to set the name of the colum. Defaults to the name of target + primary key of
target
*/
otherKey?: string | ForeignKeyOptions,

/**
 * Should the join model have timestamps
*/
timestamps?: boolean
} & ManyToManyOptions
declare export class BelongsToMany mixins Association {
otherKey: string;
accessors: MultiAssociationAccessors;
constructor(source: typeof Model, target: typeof Model, options: BelongsToManyOptions): this
}
/**
 * The options for the getAssociations mixin of the belongsToMany association.
 * @see  BelongsToManyGetAssociationsMixin
*/
declare export type BelongsToManyGetAssociationsMixinOptions = {

/**
 * Apply a scope on the related model, or remove its default scope by passing false.
*/
scope?: string | boolean
} & FindOptions

/**
 * The getAssociations mixin applied to models with belongsToMany.
 * An example of usage is as follows:

```js

User.belongsToMany(Role, { through: UserRole });

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    getRoles: Sequelize.BelongsToManyGetAssociationsMixin<RoleInstance>;
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
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/belongs-to-many/
 * @see  Instance
*/
declare export type BelongsToManyGetAssociationsMixin<TModel> = (options?: BelongsToManyGetAssociationsMixinOptions) => Promise<TModel[]>;
/**
 * The options for the setAssociations mixin of the belongsToMany association.
 * @see  BelongsToManySetAssociationsMixin
*/
declare export type BelongsToManySetAssociationsMixinOptions = {
through?: JoinTableAttributes
} & FindOptions & BulkCreateOptions & InstanceUpdateOptions & InstanceDestroyOptions

/**
 * The setAssociations mixin applied to models with belongsToMany.
 * An example of usage is as follows:

```js

User.belongsToMany(Role, { through: UserRole });

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    setRoles: Sequelize.BelongsToManySetAssociationsMixin<RoleInstance, RoleId, UserRoleAttributes>;
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
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/belongs-to-many/
 * @see  Instance
*/
declare export type BelongsToManySetAssociationsMixin<TModel, TModelPrimaryKey> = (
newAssociations?: (TModel | TModelPrimaryKey)[],
options?: BelongsToManySetAssociationsMixinOptions) => Promise<void>;
/**
 * The options for the addAssociations mixin of the belongsToMany association.
 * @see  BelongsToManyAddAssociationsMixin
*/
declare export type BelongsToManyAddAssociationsMixinOptions = {
through?: JoinTableAttributes
} & FindOptions & BulkCreateOptions & InstanceUpdateOptions & InstanceDestroyOptions

/**
 * The addAssociations mixin applied to models with belongsToMany.
 * An example of usage is as follows:

```js

User.belongsToMany(Role, { through: UserRole });

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    addRoles: Sequelize.BelongsToManyAddAssociationsMixin<RoleInstance, RoleId, UserRoleAttributes>;
    // addRole...
    // createRole...
    // removeRole...
    // removeRoles...
    // hasRole...
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/belongs-to-many/
 * @see  Instance
*/
declare export type BelongsToManyAddAssociationsMixin<TModel, TModelPrimaryKey> = (
newAssociations?: (TModel | TModelPrimaryKey)[],
options?: BelongsToManyAddAssociationsMixinOptions) => Promise<void>;
/**
 * The options for the addAssociation mixin of the belongsToMany association.
 * @see  BelongsToManyAddAssociationMixin
*/
declare export type BelongsToManyAddAssociationMixinOptions = {
through?: JoinTableAttributes
} & FindOptions & BulkCreateOptions & InstanceUpdateOptions & InstanceDestroyOptions

/**
 * The addAssociation mixin applied to models with belongsToMany.
 * An example of usage is as follows:

```js

User.belongsToMany(Role, { through: UserRole });

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    // addRoles...
    addRole: Sequelize.BelongsToManyAddAssociationMixin<RoleInstance, RoleId, UserRoleAttributes>;
    // createRole...
    // removeRole...
    // removeRoles...
    // hasRole...
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/belongs-to-many/
 * @see  Instance
*/
declare export type BelongsToManyAddAssociationMixin<TModel, TModelPrimaryKey> = (
newAssociation?: TModel | TModelPrimaryKey,
options?: BelongsToManyAddAssociationMixinOptions) => Promise<void>;
/**
 * The options for the createAssociation mixin of the belongsToMany association.
 * @see  BelongsToManyCreateAssociationMixin
*/
declare export type BelongsToManyCreateAssociationMixinOptions = {
through?: JoinTableAttributes
} & CreateOptions

/**
 * The createAssociation mixin applied to models with belongsToMany.
 * An example of usage is as follows:

```js

User.belongsToMany(Role, { through: UserRole });

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    // addRoles...
    // addRole...
    createRole: Sequelize.BelongsToManyCreateAssociationMixin<RoleAttributes, UserRoleAttributes>;
    // removeRole...
    // removeRoles...
    // hasRole...
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/belongs-to-many/
 * @see  Instance
*/
declare export type BelongsToManyCreateAssociationMixin<TModel> = (
values?: {
[attribute: string]: any
},
options?: BelongsToManyCreateAssociationMixinOptions) => Promise<TModel>;
/**
 * The options for the removeAssociation mixin of the belongsToMany association.
 * @see  BelongsToManyRemoveAssociationMixin
*/
declare export type BelongsToManyRemoveAssociationMixinOptions = {} & InstanceDestroyOptions

/**
 * The removeAssociation mixin applied to models with belongsToMany.
 * An example of usage is as follows:

```js

User.belongsToMany(Role, { through: UserRole });

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    // addRoles...
    // addRole...
    // createRole...
    removeRole: Sequelize.BelongsToManyRemoveAssociationMixin<RoleInstance, RoleId>;
    // removeRoles...
    // hasRole...
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/belongs-to-many/
 * @see  Instance
*/
declare export type BelongsToManyRemoveAssociationMixin<TModel, TModelPrimaryKey> = (
oldAssociated?: TModel | TModelPrimaryKey,
options?: BelongsToManyRemoveAssociationMixinOptions) => Promise<void>;
/**
 * The options for the removeAssociations mixin of the belongsToMany association.
 * @see  BelongsToManyRemoveAssociationsMixin
*/
declare export type BelongsToManyRemoveAssociationsMixinOptions = {} & InstanceDestroyOptions & InstanceDestroyOptions

/**
 * The removeAssociations mixin applied to models with belongsToMany.
 * An example of usage is as follows:

```js

User.belongsToMany(Role, { through: UserRole });

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    // addRoles...
    // addRole...
    // createRole...
    // removeRole...
    removeRoles: Sequelize.BelongsToManyRemoveAssociationsMixin<RoleInstance, RoleId>;
    // hasRole...
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/belongs-to-many/
 * @see  Instance
*/
declare export type BelongsToManyRemoveAssociationsMixin<TModel, TModelPrimaryKey> = (
oldAssociateds?: (TModel | TModelPrimaryKey)[],
options?: BelongsToManyRemoveAssociationsMixinOptions) => Promise<void>;
/**
 * The options for the hasAssociation mixin of the belongsToMany association.
 * @see  BelongsToManyHasAssociationMixin
*/
declare export type BelongsToManyHasAssociationMixinOptions = {} & BelongsToManyGetAssociationsMixinOptions

/**
 * The hasAssociation mixin applied to models with belongsToMany.
 * An example of usage is as follows:

```js

User.belongsToMany(Role, { through: UserRole });

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    // addRoles...
    // addRole...
    // createRole...
    // removeRole...
    // removeRoles...
    hasRole: Sequelize.BelongsToManyHasAssociationMixin<RoleInstance, RoleId>;
    // hasRoles...
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/belongs-to-many/
 * @see  Instance
*/
declare export type BelongsToManyHasAssociationMixin<TModel, TModelPrimaryKey> = (
target: TModel | TModelPrimaryKey,
options?: BelongsToManyHasAssociationMixinOptions) => Promise<boolean>;
/**
 * The options for the hasAssociations mixin of the belongsToMany association.
 * @see  BelongsToManyHasAssociationsMixin
*/
declare export type BelongsToManyHasAssociationsMixinOptions = {} & BelongsToManyGetAssociationsMixinOptions

/**
 * The removeAssociations mixin applied to models with belongsToMany.
 * An example of usage is as follows:

```js

User.belongsToMany(Role, { through: UserRole });

interface UserInstance extends Sequelize.Instance<UserInstance, UserAttributes>, UserAttributes {
    // getRoles...
    // setRoles...
    // addRoles...
    // addRole...
    // createRole...
    // removeRole...
    // removeRoles
    // hasRole...
    hasRoles: Sequelize.BelongsToManyHasAssociationsMixin<RoleInstance, RoleId>;
    // countRoles...
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/belongs-to-many/
 * @see  Instance
*/
declare export type BelongsToManyHasAssociationsMixin<TModel, TModelPrimaryKey> = (
targets: (TModel | TModelPrimaryKey)[],
options?: BelongsToManyHasAssociationsMixinOptions) => Promise<boolean>;
/**
 * The options for the countAssociations mixin of the belongsToMany association.
 * @see  BelongsToManyCountAssociationsMixin
*/
declare export type BelongsToManyCountAssociationsMixinOptions = {

/**
 * Apply a scope on the related model, or remove its default scope by passing false.
*/
scope?: string | boolean
} & Transactionable & Filterable

/**
 * The countAssociations mixin applied to models with belongsToMany.
 * An example of usage is as follows:

```js

User.belongsToMany(Role, { through: UserRole });

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
    countRoles: Sequelize.BelongsToManyCountAssociationsMixin;
}
```
 * @see  http://docs.sequelizejs.com/en/latest/api/associations/belongs-to-many/
 * @see  Instance
*/
declare export type BelongsToManyCountAssociationsMixin = (options?: BelongsToManyCountAssociationsMixinOptions) => Promise<number>;