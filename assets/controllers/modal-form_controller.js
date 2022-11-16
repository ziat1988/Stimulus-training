import {Controller} from "@hotwired/stimulus";
import {Modal} from "bootstrap";
import axios from "axios";
export default class extends Controller
{
    static targets = ['modal','modalBody']
    static values = {
        url: String,
        isAjax: Boolean
    }
    connect() {
        super.connect();
    }

    async submitForm(e){
        e.preventDefault();
        const form = this.modalBodyTarget.getElementsByTagName('form')[0];

        const response = await axios.post(`${this.urlValue}`,form,{
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
        this.modalBodyTarget.innerHTML = await response.data;
        /*
        const response = await fetch(`${this.urlValue}`,{
            method: form.getAttribute('method'),
            body: new URLSearchParams(new FormData(form)),
            headers: {'X-Requested-With': 'XMLHttpRequest'},
        })

        this.modalBodyTarget.innerHTML = await response.text();
         */

    }
    async openModal(e){
        // clear form first
        this.modalBodyTarget.innerHTML = '';

        /*
        const params = this.isAjaxValue? new URLSearchParams({
            isAjax: 1,
        }): null;

        const response = await fetch(`${this.urlValue}?${params?params.toString():''}`);
        const template = await response.text();
        */

        try{
            const options = {
                url: this.urlValue,
                headers: {'X-Requested-With': 'XMLHttpRequest'},
            }
            const response = await axios(options);
            this.modalBodyTarget.innerHTML = response.data;
        }catch (e){
            console.error(e);
            return;
        }

        const modal = new Modal(this.modalTarget);
        modal.show();

    }
}