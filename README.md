# Moment 4 - Autentisering och säkerhet

Detta är en webbtjänst byggd med Node.js och Express och använder JWT-baserad autentisering
för att hantera data. Besökare har möjlighet att skapa ett konto samt logga in.

Webbtjänsten har en skyddad route som kräver att en användare är inloggad för att kunna se 
data. Databasen som används för detta projekt är en MongoDB-databas.

## Installation

Detta projekt kräver att Node.js och npm är installerat på din dator, samt en MongoDB-databas 
som är tillgänglig lokalt eller via en molntjänst, som exempelvis MongoDB Atlas. 
Klona sedan ner källkodsfilerna med kommando git clone och kör därefter kommando npm install 
för att installera nödvändiga npm-paket.  
Projektet innehåller en .env.sample-fil med exempel på de miljövariabler som ska användas.
Skapa en .env-fil och lägg till de variabler som ska användas för eget bruk. 

## Användning
Användarkonton lagras i en definierad struktur med hjälp av ett mongoose-schema som finns angiven i User.js-filen, detta ser ut enligt nedan: 

| Fält | Typ  | Beskrivning 
|--|--|--|
|username|String|Användarnamn, obligatoriskt, måste vara unikt.|
|password|String|Lösenord, obligatoriskt. Hashas innan det sparas.|
|created|Date|Datum och tid för när konto skapas. Skapas automatiskt av MongoDB|

Nedan finns beskrivet hur man använder API:et för att skapa en användare, logga in samt 
hämta data i den skyddade routen:

| Metod | Ändpunkt  | Beskrivning 
|--|--|--|
|POST|/api/register|Skapa ny användare.|
|POST|/api/login|Logga in användare, returnerar en JWT.|
|GET|/api/workexperiences|Hämtar data från databasen. Skyddad med autentisering, kräver att användaren är inloggad.|

För att skapa ett konto eller logga in behöver användarnamn och lösenord anges i POST-anropet.
Detta görs i följande json-format: 
```json
{
    "username": "användarnamn",
    "password": "lösenord"
}
```
OBS: För att få åtkomst till den skyddade datan vid GET-anrop måste den JWT som returneras vid inloggning inkluderas. Vid användning av ThunderClient klistras denna in i Bearer Token-fältet under fliken Auth. 

Vid lyckat anrop för att skapa konto kommer meddelande om detta att visas och vid lyckat anrop för att logga in kommer data från databasen att synas.

## Skapad av:
Ronja Norlén, rono2300, 2024.
