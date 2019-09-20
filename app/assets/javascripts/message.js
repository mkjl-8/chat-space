$(function(){

  var buildHTML = function(message) {
    var image = message.image ? `<img src= ${message.image.url}  class="lower-message__image" >`:"";
    var content = message.content ?  `<p class= "lower-message__content"> ${message.content}</p>` :"";

    //data-idが反映されるようにしてい
    var html = `<div class="message" data-id= ${message.id} >
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
          ${message.created_at}
        </div>
      </div>
      <div class="lower-message">
        ${content}
      </div>
      ${image}
    </div>`
    
    return html;
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__messages').append(html);
      $('.main__messages').animate({scrollTop: $('.main__messages')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
    })
      .fail(function(){
        alert('error');
      });
      return false;
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id =  $('.message').last().data("id");
      
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message){
          console.log(message)
          //メッセージが入ったHTMLを取得
          insertHTML = buildHTML(message)
          //メッセージを追加
          $('.main__messages').append(insertHTML);
          $('.main__messages').animate({scrollTop: $('.main__messages')[0].scrollHeight}, 'fast');   
        })
      })
      .fail(function() {
        console.log('error');
      })
    }
  };
  setInterval(reloadMessages, 5000);
});