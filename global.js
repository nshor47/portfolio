console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    {url: '', title:'Home' },
    {url: 'projects/', title: 'Projects'},
    {url: 'contact/', title:'Contact' },
    {url: 'resume/', title: 'Resume'},
    {url: 'https://github.com/nshor47', title:'Github', target: '_blank'}
]

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    if (p.target) {
        a.setAttribute('target', p.target); 
    }
    nav.append(a);
    const ARE_WE_HOME = document.documentElement.classList.contains('home');


    if (!ARE_WE_HOME && !url.startsWith('http')) {
        const depth = location.pathname.split('/').length - 2; 
        url = '../'.repeat(depth) + url;
        a.href = url;
        //used chatGPT for debugging here because of errors continuing to pop up
    }

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
    }
}

document.body.insertAdjacentHTML(
    'afterbegin',
    `
      <label class="color-scheme">
          Theme:
          <select id='color-scheme-select'>
                <option value="light dark">Automatic</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
          </select>
      </label>`,
);
const select = document.querySelector('#color-scheme-select');

if ("colorScheme" in localStorage) {
    const storedScheme = localStorage.colorScheme;
    document.documentElement.style.setProperty('color-scheme', storedScheme);
    select.value = storedScheme;
} else {
    localStorage.colorScheme = 'light';
    select.value = 'light';
}

select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    localStorage.colorScheme = event.target.value

});


const form = document.querySelector('form');

form?.addEventListener('submit', function (event) {
    event.preventDefault();

    const data = new FormData(form);

    let url = form.action + '?';

    
    const params = []; 
    for (let [name, value] of data) {
        console.log(name, value); 
        const encodedValue = encodeURIComponent(value);
        params.push(`${encodeURIComponent(name)}=${encodedValue}`);
    }
    url += params.join('&');
    console.log('Final URL:', url);
    location.href = url;
});

// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname,
//   );

// currentLink?.classList.add('current');