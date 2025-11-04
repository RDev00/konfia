import getCookie from '../functions/getCookie';
const token = getCookie('token');

async function fetchFunction(json) {
  try {
    const res = await fetch('https://quickfiado-backend.onrender.com/user/update', {
      method: "PUT",
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

export default async function updateUser(username, password, currentPassword) {
  const newJson ={
    "username": username,
    "password": password,
    "currentPassword": currentPassword
  }

  const res = await fetchFunction(newJson);

  const data = {
    "message": res.message,
    "error": res.error || "No hay errores registrados"
  };

  return data;
}