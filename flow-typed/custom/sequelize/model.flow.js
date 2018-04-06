declare export interface Logging {

/**
 * A function that gets executed while running the query to log the sql.
*/
logging?: boolean | Function
} declare export interface Transactionable {

/**
 * Transaction to run query under
*/
transaction?: Transaction
} declare export interface SearchPathable {

/**
 * An optional parameter to specify the schema search_path (Postgres only)
*/
searchPath?: string
} declare export interface Filterable {

/**
 * Attribute has to be matched for rows to be selected for the given action.
*/
where?: WhereOptions
} declare export interface Projectable {

/**
 * A list of the attributes that you want to select. To rename an attribute, you can pass an array, with
 * two elements - the first is the name of the attribute in the DB (or some kind of expression such as
`Sequelize.literal`, `Sequelize.fn` and so on), and the second is the name you want the attribute to
have in the returned instance
*/
attributes?: FindAttributeOptions
} declare export interface Paranoid {

/**
 * If true, only non-deleted records will be returned. If false, both deleted and non-deleted records will
 * be returned. Only applies if `options.paranoid` is true for the model.
*/
paranoid?: boolean
} declare export type GroupOption = string | Fn | Col | (string | Fn | Col)[];
/**
 * Options to pass to Model on drop
*/
declare export type DropOptions = {

/**
 * Also drop all objects depending on this table, such as views. Only works in postgres
*/
cascade?: boolean
} & Logging

/**
 * Schema Options provided for applying a schema to a model
*/
declare export type SchemaOptions = {

/**
 * The character(s) that separates the schema name from the table name
*/
schemaDelimeter?: string
} & Logging

