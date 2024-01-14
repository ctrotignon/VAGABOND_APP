const handleSubmit = async () => {
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
		const response = await fetch('URL_DU_ENDPOINT', {
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
		} else {
			console.log("Erreur lors de l'envoi des données au serveur");
		}
	} catch (error: any) {
		console.error('Erreur:', error.message);
	}
};
