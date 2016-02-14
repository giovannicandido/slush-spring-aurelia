import {Dialog} from './notify'
import {Interceptor} from "aurelia-fetch-client";
export class ErrorInterceptor implements Interceptor {
	responseError(error) {
		if(error.status >= 500 && error.status < 600){
			this.mostrarModal("error", error)
			throw error
		}else if(error.status >= 400 && error.status < 500){
			this.mostrarModal("warning", error)
		}else {
			this.mostrarModal("error", error)
		}
		return error;
	}
	mostrarModal(style: string, error){
		let modal = document.querySelector("error-message-modal");
    let header = modal.querySelector('.uk-modal-header');
    this.removeAllClassOfElement(header);
    header.classList.add('uk-modal-header', style);
    // TODO update header, title, message properties of custom element
    modal.querySelector('.uk-modal-header').textContent = error.statusText;
    modal.querySelector('.uk-vertical-align-middle.uk-container-center h2').textContent = error.status;
		error.text().then(t => {
			//modal.setAttribute('message', t);
			modal.querySelector('.uk-vertical-align-middle.uk-container-center p:last-child').textContent = t;
      Dialog.modal(modal.querySelector("div.uk-modal")).show()
		})
	}

  removeAllClassOfElement(element){
    for (let i = 0; i < element.classList.length; i++) {
      let klass = element.classList.item(i);
      element.classList.remove(klass);
    }
  }
}
