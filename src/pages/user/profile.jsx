import Layout from "../../layouts/layout";

import getUserData from "../../hooks/get-data-by-id.user";
import rate from "../../hooks/rate.user";

import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import FoldableFormLayout from "../../components/forms/foldable-form-layout";
import Input from "../../components/forms/input";

import Icon from '@mdi/react';
import { mdiAccountCircle, mdiHome, mdiStar } from '@mdi/js';

export default function Profile() {
  const { userId } = useParams();
  const [ userData, setUserData ] = useState(null);
  const [ notFoundMessage, setNotFoundMessage ] = useState(null);
  const loadingMessage = useRef(null);

  const rateForm = useRef(null);
  const rateFormSection = useRef(null);
  const [ rateFormMessage, setRateFormMessage ] = useState(null);
  const comment = useRef(null);
  const [rating, setRating] = useState(1);

  useEffect(() => {
    async function getData() {
      const data = await getUserData(userId);

      if(data.message !== "La cuenta no existe") {
        setUserData(data.user);
        return;
      };

      if(data.message === "La cuenta no existe") {
        loadingMessage.current.classList.add('hidden');
        setNotFoundMessage("La cuenta que buscabas no existe.");
        return;
      }
    }

    getData();
  }, []);

  const openFoldableForm = (form, section) => {
    const formCurrent = form.current;
    const sectionCurrent = section.current;

    sectionCurrent.classList.remove('hidden');
    formCurrent.classList.add('konfia-fold');
    formCurrent.classList.remove('konfia-hide');
  };

  const closeFoldableForm = (form, section) => {
		const formCurrent = form.current;
		const sectionCurrent = section.current;

    formCurrent.classList.add('konfia-hide');
    formCurrent.classList.remove('konfia-fold');
    setTimeout(() => {
      sectionCurrent.classList.add('hidden')
    }, 500)
	};


  const handleChange = (event) => {
    setRating(event.target.value);
  };

  const rateUser = async(e) => {
    e.preventDefault();
    let commentInserted = comment.current.value || null;

    const res = await rate(rating, userData._id, commentInserted);
    
    if(!res.error) {
      setRating(1);
      commentInserted = null;
      closeFoldableForm(rateForm, rateFormSection)
    }
  };

  return (
    <Layout>
      { notFoundMessage ? ( <Header /> ) : ( <></> ) }
      { userData ? (
        <Header>
          <a href="/" type="button" className="ml-auto ml-auto invert cursor-pointer">
            <Icon path={mdiHome} size={1.5} />
          </a>
        </Header>
      ) : ( <></> ) }
      
      { userData ? (
        <main className="h-[100dvh] bg-white flex flex-col justify-start items-center py-5">
          <section className="bg-gray-200	w-[90dvw] max-w-[500px] px-2 py-1 rounded-md flex justify-between">
            <div className="w-[80%] flex items-center gap-2">
              <Icon path={mdiAccountCircle} size={1.4} />
              <article>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {userData.username}
                  </p>
                  <p className="text-xs md:text-sm text-gray-700 opacity-80">
                    @{userData.usertag}
                  </p>
              </article>
            </div>

            <button className="flex justify-center items-center px-3 cursor-pointer duration-200 hover:scale-130" type="button" onClick={() => { openFoldableForm(rateForm, rateFormSection) }}>
              <Icon path={mdiStar} size={1} />
            </button>
          </section>

          <section className="bg-gray-200	w-[90dvw] max-w-[500px] px-2 py-1 rounded-md flex flex-col justify-center mt-5 py-3">
            {
              userData.historial && userData.historial.length > 0 ? userData.historial.map((payment, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-600 text-center"> ¡{userData.username} pagó <span className="text-green-600"> ${payment.payment} </span> con éxito a {payment.store}! </p>
                </div>
              )) : (<p className="text-gray-700 text-center my-2 text-lg font-bold"> Nada nuevo por aquí... </p>)
            }
          </section>

          <FoldableFormLayout ref={rateFormSection} formRef={rateForm} closeFunction={() => { closeFoldableForm(rateForm, rateFormSection) }} headerText="¡Califica tu experiencia con el usuario!" submitText="Calificar" submitFunction={(e) => rateUser(e)} message={rateFormMessage}>
            <select value={rating} onChange={handleChange} className="backdrop-brightness-90 w-[90%] py-2 px-1 rounded-md text-center focus:outline-none border border-gray-300">
              <option value={1}>1 Estrella</option>
              <option value={2}>2 Estrellas</option>
              <option value={3}>3 Estrellas</option>
              <option value={4}>4 Estrellas</option>
              <option value={5}>5 Estrellas</option>
            </select>

            <Input ref={comment} type="text" text="Ingresa un comentario sobre tu experiencia con el usuario" />            
          </FoldableFormLayout>
        </main>
      ) : (
        <p ref={loadingMessage} className="text-white fixed top-[50%] left-[50%] transform-[translate(-50%,-50%)] font-bold text-xl md:text-3xl text-center"> Cargando... </p>
      ) }

      { notFoundMessage ? (
        <main className="flex flex-col justify-center items-center gap-3 h-[100dvh] bg-white">
          <p className="text-gray-800 font-bold text-xl md:text-3xl text-center"> { notFoundMessage } </p>
          <a href="/" className="text-white bg-green-500 px-3 py-1 rounded-md hover:bg-green-600"> Regresar al inicio </a>
        </main>
      ) : (<></>) }

      
      { notFoundMessage || userData ? ( <Footer /> ) : ( <></> ) }
    </Layout>
  );
}
