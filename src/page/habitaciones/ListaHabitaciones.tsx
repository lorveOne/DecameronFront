import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell,CircularProgress, Box, TableContainer, TablePagination, Button, Paper } from '@mui/material'; // Usando Material UI para una tabla
import { useHistory, useParams } from 'react-router-dom';
import { HabitaService } from '../../services/servicesHabi';
import { hotelService } from '../../services/services';
import { log } from 'console';
import { Hotel } from '../../types/Hotel';

export const ListaHabitaciones = () => {
  const { idHotel } = useParams<{ idHotel: any }>(); 
  const [habitaciones, setHabitaciones] = useState([]);
  const [hotel, setHotel] = useState<Hotel>();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  
  const fetchHabitaciones = async () => {
    try {
      const response:any = await HabitaService.getById(idHotel);
      setHabitaciones(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar las habitaciones:", error);
      setHabitaciones([]);
      setLoading(false);
    }
  };
  
  const fetchconsultarHotelid = async () => {
    try {   
        const response  = await hotelService.getById(idHotel);        
        setHotel(response.data);
        console.log(response.data);
        setLoading(false);
        }catch (error) {
        console.error("Error al cargar las habitaciones:", error);      
        setHotel({} as Hotel);
        setLoading(false);
            
        }
  };

  useEffect(() => {
    fetchconsultarHotelid();
    fetchHabitaciones();
  }, [idHotel]); 

  const handleChangePage = (event : any, newPage :any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h2>Listado de Habitaciones del Hotel <br />
      
           Nit {hotel?.nit +" -- " + hotel?.nombre}
      </h2>
      <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '20px' }}>
      <Button sx={{display: 'flex', justifyContent: 'flex-end', gap: 1 }}  variant="contained" color="secondary" onClick={() =>  history.push(`/habitaciones/${hotel?.id}/${hotel?.nombre}`, { state: { nombre: hotel?.nombre } })}>
                              Crear Habitacion
       </Button>
      </div>
       
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tipo de Habitación</TableCell>
                <TableCell>Acomodación</TableCell>
                <TableCell>Numero de Habitaciones</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {habitaciones
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((habitacion:any) => (
                  <TableRow key={habitacion.id}>
                    <TableCell>{habitacion.tipoHabi}</TableCell>
                    <TableCell>{habitacion.acomoda}</TableCell>
                    <TableCell>{habitacion.numHabi}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => history.push(`/habitacionesUpdate/${hotel?.id}/${hotel?.nombre}/${habitacion.id}`, { state: { nombre: hotel?.nombre } })}>
                        Editar 
                      </Button> 
                      <Button variant="outlined" color="error" style={{ marginLeft: '10px' }}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={habitaciones.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </div>
  );
};

