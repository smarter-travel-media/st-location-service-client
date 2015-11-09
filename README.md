# st-location-service-client

## Description
A js client for the location-service.

## Usage
Currently this client only supports location suggestion for typeahead location.

```js
import {ClientConfig, Client, LocationSuggestRequest} from "st-location-service-client";
const clientConfig = new ClientConfig().withBaseUrl("http://location-service-url.com");
const client = new Client(clientConfig);
const locationSuggestRequest = new LocationSuggestRequest()
    .withLocale("en")
    .withQuery("Bos")
    .withLocationTypes([10004,10038])
    .withCompoundLocations(false);
const onSuccess = function (arrayOfLocationSuggestOjects) {
  ...
};

const onError = function (errorMessage) {
  ...
};

client.suggestLocations(locationSuggestRequest, onSuccess, onError);
```

## Developing
Pull down all the devDependencies
```
npm install
```
To see the list of available grunt tasks
```
grunt
```

The watch task:
```bash
grunt watch
```
As you make changes to the code your files will be automatically linted and the unit tests will be run.

### Generate docs
To generate yui docs at the projects name at http://sites.smartertravel.net/projects/st-location-service-client/
```bash
npm run docs
```
*Note* This command requires the current user to have ssh keys setup on sites.smartertravel.net or the command will prompt for a password for the current user.


## Publishing NPM Module
While the Grunt task will take care of publishing the NPM module, you would still need to setup the credentials on your
machine to actually publish it. Begin, by adding the authentication token to your `.npmrc` file (this should be the one
in your home directory). You can do that by running the command similar to the following:

```bash
curl -u{user}:{password} "https://artifactory.smartertravel.net/artifactory/api/npm/auth" >> ~/.npmrc
```

Note that your password needs to be the encrypted version. To get that encrypted version of your password:
* Log into Artifactory thru the UI and you to your user's profile.
* Type in your password again and click on Unlock.
* The field below with your encrypted password will now be shown which you can copy and paste into the command above.

Once you have your authentication setup, you can now push to Artifactory.

---
