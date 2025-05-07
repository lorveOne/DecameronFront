import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Typography, Card, Button } from '../../utils/Mui';
import { MyTextInput, MySelect, SnackbarAlert } from '../../components';
import { TipoAcomodaSelect } from '../../components/AcomodaSelect';
import '../../styles/styles.css';

export interface RoomFormValues {
  idHotel: string;
  nombre: string;
  numHabi: number | '';
  tipoHabi: string;
  acomoda: string;
}

interface RoomFormProps {
  mode: 'create' | 'edit';
  initialValues: RoomFormValues;
  onSubmit: (values: RoomFormValues, resetForm: () => void) => void;
  onCancel?: () => void;
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: 'success' | 'error';
}

export const RoomForm: React.FC<RoomFormProps> = ({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  snackbarOpen,
  snackbarMessage,
  snackbarSeverity
}) => {
    const [snackbar, setSnackbar] = React.useState({
      open: snackbarOpen,
      message: snackbarMessage,
      severity: snackbarSeverity
    });

  const validationSchema = Yup.object().shape({
    numHabi: Yup.number().required('Cantidad requerida').min(1, 'Debe ser al menos 1'),
    tipoHabi: Yup.string().required('Tipo de habitación requerido'),
    acomoda: Yup.string()
      .required('Acomodación requerida')
      .test('acomodacion-valida', 'No válida para el tipo', function (value) {
        const { tipoHabi } = this.parent;
        const reglas: Record<string,string[]> = {
          ESTANDAR: ['SENCILLA','DOBLE'],
          JUNIOR: ['TRIPLE','CUADRUPLE'],
          SUITE: ['SENCILLA','DOBLE','TRIPLE']
        };
        return value ? reglas[tipoHabi].includes(value) : true;
      })
  });

  const showMessage = (msg: string, severity: 'success'|'error') => {
    setSnackbar({ open: true, message: msg, severity });
  };
  const closeSnackbar = () => setSnackbar(s => ({ ...s, open: false }));

  return (
    <Box sx={{ maxWidth: 600, m: '0 auto', p: 3 }}>
      {onCancel && (
        <Button
          variant="contained"
          color="secondary"
          onClick={onCancel}
          sx={{ mb: 2 }}
        >
          Volver
        </Button>
      )}
        <SnackbarAlert
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={closeSnackbar}
      />
      <Card sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          {mode === 'create' ? 'Registrar Habitación' : 'Editar Habitación'}
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            onSubmit(values, () => {
              resetForm();
              showMessage(
                mode === 'create' ? 'Creada con éxito' : 'Actualizada con éxito',
                'success'
              );
            });
          }}
        >
          {() => (
            <Form>
              <MyTextInput
                label="NIT Hotel"
                name="idHotel"
                disabled={true}
              />
              <MyTextInput
                label="Nombre Hotel"
                name="nombre"
                disabled={true}
              />
              <MyTextInput
                type="number"
                label="Número de Habitaciones"
                name="numHabi"
              />
              <MySelect label="Tipo Habitación" name="tipoHabi">
                <option value="">Selecciona</option>
                <option value="ESTANDAR">ESTÁNDAR</option>
                <option value="JUNIOR">JUNIOR</option>
                <option value="SUITE">SUITE</option>
              </MySelect>
              <TipoAcomodaSelect />

              <Button
                sx={{ mt: 3 }}
                variant="contained"
                type="submit"
              >
                {mode === 'create' ? 'Registrar' : 'Guardar cambios'}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};
