$(function(){
  
  function appendUser(user_name, user_id){
    var html = 
            `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${ user_name }</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= ${user_id} data-user-name= ${user_name}>追加</div>
            </div>`;
            $('#user-search-result').append(html);
  }
  function appendErrMsgToHTML(user_name, user_id){
    var html = 
            `<div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value= ${user_id}>
              <p class='chat-group-user__name'>${user_name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id= ${user_id} data-user-name= ${user_name}>削除</div>
            </div>`;
            $('#user-search-member').append(html);
  }

  $(document).on('click', '.user-search-add', function(){ 
    var name = $(this).data("user-name")
    var id = $(this).data("user-id")
    $(this).parent().remove();
    appendErrMsgToHTML(name,id)
  }); 

  $(document).on('click', '.user-search-remove', function(){ 
    var name = $(this).data("user-name")
    var id = $(this).data("user-id")
    $(this).parent().remove();
    appendUser(name,id)
  }); 

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { demo: input },
      dataType: 'json'
    })
    .done(function(users){
      $("").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user.name, user.id);
        });
      }else {
        appendErrMsgToHTML("ユーザーが見つかりません");
      }
    });
  });
});