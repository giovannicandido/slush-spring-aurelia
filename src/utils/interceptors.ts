import {Dialog} from './notify'
import {Interceptor} from "aurelia-fetch-client";
export class ErrorInterceptor implements Interceptor {
	responseError(error) {
		if(error.status >= 500 && error.status < 600){
			this.mostrarModal("#error50x", error)
			throw error
		}else if(error.status >= 400 && error.status < 500){
			this.mostrarModal("#error40x", error)
		}else {
			this.mostrarModal("#errorOther", error)
		}
		return error;
	}
	mostrarModal(id: string, error){
		$(`${id} .status`).html(error.status);
		error.text().then(t => {
			$(`${id} .message`).html(t);
			Dialog.modal(id).show()
		})
	}
}
