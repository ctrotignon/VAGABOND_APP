"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, confirmedPassword } = formState;
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmedPassword.trim() === '') {
        console.log('Veuillez remplir tous les champs');
        return;
    }
    if (password !== confirmedPassword) {
        console.log('Les mots de passe ne correspondent pas');
        return;
    }
    try {
        const response = yield fetch('URL_DU_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        if (response.ok) {
            setFormState({
                username: '',
                email: '',
                password: '',
                confirmedPassword: '',
            });
            console.log('Formulaire soumis avec succès');
        }
        else {
            console.log("Erreur lors de l'envoi des données au serveur");
        }
    }
    catch (error) {
        console.error('Erreur:', error.message);
    }
});
