interface Field {
  [key: string]: string | string[];
}

interface Values {
  [key: string]: unknown;
}

/**
 * Determines the visibility of a field based on specified criteria and values.
 *
 * @param {Field} field - The field object.
 * @param {string[]} visibleKeys - An array of keys that determine the visibility of the field.
 * @param {unknown[]} criterias - An array of criteria values.
 * @param {Values} values - The values object.
 * @returns {boolean[]} - An array of boolean values indicating the visibility of the field.
 */
export const visibleWhenFilter = (
  field: Field,
  visibleKeys: string[],
  criterias: unknown[],
  values: Values
): boolean[] => {
  /**
   * Makes a decision based on the field value and criteria.
   *
   * @param {unknown} fieldValue - The value of the field.
   * @param {unknown} criteria - The criteria value.
   * @returns {boolean} - The decision based on the field value and criteria.
   */
  const makeADecision = (fieldValue: unknown, criteria: unknown): boolean => {
    if (fieldValue === undefined) {
      return !criteria;
    } else {
      return fieldValue === criteria;
    }
  };

  const decisions = visibleKeys.map((vKey, index) => {
    if (field && field[vKey]) {
      if (Array.isArray(field[vKey])) {
        const falseDecisionArray = (field[vKey] as string[])
          .map((visibleWhenKey: string) => values[visibleWhenKey])
          .map((fieldValue: unknown) => makeADecision(fieldValue, criterias[index]))
          .filter((decision: boolean) => !decision);
          
        return falseDecisionArray.length === 0;
      } else {
        const visibleWhenKey = field[vKey] as string;
        return makeADecision(values[visibleWhenKey], criterias[index]);
      }
    }
    return true;
  });

  return decisions.filter(decision => !decision);
};
