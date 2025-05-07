import * as Yup from 'yup';
import dataDynamicForm from '../Data/dataDynamicForm.json';

export function generateInitialValuesAndValidation() {
  const initialValues: Record<string, string> = {};
  const requiredFields: Record<string, any> = {};

  for (const input of dataDynamicForm) {
    initialValues[input.name] = input.value || '';
    if (!input.validations) continue;

    let schema = Yup.string();
    for (const rule of input.validations) {
      if (rule.type === 'required') {
        schema = schema.required('Este campo es requerido');
      }
      if (rule.type === 'minLength') {
        if (typeof rule.value === 'number') {
          schema = schema.min(rule.value, `Debe tener al menos ${rule.value} caracteres`);
        }
      }
    }

    requiredFields[input.name] = schema;
  }

  return {
    initialValues,
    validationSchema: Yup.object(requiredFields),
  };
}
