Para instalar la base de datus usar el Archivo seed en la misma carpeta

Con MongoDB instalado correr el siguiente comando:

mongoimport -d pokemon -c pokemons --jsonArray < seed.json

desde la carpeta en la que tengas el archivo seed.json
