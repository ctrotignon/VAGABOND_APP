"use strict";
Kameleoon.API.Core.runWhenElementPresent('.file-list.ng-star-inserted', ([fileListContainer]) => {
    console.log('container');
    Kameleoon.API.Core.runWhenElementPresent('.file-uploader .file-list .file-item .delete-icon', (iconList) => {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    console.log('iconlist', iconList);
                    const updatedList = fileListContainer.querySelectorAll('.file-uploader .file-list .file-item .delete-icon');
                    updatedList.forEach((icon) => (icon.innerHTML = "<img class='kam-delete_icon' src='https://storage.kameleoon.com/mifassur/binIcon.png'/>"));
                }
            });
        });
        iconList.forEach((icon) => (icon.innerHTML = "<img class='kam-delete_icon' src='https://storage.kameleoon.com/mifassur/binIcon.png'/>"));
        const config = { childList: true };
        observer.observe(fileListContainer, config);
    });
});
// on cible une liste
// si la liste est vide on ne fait rien
// si la liste a un span on le modifie
// si
// si sa longeur est supéreieru à 0 on met la span à jour
// si elle contient une span on met la span a jour
// si elle ne contient pas de span on observe la liste et a chaque changement de la liste on va vouloir changer la span
// quand une span est  dans la liste on change l'icone
// si la liste est modifié on doit la
Kameleoon.API.Core.runWhenElementPresent('.file-list.ng-star-inserted', ([fileListContainer]) => {
    Kameleoon.API.Core.runWhenElementPresent('.file-uploader .file-list .file-item .delete-icon', (iconList) => {
        iconList.forEach((icon) => (icon.innerHTML = "<img class='kam-delete_icon' src='https://storage.kameleoon.com/mifassur/binIcon.png'/>"));
        // if (iconList.length >= 1) {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const updatedList = fileListContainer.querySelectorAll('.file-uploader .file-list .file-item .delete-icon');
                    updatedList.forEach((updatedIcon) => (updatedIcon.innerHTML = "<img class='kam-delete_icon' src='https://storage.kameleoon.com/mifassur/binIcon.png'/>"));
                    console.log(updatedList, 'UP LI');
                }
            });
        });
        const config = { childList: true };
        observer.observe(fileListContainer, config);
        // }
    });
});
Kameleoon.API.Core.runWhenConditionTrue();
