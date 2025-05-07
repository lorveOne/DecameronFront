import React, { useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { RoomForm, RoomFormValues } from '../../components/Forms/HabiForm';
import { HabitaService } from '../../services/servicesHabi';

export const CreateHabita = () => {
  const { idHotel, nombre } = useParams<{ idHotel:string; nombre:string }>();
  const history = useHistory();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const initialValues: RoomFormValues = {
    idHotel,
    nombre,
    numHabi: '',
    tipoHabi: '',
    acomoda: ''
  };

  const handleSubmit = (values: any, onSuccess: () => void) => {
    HabitaService.create(values)
      .then((response) => {
        if (response.success === 'success') {
          setSnackbarMessage('Habitación creada exitosamente.');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
  
          
          onSuccess(); // Reiniciamos el formulario
        } else {
          setSnackbarMessage('Error al  crear Habitacion.');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        }
      })
      .catch((error) => {
        setSnackbarMessage(error.response?.data?.message || 'Ocurrió un error inesperado');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      });
  };

  return (
    <RoomForm
      mode="create"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      snackbarMessage={snackbarMessage}
      snackbarSeverity={snackbarSeverity}
      snackbarOpen={snackbarOpen}
      onCancel={() => history.push(`/ListaHabitaciones/${idHotel}`)}
    />
  );
};
