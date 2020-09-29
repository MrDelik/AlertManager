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


### Author
**Kevin Goyvaerts**
+ [http://github.com/MrDeliK](http://github.com/MrDeliK)