/**
 * Scope Options for Model.scope
*/
declare export interface ScopeOptions {

/**
 * The scope(s) to apply. Scopes can either be passed as consecutive arguments, or as an array of arguments.
 * To apply simple scopes and scope functions with no arguments, pass them as strings. For scope function,
pass an object, with a `method` property. The value can either be a string, if the method does not take
any arguments, or an array, where the first element is the name of the method, and consecutive elements
are arguments to that method. Pass null to remove all scopes, including the default.
*/
method: string | any[]
} 
/**
 * The type accepted by every `where` option
*/
declare export type WhereOptions = WhereAttributeHash | AndOperator | OrOperator | Where;
/**
 * Example: `$any: [2,3]` becomes `ANY ARRAY[2, 3]::INTEGER`
 * 
_PG only_
*/
declare export interface AnyOperator {
$any: (string | number)[]
} 
/**
 * Undocumented? 
*/
declare export interface AllOperator {
$all: (string | number)[]
} 
/**
 * Operators that can be used in WhereOptions
 * 
See http://docs.sequelizejs.com/en/v3/docs/querying/#operators
*/
declare export interface WhereOperators {

/**
 * Example: `$any: [2,3]` becomes `ANY ARRAY[2, 3]::INTEGER`
 * 
_PG only_
*/
$any?: (string | number)[],

/**
 * Example: `$gte: 6,` becomes `>= 6` 
*/
$gte?: number | string | Date,

/**
 * Example: `$lt: 10,` becomes `< 10` 
*/
$lt?: number | string | Date,

/**
 * Example: `$lte: 10,` becomes `<= 10` 
*/
$lte?: number | string | Date,

/**
 * Example: `$ne: 20,` becomes `!= 20` 
*/
$ne?: string | number | WhereOperators,

/**
 * Example: `$not: true,` becomes `IS NOT TRUE` 
*/
$not?: boolean | string | number | WhereOperators,

/**
 * Example: `$between: [6, 10],` becomes `BETWEEN 6 AND 10` 
*/
$between?: [number, number],

/**
 * Example: `$in: [1, 2],` becomes `IN [1, 2]` 
*/
$in?: (string | number)[] | Literal,

/**
 * Example: `$notIn: [1, 2],` becomes `NOT IN [1, 2]` 
*/
$notIn?: (string | number)[] | Literal,

/**
 * Examples:
 *   - `$like: '%hat',` becomes `LIKE '%hat'`
  - `$like: { $any: ['cat', 'hat']}` becomes `LIKE ANY ARRAY['cat', 'hat']`
*/
$like?: string | AnyOperator | AllOperator,

/**
 * Examples:
 *   - `$notLike: '%hat'` becomes `NOT LIKE '%hat'`
  - `$notLike: { $any: ['cat', 'hat']}` becomes `NOT LIKE ANY ARRAY['cat', 'hat']`
*/
$notLike?: string | AnyOperator | AllOperator,

/**
 * case insensitive PG only
 * 
Examples:
  - `$iLike: '%hat'` becomes `ILIKE '%hat'`
  - `$iLike: { $any: ['cat', 'hat']}` becomes `ILIKE ANY ARRAY['cat', 'hat']`
*/
$ilike?: string | AnyOperator | AllOperator,

/**
 * case insensitive PG only
 * 
Examples:
  - `$iLike: '%hat'` becomes `ILIKE '%hat'`
  - `$iLike: { $any: ['cat', 'hat']}` becomes `ILIKE ANY ARRAY['cat', 'hat']`
*/
$iLike?: string | AnyOperator | AllOperator,

/**
 * PG array overlap operator
 * 
Example: `$overlap: [1, 2]` becomes `&& [1, 2]`
*/
$overlap?: [number, number],

/**
 * PG array contains operator
 * 
Example: `$contains: [1, 2]` becomes `@> [1, 2]`
*/
$contains?: any[],

/**
 * PG array contained by operator
 * 
Example: `$contained: [1, 2]` becomes `<@ [1, 2]`
*/
$contained?: any[],

/**
 * Example: `$gt: 6,` becomes `> 6` 
*/
$gt?: number | string | Date,

/**
 * PG only
 * 
Examples:
  - `$notILike: '%hat'` becomes `NOT ILIKE '%hat'`
  - `$notLike: ['cat', 'hat']` becomes `LIKE ANY ARRAY['cat', 'hat']`
*/
$notILike?: string | AnyOperator | AllOperator,

/**
 * Example: `$notBetween: [11, 15],` becomes `NOT BETWEEN 11 AND 15` 
*/
$notBetween?: [number, number]
} 
/**
 * Example: `$or: [{a: 5}, {a: 6}]` becomes `(a = 5 OR a = 6)` 
*/
declare export interface OrOperator {
$or: WhereOptions | WhereOptions[] | WhereValue | WhereValue[]
} 
/**
 * Example: `$and: {a: 5}` becomes `AND (a = 5)` 
*/
declare export interface AndOperator {
$and: WhereOptions | WhereOptions[] | WhereValue | WhereValue[]
} 
/**
 * Where Geometry Options
*/
declare export interface WhereGeometryOptions {
type: string,
coordinates: (number[] | number)[]
} 
/**
 * Used for the right hand side of WhereAttributeHash.
 * WhereAttributeHash is in there for JSON columns.
*/
declare export type WhereValue = string
| number
| boolean
| null
| WhereOperators
| WhereAttributeHash
| Col
| Fn
| OrOperator
| AndOperator
| WhereGeometryOptions
| (string | number | WhereAttributeHash)[];
/**
 * A hash of attributes to describe your search.
*/
declare export interface WhereAttributeHash {

/**
 * Possible key values:
 * - A simple attribute name
- A nested key for JSON columns

       {
         "meta.audio.length": {
           $gt: 20
         }
       }
*/
[field: string]: WhereValue | WhereOptions
} 
/**
 * Through options for Include Options
*/
declare export type IncludeThroughOptions = {} & Filterable & Projectable

