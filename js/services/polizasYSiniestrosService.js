
const getPolizasAndSiniestros = async (userId) => {
  let result = [];
  let response = await fetch(
    `https://localhost:7136/api/Poliza/buscarPolizasConSiniestros/${userId}`
  );
  if (response.ok) {
    result = await response.json();
  }
  return result;
};

const ApiPolizasYSiniestros = {
  GetPolizasAndSiniestrosByUserId: getPolizasAndSiniestros,
  
};

export default ApiPolizasYSiniestros;
