import Alert from './components/Alert.js';

let alertmanager = new Alert();

function showAlertConfirm(e){
    e.preventDefault();

    alertmanager.create({

    });
}
document.querySelector('.show-alert-confirm').addEventListener('click', showAlertConfirm);

function showAlertMessage(e){
    e.preventDefault();

    alertmanager.create({

    });
}
document.querySelector('.show-alert-message').addEventListener('click', showAlertMessage);