$(function() {
    // Event handler for fetching user data when button is clicked
    $("#fetchUserData").click(function() {
        var userId = $("#userId").val();

        // Fetch user details
        $.get('https://jsonplaceholder.typicode.com/users/' + userId, function(user) {
            $("#userInfo").html(`
                <h2>${user.name}</h2>
                <p>Email: ${user.email}</p>
                <p>Address: ${user.address.street}, ${user.address.city}</p>
            `);
        });

        // Fetch posts for the user
        $.get('https://jsonplaceholder.typicode.com/posts', { userId: userId }, function(posts) {
            var postsHtml = "<h3>User Posts:</h3><ul>";
            posts.forEach(function(post) {
                postsHtml += `
                    <li>
                        <h4>${post.title}</h4>
                        <p>${post.body}</p>
                        <button class="showComments" data-post-id="${post.id}">Show Comments</button>
                        <div class="comments" id="comments-${post.id}"></div>
                    </li>
                `;
            });
            postsHtml += "</ul>";
            $("#posts").html(postsHtml);

            // Attach click event to 'Show Comments' buttons
            $(".showComments").click(function() {
                var postId = $(this).data("post-id");
                var commentsDiv = $("#comments-" + postId);

                // Fetch comments for the post
                $.get('https://jsonplaceholder.typicode.com/comments', { postId: postId }, function(comments) {
                    var commentsHtml = "<ul>";
                    comments.forEach(function(comment) {
                        commentsHtml += `<li><strong>${comment.name}</strong>: ${comment.body}</li>`;
                    });
                    commentsHtml += "</ul>";
                    commentsDiv.html(commentsHtml);  // Display comments under the post
                });
            });
        });
    });
});
