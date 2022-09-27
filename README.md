# MOVIE FETCH

## Description

This application is called MovieFetch. It is used to get movie recommendations based on user preferences and vote history.

![](../src/public/images/movie.jpg)
![](./src/public/images/preferences.jpg)
![](src/public/images/votes.jpg)

---
## Instructions

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 3000**.

Then, run:
```bash
npm install
```

To start the project run:
```bash
npm run start
```

---
## User stories (MVP)

What can the user do with the app?
- User can sign up and create and account.
- User can login.
- User can log out.
- User can vote LIKE or DISLIKE every movie shown.
- User can save a review about a previously voted movie.
- User can edit its own movie reviews.
- User can delete its own movie reviews.
- Admin can create a movie.
- Admin can delete a movie.
- Admin can edit any movie.
- User can get random recommendations based only on its votes.

## User stories (Backlog)

- User can search for a determined movie included in App.
- Admin can easly search for any movie JSON data included in the API (the json data will be displayed in console).
- User can also vote 'Ignore' so the movie is not considered an opinion, and is never recommended again.
- User can add movies to its watchList ("add to watchlist" button), to be able to get to them later and watch them.
- User can upload or change a profile picture.
- User can delete its own account.
- User can see its vote history.
- User can filter its own recommendations through genre checkboxes.
- User can visit IMDB through movie-detail links for more information.
- User can sort its own vote history by ranking, popularity or voting date.
- User can sort its own vote history by genres.
- Admin can see the list of registered users, and delete them if necessary.
- User can leave reviews on movies previously seen (voted).
- User can leave likes on any review.
- Admin can delete any review in case it is needed.
- User can get recommendations considering its votes and the genres saved in preferences.

---

## Useful links

- [Presentation slides](https://docs.google.com/presentation/d/18FTmbfKPk4-kvmUaDFEL434RDo-BS3r-xkGEDVOJ4cY/edit#slide=id.g15922dfdf9b_0_17)
- [Frontend repository](https://github.com/Paumesonero/movieAppFrontend)
- [Frontend deploy](https://moviefetchapp.netlify.app/)
- [Deployed REST API](https://idliketowatch.herokuapp.com/)