/**
 * Options for eager-loading associated models, also allowing for all associations to be loaded at once
*/
declare export type Includeable = typeof Model | Association | IncludeOptions | {
all: undefined
};
/**
 * Complex include options
*/
declare export type IncludeOptions = {

/**
 * The model you want to eagerly load
*/
model?: typeof Model,

/**
 * The alias of the relation, in case the model you want to eagerly load is aliassed. For `hasOne` /
 * `belongsTo`, this should be the singular name, and for `hasMany`, it should be the plural
*/
as?: string,

/**
 * The association you want to eagerly load. (This can be used instead of providing a model/as pair)
*/
association?: Association,

/**
 * Note that this converts the eager load to an inner join,
 * unless you explicitly set `required: false`
*/
where?: WhereOptions,

/**
 * If true, converts to an inner join, which means that the parent model will only be loaded if it has any
 * matching children. True if `include.where` is set, false otherwise.
*/
required?: boolean,

/**
 * Limit include. Only available when setting `separate` to true.
*/
limit?: number,

/**
 * Run include in separate queries.
*/
separate?: boolean,

/**
 * Through Options
*/
through?: IncludeThroughOptions,

/**
 * Load further nested related models
*/
include?: Includeable[],

/**
 * Order include. Only available when setting `separate` to true.
*/
order?: Order,

/**
 * Use sub queries. This should only be used if you know for sure the query does not result in a cartesian product.
*/
subQuery?: boolean
} & Filterable & Projectable
declare export type OrderItem = string
| Fn
| Col
| Literal
| [string | Col | Fn | Literal, string]
| [typeof Model | {
model: typeof Model,
as: string
}, string, string]
| [typeof Model, typeof Model, string, string];declare export type Order = string
| Fn
| Col
| Literal
| OrderItem[];declare export type FindAttributeOptions = (string | [string | Literal | Fn, string])[] | {
exclude: string[],
include?: (string | [string | Literal | Fn, string])[]
} | {
exclude?: string[],
include: (string | [string | Literal | Fn, string])[]
};
/**
 * Options that are passed to any model creating a SELECT query
 * 
A hash of options to describe the scope of the search
*/
declare export type FindOptions = {

/**
 * A list of associations to eagerly load using a left join. Supported is either
 * `{ include: [ Model1, Model2, ...]}`, `{ include: [{ model: Model1, as: 'Alias' }]}` or
`{ include: [{ all: true }]}`.
If your association are set up with an `as` (eg. `X.hasMany(Y, { as: 'Z }`, you need to specify Z in
the as attribute when eager loading Y).
*/
include?: Includeable[],

/**
 * Specifies an ordering. If a string is provided, it will be escaped. Using an array, you can provide
 * several columns / functions to order by. Each element can be further wrapped in a two-element array. The
first element is the column / function to order by, the second is the direction. For example:
`order: [['name', 'DESC']]`. In this way the column will be escaped, but the direction will not.
*/
order?: Order,

/**
 * GROUP BY in sql
*/
group?: GroupOption,

/**
 * Limit the results
*/
limit?: number,

/**
 * Skip the results;
*/
offset?: number,

/**
 * Lock the selected rows. Possible options are transaction.LOCK.UPDATE and transaction.LOCK.SHARE.
 * Postgres also supports transaction.LOCK.KEY_SHARE, transaction.LOCK.NO_KEY_UPDATE and specific model
locks with joins. See [transaction.LOCK for an example](transaction#lock)
*/
lock?: string | {
level: string,
of: typeof Model
},

/**
 * Return raw result. See sequelize.query for more information.
*/
raw?: boolean,

/**
 * having ?!?
*/
having?: WhereAttributeHash,

/**
 * Use sub queries (internal)
*/
subQuery?: boolean
} & Logging & Transactionable & Filterable & Projectable & Paranoid
declare export type NonNullFindOptions = {

/**
 * Throw if nothing was found.
*/
rejectOnEmpty: boolean
} & FindOptions

/**
 * Options for Model.count method
*/
declare export type CountOptions = {

/**
 * Include options. See `find` for details
*/
include?: Includeable[],

/**
 * Apply COUNT(DISTINCT(col))
*/
distinct?: boolean,

/**
 * GROUP BY in sql
 * Used in conjunction with `attributes`.
 * @see  Projectable
*/
group?: GroupOption
} & Logging & Transactionable & Filterable & Projectable
declare export type FindAndCountOptions = {} & CountOptions & FindOptions

/**
 * Options for Model.build method
*/
declare export interface BuildOptions {

/**
 * If set to true, values will ignore field and virtual setters.
*/
raw?: boolean,

/**
 * Is this record new
*/
isNewRecord?: boolean,

/**
 * an array of include options - Used to build prefetched/included model instances. See `set`
 * 
TODO: See set
*/
include?: Includeable[]
} declare export interface Silent {

/**
 * If true, the updatedAt timestamp will not be updated.
 * 
Defaults to false
*/
silent?: boolean
} 
/**
 * Options for Model.create method
*/
declare export type CreateOptions = {

/**
 * If set, only columns matching those in fields will be saved
*/
fields?: string[],

/**
 * On Duplicate
*/
onDuplicate?: string
} & BuildOptions & Logging & Silent & Transactionable

