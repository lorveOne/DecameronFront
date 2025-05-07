
import React, { useEffect, useState } from 'react';
import { Box, Typography,  Alert, Table, DialogTitle,DialogContentText ,DialogActions, DialogContent ,Skeleton, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '../../utils/Mui';
import { Hotel } from '../../types/Hotel';
import { hotelService } from '../../services/services';
import { FormEditHotel } from './FormUpdateHotel';
import {Dialogg} from '../../components/Dialogg';
import { useHistory } from 'react-router-dom';
export const ListaHotel = () => {
    const [hoteles, setHoteles] = useState<Hotel[]>([]);
    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ModalDelete, setModalDelete] = useState(false);
    const [idDelete, setIdDelete] = useState<number>(0);
    const history = useHistory();


    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        setLoading(true);
        try {
            const response: any = await hotelService.getAll();
            setHoteles(response.data);
        } catch (error) {
            setError('Error al cargar los hoteles');
        } finally {
            setLoading(false);
        }
    };

    const setDataUpdate = (id: number) => {
        const hotel = hoteles.find((hotel) => hotel.id === id);
        if (hotel) {
            setSelectedHotel(hotel);
        } else {
            setError('Error al cargar los datos del hotel');
        }
    }

    const openModalDelete = (id: number) => {
;       setIdDelete(id);
        setModalDelete(true);
    }

    const deleteHotel = async (id: number) => {
        setLoading(true);   
        try {       
            const response: any = await hotelService.delete(id);
            console.log(response.data);
    
            if (response.data.success === 'success') {
                setModalDelete(false);
                fetchData();
                setIdDelete(0);
            } else {
                setError('Error al eliminar el hotel');
            }   
        } catch (error) {
            setError('Error al eliminar el hotel');
        } finally {
            setLoading(false);
        }
    };
    


    if (loading) return <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 3 }}>
        <Skeleton sx={{ mt: 5, borderRadius: 10 }} variant="rectangular" width={410} height={300} className='' />
    </Box>;
    if (error) return <div>{error}</div>;

    return (
        <Box sx={{ maxWidth: 1000, margin: '0 auto', padding: 3 }}>
            {selectedHotel ?
                <div>
                    <Button sx={{display: 'flex', justifyContent: 'flex-start', gap: 1 }}  variant="contained" color="secondary" onClick={() => setSelectedHotel(null)}>
                        Volver a la lista
                    </Button>
                    <Alert severity="info" sx={{ mt: 2 }}>
                        Editando el hotel: {selectedHotel.nombre}
                    </Alert>
                    <FormEditHotel hotel={selectedHotel } onSuccess={() => {
                        fetchData();
                        setSelectedHotel(null);
                    }}  />
                    </div>
             
                : <div>
                    <Typography variant="h4" gutterBottom>
                        Lista de Hoteles
                    </Typography>
                    <TableContainer component={Paper }>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell>ID</TableCell>
                                    <TableCell>NIT</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Ciudad</TableCell>
                                    <TableCell>Dirección</TableCell>
                                    <TableCell>Número de Habitaciones</TableCell>
                                    <TableCell >Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hoteles.map((hotel) => (
                                    <TableRow key={hotel.id}>
                                        <TableCell>{hotel.id}</TableCell>
                                        <TableCell>{hotel.nit}</TableCell>
                                        <TableCell>{hotel.nombre}</TableCell>
                                        <TableCell>{hotel.ciudad}</TableCell>
                                        <TableCell>{hotel.direccion}</TableCell>
                                        <TableCell>{hotel.numHab}</TableCell>
                                        <TableCell sx={{ display: 'flex', gap: 1 }}>
                                            <Button variant="contained" color="primary" onClick={() => setDataUpdate(hotel.id)}>
                                                Editar
                                            </Button>
                                            &nbsp;
                                            <Button variant="contained" color="secondary" onClick={() => { openModalDelete(hotel.id)}}>
                                                Eliminar
                                            </Button>
                                            <Button variant="contained" color="warning"
                                            
                                            onClick={() => history.push(`/ListaHabitaciones/${hotel.id}`, { state: { nombre: hotel.nombre } })}>
                                                Asignar habitaciones
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    <Dialogg open={ModalDelete} onClose={() => setModalDelete(false)} title="Eliminar Hotel"> 
                        <DialogContent>
                            <DialogContentText>
                                ¿Estás seguro de que deseas eliminar este hotel?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setModalDelete(false)} color="warning">
                                Cancelar
                            </Button>
                            <Button onClick={() => deleteHotel(idDelete || 0)} color="primary">
                                Eliminar
                            </Button>
                        </DialogActions>
                    </Dialogg>
                </div>
            }
        </Box>
    );
}