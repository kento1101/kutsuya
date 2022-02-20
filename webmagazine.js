$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'https://rabostar.com/magazine/wp-json/wp/v2/posts?per_page=8&_embed',
        dataType: 'json',
    })
    .done(function (json) {    
        let mn = 1;
        $('.magazine-image').each(function(){
            let magazineImage = json[mn]._embedded['wp:featuredmedia'][0]['media_details']['sizes']['medium']['source_url']
            console.log(magazineImage);
            $(this).attr('src',magazineImage);
            mn++;
        });	
        let mt = 1;
        $('.magazine-title').each(function(){
            let magazineTitle = json[mt].title.rendered
            $(this).text(magazineTitle);
            mt++;
        });	
        let ml = 1;
        $('.magazine-link').each(function(){
            let magazineLink = json[ml].link
            console.log(magazineLink);
            $(this).attr('href',magazineLink);
            ml++;
        });
    })
    .fail(function (json) {
        console.error('WordPressのブログ記事取得に失敗しました。');        
    });
});