/**
 * Options for Model.findOrInitialize method
*/
declare export type FindOrInitializeOptions = {

/**
 * A hash of search attributes.
*/
where: WhereOptions,

/**
 * Default values to use if building a new instance
*/
defaults?: "NO PRINT IMPLEMENTED: ObjectKeyword"
} & Logging & Transactionable

/**
 * Options for Model.upsert method
*/
declare export type UpsertOptions = {

/**
 * Run validations before the row is inserted
*/
validate?: boolean,

/**
 * The fields to insert / update. Defaults to all fields
*/
fields?: string[],

/**
 * Print query execution time in milliseconds when logging SQL.
*/
benchmark?: boolean
} & Logging & Transactionable & SearchPathable

/**
 * Options for Model.bulkCreate method
*/
declare export type BulkCreateOptions = {

/**
 * Fields to insert (defaults to all fields)
*/
fields?: string[],

/**
 * Should each row be subject to validation before it is inserted. The whole insert will fail if one row
 * fails validation
*/
validate?: boolean,

/**
 * Run before / after bulk create hooks?
*/
hooks?: boolean,

/**
 * Run before / after create hooks for each individual Instance? BulkCreate hooks will still be run if
 * options.hooks is true.
*/
individualHooks?: boolean,

/**
 * Ignore duplicate values for primary keys? (not supported by postgres)
 * 
Defaults to false
*/
ignoreDuplicates?: boolean,

/**
 * Fields to update if row key already exists (on duplicate key update)? (only supported by mysql &
 * mariadb). By default, all fields are updated.
*/
updateOnDuplicate?: string[],

/**
 * Return the affected rows (only for postgres)
*/
returning?: boolean
} & Logging & Transactionable

/**
 * The options passed to Model.destroy in addition to truncate
*/
declare export type TruncateOptions = {

/**
 * Only used in conjuction with TRUNCATE. Truncates  all tables that have foreign-key references to the
 * named table, or to any tables added to the group due to CASCADE.

Defaults to false;
*/
cascade?: boolean,

/**
 * Run before / after bulk destroy hooks?
*/
hooks?: boolean,

/**
 * If set to true, destroy will SELECT all records matching the where parameter and will execute before /
 * after destroy hooks on each row
*/
individualHooks?: boolean,

/**
 * How many rows to delete
*/
limit?: number,

/**
 * Delete instead of setting deletedAt to current timestamp (only applicable if `paranoid` is enabled)
*/
force?: boolean,

/**
 * Only used in conjunction with `truncate`.
 * Automatically restart sequences owned by columns of the truncated table
*/
restartIdentity?: boolean
} & Logging & Transactionable & Filterable

/**
 * Options used for Model.destroy
*/
declare export type DestroyOptions = {

/**
 * If set to true, dialects that support it will use TRUNCATE instead of DELETE FROM. If a table is
 * truncated the where and limit options are ignored
*/
truncate?: boolean
} & TruncateOptions

/**
 * Options for Model.restore
*/
declare export type RestoreOptions = {

/**
 * Run before / after bulk restore hooks?
*/
hooks?: boolean,

/**
 * If set to true, restore will find all records within the where parameter and will execute before / after
 * bulkRestore hooks on each row
*/
individualHooks?: boolean,

/**
 * How many rows to undelete
*/
limit?: number
} & Logging & Transactionable & Filterable

/**
 * Options used for Model.update
*/
declare export type UpdateOptions = {

/**
 * Options to describe the scope of the search.
*/
where: WhereOptions,

/**
 * Fields to update (defaults to all fields)
*/
fields?: string[],

/**
 * Should each row be subject to validation before it is inserted. The whole insert will fail if one row
 * fails validation.

Defaults to true
*/
validate?: boolean,

/**
 * Run before / after bulk update hooks?
 * 
Defaults to true
*/
hooks?: boolean,

/**
 * Whether or not to update the side effects of any virtual setters.
 * 
Defaults to true
*/
sideEffects?: boolean,

/**
 * Run before / after update hooks?. If true, this will execute a SELECT followed by individual UPDATEs.
 * A select is needed, because the row data needs to be passed to the hooks

Defaults to false
*/
individualHooks?: boolean,

/**
 * Return the affected rows (only for postgres)
*/
returning?: boolean,

/**
 * How many rows to update (only for mysql and mariadb)
*/
limit?: number
} & Logging & Transactionable

