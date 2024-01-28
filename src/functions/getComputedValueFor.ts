/**
 * Function for fetching computed value from a DOM element.
 * By default values with pixels are returned as a parsed number.
 * @param element Element which we want to get a value from
 * @param parameter Which value to be returned
 * @param rawValue Should the returned value not be parsed and returned as is
 * @returns Element value
 */
export default function getComputedValueFor(
  element: HTMLElement | HTMLImageElement,
  parameter: string,
  rawValue: boolean = false
): string | number {
  const elementValues = getComputedStyle(element);
  let value: string | number = elementValues.getPropertyValue(parameter);

  if (!rawValue && value.endsWith("px")) {
    value = Number(value.slice(0, -2));
  }

  return value;
}
