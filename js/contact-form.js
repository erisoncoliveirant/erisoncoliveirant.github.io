/*
--------------------------------
Ajax Contact Form
--------------------------------
+ https://github.com/pinceladasdaweb/Ajax-Contact-Form
+ A Simple Ajax Contact Form developed in PHP with HTML5 Form validation.
+ Has a fallback in jQuery for browsers that do not support HTML5 form validation.
+ version 1.0.1
+ Copyright 2014 Pedro Rogerio
+ Licensed under the MIT license
+ https://github.com/pinceladasdaweb/Ajax-Contact-Form
*/

(function($, window, document, undefined) {
    'use strict';

    var $form = $('#contact-form');

    $form.submit(function(e) {
        $('[name="submit"]').prop('disabled', 'disabled');
        // remove the error class
        $('.form-group').removeClass('has-error');
        $('.help-block').remove();

        // get the form data
        var formData = {
            'name': $('input[name="form-name"]').val() + ' ' + $('input[name="form-lastname"]').val(),
            'email': $('input[name="form-email"]').val(),
            'subject': $('input[name="form-subject"]').val(),
            'message': $('textarea[name="form-message"]').val()
        };

        // process the form
        $.ajax({
            type: 'POST',
            url: 'https://usebasin.com/f/f221da37e63c.json',
            data: formData,
            dataType: 'json',
            encode: true
        }).done(function(data) {
            $('[name="submit"]').removeProp('disabled');
            // handle errors
            if (!data.success) {
                if (data.errors.name) {
                    $('#name-field').addClass('has-error');
                    $('#name-field').find('.col-lg-10').append('<span class="help-block">Por favor digite o seu nome.</span>');
                }

                if (data.errors.email) {
                    $('#email-field').addClass('has-error');
                    $('#email-field').find('.col-lg-10').append('<span class="help-block">O e-mail informado não é válido.</span>');
                }

                if (data.errors.subject) {
                    $('#subject-field').addClass('has-error');
                    $('#subject-field').find('.col-lg-10').append('<span class="help-block">Diga qual o assunto.</span>');
                }

                if (data.errors.message) {
                    $('#message-field').addClass('has-error');
                    $('#message-field').find('.col-lg-10').append('<span class="help-block">O texto da mensagem não pode ser vazio.</span>');
                }
            } else {
                // display success message
                $('[name="submit"]').removeProp('disabled');
                $form.find('input,textarea').val('');
                $('body').append('<div class="alert alert-success msg-success" style="position: fixed;bottom: 0;z-index: 9999999;left: 50%;transform: translate(-50%, -50%);">OK!. Sua mensagem foi enviada com sucesso, obrigado.</div>');
                setTimeout(function() {
                    $('.msg-success').fadeOut(250, function() {
                        $('.msg-success').remove();
                    });
                }, 10000);
            }
        }).fail(function(data) {
            $('[name="submit"]').removeProp('disabled');
            $('body').append('<div class="alert alert-danger msg-danger" style="position: fixed;bottom: 0;z-index: 9999999;left: 50%;transform: translate(-50%, -50%);">Opps!. Não foi possível enviar sua mensagem tente novamente mais tarde, obrigado.</div>');
            setTimeout(function() {
                $('.msg-danger').fadeOut(250, function() {
                    $('.msg-danger').remove();
                });
            }, 10000);
            // for debug
            console.log(data);
        });

        e.preventDefault();
    });
}(jQuery, window, document));