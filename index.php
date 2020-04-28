<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Villes</title>
</head>
<body>
    <div class="titles">
        <h1>Récupérer les infos d'une ville à partir de l'api :<br>
        <a href="https://api.gouv.fr/api/api-geo.html">https://api.gouv.fr/api/api-geo.html</a></h1>
        <p>URL de base :<br>https://geo.api.gouv.fr/communes/?nom=VILLE</p>
    </div>
    <form action="" method="GET">
        <input type="text" name="nom" id="nom" placeholder="Ville recherchée">
        <input type="submit">
    </form>

    <div class="table">
        <!-- <thead>
            <tr>
                <th>Nom</th>
                <th>Codes postaux</th>
                <th>Population</th>
                <th>Département</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Chalon-sur-Saône</td>
                <td>71100</td>
                <td>45446</td>
                <td>71</td>
            </tr>
        </tbody> -->
    </div>

    <script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>