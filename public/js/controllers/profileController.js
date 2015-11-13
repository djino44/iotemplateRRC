angular.module('li211App.controllers')
.controller('profileController', [function () {
	//Get Profile Information from profileService Service
    
    this.newsletter = {
        stage: true,
        vie: true,
        cdd: false,
        cdi: false
    };

    this.birthdate = new Date(1991,6,27,0,0,0,0);
    this.firstname = "Prénom";
    this.lastname = "Nom";

    this.status = "Employé";
    this.company = "Entreprise";
    this.role = "Ingénieur";

    this.adress = "Adresse, Lille, France";
    this.phone = "0123456789";
    this.otherPhone = "0123456789";
    this.email = "prenom.nom@gadz.org";
    this.otherEmail = "prenom.nom@gmail.com";
    this.skype = "prenom.nom";
    this.twitter = "twitter";


    //Edit
    this.editWork = 0;
    this.editContact = 0;
    this.editNewsletter = 0;

    
    this.submit = function(item, message) {
        if(item === 'profileWork') {
            this.editWork = 0;
        }
        
        if(item === 'profileContact') {
            this.editContact = 0;
        }

        if(item === 'profileNewsletter') {
            this.editNewsletter = 0;
        }

    };
}]);