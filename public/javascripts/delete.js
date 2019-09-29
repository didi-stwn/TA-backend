
$(function()
{   
    $('#reused_form').submit(function(e)
    {
        e.preventDefault();
        
        $form = $(this);
        
        $.ajax({
            type: "POST",
            url: 'http://192.168.2.7:3000/delete',
            data: $form.serialize(),
            success: function (response) {
                window.location = "http://192.168.2.7:3000/view";
            },
            dataType: 'json' 
        });    
        
        
    });	
});
