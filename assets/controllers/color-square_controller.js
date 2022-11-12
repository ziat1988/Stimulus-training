import {Controller} from "@hotwired/stimulus";

export default class extends Controller
{
    static targets = ['selectColor','squareColor'];
    static values = {
        colorId: Number
    }
    connect() {
        super.connect();
    }

    colorIdValueChanged(){
        this.selectColorTarget.value= this.colorIdValue
        this.squareColorTargets.forEach(el=>{
            if(+el.dataset.idColor !== this.colorIdValue ){
                el.classList.remove('selected')
            }else{
                el.classList.add('selected')
            }
        })

    }

    changeColor(e){
        const idColor = e.currentTarget.dataset.idColor;
        this.colorIdValue = this.colorIdValue === +idColor ? null : idColor

    }
}