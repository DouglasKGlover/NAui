/* Hello! */
console.log('NAui V1.3 loaded successfully!');


/* Fix for top button on quick reply section */
let topButton = document.querySelector('a[href="#top"]');
topButton.addEventListener('click', function(e){
    e.preventDefault();
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});


/* Super worst friends (FOES) */
// Helper function
function getCookie(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Add any foes found on the page to the foes cookie
let allFoesDOM = document.querySelectorAll('form[action="index.cfm?fuseaction=My.Foes.Delete"] a.h5'),
    foes = [];
if(allFoesDOM.length){
    console.log('Enemies found - eradicating!');
    allFoesDOM.forEach(function(i){
        foes.push(i.text);
    });
    document.cookie = 'foes=' + foes;
    console.log('Following users added to master FOES list:');
    console.log(foes);
}

// Detect a FOE on the page
if(getCookie('foes')){
    let usersOnPage = document.querySelectorAll('a.h4[href*=users]'),
        enemies = getCookie('foes').split(',');
    if(usersOnPage.length){
        usersOnPage.forEach(function(i){
            if(enemies.includes(i.text)){
                console.log('Enemy found: ' + i.text);
                console.log('Blocking...');

                let thisPost = i.closest('.panel-primary');
                thisPost.classList.add('enemy');
                thisPost.addEventListener('click', function(){
                    this.classList.toggle('activated');
                });

                console.log('Blocked.');
            }
        });
    }
}


/* Add elements to page for showing fixed elements (top nav, quick reply) */
// Helper functions
function insertAfter(el, referenceNode) { referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling); }

/* Top Nav */
// Starting with the Top Nav, create a container to place the relevant elements into for easier manipulation
let topNavContainer = document.createElement('div');
topNavContainer.setAttribute("id", "fixedTopNav");

// Now grab the existing elements
let topNavRow1of3 = document.getElementById('topGutter');
let topNavRow2of3 = document.getElementById('top_nav');
let topNavRow3of3 = document.querySelector('#top_nav + .row');

// Place the container after the existing elements
insertAfter(topNavContainer, topNavRow3of3);

// Place the elements inside of the container
topNavContainer.appendChild(topNavRow1of3);
topNavContainer.appendChild(topNavRow2of3);
topNavContainer.appendChild(topNavRow3of3);

// Now let's add the new element to the page for the user to hover over
let topNavShow = document.createElement('div');
topNavShow.setAttribute("id", "topNavShow");
topNavShow.innerHTML = 'Navigation';
topNavContainer.appendChild(topNavShow);

// Check if the window is scrolled, to hide the Top Nav
// Check once on load...
if(window.scrollY > 75){
    topNavContainer.classList.add('scrolled');
} else {
    topNavContainer.classList.remove('scrolled');
}

// And re-check on scroll
window.addEventListener('scroll', function() {
    if(window.scrollY > 75){
        topNavContainer.classList.add('scrolled');
    } else {
        topNavContainer.classList.remove('scrolled');
    }
});

/* Quick Reply */
// Let's do the same for Quick Reply, if a little less complicated
let quickReplyContainer = document.createElement('div');
quickReplyContainer.setAttribute("id", "fixedQuickReply");

// There's only one element to place in the container for now: the form
let quickReplyRow1of1 = document.querySelector('form[name="qr"]');

// Place the container after the existing form element
insertAfter(quickReplyContainer, quickReplyRow1of1);

// Add the hover element to the container (we want it first so do it first)
let quickReplyShow = document.createElement('div');
quickReplyShow.setAttribute("id", "quickReplyShow");
quickReplyShow.innerHTML = 'Quick Reply';
quickReplyContainer.appendChild(quickReplyShow);

// Then move the form into the container
quickReplyContainer.appendChild(quickReplyRow1of1);