import getCookie from "../functions/getCookie";

async function getData(token) {
  try {
    const res = await fetch('https://quickfiado-backend.onrender.com/store/get', {
      method: "GET",
      headers: { "Content-Type" : "application/json", "authorization" : token }
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return { message: "Ha ocurrido un error en el servidor", error };
  }
}

async function getStoreData(){
  const token = getCookie('token');
  let userData = {};

  if(!token) {
    return userData = { message: "No se pudieron obtener los datos de la cuenta" }
  } else {
    const userdata = await getData(token);
    return userdata;
  }
}

export default getStoreData;