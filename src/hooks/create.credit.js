import getCookie from '../functions/getCookie';

async function fetchFunction(json) {
  try {
    const token = getCookie('token');
    if(!token) return { message: "Credenciales invalidas" };

    const res = await fetch('https://quickfiado-backend.onrender.com/credit/create', {
      method: "POST",
      headers: { "Content-Type" : "application/json",
        "authorization" : token },
      body: JSON.stringify(json)
    });

    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
    return {"message": "Ha ocurrido un error en el servidor", "error": error}
  }
};

export default async function createCredit(user, credit) {
  if(!user || !credit) return { message: "No se ingresaron datos" };

  const newJson = {
    "user" : user,
    "credit" : credit
  };

  const res = await fetchFunction(newJson);
  console.log(newJson, res);

  const data = {
    "message": res.message,
    "error": res.error || "No hay errores registrados"
  };

  return data;
}