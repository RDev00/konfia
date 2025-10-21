async function fetchFunction(json) {
  try {
    const res = await fetch('https://quickfiado-backend.onrender.com/user/register', {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(json)
    });

    return await res.json();
  } catch (error) {
    console.error("Error: ", error);
    return {"message": "Ha ocurrido un error en el servidor", "error": error}
  }
};

async function login(usertag, password) {
  const newJson = {
    "username" : usertag,
    "password" : password
  };

  const res = await fetchFunction(newJson);

  const data = {
    "message": res.message,
    "error": res.error || "No hay errores registrados"
  };

  return data;
}

export default login;