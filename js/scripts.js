//
//  Use a closure to hide the local variables from the
//  global namespace
//

// defining global variables
var line_counter = 4;

(function () {
    var QUEUE = MathJax.Hub.queue;  
    var math = null, box = null;   
    var final_dest = "MathOutput";

    var HIDEBOX = function () {
        box.style.visibility = "hidden"
    }
    
    var SHOWBOX = function () {
        box.style.visibility = "visible"
    }

    QUEUE.Push(function () {
        math = MathJax.Hub.getAllJax(math)[0];
        if (math != null) {
            box = document.getElementById("box");
            SHOWBOX();
        } else {
            alert("failure to push");
        }
    });

    window.UpdateMath = function (TeX, div) {
        if (div != null) {
            math = MathJax.Hub.getAllJax(div)[0];
            QUEUE.Push(HIDEBOX,
                ["Text",math,"\\displaystyle{"+TeX+"}"],SHOWBOX);
        } else {
            alert("failure to update");
        }
    }
})();

var create_div = function() {
    var new_div_start = '<div class="box row" id="box"><div class="span1">';

    var button_div = '<div class="button_panel btn-group btn-group-vertical  span1">';
    button_div += '<button class="insert_above btn-primary">';
    button_div += '<i class="icon-white icon-chevron-up"></i>';
    button_div += '</button></br>';
    button_div += '<button class="delete btn-primary">';
    button_div += '<i class="icon-white icon-remove"></i>';
    button_div += '</button></br>';
    button_div += '<button class="insert_below btn-primary">';
    button_div += '<i class="icon-white icon-chevron-down"></i>';
    button_div += '</button></div></div>';

    var input_div = '<div class="text_input span6">';

    input_content = '<input class="MathInput" size="80" placeholder="insert tex here"';
    input_content += 'onchange="UpdateMath(this.value,\'MathOutput' 
        + line_counter + '\')"/>';

    var output_div_start = '</div><div id="MathOutput';
    var output_div_end = '" class="output span4 print">$$ {} $$';

    var end_div = '</div></div>';
    new_div = new_div_start + button_div + input_div + input_content 
        + output_div_start + line_counter + output_div_end + end_div;

    return new_div;
}

$(document).ready(function() {

    $(".button_panel").hide();
    
    $(".insert_above").live("click", function() {
        $(".button_panel").hide();
        $(this).parent().parent().parent().before(create_div());
        
        var math = document.getElementById("MathOutput" + line_counter);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, math]);
        $("#MathOutput" + line_counter).parent().find(".MathInput").focus();

        line_counter++;
    });

    $(".delete").live("click", function() {

        /* >>>> TODO: how to deal with the last thing in the list */
        var ancestor = $(this).parent().parent().parent();
        if (ancestor.next(".box") != null) {
            ancestor.next(".box").find(".MathInput").focus();
        } else if (ancestor.prev(".box") != null) {
            ancestor.prev(".box").find(".MathInput").focus();
        }
        $(this).parent().parent().parent().remove();
    });

    $(".insert_below").live("click", function() {
        $(".button_panel").hide();
        $(this).parent().parent().parent().after(create_div());
        var math = document.getElementById("MathOutput" + line_counter);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, math]);
        $("#MathOutput" + line_counter).parent().find(".MathInput").focus();
        line_counter++;
    });

    $(".MathInput").live("focus", function () {
        $(".button_panel").hide();
        $(this).parent().parent().find(".button_panel").show();
        $(this).parent().parent().css("background-color", "#AADEA0");
    });

    $(".MathInput").live("blur", function() {
         $(this).parent().parent().css("background-color", "");
    });


});
