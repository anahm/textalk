(function () { 
    var queue = MathJax.Hub.queue;
    var math = null;

    queue.Push(function() {
        math = MathJax.Hub.getAllJax("output")[0];
    });


    //  The onchange event handler that typesets the math entered by the 
    //  user
    window.UpdateMath = function (TeX) {
        queue.Push(["Text", math, "\\displaystyle{"+TeX+"}"]);
    }
});

    
$(document).ready(function() {
    // alert("hi");
    
   

     /* $("input").change(function() {
        var inner_text = "$$" + $(this).val() + "$$";
        alert(inner_text);
        $("#output").html(inner_text);
        // $("body").append(inner_text);

        
        // UpdateMath(this.value);
        // MathJax.Hub.Queue(["Typeset",MathJax.Hub,"output"]);
    });  */
});

