import { useFormikContext } from 'formik';
import { MySelect } from '../components';
import { useEffect, useMemo } from 'react';

const reglas : any = {
  ESTANDAR: ['SENCILLA', 'DOBLE'],
  JUNIOR: ['TRIPLE', 'CUADRUPLE'],
  SUITE: ['SENCILLA', 'DOBLE', 'TRIPLE'],
};

const opciones  : any = {
  SENCILLA: 'SENCILLA',
  DOBLE: 'DOBLE',
  TRIPLE: 'TRIPLE',
  CUADRUPLE: 'CUADRUPLE',
};

export const TipoAcomodaSelect = () => {
  const { values, setFieldValue } = useFormikContext<any>();
  const tipoHabi = values.tipoHabi;

  const opcionesFiltradas = useMemo(() => {
    return reglas[tipoHabi] || [];
  }, [tipoHabi]);

  // Limpiar tipoAcomoda si no es válido con el tipoHan
  useEffect(() => {
    if (!opcionesFiltradas.includes(values.acomoda)) {
      setFieldValue('acomoda', '');
    }
  }, [tipoHabi]);

  return (
    <MySelect name="acomoda" label="Tipo Acomodación">
      <option value="">selecciona</option>
      {opcionesFiltradas.map((key :any) => (
        <option key={key} value={key}>
          {opciones[key]}
        </option>
      ))}
    </MySelect>
  );
};