/**
 * Options used for Model.aggregate
*/
declare export type AggregateOptions = {

/**
 * The type of the result. If `field` is a field in this Model, the default will be the type of that field,
 * otherwise defaults to float.
*/
dataType?: DataType,

/**
 * Applies DISTINCT to the field being aggregated over
*/
distinct?: boolean
} & QueryOptions & Filterable & Paranoid

/**
 * Options used for Instance.increment method
*/
declare export type IncrementDecrementOptions = {} & Logging & Transactionable & Silent & SearchPathable & Filterable

/**
 * Options used for Instance.increment method
*/
declare export type IncrementDecrementOptionsWithBy = {

/**
 * The number to increment by
 * 
Defaults to 1
*/
by?: number
} & IncrementDecrementOptions

/**
 * Options used for Instance.restore method
*/
declare export type InstanceRestoreOptions = {} & Logging & Transactionable

/**
 * Options used for Instance.destroy method
*/
declare export type InstanceDestroyOptions = {

/**
 * If set to true, paranoid models will actually be deleted
*/
force?: boolean
} & Logging & Transactionable

/**
 * Options used for Instance.update method
*/
declare export type InstanceUpdateOptions = {} & SaveOptions & SetOptions & Filterable

/**
 * Options used for Instance.set method
*/
declare export interface SetOptions {

/**
 * If set to true, field and virtual setters will be ignored
*/
raw?: boolean,

/**
 * Clear all previously set data values
*/
reset?: boolean
} 
/**
 * Options used for Instance.save method
*/
declare export type SaveOptions = {

/**
 * An optional array of strings, representing database columns. If fields is provided, only those columns
 * will be validated and saved.
*/
fields?: string[],

/**
 * If false, validations won't be run.
 * 
Defaults to true
*/
validate?: boolean
} & Logging & Transactionable & Silent

