
/**
 * Sync Options
*/
declare export type SyncOptions = {

/**
 * If force is true, each DAO will do DROP TABLE IF EXISTS ..., before it tries to create its own table
*/
force?: boolean,

/**
 * Match a regex against the database name before syncing, a safety check for cases where force: true is
 * used in tests but not live code
*/
match?: RegExp,

/**
 * The schema that the tables should be created in. This can be overriden for each table in sequelize.define
*/
schema?: string
} & Logging
declare export interface SetOptions {} 
/**
 * Connection Pool options
*/
declare export interface PoolOptions {

/**
 * Maximum number of connections in pool. Default is 5
*/
max?: number,

/**
 * Minimum number of connections in pool. Default is 0
*/
min?: number,

/**
 * The maximum time, in milliseconds, that a connection can be idle before being released
*/
idle?: number,

/**
 * The maximum time, in milliseconds, that pool will try to get connection before throwing error
*/
acquire?: number,

/**
 * A function that validates a connection. Called with client. The default function checks that client is an
 * object, and that its state is not disconnected
*/
validate?: (client?: any) => boolean
} 
/**
 * Interface for replication Options in the sequelize constructor
*/
declare export interface ReplicationOptions {
read?: {
host?: string,
port?: string | number,
username?: string,
password?: string,
database?: string
},
write?: {
host?: string,
port?: string | number,
username?: string,
password?: string,
database?: string
}
} declare export var Op: {
eq: ,
ne: ,
gte: ,
gt: ,
lte: ,
lt: ,
not: ,
in: ,
notIn: ,
is: ,
like: ,
notLike: ,
iLike: ,
notILike: ,
regexp: ,
notRegexp: ,
iRegexp: ,
notIRegexp: ,
between: ,
notBetween: ,
overlap: ,
contains: ,
contained: ,
adjacent: ,
strictLeft: ,
strictRight: ,
noExtendRight: ,
noExtendLeft: ,
and: ,
or: ,
any: ,
all: ,
values: ,
co: 
};
/**
 * Used to map operators to their Symbol representations
*/
declare export interface OperatorsAliases {
[K: string]: 
} 
/**
 * Options for the constructor of Sequelize main class
*/
declare export type Options = {

/**
 * The dialect of the database you are connecting to. One of mysql, postgres, sqlite, mariadb and mssql.
 * 
Defaults to 'mysql'
*/
dialect?: 'mysql'
| 'postgres'
| 'sqlite'
| 'mariadb'
| 'mssql',

/**
 * If specified, load the dialect library from this path. For example, if you want to use pg.js instead of
 * pg when connecting to a pg database, you should specify 'pg.js' here
*/
dialectModulePath?: string,

/**
 * An object of additional options, which are passed directly to the connection library
*/
dialectOptions?: "NO PRINT IMPLEMENTED: ObjectKeyword",

/**
 * Only used by sqlite.
 * 
Defaults to ':memory:'
*/
storage?: string,

/**
 * The name of the database
*/
database?: string,

/**
 * The username which is used to authenticate against the database.
*/
username?: string,

/**
 * The password which is used to authenticate against the database.
*/
password?: string,

/**
 * The host of the relational database.
 * 
Defaults to 'localhost'
*/
host?: string,

/**
 * The port of the relational database.
*/
port?: number,

/**
 * A flag that defines if is used SSL.
*/
ssl?: boolean,

/**
 * The protocol of the relational database.
 * 
Defaults to 'tcp'
*/
protocol?: string,

/**
 * Default options for model definitions. See sequelize.define for options
*/
define?: ModelOptions,

/**
 * Default options for sequelize.query
*/
query?: QueryOptions,

/**
 * Default options for sequelize.set
*/
set?: SetOptions,

/**
 * Default options for sequelize.sync
*/
sync?: SyncOptions,

/**
 * The timezone used when converting a date from the database into a JavaScript date. The timezone is also
 * used to SET TIMEZONE when connecting to the server, to ensure that the result of NOW, CURRENT_TIMESTAMP
and other time related functions have in the right timezone. For best cross platform performance use the
format
+/-HH:MM. Will also accept string versions of timezones used by moment.js (e.g. 'America/Los_Angeles');
this is useful to capture daylight savings time changes.

Defaults to '+00:00'
*/
timezone?: string,

/**
 * A flag that defines if null values should be passed to SQL queries or not.
 * 
Defaults to false
*/
omitNull?: boolean,

/**
 * A flag that defines if native library shall be used or not. Currently only has an effect for postgres
 * 
Defaults to false
*/
native?: boolean,

/**
 * Use read / write replication. To enable replication, pass an object, with two properties, read and write.
 * Write should be an object (a single server for handling writes), and read an array of object (several
servers to handle reads). Each read/write server can have the following properties: `host`, `port`,
`username`, `password`, `database`

Defaults to false
*/
replication?: ReplicationOptions,

/**
 * Connection pool options
*/
pool?: PoolOptions,

/**
 * Set to `false` to make table names and attributes case-insensitive on Postgres and skip double quoting of
 * them.

Defaults to true
*/
quoteIdentifiers?: boolean,

/**
 * Set the default transaction isolation level. See `Sequelize.Transaction.ISOLATION_LEVELS` for possible
 * options.

Defaults to 'REPEATABLE_READ'
*/
isolationLevel?: string,

/**
 * Run built in type validators on insert and update, e.g. validate that arguments passed to integer
 * fields are integer-like.

Defaults to false
*/
typeValidation?: boolean,

/**
 * Sets available operator aliases. See (http://docs.sequelizejs.com/manual/tutorial/querying.html#operators)
 * for more information. Set to false to disable operator aliases completely (recommended)

Defaults to all aliases
*/
operatorsAliases: OperatorsAliases | 
} & Logging
declare export interface QueryOptionsTransactionRequired {} declare module.exports: typeof Sequelize
/**
 * Creates a object representing a database function. This can be used in search queries, both in where and
 * order parts, and as default values in column definitions. If you want to refer to columns in your
function, you should use `sequelize.col`, so that the columns are properly interpreted as columns and
not a strings.

Convert a user's username to upper case
```js
instance.updateAttributes({
   username: self.sequelize.fn('upper', self.sequelize.col('username'))
})
```
 * @param  The function you want to call
 * @param  All further arguments will be passed as arguments to the function
*/
declare export function fn(fn: string, ...args: any[]): Fn
/**
 * Creates a object representing a column in the DB. This is often useful in conjunction with
 * `sequelize.fn`, since raw string arguments to fn will be escaped.
 * @param  The name of the column
*/
declare export function col(col: string): Col
/**
 * Creates a object representing a call to the cast function.
 * @param  The value to cast
 * @param  The type to cast it to
*/
declare export function cast(val: any, type: string): Cast
/**
 * Creates a object representing a literal, i.e. something that will not be escaped.
 * @param  undefined
*/
declare export function literal(val: any): Literaldeclare export function asIs(val: any): Literal
/**
 * An AND query
 * @param  Each argument will be joined by AND
*/
declare export function and(...args: (WhereOperators | WhereAttributeHash | Where)[]): AndOperator
/**
 * An OR query
 * @param  Each argument will be joined by OR
*/
declare export function or(...args: (WhereOperators | WhereAttributeHash | Where)[]): OrOperator
/**
 * Creates an object representing nested where conditions for postgres's json data-type.
 * @param  A hash containing strings/numbers or other nested hash, a string using dot
notation or a string using postgres json syntax.
 * @param  An optional value to compare against. Produces a string of the form "<json path> =
'<value>'".
*/
declare export function json(
conditionsOrPath: string | "NO PRINT IMPLEMENTED: ObjectKeyword",
value?: string | number | boolean): Json
/**
 * A way of specifying attr = condition.
 * 
The attr can either be an object taken from `Model.rawAttributes` (for example `Model.rawAttributes.id`
or
`Model.rawAttributes.name`). The attribute should be defined in your model definition. The attribute can
also be an object from one of the sequelize utility functions (`sequelize.fn`, `sequelize.col` etc.)

For string attributes, use the regular `{ where: { attr: something }}` syntax. If you don't want your
string to be escaped, use `sequelize.literal`.
 * @param  The attribute, which can be either an attribute object from `Model.rawAttributes` or a
sequelize object, for example an instance of `sequelize.fn`. For simple string attributes, use the
POJO syntax
 * @param  Comparator
 * @param  The condition. Can be both a simply type, or a further condition (`.or`, `.and`, `.literal`
etc.)
*/
declare export function where(
attr: "NO PRINT IMPLEMENTED: ObjectKeyword",
comparator: string,
logic: string | "NO PRINT IMPLEMENTED: ObjectKeyword"): Wheredeclare export function condition(
attr: "NO PRINT IMPLEMENTED: ObjectKeyword",
logic: string | "NO PRINT IMPLEMENTED: ObjectKeyword"): Where