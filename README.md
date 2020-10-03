# AlertManager
AlertManager is a small ES6 module that help the user to create his own UI alerts.

## Instanciation
Like every other components import it and instanciate it
```javascript
import Alert from './components/Alert.js';
let alertManager = new Alert();
```

## Parameters
* alertContainerSelector : `string`
    * The alert background selector
* alertParentSelector : `string`
    * The alert parent selector. The direct child of the background
* alertMessageSelector : `string`
    * The message selector
* alertTitleSelector : `string`
    * The title selector
* alertIconSelector : `string`
    * The icon selector
* alertButtonSelector : `string`
    * In case of just a notification, the ok button selector
* validButtonSelector : `string`
    * In case of a confirm the validation button selector
* cancelButtonSelector : `string`
    * In case of a confirm the cancel button selector
* showClass : `string`
    * The class used to show the alert

## Methods

* create : `void`
    * Parameters : params `object`
    * Create the alert and add it to the document
* getAlert : `HTMLElement`
    * Parameters : `object`
    * Get the alert template and return it with the specified type
* getAlertSuccess : `HTMLElement`
    * Parameters : alertFrag `HTMLElement`
    * Return the alert in a success state
* getAlertDanger : `HTMLElement`
    * Parameters : alertFrag `HTMLElement`
    * Return the alert in a danger state
* getAlertError : `HTMLElement`
    * Parameters : alertFrag `HTMLElement`
    * Return the alert in an error state
* show : `void`
    * Parameters : alertNode `HTMLElement`
    * Show the alert
* confirmSuccess : `void`
    * Parameters : e `MouseEvent` callback `callable`
    * Trigger on click with the confirm button
* confirmCancel : `void`
    * Parameters : e `MouseEvent` callback `callable`
    * Triggered on click on the cancel button
* attachButtonEvents : `void`
    * Parameters : buttons `HTMLCollection` confirm `callable` cancel `callable`
    * Attach confirm buttons events with callback if needed
* remove : `void`
    * Parameters : alertNode `HTMLElement`
    * Start the animation and remove the element on transition end
* chain : `void`
    * Parameters : alertNode `HTMLElement` params `object`
    * Chain the alerts without flicking the background

### Author
**Kevin Goyvaerts**
+ [http://github.com/MrDeliK](http://github.com/MrDeliK)