/**
 * Model validations, allow you to specify format/content/inheritance validations for each attribute of the
 * model.

Validations are automatically run on create, update and save. You can also call validate() to manually
validate an instance.

The validations are implemented by validator.js.
*/
declare export interface ModelValidateOptions {

/**
 * is: ["^[a-z]+$",'i'] // will only allow letters
 * is: /^[a-z]+$/i      // same as the previous example using real RegExp
*/
is?: string | (string | RegExp)[] | RegExp | {
msg: string,
args: string | (string | RegExp)[] | RegExp
},

/**
 * not: ["[a-z]",'i']  // will not allow letters
*/
not?: string | (string | RegExp)[] | RegExp | {
msg: string,
args: string | (string | RegExp)[] | RegExp
},

/**
 * checks for email format (foo@bar.com)
*/
isEmail?: boolean | {
msg: string
},

/**
 * checks for url format (http://foo.com)
*/
isUrl?: boolean | {
msg: string
},

/**
 * checks for IPv4 (129.89.23.1) or IPv6 format
*/
isIP?: boolean | {
msg: string
},

/**
 * checks for IPv4 (129.89.23.1)
*/
isIPv4?: boolean | {
msg: string
},

/**
 * checks for IPv6 format
*/
isIPv6?: boolean | {
msg: string
},

/**
 * will only allow letters
*/
isAlpha?: boolean | {
msg: string
},

/**
 * will only allow alphanumeric characters, so "_abc" will fail
*/
isAlphanumeric?: boolean | {
msg: string
},

/**
 * will only allow numbers
*/
isNumeric?: boolean | {
msg: string
},

/**
 * checks for valid integers
*/
isInt?: boolean | {
msg: string
},

/**
 * checks for valid floating point numbers
*/
isFloat?: boolean | {
msg: string
},

/**
 * checks for any numbers
*/
isDecimal?: boolean | {
msg: string
},

/**
 * checks for lowercase
*/
isLowercase?: boolean | {
msg: string
},

/**
 * checks for uppercase
*/
isUppercase?: boolean | {
msg: string
},

/**
 * won't allow null
*/
notNull?: boolean | {
msg: string
},

/**
 * only allows null
*/
isNull?: boolean | {
msg: string
},

/**
 * don't allow empty strings
*/
notEmpty?: boolean | {
msg: string
},

/**
 * only allow a specific value
*/
equals?: string | {
msg: string
},

/**
 * force specific substrings
*/
contains?: string | {
msg: string
},

/**
 * check the value is not one of these
*/
notIn?: string[][] | {
msg: string,
args: string[][]
},

/**
 * check the value is one of these
*/
isIn?: string[][] | {
msg: string,
args: string[][]
},

/**
 * don't allow specific substrings
*/
notContains?: string[] | string | {
msg: string,
args: string[] | string
},

/**
 * only allow values with length between 2 and 10
*/
len?: [number, number] | {
msg: string,
args: [number, number]
},

/**
 * only allow uuids
*/
isUUID?: number | {
msg: string,
args: number
},

/**
 * only allow date strings
*/
isDate?: boolean | {
msg: string,
args: boolean
},

/**
 * only allow date strings after a specific date
*/
isAfter?: string | {
msg: string,
args: string
},

/**
 * only allow date strings before a specific date
*/
isBefore?: string | {
msg: string,
args: string
},

/**
 * only allow values
*/
max?: number | {
msg: string,
args: number
},

/**
 * only allow values >= 23
*/
min?: number | {
msg: string,
args: number
},

/**
 * only allow arrays
*/
isArray?: boolean | {
msg: string,
args: boolean
},

/**
 * check for valid credit card numbers
*/
isCreditCard?: boolean | {
msg: string,
args: boolean
},

/**
 * custom validations are also possible
 * 
Implementation notes :

We can't enforce any other method to be a function, so :

```typescript
[name: string] : ( value : any ) => boolean;
```

doesn't work in combination with the properties above
 * @see  https://github.com/Microsoft/TypeScript/issues/1889
*/
[name: string]: any
} 
/**
 * Interface for indexes property in DefineOptions
*/
declare export interface ModelIndexesOptions {

/**
 * The name of the index. Defaults to model name + _ + fields concatenated
*/
name?: string,

/**
 * Index type. Only used by mysql. One of `UNIQUE`, `FULLTEXT` and `SPATIAL`
*/
index?: string,

/**
 * The method to create the index by (`USING` statement in SQL). BTREE and HASH are supported by mysql and
 * postgres, and postgres additionally supports GIST and GIN.
*/
method?: string,

/**
 * Should the index by unique? Can also be triggered by setting type to `UNIQUE`
 * 
Defaults to false
*/
unique?: boolean,

/**
 * PostgreSQL will build the index without taking any write locks. Postgres only
 * 
Defaults to false
*/
concurrently?: boolean,

/**
 * An array of the fields to index. Each field can either be a string containing the name of the field,
 * a sequelize object (e.g `sequelize.fn`), or an object with the following attributes: `attribute`
(field name), `length` (create a prefix index of length chars), `order` (the direction the column
should be sorted in), `collate` (the collation (sort order) for the column)
*/
fields?: (string | {
attribute: string,
length: number,
order: string,
collate: string
})[]
} 
/**
 * Interface for name property in DefineOptions
*/
declare export interface ModelNameOptions {

/**
 * Singular model name
*/
singular?: string,

/**
 * Plural model name
*/
plural?: string
} 
/**
 * Interface for getterMethods in DefineOptions
*/
declare export interface ModelGetterOptions {
[name: string]: () => any
} 
/**
 * Interface for setterMethods in DefineOptions
*/
declare export interface ModelSetterOptions {
[name: string]: (val: any) => void
} 
/**
 * Interface for Define Scope Options
*/
declare export interface ModelScopeOptions {

/**
 * Name of the scope and it's query
*/
[scopeName: string]: FindOptions | Function
} 
/**
 * General column options
*/
declare export interface ColumnOptions {

/**
 * If false, the column will have a NOT NULL constraint, and a not null validation will be run before an
 * instance is saved.
*/
allowNull?: boolean,

/**
 * If set, sequelize will map the attribute name to a different name in the database
*/
field?: string,

/**
 * A literal default value, a JavaScript function, or an SQL function (see `sequelize.fn`)
*/
defaultValue?: any
} 
/**
 * References options for the column's attributes
*/
declare export interface ModelAttributeColumnReferencesOptions {

/**
 * If this column references another table, provide it here as a Model, or a string
*/
model?: string | typeof Model,

/**
 * The column of the foreign table that this column references
*/
key?: string,

/**
 * When to check for the foreign key constraing
 * 
PostgreSQL only
*/
deferrable?: AbstractDeferrable
} 
/**
 * Column options for the model schema attributes
*/
declare export type ModelAttributeColumnOptions = {

/**
 * A string or a data type
*/
type: DataType,

/**
 * If true, the column will get a unique constraint. If a string is provided, the column will be part of a
 * composite unique index. If multiple columns have the same string, they will be part of the same unique
index
*/
unique?: boolean | string | {
name: string,
msg: string
},

/**
 * Primary key flag
*/
primaryKey?: boolean,

/**
 * Is this field an auto increment field
*/
autoIncrement?: boolean,

/**
 * Comment for the database
*/
comment?: string,

/**
 * An object with reference configurations
*/
references?: ModelAttributeColumnReferencesOptions,

/**
 * What should happen when the referenced key is updated. One of CASCADE, RESTRICT, SET DEFAULT, SET NULL or
 * NO ACTION
*/
onUpdate?: string,

/**
 * What should happen when the referenced key is deleted. One of CASCADE, RESTRICT, SET DEFAULT, SET NULL or
 * NO ACTION
*/
onDelete?: string,

/**
 * Provide a custom getter for this column. Use `this.getDataValue(String)` to manipulate the underlying
 * values.
*/
get?: () => any,

/**
 * Provide a custom setter for this column. Use `this.setDataValue(String, Value)` to manipulate the
 * underlying values.
*/
set?: (val: any) => void,

/**
 * An object of validations to execute for this column every time the model is saved. Can be either the
 * name of a validation provided by validator.js, a validation function provided by extending validator.js
(see the
`DAOValidator` property for more details), or a custom validation function. Custom validation functions
are called with the value of the field, and can possibly take a second callback argument, to signal that
they are asynchronous. If the validator is sync, it should throw in the case of a failed validation, it
it is async, the callback should be called with the error text.
*/
validate?: ModelValidateOptions,

/**
 * Usage in object notation
 * 
```js
sequelize.define('model', {
     states: {
       type:   Sequelize.ENUM,
       values: ['active', 'pending', 'deleted']
     }
   })
```
*/
values?: string[]
} & ColumnOptions

