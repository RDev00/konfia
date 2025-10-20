//Creamos la funcion para el fetch
async function fetchFunction(json) {
  //Declaramos el error de mensaje de usuario
  const errorMessage = { "error" : "Ha ocurrido un error al iniciar sesión" };

  //Usamos try-catch por si llega a haber un error entre la conexion
  try {
    //Hacemos el fetch
    const res = await fetch('https://quickfiado-backend.onrender.com/users/login', {
      //Declaramos el metodo
      method: "POST",
      //Los headers (Como no require auth, no la agregamos)
      headers: { "Content-Type" : "application/json" },
      //Agregamos el contenido en JSON hecho texto
      body: JSON.stringify(json)
    });

    //Si es valida la respuesta retornamos los datos
    if(res.ok) {
      return await res.json();
    } else {
    //Sino, retornamos error
      return errorMessage;
    }
  } catch (error) {
    console.error("Error: ", error)
    return errorMessage;
  }
};

//Declaramos la funcion del login
async function login(storename, password) {
  //Creamos el JSON
  const newJson = {
    "store" : storename,
    "password" : password
  };

  //Hacemos la respuesta
  const res = await fetchFunction(newJson);

  //Declaramos la data
  const data = {
    "response": false,
    "message": ""
  };

  //Si es error lo indicamos
  if(res.error) {
    data.response = false;
    data.message = res.error;
  } else {
    //Sino, mandamos mensaje de exito
    data.response = true;
    data.message = "Sesion iniciada con exito";
  }

  //Retornamos la data
  return data;
}

//Exportamos el login
export default login;