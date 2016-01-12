** Require Gladys >= 2.1.4 **

## Features
Send SMS with the API of Free Mobile.
(Free Mobile is a French mobile carrier)

## Installation
```bash
# Go to the hooks directory
$ cd gladys/api/hooks

# Clone the repository
$ git clone https://github.com/Time-Lords/gladys-smsfree.git smsfree
$ cd smsfree

# Install NPM dependencies
$ npm install

# Restart Gladys
$ sudo pm2 restart gladys
```
## Usage
* Configure your API informations on the dashboard. (One configuration per user)
* Create a template if you want send SMS from an action

## Scripts
### SmsfreeService.send(configId, message, callback)
* configId (Int) : ID of the configuration (Dashboard => Free Mobile => Configuration)
* message (String) : The message to be sent 
* callback (Function)


```
// Send Hello World
SmsfreeService.send(1, 'Hello World', function(err, message){
	
});
```