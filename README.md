# PropertyProLite
[![Build Status](https://travis-ci.com/Johnpeace/PropertyProLite.svg?branch=develop)](https://travis-ci.com/Johnpeace/PropertyProLite)
[![Coverage Status](https://coveralls.io/repos/github/Johnpeace/PropertyProLite/badge.svg?branch=develop)](https://coveralls.io/github/Johnpeace/PropertyProLite?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/9502704d31e0717ede11/maintainability)](https://codeclimate.com/github/Johnpeace/PropertyProLite/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9502704d31e0717ede11/test_coverage)](https://codeclimate.com/github/Johnpeace/PropertyProLite/test_coverage)

Property Pro Lite is a platform where people can create and/or search properties for sale or rent

## Installation
 > Git clone this repository

 > CD into the created directory

 > $ run `npm i`

 > $ run `npm start` to start server

## To test project
 > $ run `npm test`

## Features
 > User (client) can sign up

 > User (client) can sign in

 > User (agent) can post a property advert

 > User (agent) can update the details of a property advert

 > User (agent) can mark his/her posted advert as sold

 > User (agent) can delete an advert

 > User can view all properties

 > User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat
etc

 > User can view a specific property

## API Routes
 > POST https://propertyprolite.herokuapp.com/api/v1/auth/signup - Create user account

 > POST https://propertyprolite.herokuapp.com/api/v1/auth/signin - Login a user

 > POST https://propertyprolite.herokuapp.com/api/v1/property - Create a property advert

 > PATCH https://propertyprolite.herokuapp.com/api/v1/property/1 - Update property data

 > PATCH https://propertyprolite.herokuapp.com/api/v1/property/1/sold - Mark a property as sold so users know it’s no longer available

 > DELETE https://propertyprolite.herokuapp.com/api/v1/property/1 - Delete a property advert

 > GET https://propertyprolite.herokuapp.com/api/v1/property/1 - Get all property adverts

> GET https://propertyprolite.herokuapp.com/api/v1/property/1/?type=​duplex - Get all property advertisement offering a specific type of property

## Links
 > [Project Homepage](https://johnpeace.github.io/PropertyProLite/UI/pages/index.html)

 > [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2354324)

 > [Repository](https://github.com/Johnpeace/PropertyProLite)

 > [API Documentation]()

 > Project References
 * [Dave Sag](https://itnext.io/wiring-up-an-api-server-with-express-and-swagger-9bffe0a0d6bd)


## Author

> ##### ROPO JOHN OLATUJOYE 

## Licensing
Licensed under the [MIT License](LICENSE).