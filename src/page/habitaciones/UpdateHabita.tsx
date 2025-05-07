import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { RoomForm, RoomFormValues } from '../../components/Forms/HabiForm';
import { HabitaService } from '../../services/servicesHabi';

export const UpdateHabita = () => {
  const { idHotel, nombre, idHabitacion } = useParams<{ idHotel:string; nombre:string; idHabitacion:string }>();
  const history = useHistory();
 const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [initialValues, setInitialValues] = useState<RoomFormValues|null>(null);
    console.log(idHotel, idHabitacion);
    
  useEffect(() => {
    HabitaService.getByIdH(idHabitacion).then((res: any) => {
      const h = res.data;
      setInitialValues({
        idHotel: h.idHotel,
        nombre: nombre,  // si tu API lo devuelve
        numHabi: h.numHabi,
        tipoHabi: h.tipoHabi,
        acomoda: h.acomoda
      });
    });
    console.log(initialValues);
    
  }, [idHabitacion]);

  
    const handleSubmit = (values: any, onSuccess: () => void) => {
      HabitaService.update(idHabitacion, values)
        .then((response) => {
          if (response.success === 'success') {
            setSnackbarMessage('Habitación Editada exitosamente.');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            onSuccess(); // Reiniciamos el formulario
          } else {
            setSnackbarMessage('Error al editar Habitacion.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
          }
        })
        .catch((error) => {
          setSnackbarMessage(error.response?.data?.message || 'Ocurrió un error inesperado');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    };

  if (!initialValues) return <p>Cargando datos…</p>;

  return (
    <RoomForm
      mode="edit"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      snackbarMessage={snackbarMessage}
      snackbarSeverity={snackbarSeverity}
      snackbarOpen={snackbarOpen}
      onCancel={() => history.push(`/ListaHabitaciones/${idHotel}`)}
    />
  );
};
