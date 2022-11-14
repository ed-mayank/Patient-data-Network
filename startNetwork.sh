NETWORK_NAME=$(basename "$PWD")

NETWORK_VERSION=($1)
if [ $# -eq 0 ]
  then
    echo "Please specify network version number"
    exit 0
fi
echo 'Running Network: ' $NETWORK_NAME ': Version ' $NETWORK_VERSION

# Create a new BNA file
composer archive create -t dir -n .

# shut down fabric
$FABRIC_DEV_SERVER/./teardownFabric.sh
$FABRIC_DEV_SERVER/./teardownAllDocker.sh

# Remove all the previous cards
rm -Rf ~/.composer

# Create initial Peer card
if [ "${FABRIC_DEV_SERVER}" = "" ]; then
  echo "Need to define the location of your Fabric Server Scripts"
fi
$FABRIC_DEV_SERVER/./startFabric.sh 
$FABRIC_DEV_SERVER/./createPeerAdminCard.sh 

# Install peer card onto my network
BNA_FILE=$NETWORK_NAME\@$NETWORK_VERSION.bna
echo $BNA_FILE
composer network install --card PeerAdmin@hlfv1 --archiveFile $BNA_FILE

# Start the network with the PeerAdmin card
composer network start --networkName $NETWORK_NAME --networkVersion $NETWORK_VERSION --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
# Import the network admin card to the network
composer card import --file networkadmin.card 

# Ping the card to activate it
composer network ping --card admin@$NETWORK_NAME

# Start-up composer playground
composer-playground

