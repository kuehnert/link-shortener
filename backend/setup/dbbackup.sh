# sudo apt install -y mongo-tools

mongoexport --uri="mongodb://develop:$PASSWORD@localhost:27017/linkshortener_development" --collection=shortlinks --out=shortlinks-development.json

mongoimport --uri="mongodb://deploy:$PASSWORD@10.0.0.3:27017/linkshortener" --collection=shortlinks --file=shortlinks-development.json

mongo --username mk --password --host localhost --authenticationDatabase admin
