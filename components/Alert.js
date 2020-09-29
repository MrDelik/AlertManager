/**
 * Alert component
 * deal with the alert in the application
 * Allow you to ask confirmation based on a template added in the HTML to allow the user to take control of the ui
 */
class Alert{
    constructor(params = {}){
        this.params = {
            alertContainerSelector:'.alert-container',
            alertParentSelector: '.alert',
            alertMessageSelector: '.alert-message',
            alertTitleSelector: '.alert-title',
            alertIconSelector: '.alert-icon',
            alertButtonSelector: '.alert-confirm-button',
            validButtonSelector: '.alert-confirm-valid',
            cancelButtonSelector: '.alert-confirm-cancel',
            showClass: 'show'
        };

        for(let param in params){
            if(param in this.params){
                this.params[param] = params[param];
            }
        }
    }

    /**
     * Create the alert from the template and add it in the dom
     * Then trigger the show animation
     * params should contains type, title, message and callbacks success/error
     * @param params
     */
    create( params = {} ){
        if( Object.keys(params).length > 0 ){
            let alertFrag = this.getAlert( params );
            let alertParent = alertFrag.firstElementChild;

            document.body.appendChild(alertFrag);
            setTimeout(() => this.show(alertParent), 0);
        }
        else{
            console.error('Parameters object cannot be empty');
        }
    }

    /**
     * Get the alert template and return it
     * @param params
     * @returns {Node}
     */
    getAlert( params ){
        let template = document.querySelector(params.templateSelector);
        let alertFrag;
        if( template !== null ){
            alertFrag = template.content.cloneNode(true);

            let alertParent = alertFrag.querySelector(this.params.alertParentSelector);
            let type = alertParent.parentNode.classList.contains('confirm') ? 'confirm' : 'window';

            if( 'type' in params ){
                if( params.type === 'success' ){
                    alertFrag = this.getAlertSuccess( alertFrag );
                }
                else if( params.type === 'error' ){
                    alertFrag = this.getAlertError( alertFrag );
                }
                else{
                    alertFrag = this.getAlertDanger( alertFrag );
                }
            }
            else{
                alertFrag = this.getAlertDanger( alertFrag );
            }

            if( 'html' in params ){
                alertFrag.querySelector(this.params.alertMessageSelector).innerHTML = params.html;
            }
            else{
                alertFrag.querySelector(this.params.alertMessageSelector).textContent = params.message;
            }

            if( 'title' in params ){
                alertFrag.querySelector(this.params.alertTitleSelector).textContent = params.title;
            }

            if( type === 'confirm' ){
                if( 'type' in params && params.type === 'error' || params.type === 'success' ){
                    let okButton = alertFrag.querySelector(this.params.validButtonSelector);

                    okButton.addEventListener('click', e => this.confirmSuccess(e, params.success));
                }
                else{
                    let okButton = alertFrag.querySelector(this.params.validButtonSelector);
                    let cancelButton = alertFrag.querySelector(this.params.cancelButtonSelector);

                    okButton.addEventListener('click', e => this.confirmSuccess(e, params.success));
                    cancelButton.addEventListener('click', e => this.confirmCancel(e, params.cancel));
                }
            }

        }

        return alertFrag;
    }

    /**
     * Return the alertNode in a success state
     * @param alertFrag
     * @returns {*}
     */
    getAlertSuccess( alertFrag ){
        alertFrag.querySelectorAll(this.params.alertIconSelector+':not(.alert-icon-success)').forEach(icon => icon.remove());
        alertFrag.querySelectorAll(this.params.alertButtonSelector+':not('+this.params.validButtonSelector+')').forEach(button => button.remove());
        return alertFrag;
    }

    /**
     * Return the alertNode in an error state
     * @param alertFrag
     * @returns {*}
     */
    getAlertError( alertFrag ){
        alertFrag.querySelectorAll(this.params.alertIconSelector+':not(.alert-icon-error)').forEach(icon => icon.remove());
        alertFrag.querySelectorAll(this.params.alertButtonSelector+':not(.alert-confirm-success)').forEach(button => button.remove());
        return alertFrag;
    }

    /**
     * Return the alertNode in a danger state
     * @param alertFrag
     * @returns {*}
     */
    getAlertDanger( alertFrag ){
        alertFrag.querySelectorAll(this.params.alertIconSelector+':not(.alert-icon-danger)').forEach(icon => icon.remove());
        return alertFrag;
    }

    /**
     * Triggered on click on the confirm button
     * @param e
     * @param callback
     */
    confirmSuccess(e, callback){
        e.preventDefault();
        let button = e.target.closest( this.params.validButtonSelector );
        let alertNode = e.target.closest(this.params.alertParentSelector);

        if(callback !== undefined){
            callback(button, alertNode);
        }
    }

    show(alertNode){
        alertNode.classList.add(this.params.showClass);
    }

    /**
     * Triggered on click on the cancel button
     * @param e
     * @param callback
     */
    confirmCancel(e, callback){
        e.preventDefault();

        let button = e.target.closest( this.params.cancelButtonSelector );
        let alertNode = e.target.closest(this.params.alertParentSelector);

        this.remove(alertNode.parentNode);

        if(callback !== undefined){
            callback(button, alertNode);
        }
    }

    /**
     * Start the animation and remove the element on transition end
     * @param alertNode
     */
    remove(alertNode){
        alertNode.addEventListener('transitionend', function(e){
            e.stopImmediatePropagation();
            if( e.propertyName === 'opacity' ){
                e.target.remove();
            }
        });

        alertNode.classList.remove(this.params.showClass);
    }

    attachButtonEvents( buttons, success = undefined, cancel = undefined){
        buttons.forEach(button => {
            if( button.classList.contains(this.params.validButtonSelector.substr(1)) ){
                button.addEventListener('click', e => this.confirmSuccess(e, success));
            }
            else{
                button.addEventListener('click', e => this.confirmCancel(e, cancel));
            }
        });
    }

    /**
     * Chain alert without removing the alert container to prevent visual ugly effect
     * @param alertNode
     * @param params
     */
    chain( alertNode, params = {} ){
        let alertFrag = this.getAlert( params );
        let alertToPut = alertFrag.querySelector(this.params.alertParentSelector);
        let alertParent = alertNode.parentNode;

        this.attachButtonEvents( alertFrag.querySelectorAll(this.params.alertButtonSelector) );

        alertNode.remove();
        alertParent.appendChild( alertToPut );
    }
}

export default Alert;
