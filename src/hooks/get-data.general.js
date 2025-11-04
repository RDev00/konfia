async function useFetch(id) {
  try {
    const res = await fetch('https://quickfiado-backend.onrender.com/user/get', {
      method: "GET",
      headers: { "Content-Type" : "application/json"}
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return { message: "Ha ocurrido un error en el servidor", error };
  }
}

export default async function getData(){
  const res = await useFetch();

  if(!res.error) return true;
  return false;
}