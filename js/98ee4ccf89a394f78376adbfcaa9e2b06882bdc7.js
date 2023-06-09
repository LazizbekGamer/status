$(document).ready(function() {
    "use strict";
    var obfuscated_animation_request_id = -1;
    $('.show-toggle').each(function() {
        var toggle = $(this);
        var toggle_elm = $('#' + $(this).attr('id').replace('show_', ''));
        var cookie_name = '__Host-' + $(this).attr('id');
        var cookie_options = {
            expires: 30,
            secure: !0,
            sameSite: 'Strict'
        };
        if (Cookies.get(cookie_name))
            toggle_text(toggle);
        else
            toggle_elm.hide();
        toggle.click(function(e) {
            toggle_text(toggle);
            toggle_elm.fadeToggle(function() {
                if (toggle_elm.is(':visible'))
                    Cookies.set(cookie_name, !0, cookie_options);
                else
                    Cookies.remove(cookie_name, cookie_options)
            });
            e.preventDefault()
        })
    });
    $('#players img').tooltip();
    $('form input[type=text]').focus(function() {
        $(this).select()
    });
    animate_obfuscated_text();
    $('#check-example-servers').click(function() {
        $('.check-example-server').each(function() {
            var elm = $(this);
            var address = $(this).data('address');
            var type = $(this).data('type');
            $.getJSON('/check-example-servers/' + type + '/' + address, function(data) {
                if (data.online == !0)
                    elm.addClass('list-group-item-success');
                else
                    elm.addClass('list-group-item-danger')
            })
        })
    })
});
function animate_obfuscated_text() {
    obfuscated_animation_request_id = window.requestAnimationFrame(animate_obfuscated_text);
    $('.minecraft-formatted--obfuscated').each(function() {
        var walker = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, !1);
        while (walker.nextNode()) {
            if (walker.currentNode.nodeValue.trim()) {
                var random_string = '';
                for (var x = 0; x < walker.currentNode.nodeValue.length; x++)
                    random_string += String.fromCharCode(Math.floor(Math.random() * (95 - 64 + 1)) + 64);
                walker.currentNode.nodeValue = random_string
            }
        }
    })
}
function toggle_text(toggle) {
    var current_text = toggle.text();
    var next_text = toggle.data('toggle-text');
    toggle.text(next_text);
    toggle.data('toggle-text', current_text)
}
