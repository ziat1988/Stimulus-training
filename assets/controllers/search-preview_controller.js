import {Controller} from "@hotwired/stimulus";
import {useDebounce,useClickOutside, useTransition } from "stimulus-use";

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
        useTransition(this, {
            element: this.resultTarget,
            enterActive: 'fade-enter-active',
            enterFrom: 'fade-enter-from',
            enterTo: 'fade-enter-to',
            leaveActive: 'fade-leave-active',
            leaveFrom: 'fade-leave-from',
            leaveTo: 'fade-leave-to',
            hiddenClass: 'd-none',
        });

    }
    clickOutside(event) {
        //this.resultTarget.innerHTML = '';
        this.leave();
    }

    onChangeInput(e){
        const text = e.currentTarget.value.trim();
        console.log('text o day:',text)
        if(text === ''){
            this.leave();
            return;
        }
        this.search(text)
    }

    async search(txt){
        const params = new URLSearchParams({
            q:txt,
            preview: 1,
        });

        const response = await fetch(`${this.urlValue}?${params.toString()}`);
        this.resultTarget.innerHTML = await response.text();
        this.enter()
    }

}
