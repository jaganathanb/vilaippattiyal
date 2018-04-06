
/**
 * The Base Error all Sequelize Errors inherit from.
*/
declare export class BaseError mixins Error {
name: string
}
/**
 * Scope Error. Thrown when the sequelize cannot query the specified scope.
*/
declare export class SequelizeScopeError mixins BaseError {}declare export class ValidationError mixins BaseError {

/**
 * Array of ValidationErrorItem objects describing the validation errors 
*/
errors: ValidationErrorItem[];

/**
 * Validation Error. Thrown when the sequelize validation has failed. The error contains an `errors`
 * property, which is an array with 1 or more ValidationErrorItems, one for each validation that failed.
 * @param  Error message
 * @param  Array of ValidationErrorItem objects describing the validation errors
*/
constructor(message: string, errors?: ValidationErrorItem[]): this;

/**
 * Gets all validation error items for the path / field specified.
 * @param  The path to be checked for error items
*/
get(path: string): ValidationErrorItem[]
}declare export class ValidationErrorItem  {

/**
 * An error message 
*/
message: string;

/**
 * The type of the validation error 
*/
type: string;

/**
 * The field that triggered the validation error 
*/
path: string;

/**
 * The value that generated the error 
*/
value: string;

/**
 * Validation Error Item
 * Instances of this class are included in the `ValidationError.errors` property.
 * @param  An error message
 * @param  The type of the validation error
 * @param  The field that triggered the validation error
 * @param  The value that generated the error
*/
constructor(message?: string, type?: string, path?: string, value?: string): this
}declare export interface CommonErrorProperties {

/**
 * The database specific error which triggered this one 
*/
parent: Error,

/**
 * The database specific error which triggered this one 
*/
original: Error,

/**
 * The SQL that triggered the error 
*/
sql: string
} declare export class DatabaseError mixins BaseError, CommonErrorProperties {
parent: Error;
original: Error;
sql: string;

/**
 * A base class for all database related errors.
 * @param  The database specific error which triggered this one
*/
constructor(parent: Error): this
}
/**
 * Thrown when a database query times out because of a deadlock 
*/
declare export class TimeoutError mixins DatabaseError {}declare export interface UniqueConstraintErrorOptions {
parent?: Error,
message?: string,
errors?: ValidationErrorItem[],
fields?: {
[key: string]: any
},
original?: Error
} 
/**
 * Thrown when a unique constraint is violated in the database
*/
declare export class UniqueConstraintError mixins ValidationError, CommonErrorProperties {
parent: Error;
original: Error;
sql: string;
fields: {
[key: string]: any
};
constructor(options?: UniqueConstraintErrorOptions): this
}
/**
 * Thrown when a foreign key constraint is violated in the database
*/
declare export class ForeignKeyConstraintError mixins DatabaseError {
table: string;
fields: {
[field: string]: string
};
value: any;
index: string;
constructor(options: {
parent?: Error,
message?: string,
index?: string,
fields?: string[],
table?: string
}): this
}
/**
 * Thrown when an exclusion constraint is violated in the database
*/
declare export class ExclusionConstraintError mixins DatabaseError {
constraint: string;
fields: {
[field: string]: string
};
table: string;
constructor(options: {
parent?: Error,
message?: string,
constraint?: string,
fields?: string[],
table?: string
}): this
}
/**
 * A base class for all connection related errors.
*/
declare export class ConnectionError mixins BaseError {
parent: Error;
original: Error;
constructor(parent: Error): this
}
/**
 * Thrown when a connection to a database is refused
*/
declare export class ConnectionRefusedError mixins ConnectionError {}
/**
 * Thrown when a connection to a database is refused due to insufficient privileges
*/
declare export class AccessDeniedError mixins ConnectionError {}
/**
 * Thrown when a connection to a database has a hostname that was not found
*/
declare export class HostNotFoundError mixins ConnectionError {}
/**
 * Thrown when a connection to a database has a hostname that was not reachable
*/
declare export class HostNotReachableError mixins ConnectionError {}
/**
 * Thrown when a connection to a database has invalid values for any of the connection parameters
*/
declare export class InvalidConnectionError mixins ConnectionError {}
/**
 * Thrown when a connection to a database times out
*/
declare export class ConnectionTimedOutError mixins ConnectionError {}