/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes

function turnHoursToMinutes(movies) {
  var formatTime = movies.map(function(movie) {
    var copiedMovie = Object.assign({}, movie);
    var durationArray = copiedMovie.duration.replace(/[hmin]/g, '').split(' ');
    if (durationArray.length > 1) {
      copiedMovie.duration = parseInt(durationArray[0]) * 60 + parseInt(durationArray[1]);
    } else {
      copiedMovie.duration = parseInt(durationArray[0]) * 60;
    }
    return copiedMovie;
  });
  return formatTime;
}

// turnHoursToMinutes(movies);

// Get the average of all rates with 2 decimals
function ratesAverage(movies) {
  if (movies.length === 0) {
    return undefined;
  }
  var total = movies.reduce(function(acc, current) {
    acc += current.rate;
    return acc;
  }, 0);

  total = total / movies.length;
  return parseFloat(total.toFixed(2));
}

// Get the average of Drama Movies
function dramaMoviesRate(movies) {
  var filterMovies = movies.filter(function(movie) {
    var filterGenres = movie.genre.filter(function(genre) {
      return genre === 'Drama';
    });
    //console.log(filterGenres);
    return filterGenres.length > 0;
  });
  console.log(filterMovies);
  return ratesAverage(filterMovies);
}

//dramaMoviesRate(movies);

// Order by time duration, in growing order
function orderByDuration(movies) {
  var formattedMovies = turnHoursToMinutes(movies);
  var sortedArray = formattedMovies.sort(function(a, b) {
    if (a.duration < b.duration) {
      return -1;
    }
    if (a.duration > b.duration) {
      return 1;
    }
    return 0;
  });
  console.log(sortedArray);
  return sortedArray;
}

orderByDuration(movies);

// How many movies did STEVEN SPIELBERG
function howManyMovies(movies) {
  if (movies.length === 0) {
    return undefined;
  }
  var spielbergMovies = movies.filter(function(movie) {
    var filterGenres = movie.genre.filter(function(genre) {
      return genre === 'Drama';
    });
    if (filterGenres.length > 0 && movie.director === 'Steven Spielberg') {
      return true;
    } else {
      return false;
    }
  });
  return `Steven Spielberg directed ${spielbergMovies.length} drama movies!`;
}

//howManyMovies(movies);

// Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  var sortedArray = movies.sort(function(a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  var titlesArray = sortedArray.map(function(movie) {
    return movie.title;
  });
  return titlesArray.splice(0, 20);
}

//orderAlphabetically(movies);

// Best yearly rate average
