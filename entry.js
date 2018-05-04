/******************************************************************
entry.js:
진입점, 모든 소스는 이 곳에서 불러와야함
여기 진입해서 webpack.config.js의 내용대로 해석하여 번들링이 이루어짐
******************************************************************/


import './src/scss/import.scss';
import hello from './src/js/hello';
import world from './src/js/world';

$('#app').text('$ loaded.');
document.write(`${hello}, ${world}!`);
