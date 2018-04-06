declare export type Primitive = 'string' | 'number' | 'boolean';declare export function useInflection(inflection: any): voiddeclare export function camelizeIf(string: string, condition?: boolean): stringdeclare export function underscoredIf(string: string, condition?: boolean): stringdeclare export function isPrimitive(val: any): Primitive
/**
 * Same concept as _.merge, but don't overwrite properties that have already been assigned 
*/
declare export function mergeDefaults(a: any, b: any): anydeclare export function lowercaseFirst(s: string): stringdeclare export function uppercaseFirst(s: string): stringdeclare export function spliceStr(str: string, index: number, count: number, add: string): stringdeclare export function camelize(str: string): stringdeclare export function format(arr: any[], dialect: string): stringdeclare export function formatNamedParameters(sql: string, parameters: any, dialect: string): stringdeclare export function cloneDeep<T>(obj: T, fn?: Function): T
/**
 * Expand and normalize finder options 
*/
declare export function mapFinderOptions(options: any, Model: any): anydeclare export function mapOptionFieldNames(options: any, Model: any): anydeclare export function mapWhereFieldNames(attributes: any, Model: any): any
/**
 * Used to map field names in values 
*/
declare export function mapValueFieldNames(dataValues: any, fields: any, Model: any): anydeclare export function isColString(value: string): booleandeclare export function argsArePrimaryKeys(args: any, primaryKeys: any): booleandeclare export function canTreatArrayAsAnd(arr: any[]): booleandeclare export function combineTableNames(tableName1: string, tableName2: string): stringdeclare export function singularize(s: string): stringdeclare export function pluralize(s: string): stringdeclare export function removeCommentsFromFunctionString(s: string): stringdeclare export function toDefaultValue(value: any): any
/**
 * Determine if the default value provided exists and can be described
 * in a db schema using the DEFAULT directive.
 * @param  Any default value.
 * @return  yes / no.
*/
declare export function defaultValueSchemable(value: any): booleandeclare export function inherit(SubClass: any, SuperClass: any): anydeclare export function stack(): stringdeclare export function sliceArgs(args: any, begin: any): any[]declare export function now(dialect: string): Datedeclare export function tick(func: Function): voiddeclare export var TICK_CHAR: string;declare export function addTicks(s: string, tickChar?: string): stringdeclare export function removeTicks(s: string, tickChar?: string): stringdeclare export class Fn  {
constructor(fn: any, args: any): this;
clone(): this
}declare export class Col  {
col: string;
constructor(col: string): this
}declare export class Cast  {
val: any;
type: string;
constructor(val: any, type?: string): this
}declare export class Literal  {
val: any;
constructor(val: any): this
}declare export class Json  {
conditions: "NO PRINT IMPLEMENTED: ObjectKeyword";
path: string;
value: string | number | boolean;
constructor(conditionsOrPath: string | "NO PRINT IMPLEMENTED: ObjectKeyword", value?: string | number | boolean): this
}declare export class Where  {
attribute: "NO PRINT IMPLEMENTED: ObjectKeyword";
comparator: string;
logic: string | "NO PRINT IMPLEMENTED: ObjectKeyword";
constructor(attr: "NO PRINT IMPLEMENTED: ObjectKeyword", comparator: string, logic: string | "NO PRINT IMPLEMENTED: ObjectKeyword"): this;
constructor(attr: "NO PRINT IMPLEMENTED: ObjectKeyword", logic: string | "NO PRINT IMPLEMENTED: ObjectKeyword"): this
}declare export var validateParameter: typeof parameterValidator;declare export function formatReferences(obj: any): any