import { useEffect, useState, useRef } from 'react';
import { Icon } from '@mdi/react';
import { mdiPlus } from '@mdi/js';

import getCreditData from '../hooks/get-data.credit';
import FoldableFormLayout from './forms/foldable-form-layout';
import Input from './forms/input';

export default function CreditSection(props) {
  const [credits, setCredits] = useState([]);
  const creditForm = useRef(null);
  const creditSection = useRef(null);

  useEffect(() => {
    async function getCredits() {
      try {
        const creditsRaw = props.credits || [];
        const results = await Promise.all(
          creditsRaw.map(async (credit) => {
            const newCredit = await getCreditData(credit.credit);
            return newCredit.credit;
          })
        );
        setCredits(results);
      } catch (error) {
        console.error('Error obteniendo créditos:', error);
        setCredits([]);
      }
    }

    getCredits();
  }, [props.credits]);

  const openCreditForm = () => {
    creditSection.current.classList.remove('hidden');
    creditForm.current.classList.add('konfia-fold');
    creditForm.current.classList.remove('konfia-hide');
  };

  const closeCreditForm = () => {
    creditForm.current.classList.add('konfia-hide');
    creditForm.current.classList.remove('konfia-fold');
    setTimeout(() => {
      creditSection.current.classList.add('hidden')
    }, 900)
  };

  const createCredit = async() => {

  }

  return (
    <section className="w-[90dvw] max-w-150 bg-gray-200 rounded-md flex flex-col items-center px-5 py-3">

      <FoldableFormLayout ref={creditSection} formRef={creditForm} closeFunction={() => { closeCreditForm() }} headerText="¡Crea un nuevo crédito!" submitText="Crear">
        <p> {/* Aqui ira el texto */} </p>
        <Input type="text" text="Ingresa el monto de credito"/>
      </FoldableFormLayout>

      <div className="flex w-full items-center mb-3">
        <p className="text-xl">Créditos</p>
      </div>

      <section className="bg-gray-300 w-full px-5 py-3 text-white rounded-md">
        {credits && credits.length > 0 ? (
          <>
            <h3 className="mb-2 text-green-700">Créditos activos</h3>
            {credits.some((credit) => credit.isAvaible) ? (
              credits
                .filter((credit) => credit.isAvaible)
                .map((credit) => (
                  <div key={credit._id} className="flex justify-start items-center">
                    <p className="text-gray-700">Usuario: {credit.username}</p>
                    <p className="ml-auto text-green-400">Crédito: {credit.credit}</p>
                  </div>
                ))
            ) : (
              <p className="text-gray-700 mb-3">No hay créditos activos</p>
            )}
            <h3 className="mt-4 mb-2 text-red-700">Créditos inactivos</h3>
            {credits.some((credit) => !credit.isAvaible) ? (
              credits
                .filter((credit) => !credit.isAvaible)
                .map((credit) => (
                  <div key={credit._id} className="flex justify-start items-center">
                    <p className="text-gray-700">Usuario: {credit.username}</p>
                    <p className="ml-auto text-red-700">Crédito: {credit.credit}</p>
                  </div>
                ))
            ) : (
              <p className="text-gray-700">No hay créditos inactivos</p>
            )}
          </>
        ) : (
          <p className="text-gray-700">No hay créditos disponibles actualmente</p>
        )}
      </section>

      <button className="bg-green-600 flex mt-5 rounded-md px-5 py-2 justify-center items-center cursor-pointer duration-250 hover:scale-105 hover:brightness-120 gap-1" type="button" onClick={() => { openCreditForm() }}>
      	<div className="invert"><Icon path={mdiPlus} size={1} /></div>
      	<p className="text-white"> Agregar crédito </p>
      </button>
    </section>
  );
}
