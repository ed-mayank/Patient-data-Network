1. Install Hyperledger-composer
* Installing Pre-requisites [https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html#ubuntu]
* Install Development Environment: [https://hyperledger.github.io/composer/latest/installing/development-tools.html]  

2. Install hyperledger-fabric.

3. Running the application:   
* Ensure docker is running. `docker ps`.  
* Set environment variables: `export FABRIC_VERSION=hlfv12`
* Set location of the fabric-dev-server with `export FABRIC_DEV_SERVER='path to fabric dev server'`.
* In patient-data-network folder run script:   
`./startNetwork.sh <version#>`  here <version#> must be version appears in package.json file.  
* run composer playground from terminal.  
* Open http://localhost:8080 in your browser.  
* Click on "Connect Now" link at the bottom of `admin@patient-data-network` card.  