/**
 * Interface for Attributes provided for a column
*/
declare export interface ModelAttributes {

/**
 * The description of a database column
*/
[name: string]: DataType | ModelAttributeColumnOptions
} 
/**
 * Options for Model.init. We mostly duplicate the Hooks here, since there is no way to combine the two
 * interfaces.

beforeValidate, afterValidate, beforeBulkCreate, beforeBulkDestroy, beforeBulkUpdate, beforeCreate,
beforeDestroy, beforeUpdate, afterCreate, afterDestroy, afterUpdate, afterBulkCreate, afterBulkDestroy and
afterBulkUpdate.
*/
declare export interface HooksOptions<M> {
beforeValidate?: (instance: M, options: "NO PRINT IMPLEMENTED: ObjectKeyword") => any,
afterValidate?: (instance: M, options: "NO PRINT IMPLEMENTED: ObjectKeyword") => any,
beforeCreate?: (attributes: M, options: CreateOptions) => any,
afterCreate?: (attributes: M, options: CreateOptions) => any,
beforeDestroy?: (instance: M, options: InstanceDestroyOptions) => any,
beforeDelete?: (instance: M, options: InstanceDestroyOptions) => any,
afterDestroy?: (instance: M, options: InstanceDestroyOptions) => any,
afterDelete?: (instance: M, options: InstanceDestroyOptions) => any,
beforeUpdate?: (instance: M, options: InstanceUpdateOptions) => any,
afterUpdate?: (instance: M, options: InstanceUpdateOptions) => any,
beforeBulkCreate?: (instances: M[], options: BulkCreateOptions) => any,
afterBulkCreate?: (instances: M[], options: BulkCreateOptions) => any,
beforeBulkDestroy?: (options: DestroyOptions) => any,
beforeBulkDelete?: (options: DestroyOptions) => any,
afterBulkDestroy?: (options: DestroyOptions) => any,
afterBulkDelete?: (options: DestroyOptions) => any,
beforeBulkUpdate?: (options: UpdateOptions) => any,
afterBulkUpdate?: (options: UpdateOptions) => any,
beforeFind?: (options: FindOptions) => any,
beforeCount?: (options: CountOptions) => any,
beforeFindAfterExpandIncludeAll?: (options: FindOptions) => any,
beforeFindAfterOptions?: (options: FindOptions) => any,
afterFind?: (instancesOrInstance: Model[] | Model, options: FindOptions) => any,
beforeSync?: (options: SyncOptions) => any,
afterSync?: (options: SyncOptions) => any,
beforeBulkSync?: (options: SyncOptions) => any,
afterBulkSync?: (options: SyncOptions) => any
} 
/**
 * Options for model definition
*/
declare export interface ModelOptions<M> {

/**
 * Define the default search scope to use for this model. Scopes have the same form as the options passed to
 * find / findAll.
*/
defaultScope?: FindOptions,

/**
 * More scopes, defined in the same way as defaultScope above. See `Model.scope` for more information about
 * how scopes are defined, and what you can do with them
*/
scopes?: ModelScopeOptions,

/**
 * Don't persits null values. This means that all columns with null values will not be saved.
*/
omitNull?: boolean,

/**
 * Adds createdAt and updatedAt timestamps to the model. Default true.
*/
timestamps?: boolean,

/**
 * Calling destroy will not delete the model, but instead set a deletedAt timestamp if this is true. Needs
 * timestamps=true to work. Default false.
*/
paranoid?: boolean,

/**
 * Converts all camelCased columns to underscored if true. Default false.
*/
underscored?: boolean,

/**
 * Converts camelCased model names to underscored tablenames if true. Default false.
*/
underscoredAll?: boolean,

/**
 * Indicates if the model's table has a trigger associated with it. Default false.
*/
hasTrigger?: boolean,

/**
 * If freezeTableName is true, sequelize will not try to alter the DAO name to get the table name.
 * Otherwise, the dao name will be pluralized. Default false.
*/
freezeTableName?: boolean,

/**
 * An object with two attributes, `singular` and `plural`, which are used when this model is associated to
 * others.
*/
name?: ModelNameOptions,

/**
 * Indexes for the provided database table
*/
indexes?: ModelIndexesOptions[],

/**
 * Override the name of the createdAt column if a string is provided, or disable it if false. Timestamps
 * must be true. Not affected by underscored setting.
*/
createdAt?: string | boolean,

/**
 * Override the name of the deletedAt column if a string is provided, or disable it if false. Timestamps
 * must be true. Not affected by underscored setting.
*/
deletedAt?: string | boolean,

/**
 * Override the name of the updatedAt column if a string is provided, or disable it if false. Timestamps
 * must be true. Not affected by underscored setting.
*/
updatedAt?: string | boolean,

/**
 * Defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name
 * verbatim
*/
tableName?: string,
schema?: string,

/**
 * You can also change the database engine, e.g. to MyISAM. InnoDB is the default.
*/
engine?: string,
charset?: string,

/**
 * Finaly you can specify a comment for the table in MySQL and PG
*/
comment?: string,
collate?: string,

/**
 * Set the initial AUTO_INCREMENT value for the table in MySQL.
*/
initialAutoIncrement?: string,

/**
 * An object of hook function that are called before and after certain lifecycle events.
 * The possible hooks are: beforeValidate, afterValidate, beforeBulkCreate, beforeBulkDestroy,
beforeBulkUpdate, beforeCreate, beforeDestroy, beforeUpdate, afterCreate, afterDestroy, afterUpdate,
afterBulkCreate, afterBulkDestory and afterBulkUpdate. See Hooks for more information about hook
functions and their signatures. Each property can either be a function, or an array of functions.
*/
hooks?: HooksOptions<M>,

/**
 * An object of model wide validations. Validations have access to all model values via `this`. If the
 * validator function takes an argument, it is asumed to be async, and is called with a callback that
accepts an optional error.
*/
validate?: ModelValidateOptions
} 
/**
 * Options passed to [[Model.init]]
*/
declare export type InitOptions = {

/**
 * The sequelize connection. Required ATM.
*/
sequelize: Sequelize
} & ModelOptions
declare module.exports: typeof Model