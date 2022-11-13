import {Controller} from "@hotwired/stimulus";

export default class extends Controller
{
    static values = {
        cartRefreshUrl: String,
    }
    connect() {
        super.connect();
    }

    async removeItem(e){
        e.currentTarget.classList.add('removing');
        const response = await fetch(this.cartRefreshUrlValue);
        this.element.innerHTML = await response.text()
    }

}