import {Controller} from "@hotwired/stimulus";
export default class extends Controller
{
    static targets = ['content']
    static values = {
        url: String
    }
    connect() {

    }

    async refreshContent(e){
        const target = this.hasContentTarget ? this.contentTarget : this.element;

        target.style.opacity = '.5';
        const response = await fetch(`${this.urlValue}`,{
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })

        target.innerHTML = await response.text();
        target.style.opacity = '1';
    }
}