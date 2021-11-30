#/!bin/bash

echo What should the version be?
read VERSION
echo $VERSION

docker build -t kevinbuhler/nextnote:$VERSION .
docker push kevinbuhler/nextnote:$VERSION
ssh root@198.211.115.138 "docker pull kevinbuhler/nextnote:$VERSION && docker tag kevinbuhler/nextnote:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"