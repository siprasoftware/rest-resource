import { BIconThreeDotsVertical } from 'bootstrap-vue'
import Messages from "../components/Messages.vue"

export default {
    components: {Messages},
    data(){
        return {
           mixinMessages:[]
        }
    },
    methods:{
        addMessage(messageText, variant = "success", timeoutMs = 5000){

            if(Array.isArray(messageText)){
                messageText.forEach((value) => this.addMessage(value, variant, timeoutMs))
                return undefined;
            }

            let messageObj = {
                variant,
                text: messageText,
                close: this.clearMessage.bind(messageObj)
            }

            this.mixinMessages.push(messageObj)

            setTimeout(()=> messageObj.close(), timeoutMs)

        },
        clearMessage(messageObj){
            let indexOfMessage = this.mixinMessages.indexOf(messageObj)
            this.mixinMessages.splice(indexOfMessage, 1)
        },
        getMessages(){
            return this.mixinMessages
        },
        addError(messageText, timeoutMs = 5000){
            return this.addMessage(messageText, 'danger', timeoutMs)
        },
        addWarning(messageText, timeoutMs = 5000){
            return this.addMessage(messageText, 'warning', timeoutMs)
        },
        addSuccess(messageText, timeoutMs = 5000){
            return this.addMessage(messageText, 'success', timeoutMs)
        },
        handleAPIExceptionAndRethrow(err){
            if(err && 'object' === typeof err.response && err.response.status === 404){
                this.addError('Some object required was not found')
            }
            throw err;
        }
    }
}