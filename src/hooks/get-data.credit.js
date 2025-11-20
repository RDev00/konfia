async function getData(id) {
  try {
    const res = await fetch(`https://quickfiado-backend.onrender.com/credit/get?id=${id}`, {
      method: "GET",
      headers: { "Content-Type" : "application/json"}
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return { message: "Ha ocurrido un error en el servidor", error };
  }
}

async function getCreditData(id){
  let creditData = {};

  if(!id) {
    return creditData = { message: "No se pudieron obtener los datos del credito" }
  } else {
    creditData = await getData(id);
    return creditData;
  }
}

export default getCreditData;