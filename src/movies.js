/* eslint no-restricted-globals: 'off' */
// Iteration 1: Turn duration of the movies from hours to minutes

function turnHoursToMinutes(movies) {
  var formatTime = movies.map(function(movie) {
    var copiedMovie = Object.assign({}, movie);
    var durationArray = copiedMovie.duration
      .toString()
      .split(' ')
      .map(function(el) {
        if (el.includes('h')) {
          return el.replace(/[h]/g, '') * 60;
        } else {
          return el.replace(/[min]/g, '') * 1;
        }
      });
    copiedMovie.duration = durationArray.reduce(function(acc, current) {
      acc += current;
      return acc;
    }, 0);
    return copiedMovie;
  });
  return formatTime;
}

turnHoursToMinutes(movies);

// Iteration 2: Get the average of all rates with 2 decimals

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

// Iteration 3: Get the average of Drama Movies

function dramaMoviesRate(movies) {
  var filterMovies = movies.filter(function(movie) {
    var filterGenres = movie.genre.filter(function(genre) {
      return genre === 'Drama';
    });
    return filterGenres.length > 0;
  });
  return ratesAverage(filterMovies);
}

// dramaMoviesRate(movies);

// Iteration 4: Order by time duration, in growing order

function orderByDuration(movies) {
  var formattedMovies = turnHoursToMinutes(movies);
  var sortedArray = formattedMovies.sort(function(a, b) {
    if (a.duration === b.duration) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }
    if (a.duration < b.duration) {
      return -1;
    }
    if (a.duration > b.duration) {
      return 1;
    }
    return 0;
  });
  return sortedArray;
}

orderByDuration(movies);

// Iteration 5: How many movies did STEVEN SPIELBERG

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

// Iteration 6: Order by title and print the first 20 titles

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

// orderAlphabetically(movies);

// BONUS Iteration: Best yearly rate average

function bestYearAvg(movies) {
  if (movies.length === 0) {
    return undefined;
  }
  var moviesByYear = {};
  var bestYear = '';
  var bestAverage = 0;
  movies.map(function(movie) {
    if (moviesByYear[movie.year] === undefined) {
      moviesByYear[movie.year] = [movie];
    } else {
      moviesByYear[movie.year].push(movie);
    }
  });
  for (var year in moviesByYear) {
    var average = 0;
    moviesByYear[year].map(function(movie) {
      average += movie.rate;
    });
    if (average / moviesByYear[year].length > bestAverage) {
      bestYear = year;
      bestAverage = average / moviesByYear[year].length;
    }
  }
  return 'The best year was ' + bestYear + ' with an average rate of ' + bestAverage;
}
