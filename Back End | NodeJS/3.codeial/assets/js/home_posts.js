{
    // method to submit the form for new post using ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create/',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data.data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: 'Post Published!',
                        layout: 'topRight',
                        timeout: 1500,
                        type: 'success'
                    }).show();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });

    }

    // method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li class="card p-2 m-2 border-0 shadow" id="post-${post._id}">
        <p>
            
            <span class="fs-3">${post.content}</span>
                <a href="/posts/destroy/${post.id}">
                    <small><button type="button" class="btn btn-danger mx-1 btn-sm delete-post-button"><i class="fas fa-trash-alt"></i></button></small>
                </a>    
            <br>
            <small class="text-secondary">${post.user.name}</small>
        </p>
    
        <div class="post-comments card bg-light p-3 border-0">
                <form action="/comments/create" method="post" class="p-2">
    
                    <div class="input-group mb-3">
                        <input type="text" name="content" class="form-control" placeholder="Type comments here..." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <button class="btn btn-primary" type="submit"><i class="fas fa-angle-right"></i></button>
                    </div>
    
                </form>
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                    
                </ul>
            </div>
        </div>
    </li>`)
    }

    let deletePost = function (deleteLink) {
        console.log("delete link", $(deleteLink));
        $(deleteLink).click(function (e) {
            e.preventDefault();
            console.log("data from delete", $(deleteLink).prop("href"));
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    console.log("data from delete", $(deleteLink).prop('href'));
                    $(`#${deleteLink.prevObject[0].id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}