// Fonction permettant d'appliquer un overlay avec une icône de chargement sur toute la page
function setOverlay(){
    $('body').append(`
        <div class="overlay"><img src="img/ajax-loader.svg"></div>
    `);
}

// Fonction permettant de supprimer l'overlay appliqué par la fonction précédente
function removeOverlay(){
    $('.overlay').remove();
}

// Fonction permettant d'échapper le HTML
function escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
  
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}


// Si le formulaire est envoyé
$('form').submit(function(e){

    // On stop le fonctionnement du formulaire (on le fera plus loin manuellement avec une requête AJAX)
    e.preventDefault();

    // Supprimer le nombres de résultats
    $('.result').remove();

    // Suppression des éventuels anciens messages d'erreurs
    $('.table').find('.error').remove();


    let cityField = $('#nom').val();

    // Vérification que le champ est rempli
    if(cityField.length < 1){
        $('.table').prepend('<p class="error red" style="color:red">Champ vide !</p>');
    } else {

        // Requête AJAX
        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            dataType: 'json',
            data: $(this).serialize(),
            success: function(data){

                // Affichage du nombre de résultats (remplaçable par une ternaire)
                if(data.length == 0){
                    $('form').after('<p class="result red">Résultat : 0</p>');
                } else if(data.length == 1){
                    $('form').after('<p class="result green">Résultat : 1</p>');
                } else {
                    $('form').after('<p class="result green">Résultats : ' + data.length + '</p>');
                }

                // Condition si qlq chose est renvoyé
                if(data.length == 0){
                    $('.table').prepend('<p class="error red">Aucun résultat</p>');
                }else {

                    // Créer le tableau
                    let citiesTable = $('<table><thead><tr><th>Nom</th><th>Codes postaux</th><th>Population</th><th>Département</th></tr></thead><tbody></tbody></table>');

                    // Pour chaque ville dans le tableau data, on crée un nouveau tr dans le tableau
                    data.forEach(function(city){

                        let newCity = $('<tr></tr>');

                        // Création du td contenant les infos de la ville
                        let cityName = $('<td></td>');
                        cityName.text(city.nom);

                        let cityCodes = $('<td></td>');
                        cityCodes.text(city.codesPostaux);

                        let zipCodesList = [];
                        city.codesPostaux.forEach(function(zipCode){
                            zipCodesList.push(escapeHtml(zipCode));
                        });
                        cityCodes.html(zipCodesList.join('<br>'));

                        let cityPopulation = $('<td></td>');
                        cityPopulation.text(city.population);

                        let cityDepartement = $('<td></td>');
                        cityDepartement.text(city.codeDepartement);

                        // Insertion des 4 <td>
                        newCity.append(cityName);
                        newCity.append(cityCodes);
                        newCity.append(cityPopulation);
                        newCity.append(cityDepartement);

                        // Insertion de la <tr> dans le <tbody> du tableau
                        citiesTable.find('tbody').append(newCity);
                        console.log(city.population);
                    });

                    // Insertion du contenu dans la page, dans table
                    $(".table").html(citiesTable);
                }

            },
            error: function(){
                $('.table').html('<p class="red">Problème de connexion</p>');
            },
            beforeSend: function(){
                setOverlay();
            },
            complete: function(){
                removeOverlay();
            }
        });
    }
});