async function fetchFunction(json) {
  const errorMessage = { "error" : "Ha ocurrido un error al iniciar sesión" };
  try {
    const res = await fetch('http://localhost:2345/users/register', {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(json)
    });

    if(res.ok) {
      return await res.json();
    } else {
      return errorMessage;
    }
  } catch (error) {
    console.error("Error: ", error)
    return errorMessage;
  }
};

async function register(storename, password) {
  const newJson = {
    "usertag" : usertag,
    "store" : storename,
    "password" : password
  };

  const res = await fetchFunction(newJson);

  const data = {
    "response": false,
    "message": ""
  };

  if(res.error) {
    data.response = false;
    data.message = res.error;
  } else {
    data.response = true;
    data.message = "Sesion iniciada con exito";
  }

  return data;
}

export default register;