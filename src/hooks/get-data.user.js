import getCookie from "../functions/getCookie";

async function getData(id) {
  try {
    const res = await fetch(`https://quickfiado-backend.onrender.com/user/get/id?id=${id}`, {
      method: "GET",
      headers: { "Content-Type" : "application/json" }
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return { message: "Ha ocurrido un error en el servidor", error };
  }
}

async function getUserData(){
  const token = getCookie('token');
  let userData = {};

  if(!token) {
    return userData = { message: "No se pudieron obtener los datos de la cuenta" }
  } else {
    const userdata = await getData(token);
    return userdata;
  }
}

export default getUserData;