export class ResultService {
    constructor(httpStatusCode, error, mensaje, data) {
        this.HttpStatusCode = httpStatusCode;
        this.Error = error;
        this.Mensaje = mensaje;
        this.Data = data;
    }
}


