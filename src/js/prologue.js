function render_prologue(event) {
    $.prologue = $.el('.prologue');
    var prologue_dom = {
        citation_text: $.prologue.querySelector('.citation p'),
        author: $.prologue.querySelector('.citation p:last-child'),
        index: $.prologue.querySelector('h1'),
        title: $.prologue.querySelector('h2'),
        dots: $.prologue.querySelectorAll('.dots'),
    };


    prologue_dom.citation_text.innerHTML = event.citation;
    prologue_dom.author.innerHTML = event.author;
    prologue_dom.index.innerHTML = 'Acte ' + event.number;
    prologue_dom.title.innerHTML = event.title;
    for (var i = 0; i < event.number; i++) {
        prologue_dom.dots[i].classList.add('active');
    }


    $.prologue.classList.add('showtime');
    $.prologue.querySelector('.citation').classList.remove('hide');

    window.setTimeout(function () {
        $.prologue.querySelector('.citation').classList.add('hide');
        $.prologue.querySelector('.splash-screen').classList.remove('hide');
        window.setTimeout(function () {
            $.prologue.classList.remove('showtime');
            render(current_act[event.data_event]);
        }, 4000);

    }, 8000);
};

function render_intro() {
    var new_prologue = document.createElement('section');
    new_prologue.className = 'new_game prologue showtime';
    new_prologue.innerHTML = '<div class="citation hide"> <p>« J’aime la science-fiction, j’aime la fantaisie, j’aime le voyage dans le temps, c’est pourquoi j’ai eu cette idée : et si vous aviez la possibilité de retourner dans votre passé par un simple coup de fil. <br>Que changerez-vous ? »</p> <p>- Rainbow Rowell</p> </div>';
    document.body.appendChild(new_prologue);


    var form_name = document.createElement('section');
    form_name.className = 'intro';
    form_name.innerHTML = '<div class="container"><div class="motion-glow"><video src="/src/medias/glow-intro.webm" autoplay loop></video></div><p>Réveillez-vous.<br>Je suis Chronos, le dieu du temps.Votre histoire n’est pas terminée.</p><input type="text" id="user-name" onfocus="this.placeholder=\'\'" placeholder="Quel est votre nom?" onblur="this.placeholder=\'Quel est votre nom?\'" required></div>';

    form_name.querySelector('input').addEventListener('keyup', function (e) {
        //UX for the input
        if ($.el('input').classList.contains('required')) {
            $.el('input').classList.remove('required');
        }
    });
    window.addEventListener('keyup', function (e) {
        //if he press enter
        if (e.keyCode === 13) {
            //check if the input is empty
            if ($.el('input').value.length === 0) {
                $.el('input').classList.add('required');
            } else {
                console.log(new_prologue);
                // #badCode
                //intro text , without the render function
                user.set_name($.el('input').value);
                form_name.querySelector('p:first-of-type').style.animationPlayState = 'running';
                form_name.querySelector(' p:last-of-type').style.animationPlayState = 'running';
                form_name.querySelector('input').classList.add('confirmed', 'translate');
                form_name.querySelector(' input').setAttribute('disabled', '');
                form_name.querySelector(' input').setAttribute('value', user.name);
                form_name.querySelector(' .container').innerHTML += '<p class="translate"> Votre histoire est sur le point de trouver un nouveau tournant. Ce n’est pas terminé. <br> Réveillez-vous.</p>';
                //now that the name is set , we remove the input part and render the first event
                window.setTimeout(function () {
                    //get animation duration
                    var fade_out_delay = window.getComputedStyle(form_name.querySelector('.intro .container')).getPropertyValue('animation-duration').charAt(0);

                    form_name.querySelector('.intro .container').style.animationPlayState = 'running';
                    window.setTimeout(function () {
                        new_prologue.classList.add('showtime');
                        new_prologue.querySelector('.splash-screen').classList.remove('hide');
                        window.setTimeout(function () {
                            new_prologue.classList.remove('showtime');
                            new_prologue.remove();
                            form_name.remove();
                            render(data.act_1.a1_0);
                        }, 4000)
                    }, fade_out_delay * 1000);
                }, 2000);
            }
        }
    });
    window.setTimeout(function () {

        new_prologue.querySelector('.citation').classList.remove('hide');
        window.setTimeout(function () {
            document.body.appendChild(form_name);
            new_prologue.classList.remove('showtime');
            new_prologue.innerHTML = '<div class="splash-screen hide"> <h1>Acte 1</h1> <div class="bar"></div> <h2>La réminiscence du destin</h2> <div class="pagination-acte"> <div class="dots active"></div> <div class="dots"></div> <div class="dots"></div> <div class="dots"></div> <div class="dots"></div> </div> </div>';
        }, 8000);
    }, 1000);
};







user.set_name = function (new_name) {
    user.name = new_name;
    user = JSON.stringify(user);
    savegame.delete_save('user_save');
    savegame.create_save('user_save', user, 7);
    user = JSON.parse(user);
};