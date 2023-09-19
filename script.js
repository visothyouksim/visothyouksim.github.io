$(window).resize(function () {
    centerSplash();
});

!function ($) {

    "use strict";

    var Typed = function (el, options) {

        // chosen element to manipulate text
        this.el = $(el);
        // options
        this.options = $.extend({}, $.fn.typed.defaults, options);

        // text content of element
        this.text = this.el.text();

        // typing speed
        this.typeSpeed = this.options.typeSpeed;

        // amount of time to wait before backspacing
        this.backDelay = this.options.backDelay;

        // input strings of text
        this.strings = this.options.strings;

        // character number position of current string
        this.strPos = 0;

        // current array position
        this.arrayPos = 0;

        // current string based on current values[] array position
        this.string = this.strings[this.arrayPos];

        // number to stop backspacing on.
        // default 0, can change depending on how many chars
        // you want to remove at the time
        this.stopNum = 0;

        // Looping logic
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 1;
        if (this.loop === false) {
            // number in which to stop going through array
            // set to strings[] array (length - 1) to stop deleting after last string is typed
            this.stopArray = this.strings.length - 1;
        }
        else {
            this.stopArray = this.strings.length;
        }

        // All systems go!
        this.init();
        this.build();
    }

    Typed.prototype = {

        constructor: Typed

        , init: function () {
            // begin the loop w/ first current string (global self.string)
            // current string will be passed as an argument each time after this
            this.typewrite(this.string, this.strPos);
        }

        , build: function () {
            this.el.after("<span id=\"typed-cursor\">|</span>");
        }

        // pass current string state to each function
        , typewrite: function (curString, curStrPos) {

            // varying values for setTimeout during typing
            // can't be global since number changes each time loop is executed
            var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
            var self = this;

            // ------------- optional ------------- //
            // backpaces a certain string faster
            // ------------------------------------ //
            // if (self.arrayPos == 1){
            //  self.backDelay = 50;
            // }
            // else{ self.backDelay = 500; }

            // containg entire typing function in a timeout
            setTimeout(function () {

                // make sure array position is less than array length
                if (self.arrayPos < self.strings.length) {

                    // start typing each new char into existing string
                    // curString is function arg
                    self.el.text(self.text + curString.substr(0, curStrPos));

                    // check if current character number is the string's length
                    // and if the current array position is less than the stopping point
                    // if so, backspace after backDelay setting
                    if (curStrPos > curString.length && self.arrayPos < self.stopArray) {
                        clearTimeout(clear);
                        var clear = setTimeout(function () {
                            self.backspace(curString, curStrPos);
                        }, self.backDelay);
                    }

                    // else, keep typing
                    else {
                        // add characters one by one
                        curStrPos++;
                        // loop the function
                        self.typewrite(curString, curStrPos);
                        // if the array position is at the stopping position
                        // finish code, on to next task
                        if (self.loop === false) {
                            if (self.arrayPos === self.stopArray && curStrPos === curString.length) {
                                // animation that occurs on the last typed string
                                // fires callback function
                                var clear = self.options.callback();
                                clearTimeout(clear);
                            }
                        }
                    }
                }
                // if the array position is greater than array length
                // and looping is active, reset array pos and start over.
                else if (self.loop === true && self.loopCount === false) {
                    self.arrayPos = 0;
                    self.init();
                }
                else if (self.loopCount !== false && self.curLoop < self.loopCount) {
                    self.arrayPos = 0;
                    self.curLoop = self.curLoop + 1;
                    self.init();
                }

                // humanized value for typing
            }, humanize);

        }

        , backspace: function (curString, curStrPos) {

            // varying values for setTimeout during typing
            // can't be global since number changes each time loop is executed
            var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
            var self = this;

            setTimeout(function () {

                // ----- this part is optional ----- //
                // check string array position
                // on the first string, only delete one word
                // the stopNum actually represents the amount of chars to
                // keep in the current string. In my case it's 14.
                if (self.arrayPos == 1, 2, 3, 4) {
                    self.stopNum = 0;
                }
                //every other time, delete the whole typed string
                //else{
                //self.stopNum = 0;
                //}

                // ----- continue important stuff ----- //
                // replace text with current text + typed characters
                self.el.text(self.text + curString.substr(0, curStrPos));

                // if the number (id of character in current string) is
                // less than the stop number, keep going
                if (curStrPos > self.stopNum) {
                    // subtract characters one by one
                    curStrPos--;
                    // loop the function
                    self.backspace(curString, curStrPos);
                }
                // if the stop number has been reached, increase
                // array position to next string
                else if (curStrPos <= self.stopNum) {
                    clearTimeout(clear);
                    var clear = self.arrayPos = self.arrayPos + 1;
                    // must pass new array position in this instance
                    // instead of using global arrayPos
                    self.typewrite(self.strings[self.arrayPos], curStrPos);
                }

                // humanized value for typing
            }, humanize);

        }

    }

    $.fn.typed = function (option) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('typed')
                , options = typeof option == 'object' && option
            if (!data) $this.data('typed', (data = new Typed(this, options)))
            if (typeof option == 'string') data[option]()
        });
    }

    $.fn.typed.defaults = {
        strings: ["Hello, hola, hi! ", "Welcome to my website ", "Go on, scroll down", ":)"],
        // typing and backspacing speed
        typeSpeed: 50, // speed decreases as number increased
        // time before backspacing
        backDelay: 100,
        // loop
        loop: true,
        // false = infinite
        loopCount: false,
        // ending callback function
        callback: function () { null }
    }


}(window.jQuery);


