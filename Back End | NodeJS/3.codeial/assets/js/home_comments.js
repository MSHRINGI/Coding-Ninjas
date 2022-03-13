{
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');
        $(newCommentForm).submit(function (e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    console.log(data.data);
                },
                error: function(error){
                    console.log(error);
                }
            })
        })
    }


    createComment();
}