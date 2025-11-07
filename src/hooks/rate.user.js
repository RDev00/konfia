import getCookie from '../functions/getCookie';

async function doFetch(json){
  const token = getCookie('token');

  try {
    const res = await fetch('https://quickfiado-backend.onrender.com/rate/create',{
      method: "POST",
      headers: { "Content-Type": "application/json",
        "authorization": token },
      body: JSON.stringify(json)
    });

    return res.json();
  } catch (error) {
    console.error("Ha ocurrido un error en el servidor", error);
    return error;
  }
}

export default async function rate(calification, userId, comment){
  const newJson = {
    "userId": userId,
    "calification": calification,
    "comment": comment
  };

  const res = await doFetch(newJson);

  return res;
}