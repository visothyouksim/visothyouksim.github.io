!(function ($) {
  "use strict";

  var Typed = function (el, options) {
    this.el = $(el);
    this.options = $.extend({}, $.fn.typed.defaults, options);
    this.text = this.el.text();
    this.typeSpeed = this.options.typeSpeed;
    this.backDelay = this.options.backDelay;
    this.strings = this.options.strings;
    this.strPos = 0;
    this.arrayPos = 0;
    this.string = this.strings[this.arrayPos];
    this.stopNum = 0;
    this.loop = this.options.loop;
    this.loopCount = this.options.loopCount;
    this.curLoop = 1;

    if (this.loop === false) {
      this.stopArray = this.strings.length - 1;
    } else {
      this.stopArray = this.strings.length;
    }

    this.init();
    this.build();
  };

  Typed.prototype = {
    constructor: Typed,

    init: function () {
      this.typewrite(this.string, this.strPos);
    },

    build: function () {
      this.el.after('<span id="typed-cursor">|</span>');
    },

    typewrite: function (curString, curStrPos) {
      var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
      var self = this;

      setTimeout(function () {
        if (self.arrayPos < self.strings.length) {
          self.el.text(self.text + curString.substr(0, curStrPos));

          if (curStrPos > curString.length && self.arrayPos < self.stopArray) {
            setTimeout(function () {
              self.backspace(curString, curStrPos);
            }, self.backDelay);
          } else {
            curStrPos++;
            self.typewrite(curString, curStrPos);

            if (self.loop === false) {
              if (
                self.arrayPos === self.stopArray &&
                curStrPos === curString.length
              ) {
                self.options.callback();
              }
            }
          }
        } else if (self.loop === true && self.loopCount === false) {
          self.arrayPos = 0;
          self.init();
        } else if (self.loopCount !== false && self.curLoop < self.loopCount) {
          self.arrayPos = 0;
          self.curLoop = self.curLoop + 1;
          self.init();
        }
      }, humanize);
    },

    backspace: function (curString, curStrPos) {
      var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
      var self = this;

      setTimeout(function () {
        self.stopNum = 0;

        self.el.text(self.text + curString.substr(0, curStrPos));

        if (curStrPos > self.stopNum) {
          curStrPos--;
          self.backspace(curString, curStrPos);
        } else {
          self.arrayPos = self.arrayPos + 1;
          self.typewrite(self.strings[self.arrayPos], curStrPos);
        }
      }, humanize);
    },
  };

  $.fn.typed = function (option) {
    return this.each(function () {
      var $this = $(this),
        data = $this.data("typed"),
        options = typeof option == "object" && option;
      if (!data) $this.data("typed", (data = new Typed(this, options)));
      if (typeof option == "string") data[option]();
    });
  };

  $.fn.typed.defaults = {
    strings: [
      "Hello, hola, hi! ",
      "Welcome to my website ",
      "Go on, scroll down",
      ":)",
    ],
    typeSpeed: 50,
    backDelay: 100,
    loop: true,
    loopCount: false,
    callback: function () {},
  };
})(window.jQuery);

$(function () {
  $("#typed").typed({
    strings: [
      " - Développeur Web et Web Mobile",
      " - HTML5 CSS3 JavaScript",
      " - PHP Symfony",
    ],
    typeSpeed: 40,
    backDelay: 600,
    loop: true,
    loopCount: false,
    callback: function () {},
  });
});

// -------------------------------- NOTIFICATION --------------------------------

function showNotification(message, type) {
  var el = document.getElementById("notification");
  el.textContent = message;
  el.className = "notification " + type + " show";
  setTimeout(function () {
    el.classList.remove("show");
  }, 4000);
}

// -------------------------------- FORMULAIRE ----------------------------------

emailjs.init("sebkT6qq3LV_xmd1-");

$(document).ready(function () {
  $("#myForm").submit(function (event) {
    event.preventDefault();

    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var message = $("#message").val();

    var $btn = $("#submitButton");
    $btn.prop("disabled", true).html('<i class="fas fa-spinner fa-spin"></i> Envoi...');

    emailjs
      .send("service_wjn1sx9", "template_9z84dry", {
        from_name: name,
        from_email: email,
        from_phone: phone,
        from_message: message,
      })
      .then(
        function () {
          showNotification("Votre message a bien été envoyé !", "success");
          $("#myForm")[0].reset();
          $btn.prop("disabled", false).html('<i class="fas fa-paper-plane"></i> Envoyer');
        },
        function () {
          showNotification("Une erreur est survenue. Veuillez réessayer.", "error");
          $btn.prop("disabled", false).html('<i class="fas fa-paper-plane"></i> Envoyer');
        }
      );
  });
});

// ------------------------- GESTION DES MODALS ------------------------------------

function openModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var modalMapping = {
    openModalBtn: "myModal",
    openModalBtn2: "myModal2",
    openModalBtn3: "myModal3",
  };

  Object.keys(modalMapping).forEach(function (btnId) {
    var btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener("click", function () {
        openModal(modalMapping[btnId]);
      });
    }
  });

  document.querySelectorAll(".close").forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function () {
      var modal = this.closest(".modal");
      if (modal) {
        closeModal(modal.id);
      }
    });
  });

  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal(this.id);
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.show").forEach(function (modal) {
        closeModal(modal.id);
      });
    }
  });
});
