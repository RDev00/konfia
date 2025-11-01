import { useEffect, useState, useRef } from 'react';
import { Icon } from '@mdi/react';
import { mdiPlus } from '@mdi/js';

import getCreditData from '../hooks/get-data.credit';
import createCredit from '../hooks/create.credit';
import payCredit from '../hooks/pay.credit'
import FoldableFormLayout from './forms/foldable-form-layout';
import CreditSection from './store/credit-section';
import HistorySection from './store/history-section';
import QrScanner from './qr-scanner';
import Input from './forms/input';
import SelectInput from './forms/select-input';

export default function StoreSection(props) {
  const [ credits, setCredits ] = useState(null);

  const creditSection = useRef(null);
  const historySection = useRef(null);

  const creditSelectorButton = useRef(null);
  const historySelectorButton = useRef(null);

  const [ messageCreditSubmit, setMessageCreditSubmit ] = useState(null);
  const creditForm = useRef(null);
  const creditFormSection = useRef(null);
  const [ scannedData, setScannedData ] = useState(null);
  const creditInserted = useRef(null);

  const [selectedCredit, setSelectedCredit] = useState("");
  const [ messagePaymentSubmit, setMessagePaymentSubmit ] = useState(null);
  const paymentForm = useRef(null);
  const paymentFormSection = useRef(null);
  const paymentInserted = useRef(null);

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
    creditFormSection.current.classList.remove('hidden');
    creditForm.current.classList.add('konfia-fold');
    creditForm.current.classList.remove('konfia-hide');
  };

  const closeCreditForm = () => {
    creditForm.current.classList.add('konfia-hide');
    creditForm.current.classList.remove('konfia-fold');
    setTimeout(() => {
      creditFormSection.current.classList.add('hidden')
    }, 500)
  };

  const openPaymentForm = () => {
    paymentFormSection.current.classList.remove('hidden');
    paymentForm.current.classList.add('konfia-fold');
    paymentForm.current.classList.remove('konfia-hide');
  };

  const closePaymentForm = () => {
    paymentForm.current.classList.add('konfia-hide');
    paymentForm.current.classList.remove('konfia-fold');
    setTimeout(() => {
      paymentFormSection.current.classList.add('hidden')
    }, 500)
  };

  const handleSelectChange = (e) => {
    setSelectedCredit(e.target.value);
  };

  const submitPayment = async(e) => {
    e.preventDefault();
    setMessagePaymentSubmit("");
    
    if (!selectedCredit) return alert("Selecciona un crédito primero");

    let payment = paymentInserted.current?.value;

    if(!payment) return setMessagePaymentSubmit("No se ingreso la cantidad de paymento");

    const res = await payCredit(selectedCredit, payment);

    if(res.error === "No hay errores registrados") {
      setMessagePaymentSubmit(res.message);
    } else {
      console.error(res.error);
      setMessagePaymentSubmit(" Ha ocurrido un error al crear el pago ")
    }

    //window.location.reload();

    return 0;
  }

  const submitCredit = async(e) => {
    e.preventDefault();
    setMessageCreditSubmit(""); 
    if(!scannedData){
      setMessageCreditSubmit("No se escaneo el QR");
      return;
    };

    let credit = creditInserted.current?.value;

    if(!credit) return setMessageCreditSubmit("No se ingreso la cantidad de credito");

    const res = await createCredit(scannedData, credit);

    if(res.error === "No hay errores registrados") {
      setMessageCreditSubmit(res.message);
    } else {
      console.error(res.error);
      setMessageCreditSubmit(" Ha ocurrido un error al crear el credito ")
    }

    window.location.reload();

    return 0;
  }

  const openCreditSection = () => {
    creditSection.current.classList.remove('hidden');

    creditSelectorButton.current.classList.add('bg-gray-200');
    creditSelectorButton.current.classList.remove('bg-gray-400');

    creditSelectorButton.current.classList.add('text-slate-800');
    creditSelectorButton.current.classList.remove('text-slate-100');

    historySection.current.classList.add('hidden');
    historySelectorButton.current.classList.add('bg-gray-400');
    historySelectorButton.current.classList.remove('bg-gray-200');

    historySelectorButton.current.classList.add('text-slate-100');
    historySelectorButton.current.classList.remove('text-slate-800');

  };

  const openHistorySection = () => {
    historySection.current.classList.remove('hidden');

    creditSelectorButton.current.classList.add('bg-gray-400');
    creditSelectorButton.current.classList.remove('bg-gray-200');

    creditSelectorButton.current.classList.add('text-slate-100');
    creditSelectorButton.current.classList.remove('text-slate-800');

    creditSection.current.classList.add('hidden');
    historySelectorButton.current.classList.add('bg-gray-200');
    historySelectorButton.current.classList.remove('bg-gray-400');

    historySelectorButton.current.classList.add('text-slate-800');
    historySelectorButton.current.classList.remove('text-slate-100');
  };

  return (
    <section className="w-[90dvw] max-w-150 rounded-md flex flex-col items-center mb-15">

      <div className="flex w-full items-center justify-evenly">
        <button type="button" ref={creditSelectorButton} className="text-xl w-[49%] bg-gray-200 rounded-t-md text-center py-1 text-slate-800 cursor-pointer" onClick={() => { openCreditSection() }}>Créditos</button>
        <button type="button" ref={historySelectorButton} className="text-xl w-[49%] bg-gray-400 rounded-t-md text-center py-1 text-slate-100 cursor-pointer hover:brightness-105" onClick={() => { openHistorySection() }}>Historial</button>
      </div>


      <CreditSection ref={creditSection} credits={credits} function={() => openPaymentForm()} />
      <HistorySection ref={historySection} history={props.history} />

      <button className="fixed bg-green-600 flex mt-5 rounded-full p-2 justify-center items-center cursor-pointer duration-250 hover:scale-105 hover:brightness-120 gap-1 bottom-2" type="button" onClick={() => { openCreditForm() }}>
        <div className="invert"><Icon path={mdiPlus} size={1.5} /></div>
      </button>

      { /* Form para crear credito */ }
      <FoldableFormLayout ref={creditFormSection} formRef={creditForm} closeFunction={() => { closeCreditForm() }} headerText="¡Crea un nuevo crédito!" submitText="Crear" submitFunction={(e) => submitCredit(e)} message={messageCreditSubmit}>
        <QrScanner onScan={(value) => setScannedData(value)} />
        <Input type="number" text="Ingresa el monto de credito" ref={creditInserted}/>
      </FoldableFormLayout>

      { /* Form para pagar credito */ }
      { props.credits ? (
        <FoldableFormLayout ref={paymentFormSection} formRef={paymentForm} closeFunction={() => { closePaymentForm() }} headerText="¡Registra un nuevo pago!" submitText="Pagar" submitFunction={(e) => { submitPayment(e) }} message={messagePaymentSubmit}>
          <SelectInput
            name="credit-selector"
            options={credits}
            value={selectedCredit}
            onChange={handleSelectChange} />
          <Input type="number" text="Ingresa el monto del pago" ref={paymentInserted} />
        </FoldableFormLayout>
      ) : (<></>) }
    </section>
  );
}
