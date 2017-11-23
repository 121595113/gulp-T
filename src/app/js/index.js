$(function () {
  $.ajax('/images/cur-sprite.png').then(function (data) {
      console.log(1111);
      return $.ajax('/images/cur1-sprite.png');
    }).then(function (data) {
      console.log(222);
    })
    .fail(function (e) {
      console.error(e);
    });
});