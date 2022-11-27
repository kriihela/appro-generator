<h1 align="center">Appro Generator</h1>

<p align="center"> The app to generate bar crawl events known as Appros <br>
<b> Always new appros to experience! Drink responsibly! </b>
</p>

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## About <a name = "about"></a>

Appro generator is the final project of Haaga-Helia University of Applied Sciences' mobile programming course.

The purpose of the app is to automatically create a bar crawl event for thirsty students, known as appros.

In the application, the starting place, the size of the area and the number of places (bars) are selected. The app will automatically create a route after this.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

In order to run the app locally, you need the following:
* [Node.js](https://nodejs.org/en/)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [Git](https://www.git-scm.com/)
* [Expo Cli](https://docs.expo.dev/get-started/installation/#1-expo-cli)
* [Expo Go](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-android-and)

### Installing

A step by step guide that will tell you how to get a development env running.

Clone the repository

```
git clone https://github.com/kriihela/appro-generator.git
```

Install dependencies

```
npm install
```

Start the application

```
npm start
```
or
```
npx expo start
```

## Usage <a name="usage"></a>

When the application is opened, the user must fill the following information in order to generate an appro route:
* Enter the address
* Enter the radius in kilometers
* Enter the number of places

![HomeScreen](https://github.com/kriihela/appro-generator/blob/main/readme-images/IMG_2798.jpg)

The user can enter the address, or select the current location from the button on the right. After that, the distance the user is willing to travel is selected. Finally, the number of bars is selected. When the button on the bottom of the screen is pressed, the appro route will be generated.

The app uses the Google Maps API nearby search to find the bars. The limit of the search is 20 places, but that should be enough for most users. If the user wants to get super drunk, they can always generate a new appro.

If there are not enough places in the area, the user will be notified and the appro will not be generated.

![Places](https://github.com/kriihela/appro-generator/blob/main/readme-images/IMG_2799.jpg)

Next, the user sees a map where the bars and the user's current location are marked. The names of the places are listed below the map. When the name is pressed, more information will be displayed. When the user has arrived, they press the "I'm here" button. After this, the place will be removed from the list. When all places have been visited, the application congratulates the user for completing the appro.

![Info](https://github.com/kriihela/appro-generator/blob/main/readme-images/IMG_2800.jpg)

## Deployment <a name = "deployment"></a>

If you want to deploy the app to your phone, you can use the Expo Go app. You can scan the QR code from the terminal when you write `npm start` or `npx expo start`.

You can also use the Expo Go app to scan the QR code below to use the app without cloning the repository.

<img width=200px height=200px src="https://qr.expo.dev/expo-go?owner=kriihela&slug=approgeneraattori&releaseChannel=default&host=exp.host" alt="QR code"></a>

Or you can use the link below.

https://expo.dev/@kriihela/approgeneraattori?serviceType=classic&distribution=expo-go

## Built Using <a name = "built_using"></a>

- [React Native](https://reactnative.dev/) - The framework used
- [Expo](https://expo.dev/) - The framework used
- [Google Maps API](https://developers.google.com/maps/documentation) - The API used
- [React Native Elements](https://reactnativeelements.com/) - The UI library used
- [Dall-e](https://openai.com/blog/dall-e/) - The image generator used

## Authors <a name = "authors"></a>

- [@kriihela](https://github.com/kriihela) - Idea, design and implementation

## Acknowledgements <a name = "acknowledgement"></a>

- Thanks to Haaga-Helia University of Applied Sciences and teacher Markku Ruonavaara that I ended up doing this project.
- Thanks to my alcoholic friends for the feedback and ideas.