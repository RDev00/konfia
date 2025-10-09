async function fetch(json) {
  const res = fetch('http://localhost:2345/users/login', {
    "method": "POST",
    "headers" : { "Content-Type" : "application/json" },
    "body" : JSON.stringify(json)
  });

  const errorMessage = { "error" : "Ha ocurrido un error al iniciar sesión" };

  if(res.ok) { return res.json() }
  else { return errorMessage };
};

async function login(storename, password) {
  const newJson = {
    "store" : storename,
    "password" : password
  };

  const res = await fetch(newJson);

  const data = {
    "response" : Boolean,
    "message" : String
  };

  if(res.error) {
    data.response = false;
    data.message = res.error;
  } else {
    data.response = true;
    data.message = "Sesion iniciada con exito";
  };

  return data;
}

export default login;