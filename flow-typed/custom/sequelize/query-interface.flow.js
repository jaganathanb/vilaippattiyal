
/**
 * Interface for query options
*/
declare export type QueryOptions = {

/**
 * If true, sequelize will not try to format the results of the query, or build an instance of a model from
 * the result
*/
raw?: boolean,

/**
 * The type of query you are executing. The query type affects how results are formatted before they are
 * passed back. The type is a string, but `Sequelize.QueryTypes` is provided as convenience shortcuts.
*/
type?: string,

/**
 * If true, transforms objects with `.` separated property names into nested objects using
 * [dottie.js](https://github.com/mickhansen/dottie.js). For example { 'user.username': 'john' } becomes
{ user: { username: 'john' }}. When `nest` is true, the query type is assumed to be `'SELECT'`,
unless otherwise specified

Defaults to false
*/
nest?: boolean,

/**
 * Sets the query type to `SELECT` and return a single row
*/
plain?: boolean,

/**
 * Either an object of named parameter replacements in the format `:param` or an array of unnamed
 * replacements to replace `?` in your SQL.
*/
replacements?: "NO PRINT IMPLEMENTED: ObjectKeyword" | string[],

/**
 * Force the query to use the write pool, regardless of the query type.
 * 
Defaults to false
*/
useMaster?: boolean,

/**
 * A sequelize instance used to build the return instance
*/
instance?: Model
} & Logging & Transactionable
declare export interface QueryOptionsWithModel {

/**
 * A sequelize model used to build the returned model instances (used to be called callee)
*/
model: typeof Model
} declare export interface QueryOptionsWithType {

/**
 * The type of query you are executing. The query type affects how results are formatted before they are
 * passed back. The type is a string, but `Sequelize.QueryTypes` is provided as convenience shortcuts.
*/
type: QueryTypes
} 
/**
 * Most of the methods accept options and use only the logger property of the options. That's why the most used
 * interface type for options in a method is separated here as another interface.
*/
declare export type QueryInterfaceOptions = {} & Logging & Transactionable
declare export type QueryInterfaceCreateTableOptions = {
collate?: string,
engine?: string,
charset?: string,

/**
 * Used for compound unique keys.
*/
uniqueKeys?: {
[keyName: string]: {
fields: string[]
}
}
} & QueryInterfaceOptions
declare export type QueryInterfaceDropTableOptions = {
cascade?: boolean,
force?: boolean
} & QueryInterfaceOptions
declare export type QueryInterfaceDropAllTablesOptions = {
skip?: string[]
} & QueryInterfaceOptions
declare export type QueryInterfaceIndexOptions = {
indicesType?: 'UNIQUE' | 'FULLTEXT' | 'SPATIAL',

/**
 * The name of the index. Default is __ 
*/
indexName?: string,

/**
 * For FULLTEXT columns set your parser 
*/
parser?: string,

/**
 * Set a type for the index, e.g. BTREE. See the documentation of the used dialect 
*/
indexType?: string
} & QueryInterfaceOptions
declare export interface AddUniqueConstraintOptions {
type: 'unique',
name?: string
} declare export interface AddDefaultConstraintOptions {
type: 'default',
name?: string,
defaultValue?: any
} declare export interface AddCheckConstraintOptions {
type: 'check',
name?: string,
where?: WhereOptions
} declare export interface AddPrimaryKeyConstraintOptions {
type: 'primary key',
name?: string
} declare export interface AddForeignKeyConstraintOptions {
type: 'foreign key',
name?: string,
references?: {
table: string,
field: string
},
onDelete: string,
onUpdate: string
} declare export type AddConstraintOptions = AddUniqueConstraintOptions
| AddDefaultConstraintOptions
| AddCheckConstraintOptions
| AddPrimaryKeyConstraintOptions
| AddForeignKeyConstraintOptions;
/**
 * The interface that Sequelize uses to talk to all databases.
 * 
This interface is available through sequelize.QueryInterface. It should not be commonly used, but it's
referenced anyway, so it can be used.
*/
declare export class QueryInterface  {

/**
 * Returns the dialect-specific sql generator.
 * 
We don't have a definition for the QueryGenerator, because I doubt it is commonly in use separately.
*/
QueryGenerator: any;

/**
 * Returns the current sequelize instance.
*/
sequelize: Sequelize;
constructor(sequelize: Sequelize): this;

/**
 * Queries the schema (table list).
 * @param  The schema to query. Applies only to Postgres.
*/
createSchema(schema?: string, options?: QueryInterfaceOptions): Promise<void>;

/**
 * Drops the specified schema (table).
 * @param  The schema to query. Applies only to Postgres.
*/
dropSchema(schema?: string, options?: QueryInterfaceOptions): Promise<void>;

/**
 * Drops all tables.
*/
dropAllSchemas(options?: QueryInterfaceDropAllTablesOptions): Promise<void>;

/**
 * Queries all table names in the database.
 * @param  undefined
*/
showAllSchemas(options?: QueryOptions): Promise<"NO PRINT IMPLEMENTED: ObjectKeyword">;

/**
 * Return database version
*/
databaseVersion(options?: QueryInterfaceOptions): Promise<string>;

/**
 * Creates a table with specified attributes.
 * @param  Name of table to create
 * @param  Hash of attributes, key is attribute name, value is data type
 * @param  Table options.
*/
createTable(
tableName: string | {
schema?: string,
tableName?: string
},
attributes: ModelAttributes,
options?: QueryInterfaceCreateTableOptions): Promise<void>;

/**
 * Drops the specified table.
 * @param  Table name.
 * @param  Query options, particularly "force".
*/
dropTable(tableName: string, options?: QueryInterfaceDropTableOptions): Promise<void>;

/**
 * Drops all tables.
 * @param  undefined
*/
dropAllTables(options?: QueryInterfaceDropTableOptions): Promise<void>;

/**
 * Drops all defined enums
 * @param  undefined
*/
dropAllEnums(options?: QueryOptions): Promise<void>;

/**
 * Renames a table
*/
renameTable(before: string, after: string, options?: QueryInterfaceOptions): Promise<void>;

/**
 * Returns all tables
*/
showAllTables(options?: QueryOptions): Promise<string[]>;

/**
 * Describe a table
*/
describeTable(
tableName: string | {
schema?: string,
tableName?: string
},
options?: string | {
schema?: string,
schemaDelimeter?: string
} & Logging): Promise<"NO PRINT IMPLEMENTED: ObjectKeyword">;

/**
 * Adds a new column to a table
*/
addColumn(
table: string | {
schema?: string,
tableName?: string
},
key: string,
attribute: ModelAttributeColumnOptions | DataType,
options?: QueryInterfaceOptions): Promise<void>;

/**
 * Removes a column from a table
*/
removeColumn(
table: string | {
schema?: string,
tableName?: string
},
attribute: string,
options?: QueryInterfaceOptions): Promise<void>;

/**
 * Changes a column
*/
changeColumn(
tableName: string | {
schema?: string,
tableName?: string
},
attributeName: string,
dataTypeOrOptions?: DataType | ModelAttributeColumnOptions,
options?: QueryInterfaceOptions): Promise<void>;

/**
 * Renames a column
*/
renameColumn(
tableName: string | {
schema?: string,
tableName?: string
},
attrNameBefore: string,
attrNameAfter: string,
options?: QueryInterfaceOptions): Promise<void>;

/**
 * Adds a new index to a table
*/
addIndex(
tableName: string,
attributes: string[],
options?: QueryInterfaceIndexOptions,
rawTablename?: string): Promise<void>;
addIndex(
tableName: string,
options: QueryInterfaceIndexOptions & {
fields: string[]
},
rawTablename?: string): Promise<void>;

/**
 * Removes an index of a table
*/
removeIndex(
tableName: string,
indexName: string,
options?: QueryInterfaceIndexOptions): Promise<void>;
removeIndex(
tableName: string,
attributes: string[],
options?: QueryInterfaceIndexOptions): Promise<void>;

/**
 * Adds constraints to a table
*/
addConstraint(
tableName: string,
attributes: string[],
options?: AddConstraintOptions | QueryInterfaceOptions): Promise<void>;

/**
 * Removes constraints from a table
*/
removeConstraint(
tableName: string,
constraintName: string,
options?: QueryInterfaceOptions): Promise<void>;

/**
 * Shows the index of a table
*/
showIndex(
tableName: string | "NO PRINT IMPLEMENTED: ObjectKeyword",
options?: QueryOptions): Promise<"NO PRINT IMPLEMENTED: ObjectKeyword">;

/**
 * Put a name to an index
*/
nameIndexes(indexes: string[], rawTablename: string): Promise<void>;

/**
 * Returns all foreign key constraints of a table
*/
getForeignKeysForTables(
tableNames: string,
options?: QueryInterfaceOptions): Promise<"NO PRINT IMPLEMENTED: ObjectKeyword">;

/**
 * Inserts a new record
*/
insert(
instance: Model,
tableName: string,
values: "NO PRINT IMPLEMENTED: ObjectKeyword",
options?: QueryOptions): Promise<"NO PRINT IMPLEMENTED: ObjectKeyword">;

/**
 * Inserts or Updates a record in the database
*/
upsert(
tableName: string,
values: "NO PRINT IMPLEMENTED: ObjectKeyword",
updateValues: "NO PRINT IMPLEMENTED: ObjectKeyword",
model: typeof Model,
options?: QueryOptions): Promise<"NO PRINT IMPLEMENTED: ObjectKeyword">;

/**
 * Inserts multiple records at once
*/
bulkInsert(
tableName: string,
records: "NO PRINT IMPLEMENTED: ObjectKeyword"[],
options?: QueryOptions,
attributes?: string[] | string): Promise<"NO PRINT IMPLEMENTED: ObjectKeyword">;

/**
 * Updates a row
*/
update(
instance: Model,
tableName: string,
values: "NO PRINT IMPLEMENTED: ObjectKeyword",
identifier: "NO PRINT IMPLEMENTED: ObjectKeyword",
options?: QueryOptions): Promise<"NO PRINT IMPLEMENTED: ObjectKeyword">;

/**
 * Updates multiple rows at once
*/
bulkUpdate(
tableName: string,
values: "NO PRINT IMPLEMENTED: ObjectKeyword",
identifier: "NO PRINT IMPLEMENTED: ObjectKeyword",
options?: QueryOptions,
attributes?: string[] | string): Promise<"NO PRINT IMPLEMENTED: ObjectKeyword">;

/**
 * Deletes a row
*/
delete(
instance: Model,
tableName: string,
identifier: "NO PRINT IMPLEMENTED: ObjectKeyword",
options?: QueryOptions): Promise<"NO PRINT IMPLEMENTED: ObjectKeyword">;

/**
 * Deletes multiple rows at once
*/
bulkDelete(
tableName: string,
identifier: "NO PRINT IMPLEMENTED: ObjectKeyword",
options?: QueryOptions,
model?: typeof Model): Promise<"NO PRINT IMPLEMENTED: ObjectKeyword">;

/**
 * Returns selected rows
*/
select(
model: typeof Model,
tableName: string,
options?: QueryOptions): Promise<"NO PRINT IMPLEMENTED: ObjectKeyword"[]>;

/**
 * Increments a row value
*/
increment(
instance: Model,
tableName: string,
values: "NO PRINT IMPLEMENTED: ObjectKeyword",
identifier: "NO PRINT IMPLEMENTED: ObjectKeyword",
options?: QueryOptions): Promise<"NO PRINT IMPLEMENTED: ObjectKeyword">;

/**
 * Selects raw without parsing the string into an object
*/
rawSelect(
tableName: string,
options: QueryOptions,
attributeSelector: string | string[],
model?: typeof Model): Promise<string[]>;

/**
 * Postgres only. Creates a trigger on specified table to call the specified function with supplied
 * parameters.
*/
createTrigger(
tableName: string,
triggerName: string,
timingType: string,
fireOnArray: any[],
functionName: string,
functionParams: any[],
optionsArray: string[],
options?: QueryInterfaceOptions): Promise<void>;

/**
 * Postgres only. Drops the specified trigger.
*/
dropTrigger(
tableName: string,
triggerName: string,
options?: QueryInterfaceOptions): Promise<void>;

/**
 * Postgres only. Renames a trigger
*/
renameTrigger(
tableName: string,
oldTriggerName: string,
newTriggerName: string,
options?: QueryInterfaceOptions): Promise<void>;

/**
 * Postgres only. Create a function
*/
createFunction(
functionName: string,
params: any[],
returnType: string,
language: string,
body: string,
options?: QueryOptions): Promise<void>;

/**
 * Postgres only. Drops a function
*/
dropFunction(
functionName: string,
params: any[],
options?: QueryInterfaceOptions): Promise<void>;

/**
 * Postgres only. Rename a function
*/
renameFunction(
oldFunctionName: string,
params: any[],
newFunctionName: string,
options?: QueryInterfaceOptions): Promise<void>;

/**
 * Escape an identifier (e.g. a table or attribute name). If force is true, the identifier will be quoted
 * even if the `quoteIdentifiers` option is false.
*/
quoteIdentifier(identifier: string, force: boolean): string;

/**
 * Escape a table name
*/
quoteTable(identifier: string): string;

/**
 * Split an identifier into .-separated tokens and quote each part. If force is true, the identifier will be
 * quoted even if the `quoteIdentifiers` option is false.
*/
quoteIdentifiers(identifiers: string, force: boolean): string;

/**
 * Escape a value (e.g. a string, number or date)
*/
escape(value?: string | number | Date): string;

/**
 * Set option for autocommit of a transaction
*/
setAutocommit(
transaction: Transaction,
value: boolean,
options?: QueryOptions): Promise<void>;

/**
 * Set the isolation level of a transaction
*/
setIsolationLevel(transaction: Transaction, value: string, options?: QueryOptions): Promise<void>;

/**
 * Begin a new transaction
*/
startTransaction(transaction: Transaction, options?: QueryOptions): Promise<void>;

/**
 * Defer constraints
*/
deferConstraints(transaction: Transaction, options?: QueryOptions): Promise<void>;

/**
 * Commit an already started transaction
*/
commitTransaction(transaction: Transaction, options?: QueryOptions): Promise<void>;

/**
 * Rollback ( revert ) a transaction that has'nt been commited
*/
rollbackTransaction(transaction: Transaction, options?: QueryOptions): Promise<void>
}