$(function () {

    $("#typed").typed({
        strings: [" - Développeur Web et Web Mobile", " - HTML5 CSS3 JavaScript", " - PHP Symfony"], //Strings to display when typing
        typeSpeed: 40,
        backDelay: 600,
        loop: true,
        // defaults to false for infinite loop
        loopCount: false,
        callback: function () { foo(); }
    });

    function foo() { console.log("Callback"); }

});



// -------------------------------- FORMULAIRE ----------------------------------

// Initialisation d'EmailJS avec votre service
emailjs.init("sebkT6qq3LV_xmd1-");

// Configurations EmailJS
const serviceID = "service_wjn1sx9";
const templateID = "template_9z84dry";

// Attendre que le DOM soit prêt
$(document).ready(function () {
    // Gestionnaire de soumission du formulaire
    $("#myForm").submit(function (event) {
        event.preventDefault(); // Empêcher la soumission par défaut du formulaire

        // Obtenir les valeurs des champs
        const name = $("#name").val();
        const email = $("#email").val();
        const phone = $("#phone").val();
        const message = $("#message").val();

        // Envoyer les données à EmailJS
        emailjs.send("service_wjn1sx9", "template_9z84dry", {
            from_name: name,
            from_email: email,
            from_phone: phone,
            from_message: message
        }).then(
            function (response) {
                console.log("E-mail envoyé avec succès : ", response);
                // Vous pouvez ajouter ici un code pour afficher un message de réussite à l'utilisateur
                alert("Votre email a bien été envoyé !");
            },
            function (error) {
                console.log("Erreur lors de l'envoi de l'e-mail : ", error);
                // Vous pouvez ajouter ici un code pour afficher un message d'erreur à l'utilisateur
            }
        );
    });
});


// ------------------------- MES PROJETS ------------------------------------

// Récupérez toutes les images et les modales
var images = document.querySelectorAll('.img-fluid');
var modals = document.querySelectorAll('.modal');

// Associez un gestionnaire d'événements au clic sur chaque image
images.forEach(function(image, index) {
    image.addEventListener('click', function() {
        // Ouvrez la modal correspondante en ajoutant la classe "show" à la modal
        modals[index].classList.add('show');
    });
});

// Associez un gestionnaire d'événements au clic sur le bouton de fermeture de la modal
var closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(function(button, index) {
    button.addEventListener('click', function() {
        // Fermez la modal correspondante en supprimant la classe "show"
        modals[index].classList.remove('show');
    });
});