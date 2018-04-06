
/**
 * The datatypes are used when defining a new model using `Sequelize.define`, like this:
 * ```js
sequelize.define('model', {
   column: DataTypes.INTEGER
})
```
When defining a model you can just as easily pass a string as type, but often using the types defined here is beneficial. For example, using `DataTypes.BLOB`, mean
that that column will be returned as an instance of `Buffer` when being fetched by sequelize.

Some data types have special properties that can be accessed in order to change the data type.
For example, to get an unsigned integer with zerofill you can do `DataTypes.INTEGER.UNSIGNED.ZEROFILL`.
The order you access the properties in do not matter, so `DataTypes.INTEGER.ZEROFILL.UNSIGNED` is fine as well. The available properties are listed under each data type.

To provide a length for the data type, you can invoke it like a function: `INTEGER(2)`

Three of the values provided here (`NOW`, `UUIDV1` and `UUIDV4`) are special default values, that should not be used to define types. Instead they are used as shorthands for
defining default values. For example, to get a uuid field with a default value generated following v1 of the UUID standard:
```js
sequelize.define('model', {
   uuid: {
     type: DataTypes.UUID,
     defaultValue: DataTypes.UUIDV1,
     primaryKey: true
   }
})
```
There may be times when you want to generate your own UUID conforming to some other algorithm. This is accomplised
using the defaultValue property as well, but instead of specifying one of the supplied UUID types, you return a value
from a function.
```js
sequelize.define('model', {
   uuid: {
     type: DataTypes.UUID,
     defaultValue: function() {
       return generateMyId()
     },
     primaryKey: true
   }
})
```
*/
declare export type DataType = string | AbstractDataTypeConstructor | AbstractDataType;declare export var ABSTRACT: AbstractDataTypeConstructor;declare interface AbstractDataTypeConstructor {
key: string,
warn(link: string, text: string): void
} declare export interface AbstractDataType {
key: string,
dialectTypes: string,
toSql(): string,
stringify(value: any, options?: "NO PRINT IMPLEMENTED: ObjectKeyword"): string,
toString(options: "NO PRINT IMPLEMENTED: ObjectKeyword"): string
} declare export var STRING: StringDataTypeConstructor;declare type StringDataTypeConstructor = {
new (length?: number, binary?: boolean): StringDataType,
new (options?: StringDataTypeOptions): StringDataType,
(length?: number, binary?: boolean): StringDataType,
(options?: StringDataTypeOptions): StringDataType
} & AbstractDataTypeConstructor
declare export type StringDataType = {
options?: StringDataTypeOptions,
BINARY: this,
validate(value: any): boolean
} & AbstractDataType
declare export interface StringDataTypeOptions {
length?: number,
binary?: boolean
} declare export var CHAR: CharDataTypeConstructor;declare type CharDataTypeConstructor = {
new (length?: number, binary?: boolean): CharDataType,
new (options?: CharDataTypeOptions): CharDataType,
(length?: number, binary?: boolean): CharDataType,
(options?: CharDataTypeOptions): CharDataType
} & StringDataTypeConstructor
declare export type CharDataType = {
options: CharDataTypeOptions
} & StringDataType
declare export type CharDataTypeOptions = {} & StringDataTypeOptions
declare export var TEXT: TextDataTypeConstructor;declare type TextDataTypeConstructor = {
new (length?: number): TextDataType,
(options?: TextDataTypeOptions): TextDataType
} & AbstractDataTypeConstructor
declare export type TextDataType = {
options: TextDataTypeOptions,
validate(value: any): boolean
} & AbstractDataType
declare export interface TextDataTypeOptions {
length?: number
} declare export var NUMBER: NumberDataTypeConstructor;declare type NumberDataTypeConstructor = {
new (options?: NumberDataTypeOptions): NumberDataType,
(options?: NumberDataTypeOptions): NumberDataType,
options: NumberDataTypeOptions,
validate(value: any): boolean,
UNSIGNED: this,
ZEROFILL: this
} & AbstractDataTypeConstructor
declare export type NumberDataType = {
options: NumberDataTypeOptions,
validate(value: any): boolean,
UNSIGNED: this,
ZEROFILL: this
} & AbstractDataType
declare export interface NumberDataTypeOptions {
length?: number,
zerofill?: boolean,
decimals?: number,
precision?: number,
scale?: number,
unsigned?: boolean
} declare export var INTEGER: IntegerDataTypeConstructor;declare type IntegerDataTypeConstructor = {
new (options?: NumberDataTypeOptions): IntegerDataType,
(options?: NumberDataTypeOptions): IntegerDataType
} & NumberDataTypeConstructor
declare export type IntegerDataType = {
options: NumberDataTypeOptions
} & NumberDataType
declare export interface IntegerDataTypeOptions {
length?: number
} declare export var BIGINT: BigIntDataTypeConstructor;declare type BigIntDataTypeConstructor = {
new (options?: BigIntDataTypeOptions): BigIntDataType,
(options?: BigIntDataTypeOptions): BigIntDataType
} & NumberDataTypeConstructor
declare export type BigIntDataType = {
options: BigIntDataTypeOptions
} & NumberDataType
declare export interface BigIntDataTypeOptions {
length?: number
} declare export var FLOAT: FloatDataTypeConstructor;declare type FloatDataTypeConstructor = {
new (length?: number, decimals?: number): FloatDataType,
new (options?: FloatDataTypeOptions): FloatDataType,
(length?: number, decimals?: number): FloatDataType,
(options?: FloatDataTypeOptions): FloatDataType
} & NumberDataTypeConstructor
declare export type FloatDataType = {
options: FloatDataTypeOptions
} & NumberDataType
declare export interface FloatDataTypeOptions {
length?: number,
decimals?: number
} declare export var REAL: RealDataTypeConstructor;declare type RealDataTypeConstructor = {
new (length?: number, decimals?: number): RealDataType,
new (options?: RealDataTypeOptions): RealDataType,
(length?: number, decimals?: number): RealDataType,
(options?: RealDataTypeOptions): RealDataType
} & NumberDataTypeConstructor
declare export type RealDataType = {
options: RealDataTypeOptions
} & NumberDataType
declare export interface RealDataTypeOptions {
length?: number,
decimals?: number
} declare export var DOUBLE: DoubleDataTypeConstructor;declare type DoubleDataTypeConstructor = {
new (length?: number, decimals?: number): DoubleDataType,
new (options?: DoubleDataTypeOptions): DoubleDataType,
(length?: number, decimals?: number): DoubleDataType,
(options?: DoubleDataTypeOptions): DoubleDataType
} & NumberDataTypeConstructor
declare export type DoubleDataType = {
options: DoubleDataTypeOptions
} & NumberDataType
declare export interface DoubleDataTypeOptions {
length?: number,
decimals?: number
} declare export var DECIMAL: DecimalDataTypeConstructor;declare type DecimalDataTypeConstructor = {
new (precision?: number, scale?: number): DecimalDataType,
new (options?: DecimalDataTypeOptions): DecimalDataType,
(precision?: number, scale?: number): DecimalDataType,
(options?: DecimalDataTypeOptions): DecimalDataType,
PRECISION: this,
SCALE: this
} & NumberDataTypeConstructor
declare export type DecimalDataType = {
options: DecimalDataTypeOptions
} & NumberDataType
declare export interface DecimalDataTypeOptions {
precision?: number,
scale?: number
} declare export var BOOLEAN: AbstractDataTypeConstructor;declare export var TIME: AbstractDataTypeConstructor;declare export var DATE: DateDataTypeConstructor;declare type DateDataTypeConstructor = {
new (length?: any): DateDataType,
new (options?: DateDataTypeOptions): DateDataType,
(length?: any): DateDataType,
(options?: DateDataTypeOptions): DateDataType
} & AbstractDataTypeConstructor
declare export type DateDataType = {
options: DateDataTypeOptions
} & AbstractDataTypeConstructor
declare export interface DateDataTypeOptions {
length?: any
} declare export var DATEONLY: DateOnlyDataTypeConstructor;declare type DateOnlyDataTypeConstructor = {
new (length: any): DateOnlyDataType,
new (options: DateOnlyDataTypeOptions): DateOnlyDataType,
(length: any): DateOnlyDataType,
(options: DateOnlyDataTypeOptions): DateOnlyDataType
} & AbstractDataTypeConstructor
declare export type DateOnlyDataType = {
options: DateOnlyDataTypeOptions
} & AbstractDataType
declare export interface DateOnlyDataTypeOptions {
length?: any
} declare export var HSTORE: AbstractDataTypeConstructor;declare export var JSON: AbstractDataTypeConstructor;declare export var JSONB: AbstractDataTypeConstructor;declare export var NOW: AbstractDataTypeConstructor;declare export var BLOB: BlobDataTypeConstructor;declare export type BlobSize = 'tiny' | 'medium' | 'long';declare type BlobDataTypeConstructor = {
new (length?: BlobSize): BlobDataType,
new (options?: BlobDataTypeOptions): BlobDataType,
(length?: BlobSize): BlobDataType,
(options?: BlobDataTypeOptions): BlobDataType
} & AbstractDataTypeConstructor
declare export type BlobDataType = {
options: BlobDataTypeOptions,
escape: boolean
} & AbstractDataType
declare export interface BlobDataTypeOptions {
length?: BlobSize,
escape?: boolean
} declare export var RANGE: RangeDataTypeConstructor;declare export type RangeableDataType = IntegerDataTypeConstructor
| IntegerDataType
| BigIntDataTypeConstructor
| BigIntDataType
| DecimalDataTypeConstructor
| DecimalDataType
| DateOnlyDataTypeConstructor
| DateOnlyDataType
| DateDataTypeConstructor
| DateDataType;declare type RangeDataTypeConstructor = {
new <T>(subtype?: T): RangeDataType<T>,
new <T>(options: RangeDataTypeOptions<T>): RangeDataType<T>,
(subtype?: T): RangeDataType<T>,
(options: RangeDataTypeOptions<T>): RangeDataType<T>
} & AbstractDataTypeConstructor
declare export type RangeDataType<T> = {
options: RangeDataTypeOptions<T>
} & AbstractDataType
declare export interface RangeDataTypeOptions<T> {
subtype?: T
} declare export var UUID: AbstractDataTypeConstructor;declare export var UUIDV1: AbstractDataTypeConstructor;declare export var UUIDV4: AbstractDataTypeConstructor;declare export var VIRTUAL: VirtualDataTypeConstructor;declare type VirtualDataTypeConstructor = {
new <T>(ReturnType: T, fields?: string[]): VirtualDataType<T>,
(ReturnType: T, fields?: string[]): VirtualDataType<T>
} & AbstractDataTypeConstructor
declare export type VirtualDataType<T> = {
returnType: T,
fields: string[]
} & AbstractDataType
declare export var ENUM: EnumDataTypeConstructor;declare type EnumDataTypeConstructor = {
new <T>(...values: T[]): EnumDataType<T>,
new <T>(options: EnumDataTypeOptions<T>): EnumDataType<T>,
(...values: T[]): EnumDataType<T>,
(options: EnumDataTypeOptions<T>): EnumDataType<T>
} & AbstractDataTypeConstructor
declare export type EnumDataType<T> = {
values: T[],
options: EnumDataTypeOptions<T>
} & AbstractDataType
declare export interface EnumDataTypeOptions<T> {
values: T[]
} declare export var ARRAY: ArrayDataTypeConstructor;declare type ArrayDataTypeConstructor = {
new <T>(type: T): ArrayDataType<T>,
new <T>(options: ArrayDataTypeOptions<T>): ArrayDataType<T>,
(type: T): ArrayDataType<T>,
(options: ArrayDataTypeOptions<T>): ArrayDataType<T>,
is<T>(obj: any, type: T): ArrayDataType
} & AbstractDataTypeConstructor
declare export type ArrayDataType<T> = {
options: ArrayDataTypeOptions<T>
} & AbstractDataType
declare export interface ArrayDataTypeOptions<T> {
type: T
} declare export var GEOMETRY: GeometryDataTypeConstructor;declare type GeometryDataTypeConstructor = {
new (type: string, srid?: number): GeometryDataType,
new (options: GeometryDataTypeOptions): GeometryDataType,
(type: string, srid?: number): GeometryDataType,
(options: GeometryDataTypeOptions): GeometryDataType
} & AbstractDataTypeConstructor
declare export type GeometryDataType = {
options: GeometryDataTypeOptions,
type: string,
srid?: number,
escape: boolean
} & AbstractDataType
declare export interface GeometryDataTypeOptions {
type: string,
srid?: number
} declare export var GEOGRAPHY: GeographyDataTypeConstructor;declare type GeographyDataTypeConstructor = {
new (type: string, srid?: number): GeographyDataType,
new (options: GeographyDataTypeOptions): GeographyDataType,
(type: string, srid?: number): GeographyDataType,
(options: GeographyDataTypeOptions): GeographyDataType
} & AbstractDataTypeConstructor
declare export type GeographyDataType = {
options: GeographyDataTypeOptions,
type: string,
srid?: number,
escape: boolean
} & AbstractDataType
declare export interface GeographyDataTypeOptions {
type: string,
srid?: number
} declare export var NONE: typeof VIRTUAL;