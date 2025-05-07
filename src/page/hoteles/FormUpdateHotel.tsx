import React, { useState } from 'react';
import { HotelForm } from '../../components/Forms/HotelForm'; 
import { hotelService } from '../../services/services'; 
import { on } from 'events';

export const FormEditHotel = ({ hotel, onSuccess }: { hotel: any , onSuccess : ()=> void}) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
  
    const updateHotel = (values: any, resetForm: () => void) => {
      hotelService.update(hotel.id, values).then((response:any) => {
        if (response.success === 'success') {
          setMessage('¡Hotel actualizado!');
          setOpen(true);
          onSuccess?.();
        }
      });
    };
  
    return (
      <HotelForm
        mode="edit"
        initialData={hotel}
        onSubmit={updateHotel}
        open={open}
        message={message}
        onCloseSnackbar={() => setOpen(false)}
      />
    );
  };
  