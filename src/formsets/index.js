import { BFormInput, BFormCheckbox, BFormTextarea } from 'bootstrap-vue'
import RelatedResourceInput from '../components/RelatedResourceInput.vue';
export class DefaultInput {
    constructor(label) {
        this.label = label;
    }

    getComponent(){
        return BFormInput
    }
}
export class DefaultCheckbox extends DefaultInput {

    getComponent(){
        return BFormCheckbox
    }
}

export class DefaultTextarea extends DefaultInput {

    getComponent(){
        return BFormTextarea
    }
}

export class PrimaryKeyInput extends DefaultInput {

    constructor(label, relatedField, relatedFieldKey){
        super(label)
        this.relatedField = relatedField
        this.relatedFieldKey = relatedFieldKey
    } 

    getComponent(){
        return RelatedResourceInput
    }
}