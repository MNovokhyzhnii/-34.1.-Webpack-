import './styles/main.css';
import logoUrl from './assets/images/logo.svg';

// Replace logo src at runtime (proves asset handling works)
const img = document.querySelector('img[alt="Logo"]');
if (img) img.src = logoUrl;

// Demonstrate lodash from CDN (externals)
const nums = [1, 2, 3, 4, 5];
const doubled = _.map(nums, n => n * 2);
document.getElementById('info').textContent = `Lodash працює: [${doubled.join(', ')}]`;
