console.log('NAui loaded successfully!');

/* Super worst friends (FOES) */
function getCookie(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Add any foes found on the page to the foes cookie
var allFoesDOM = document.querySelectorAll('form[action="index.cfm?fuseaction=My.Foes.Delete"] a.h5'),
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
    var usersOnPage = document.querySelectorAll('a.h4[href*=users]'),
        enemies = getCookie('foes').split(',');
    if(usersOnPage.length){
        usersOnPage.forEach(function(i){
            if(enemies.includes(i.text)){
                console.log('Enemy found: ' + i.text);
                console.log('Blocking...');

                var thisPost = i.closest('.panel-primary');
                thisPost.classList.add('enemy');
                thisPost.addEventListener('click', function(){
                    this.classList.toggle('activated');
                });

                console.log('Blocked.');
            }
        });
    }
}