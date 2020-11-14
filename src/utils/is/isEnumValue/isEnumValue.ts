type EnumKey = string
type EnumValue = PropertyKey
type EnumType = Record<EnumKey, EnumValue>

export const isEnumValue = <TEnumType extends EnumType>(
  enumType: TEnumType,
) => {
  return (unknown: unknown): unknown is TEnumType[keyof TEnumType] => {
    // simple string enums
    const enumValueIndex: number = Object.values(enumType).indexOf(
      unknown as EnumValue,
    )
    if (enumValueIndex === -1) return false

    // numeric and mixed enums duplicate values to keys
    const enumKey: EnumKey = Object.keys(enumType)[enumValueIndex]
    const enumValue: EnumValue | undefined = enumType[unknown as EnumKey]
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (enumValue === undefined || enumValue === enumKey) return true

    //
    return false
  }
}
