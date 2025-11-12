import { useEffect, useState } from 'react';
import getUserData from '../../hooks/get-data.user';
import getCreditData from '../../hooks/get-data.credit';

export default function CreditSection() {
  const [creditsActive, setCreditsActive] = useState([]);
  const [creditsFinished, setCreditsFinished] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getUserData();

        const active = data?.user?.creditsactive || [];
        const finished = data?.user?.creditsfinished || [];

        const activeDetailed = await Promise.all(
          active.map(async (credit) => {
            const newCredit = await getCreditData(credit.credit);
            return newCredit.credit;
          })
        );

        const finishedDetailed = await Promise.all(
          finished.map(async (credit) => {
            const newCredit = await getCreditData(credit.credit);
            return newCredit.credit;
          })
        );

        setCreditsActive(activeDetailed);
        setCreditsFinished(finishedDetailed);
      } catch (error) {
        console.error('Error obteniendo créditos:', error);
        setCreditsActive([]);
        setCreditsFinished([]);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) {
    return <p className="text-gray-700 text-center my-2 text-lg font-bold">Cargando créditos...</p>;
  }

  return (
    <section className="bg-gray-200 w-full px-5 py-3 text-white rounded-b-md">
      {creditsActive.length > 0 || creditsFinished.length > 0 ? (
        <>
          <h3 className="mb-2 text-green-700">Créditos activos</h3>
          {creditsActive.length > 0 ? (
            creditsActive.map((credit) => (
              <a
                key={credit._id}
                href={`/user/profile/${credit.userId}`}
                className="flex justify-start items-center hover:text-sky-500"
              >
                <p className="text-gray-700">Usuario: @{credit.username}</p>
                <p className="ml-auto text-green-500">Crédito: {credit.credit}</p>
              </a>
            ))
          ) : (
            <p className="text-gray-700 mb-3">No hay créditos activos</p>
          )}

          <h3 className="mt-4 mb-2 text-red-700">Créditos inactivos</h3>
          {creditsFinished.length > 0 ? (
            creditsFinished.map((credit) => (
              <a
                key={credit._id}
                href={`/user/profile/${credit.userId}`}
                className="flex justify-start items-center hover:text-sky-500"
              >
                <p className="text-gray-700">Usuario: @{credit.username}</p>
                <p className="ml-auto text-red-700">Crédito: {credit.credit}</p>
              </a>
            ))
          ) : (
            <p className="text-gray-700">No hay créditos inactivos</p>
          )}

          <div className="flex flex-col items-center justify-center mt-5">
            {creditsActive.length > 0 ? (
              <button
                type="button"
                className="bg-green-400 px-5 py-1 rounded-md cursor-pointer relative mt-2 duration-200 hover:brightness-110 hover:scale-105 text-sm md:text-base"
                onClick={() => alert('Registrar nuevo pago')}
              >
                Registrar nuevo pago
              </button>
            ) : (
              <button
                type="button"
                className="bg-gray-400 px-5 py-1 rounded-md cursor-not-allowed mt-2 text-sm md:text-base"
                disabled
              >
                No hay créditos activos actualmente
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-700 text-center mt-5 text-lg font-bold">
          No hay creditos activos actualmente
        </p>
      )}
    </section>
  );
}