import getCookie from "../functions/getCookie";

async function doFetch(json) {
  const token = getCookie('token');
  try { 
    const res = await fetch('https://quickfiado-backend.onrender.com/store/delete',  {
      method : "DELETE",
      headers: { "Content-Type" : "application/json",
        "authorization" : token },
      body: JSON.stringify(json)
    });

    return await res.json();
  } catch (error) {
    console.error("Ha ocurrido un error al borrar la cuenta", error)
    return { error: "Ha ocurrido un error en el servidor" };
  }
};

export default async function deleteStore(password) {
  const newJSON = {
    "password": password
  };

  const res = await doFetch(newJSON);

  const data = {
    "message": res.message,
    "error": res.error || "No hay errores registrados"
  };

  return data;
}