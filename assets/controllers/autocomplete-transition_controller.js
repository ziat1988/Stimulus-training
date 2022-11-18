import {Controller} from "@hotwired/stimulus";
import {addFadeTransition} from "../utils/add-transition";


export default class extends Controller {
    static targets = ['results'];

    connect() {
        addFadeTransition(this, this.resultsTarget);
    }

    toggle(event) {
        console.log('event:',event)
        if (event.detail.action === 'open') {
            this.enter();
        } else {
            this.leave();
        }
    }
}
