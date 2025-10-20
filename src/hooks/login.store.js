async function fetchFunction(json) {
  try {
    const res = await fetch('https://quickfiado-backend.onrender.com/store/login', {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(json)
    });

    if(res.ok) {
      return await res.json();
    } else {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error("Error: ", error);
    return {"message": "Ha ocurrido un error en el servidor", "error": error}
  }
};

async function login(storename, password) {
  const newJson = {
    "storename" : storename,
    "password" : password
  };

  const res = await fetchFunction(newJson);

  const data = {
    "message": res.message,
    "error": res.error || "No hay errores registrados",
    "token": res.token
  };

  return data;
}

export default login;