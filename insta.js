$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'https://graph.facebook.com/v12.0/17841450618327569?fields=media.limit(10){caption,media_url,thumbnail_url,permalink,like_count,comments_count,media_type}&access_token=EAAE41fsJaAUBAD6kKKkPxaZBpR4zlLjwxuhw7ELJmJhfgxzeCSVFO84Xgo8iKlt5DT9M0maOBS73GDYHkWd5eua2RwiN0hlthKzghAr22GFWWL9qnul3ZCJZAYg0iVQcrZCBnHnDQ0lvz5DeMTF0rioFU4htqFQHXIWin2uLPeVvgZAcWvEsZB0r4woFo2uwAZD',
        dataType: 'json',
        success: function(json) {
            var ig = json.media.data;
            let instaImage =ig[0].media_url;
            console.log(json);
            let z = 0;
            $('.insta-image').each(function(){
                $(this).attr('src',ig[z].media_url);
                z++;
            });		
        }
    });
});

