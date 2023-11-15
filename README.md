<h2 align="center">

<img
		width="600"
		alt="Marvel picture"
		src="https://github.com/ErwanPel/Marvel-frontend-SASS/blob/main/src/assets/img/marvel_Home.png">
</h2>

<h1 align="center">
Project Marvel - Frontend

</h1>

</br>

<p align="center">
	<img alt="Last Commit" src="https://img.shields.io/github/last-commit/ErwanPel/Marvel-frontend-SASS.svg?style=flat-square">
	<img alt="Licence" src="https://img.shields.io/github/license/ErwanPel/Marvel-frontend-SASS.svg?style=flat-square">
	<img alt="Star" src="https://img.shields.io/badge/you%20like%20%3F-STAR%20ME-blue.svg?style=flat-square">
</p>


## Tech Stack

[**Client:**](https://github.com/ErwanPel/Marvel-frontend-SASS) React.js, SASS, Framer Motion

**Server:** Node.js, Express.js, MongoDB


## Overview

This project is a technical test carried out at the "Le Réacteur" bootcamp. This project respects a specification for the functionalities and total freedom for the aesthetic and interactive aspect of the site. The search bar uses an auto-completion system to make it easier to find a character or comic. Adding or deleting a favorite requires the user to be logged in. If the user is not logged in, pressing the favorite displays the LoginPage. Modals are managed by the UseContext hook.

This client-side Marvel project uses 8 pages:

1) HomePage: displays the home page with a superb Marvel wallpaper.
2) AllCharactersPage: displays a list of 100 characters per page. 
3) AllComicsPage: displays a list of 100 comics per page. 
4) CharacterPage: displays character information and appearance in comics.
5) ComicsPage: displays comic information.
6) FavoritesPage: displays the user's favorites. This page requires you to be logged in.
7) SignInPage: displays a registration form.
8) LoginPage: displays a login form.



</br>

This project uses SASS for style management, which consists of a set of SASS files within the SASS folder. When compiling, SASS creates a CSS file with all the styles. The SASS file is made up of 4 folders and an index file "App.scss", containing all the styles to be compiled:

1) Abstract: this folder contains animations, breakpoints, mixins, placeholders and variables.
2) Base: this folder contains the reset, typography and basic values for common HTML tags.
3) Pages: this folder contains the style for each page.
4) Partials: this folder contains the style for individual components.

## Screenshots

<div align="center">
  <p>HomePage</p>
<img
		width="600"
		alt="HomePage"
		src="https://github.com/ErwanPel/Marvel-frontend-SASS/blob/main/src/assets/img/marvel_Home.png" >
  
  <p>AllCharactersPage</p>
<img	
    width="600"
		alt="AllCharactersPage"
		src="https://github.com/ErwanPel/Marvel-frontend-SASS/blob/main/src/assets/img/marvel_allCharacters.png">
   <p>AllComicsPage</p>
  <img	
    width="600"
		alt="AllComicsPage"
		src="https://github.com/ErwanPel/Marvel-frontend-SASS/blob/main/src/assets/img/marvel_allsComics.png">
   <p>CharacterPage</p>
  <img	
    width="600"
		alt="CharacterPage"
		src="https://github.com/ErwanPel/Marvel-frontend-SASS/blob/main/src/assets/img/marvel_character.png">
   <p>ComicPage</p>
  <img	
    width="600"
		alt="ComicPage"
		src="https://github.com/ErwanPel/Marvel-frontend-SASS/blob/main/src/assets/img/marvel_comic.png">
   <p>FavoritesPage</p>
  <img	
    width="600"
		alt="FavoritePage"
		src="https://github.com/ErwanPel/Marvel-frontend-SASS/blob/main/src/assets/img/marvel_favorite.png">
   <p>SignInPage</p>
  <img	
    width="600"
		alt="SigninPage"
		src="https://github.com/ErwanPel/Marvel-frontend-SASS/blob/main/src/assets/img/marvel_signin.png">
   <p>LoginPage</p>
  <img	
    width="600"
		alt="LoginPage"
		src="https://github.com/ErwanPel/Marvel-frontend-SASS/blob/main/src/assets/img/marvel_login.png">
</div>

### Running the project

Clone this repository :

```
git clone https://github.com/ErwanPel/Marvel-frontend-SASS.git
cd Marvel-frontend-SASS
```

Install packages :

```
yarn 

```

When installation is complete, you have to launch  :

```
yarn dev

```

To activate the live SASS compiler, you have to launch  :

```
sass --watch src\assets\scss\App.scss src\assets\css\App.css

```

The "index.html" page uses the Content Security Policy (CSP) to partially secure the web application. This CSP is located in the head, in a meta tag. Adding an image from an unspecified URL or changing the style may result in an error. During development, you can comment out the CSP's "meta" tag and reactivate it once development is complete. When you uncomment it, you'll see an error. To correct the error, look in the console.log for the origin of the error and replace or add/remove what is requested in the "content" property of the CSP "meta" tag.

You can see the server side for this Marvel Project [here](https://github.com/ErwanPel/Marvel-backend).

## Star, Fork, Clone & Contribute

Feel free to contribute on this repository. If my work helps you, please give me back with a star. This means a lot to me and keeps me going!
