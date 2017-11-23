$(function () {
  $.ajax('/api').then(function (data) {
    console.log(data);
  }).fail(function (e) {
    console.error(e)
  })
});