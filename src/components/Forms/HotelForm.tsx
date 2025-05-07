import React from 'react';
import { Form, Formik } from 'formik';
import { MyTextInput, SnackbarAlert } from '../index';
import * as Yup from 'yup';
import { Box, Typography, Card, Button } from '../../utils/Mui';
import { generateInitialValuesAndValidation } from '../../utils/formUtils';
import dataDynamicForm  from '../../Data/dataDynamicForm.json';
import '../../styles/styles.css';
interface HotelFormProps {
  mode: 'create' | 'edit';
  initialData?: Record<string, any>;
  onSubmit: (values: any, resetForm: () => void) => void;
  open: boolean;
  message: string;
  onCloseSnackbar: () => void;
}

const { initialValues, validationSchema } = generateInitialValuesAndValidation();

export const HotelForm: React.FC<HotelFormProps> = ({
  mode,
  initialData,
  onSubmit,
  open,
  message,
  onCloseSnackbar
}) => {
  const values = { ...initialValues, ...initialData };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Card sx={{ maxWidth: 700, padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {mode === 'create' ? 'Registrar Hotel' : 'Editar Hotel'}
        </Typography>

        <Formik
          initialValues={values}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            onSubmit(values, resetForm);
          }}
        >
          {() => (
            <Form>
              <SnackbarAlert open={open} message={message} severity="success" onClose={onCloseSnackbar} />
              {dataDynamicForm.map(({ type, name, placeholder, label } : any) => (
                <MyTextInput
                  key={name}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  label={label}
                  disabled={mode === 'edit' && name === 'nit'} 
                />
              ))}
              <Button sx={{ mt: 5 }} variant="contained" type="submit">
                {mode === 'create' ? 'Registrar' : 'Guardar cambios'}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};
