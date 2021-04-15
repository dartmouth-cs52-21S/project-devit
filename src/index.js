import $ from 'jquery';
import './style.scss';

let num = 0;
setInterval(() => {
  num += 1;
  console.log(num);
  $('#main').html(
    `You've been on this page for ${num} seconds.`,
  );
}, 1000);
