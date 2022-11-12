import {Controller} from "@hotwired/stimulus";
import {useDebounce,useClickOutside } from "stimulus-use";

export default class extends Controller
{
    static debounces = [
        {
            name: 'search',
            wait: 500
        }
    ]

    static values = {
        url: String
    }

    static targets = ['result'];

    connect() {
        super.connect();
        useDebounce(this)
        useClickOutside(this)

    }
    clickOutside(event) {
        this.resultTarget.innerHTML = '';
    }

    onChangeInput(e){
        this.search(e.currentTarget.value)
    }

    async search(txt){
        const params = new URLSearchParams({
            q:txt,
            preview: 1,
        });

        const response = await fetch(`${this.urlValue}?${params.toString()}`);
        this.resultTarget.innerHTML = await response.text();
    }

}
