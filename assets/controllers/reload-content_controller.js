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
        this.contentTarget.style.opacity = .5;
        const response = await fetch(`${this.urlValue}`,{
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })

        this.contentTarget.innerHTML = await response.text();
        this.contentTarget.style.opacity = 1;
    }
}