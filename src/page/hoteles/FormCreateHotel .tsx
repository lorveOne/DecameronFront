import React, { useState } from 'react';
import { HotelForm } from '../../components/Forms/HotelForm'; 
import { hotelService } from '../../services/services'; 
export const FormCreateHotel = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
  
    const saveHotel = (values: any, resetForm: () => void) => {
      hotelService.create(values).then(response => {
        if (response.success === 'success') {
          setMessage('¡Hotel creado!');
          setOpen(true);
          resetForm();
        }
      });
    };
  
    return (
      <HotelForm
        mode="create"
        onSubmit={saveHotel}
        open={open}
        message={message}
        onCloseSnackbar={() => setOpen(false)}
      />
    );
  };
  