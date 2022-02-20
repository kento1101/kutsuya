

$(document).ready(function(){

    //ヘッダ−お試し履きカート内商品数の表示

    let pdList = Cookies.get('products_list');
    if(!pdList){
        $('.trial-order-count').text(0);   
        $('.trial-order-count').show();
    }else{
        let test01 = JSON.parse(pdList);
        let trialOrderList = test01.length;        
        $('.trial-order-count').text(trialOrderList);    
        $('.trial-order-count').show();
    }




     //サイズ識別用クラスづけ
    var k = 0;
    $('.fs-c-variationCart__variationName__name').each(function(){
        $(this).addClass('size'+k);
        k++;
    });


     //在庫確認用クラスづけ
    var sk = 0;
        $('.variationCart__variationName__stock').each(function(){
            $(this).addClass('stock'+sk)                          
            sk++;           
        });

    $(".fs-c-variationCart__cartButton--outOfStock").each(function(index){
        $(this).parents("li").addClass("outOfStock")
    });  



    let ww = jQuery('body').width();
    //$('.fs-c-productActionButton').append('<div><a id="js-open" class="js-modal-open float-right" href="">お試し履き</a></div>');
    $('.fs-c-variationList__item__cart li').append('<div><a class="js-modal-open float-right" href="">お試し履き</a></div>');
    $(".outOfStock").find('.js-modal-open').css('background-color','#cccccc');      //品切れ商品の色変え
    $(".outOfStock").find('.js-modal-open').css('pointer-events','none');  //品切れ商品クリック不可に



    $('.fs-c-productNameHeading').append('<div><a class="btn btn-outline-secondary trial-order-index float-right" href="">お試し履きカート</a></div>');

        let productsList = Cookies.get('products_list');


         //値引きラベルがついた商品はお試し履きボタン押せなくする
        let saleCheck= $(".rate-label").find('span').text();
        if(saleCheck.length > 0){                           
            $('.js-modal-open').each(function(){
                $(this).css('pointer-events','none');
                $(this).css('background-color','#cccccc');
            });
        }

    //15000円以上ならだめ
    let productPrice = $(".fs-c-price__value").text();              
    let result =  Number( productPrice.replace(/,/, '') );
        if (result < 15000){
                $('.js-modal-open').each(function(){
                    $(this).css('pointer-events','none');
                    $(this).css('background-color','#cccccc');
                });
        }
    
     //サイズ未選択ならだめ
    let productSizeLive = $('[name=variationSelect]').val().length;     
    if ( productSizeLive < 5){
        $('.js-modal-open').each(function(){
            $(this).css('pointer-events','none');
            $(this).css('background-color','#cccccc');
        });
    }　

     //お試し履きカート内商品数の表示
    if(!productsList){
        $('.trial-order-count').text(0);   
        $('.trial-order-count').show();
    }else{
        let test01 = JSON.parse(productsList);
        let trialOrderList = test01.length;        
        $('.trial-order-count').text(trialOrderList);   
        $('.trial-order-count').show();    
    }

    var i = 1;
        $('.js-modal-open').each(function(){
            $(this).addClass('style'+i);
            i++;
        });
});





$(function() {

//商品削除用ボタン
    $( document ).on( "click", ".trialDelete", function (){
        let btnIndex = $('.trialDelete').index(this);  
        let itemList = Cookies.getJSON('products_list');    
        itemList.splice(btnIndex, 1); 
        Cookies.set('products_list',itemList);  
        $('.products-index').empty();               //商品リストを一度空にする         

        let productsList = Cookies.get('products_list');
        if(!productsList == ""){//Cookieの中にアイテムがあるのか
            let test01 = JSON.parse(productsList);
            if($('.product-content').length == 0){   
                for(var x=0; x<test01.length; x++){                       
                    $(".products-index").append('<div class="d-flex justify-content-around mt-2 product-content" style="border-bottom:solid 1px #ccc"><div class="rc-image"><img alt="商品画像" width="140px" height="105px"></div><div class="product-info" style="line-height: 1;"><p class="font-weight-bold rc-name"></p><div class="d-flex"><p>¥<span class="product-price"></span></p></div><p class="rc-size-wrap">サイズ: <span class="rc-size-name"></span></p><button class="btn trialDelete" href="">削除する</button></div><div class="mt-5 product-select text-center"><a class="text-danger now-buy" style="border:solid 1px #DB5A69;padding:10px 30px 10px 30px;margin:0 auto">いますぐ購入</a></div></div>');                                                               
                }       //for文の閉じタグ 

                //「いますぐ購入」ボタンの追加
                let indexA = 0;
                $('.now-buy').each(function(){
                    let nowName = test01[indexA].name;
                    let url = 'https://rabostar.com/p/search?keyword=' + nowName;
                    let newUrl =url.replace(/ /g, '+');
                    let sinUrl ="location.href='"+newUrl+"’"
                    let Urlww = encodeURI(newUrl);
                    $(this).attr('href',Urlww);
                    indexA++;
                });

                let v = 0;
                $('.product-price').each(function(){
                    $(this).html(test01[v].price);
                    v++;
                });

                let w = 0;
                $('.rc-name').each(function(){
                    $(this).html(test01[w].name);
                    w++;
                });

                let y = 0;
                $('.rc-size-name').each(function(){
                    $(this).html(test01[y].size_name);
                    y++;
                });

                let z = 0;
                $('.rc-image').each(function(){
                    $(this).children('img').attr('src',test01[z].image);
                    z++;
                });
            }
        }
        
        //商品が一つも無いとき
        if($('.product-content').length == 0){   
            $('.item-nothing').show();
            $('.shopping_cont_btn'+'.modal01-btn').css({'width':'310px','margin-left':'30px'});
            $('.js-modal02-open').hide();
            $('.form-content-test').hide();
        }else{
            let ww = jQuery('body').width();
            if(ww >= 750){
                $('.shopping_cont_btn'+'.modal01-btn').css({'width':'100%','margin-left':'0'});
            }
        }

        //お試し履きカート内商品数リロード
        if(!productsList){
            $('.trial-order-count').text(0);   
            $('.trial-order-count').show();
        }else{
            let test01 = JSON.parse(productsList);
            let trialOrderList = test01.length;        
            $('.trial-order-count').text(trialOrderList);    //お試し履きカート内商品数の表示
            $('.trial-order-count').show();
        }
    });
//商品削除ボタン　終了


$(document).on('click', '.header-trial-order', function(){

    $('.form-content-test').hide();
    $('#pageBack2').hide();
    $('.modal01-select-btn').show();
    let productsList = Cookies.get('products_list');
    $('.products-index').hide();
    if(!productsList == ""){
        $('.products-index').show();
        let test01 = JSON.parse(productsList);
        if($('.product-content').length == 0){   
            $('.js-modal02-open').show();
            $('.item-nothing').hide();
            let ww = jQuery('body').width();
            if(ww < 750){
                $('.shopping_cont_btn'+'.modal01-btn').css({'width':'120px','margin-left':'0'});
            }
            //コンテンツがすでにモーダル内においてあるのか
            for(var x=0; x<test01.length; x++){                       
                $(".products-index").append('<div class="d-flex justify-content-around mt-2 product-content" style="border-bottom:solid 1px #ccc"><div class="rc-image"><img alt="商品画像" width="140px" height="105px"></div><div class="product-info" style="line-height: 1;"><p class="font-weight-bold rc-name"></p><div class="d-flex"><p>¥<span class="product-price"></span></p></div><p class="rc-size-wrap">サイズ: <span class="rc-size-name"></span></p><button class="btn trialDelete" href="">削除する</button></div><div class="mt-5 product-select text-center"><a class="text-danger now-buy" style="border:solid 1px #DB5A69;padding:10px 30px 10px 30px;margin:0 auto">いますぐ購入</a></a></div></div>');                                                               
            }       //for文の閉じタグ 

            let indexA = 0;
            $('.now-buy').each(function(){
                let nowName = test01[indexA].name;
                let url = 'https://rabostar.com/p/search?keyword=' + nowName;
                let newUrl =　　　url.replace(/ /g, '+');　　
                let Urlww = encodeURI(newUrl);
                $(this).attr('href',Urlww);
                indexA++;
            });
            
            let v = 0;
            $('.product-price').each(function(){
                $(this).html(test01[v].price);
                v++;
            });

            let w = 0;
            $('.rc-name').each(function(){
                $(this).html(test01[w].name);
                w++;
            });

            let y = 0;
            $('.rc-size-name').each(function(){
                $(this).html(test01[y].size_name);
                y++;
            });

            let z = 0;
            $('.rc-image').each(function(){
                $(this).children('img').attr('src',test01[z].image);
                z++;
            });
        }
    }

    if($('.product-content').length == 0){                    //コンテンツが空
        $('.js-modal02-open').hide();
        $('.item-nothing').show();
        $('.shopping_cont_btn'+'.modal01-btn').css({'width':'310px','margin-left':'30px'});
    }else{
        $('.item-nothing').hide();
        let ww = jQuery('body').width();
        if(ww >= 750){
            $('.shopping_cont_btn'+'.modal01-btn').css({'width':'100%','margin-left':'0'});
        }
        $('.js-modal02-open').show();
        if(ww < 750){
            $('.shopping_cont_btn'+'.modal01-btn').css({'width':'120px','margin-left':'0'});
        }
    }

    $('.modal01').fadeIn();
        $('.modal01-select-btn').fadeIn();
        $('.form-content-test').fadeOut(); 
        return false;         
        $('.js-modal-close').click(function(){
            $('.modal01').fadeOut();
            return false;
        });
});


    //お試し履きカート確認ボタン
    $(".trial-order-index").click(function(){
        $('.form-content-test').hide();
        $('#pageBack2').hide();
        $('.modal01-select-btn').show();
        let productsList = Cookies.get('products_list');
        $('.products-index').hide();
        if(!productsList == ""){
            $('.products-index').show();
            let test01 = JSON.parse(productsList);
            if($('.product-content').length == 0){   
                $('.js-modal02-open').show();
                $('.item-nothing').hide();
                let ww = jQuery('body').width();
                if(ww < 750){
                    $('.shopping_cont_btn'+'.modal01-btn').css({'width':'120px','margin-left':'0'});
                }
                //コンテンツがすでにモーダル内においてあるのか
                for(var x=0; x<test01.length; x++){                       
                    $(".products-index").append('<div class="d-flex justify-content-around mt-2 product-content" style="border-bottom:solid 1px #ccc"><div class="rc-image"><img alt="商品画像" width="140px" height="105px"></div><div class="product-info" style="line-height: 1;"><p class="font-weight-bold rc-name"></p><div class="d-flex"><p>¥<span class="product-price"></span></p></div><p class="rc-size-wrap">サイズ: <span class="rc-size-name"></span></p><button class="btn trialDelete" href="">削除する</button></div><div class="mt-5 product-select text-center"><a class="text-danger now-buy" style="border:solid 1px #DB5A69;padding:10px 30px 10px 30px;margin:0 auto">いますぐ購入</a></div></div>');                                                               
                }       //for文の閉じタグ 
                let indexA = 0;
                $('.now-buy').each(function(){
                    let nowName = test01[indexA].name;
                    let url = 'https://rabostar.com/p/search?keyword=' + nowName;
                    let newUrl =　　　url.replace(/ /g, '+');
                    let Urlww = encodeURI(newUrl);
                    $(this).attr('href',Urlww);
                    indexA++;
                });

                let v = 0;
                $('.product-price').each(function(){
                    $(this).html(test01[v].price);
                    v++;
                });

                let w = 0
                $('.rc-name').each(function(){
                    $(this).html(test01[w].name);
                    w++;
                });

                let y = 0;
                $('.rc-size-name').each(function(){
                    $(this).html(test01[y].size_name);
                    y++;
                });

                let z = 0;
                $('.rc-image').each(function(){
                    $(this).children('img').attr('src',test01[z].image);
                    z++;
                });
            }
        }

        if($('.product-content').length == 0){                    //コンテンツが空
            $('.js-modal02-open').hide();
            $('.item-nothing').show();
            $('.shopping_cont_btn'+'.modal01-btn').css({'width':'310px','margin-left':'30px'});
        }else{
            $('.item-nothing').hide();
            let ww = jQuery('body').width();
            if(ww >= 750){
                $('.shopping_cont_btn'+'.modal01-btn').css({'width':'100%','margin-left':'0'});
            }
            $('.js-modal02-open').show();
            if(ww < 750){
                $('.shopping_cont_btn'+'.modal01-btn').css({'width':'120px','margin-left':'0'});
            }
        }

        $('.modal01').fadeIn();
        $('.modal01-select-btn').fadeIn();
        $('.form-content-test').fadeOut(); 
        return false;     

        $('.js-modal-close').click(function(){
            $('.modal01').fadeOut();
            return false;
        });
    });
});


//お試し履きボタンそれぞれ
$(function() {
    $(".js-modal-open").each(function(index){
        $(this).click(function(){
            let products_id = $(".fs-c-productNumber__number").text(); 
            let products_name = $(".fs-c-productNameHeading__name").text();   
            let products_size_id =  index + 1 ;
            let products_size =$(".size" + index ).text();   
            //let products_size = $('[name=variationSelect]').val().replace('○ ','');  //セレクト
            let products_price = $(".fs-c-price__value").text(); 
            let products_image = $(".fs-c-productMainImage__image").children('img').attr('src');
            let stock_check = $(".stock" + index ).find('span').text();
            if(stock_check.length < 8){                      //在庫確認
                var trialorder_product = {
                    id: products_id,
                    name: products_name,
                    size_id: products_size_id,
                    size_name: products_size,
                    image: products_image,
                    price: products_price,
                }    
                if (Cookies.get("products_list")){//Cookieの中に商品
                    let test01 = Cookies.getJSON('products_list');
                    test01.push(trialorder_product);
                    Cookies.set('products_list',test01);  
                    if($('.product-content').length == 0){            
                        for(var x=0; x<test01.length; x++){                       
                            $(".products-index").append('<div class="d-flex justify-content-around mt-2 product-content" style="border-bottom:solid 1px #ccc"><div class="rc-image"><img alt="商品画像" width="140px" height="105px"></div><div class="product-info" style="line-height: 1;"><p class="font-weight-bold rc-name"></p><div class="d-flex"><p>¥<span class="product-price"></span></p></div><p class="rc-size-wrap">サイズ: <span class="rc-size-name"></span></p><button class="btn trialDelete" href="">削除する</button></div><div class="mt-5 product-select text-center" ><a class="text-danger now-buy" style="border:solid 1px #DB5A69;padding:10px 30px 10px 30px;margin:0 auto">いますぐ購入</a></div></div>');                                                               
                        }      //for文の閉じタグ 
                        let indexA = 0;
                        $('.now-buy').each(function(){
                            let nowName = test01[indexA].name;
                            let url = 'https://rabostar.com/p/search?keyword=' + nowName;
                            let newUrl =　　　url.replace(/ /g, '+');
                            let Urlww = encodeURI(newUrl);
                            $(this).attr('href',Urlww);
                            indexA++;
                        });

                        let v = 0;
                        $('.product-price').each(function(){
                            $(this).html(test01[v].price);
                            v++;
                        });
                    
                        let w = 0
                        $('.rc-name').each(function(){
                            $(this).html(test01[w].name);
                            w++;
                        });

                        let y = 0;
                        $('.rc-size-name').each(function(){
                            $(this).html(test01[y].size_name);
                            y++;
                        });

                        let z = 0;
                        $('.rc-image').each(function(){
                            $(this).children('img').attr('src',test01[z].image);
                            z++;
                        });
                    }else{
                        $(".products-index").append('<div class="d-flex justify-content-around mt-2 product-content" style="border-bottom:solid 1px #ccc"><div class="rc-image"><img alt="商品画像" width="140px" height="105px"></div><div class="product-info" style="line-height: 1;"><p class="font-weight-bold rc-name"></p><div class="d-flex"><p>¥<span class="product-price"></span></p></div><p class="rc-size-wrap">サイズ: <span class="rc-size-name"></span></p><button class="btn trialDelete" href="">削除する</button></div><div class="mt-5 product-select text-center" ><a class="now-buy"><button class="text-danger" style="border:solid 1px #DB5A69;padding:10px 30px 10px 30px;margin:0 auto">いますぐ購入</button></a></div></div>');  
                        $('.rc-name').eq(-1).html(test01.slice(-1)[0].name);
                        $('.product-price').eq(-1).html(test01.slice(-1)[0].price);      
                        $('.rc-size-name').eq(-1).html(test01.slice(-1)[0].size_name);                 
                        $('.rc-image').eq(-1).children('img').attr('src',test01.slice(-1)[0].image);
                    }
                }else{
                    let products_list =[];
                    products_list.push(trialorder_product);
                    Cookies.set('products_list',products_list);
                }

                $('.form-content-test').hide();
                $('.modal01-select-btn').show();
                $('#pageBack2').hide();
                let productsList = Cookies.get('products_list');
                $('.products-index').hide();
                if(!productsList == ""){
                    $('.products-index').show();
                    let test01 = JSON.parse(productsList);
                    if($('.product-content').length == 0){
                        for(var x=0; x<test01.length; x++){   
                            $(".products-index").append('<div class="d-flex justify-content-around mt-2 product-content" style="border-bottom:solid 1px #ccc"><div class="rc-image"><img alt="商品画像" width="140px" height="105px"></div><div class="product-info" style="line-height: 1;"><p class="font-weight-bold rc-name"></p><div class="d-flex"><p>¥<span class="product-price"></span></p></div><p class="rc-size-wrap">サイズ: <span class="rc-size-name"></span></p><button class="btn trialDelete" href="">削除する</button></div><div class="mt-5 product-select text-center" ><a class="text-danger now-buy" style="border:solid 1px #DB5A69;padding:10px 30px 10px 30px;margin:0 auto">いますぐ購入</a></div></div>');                                                              
                        }       //for文の閉じタグ 
                        let indexA = 0;
                        $('.now-buy').each(function(){
                            let nowName = test01[indexA].name;
                            let url = 'https://rabostar.com/p/search?keyword=' + nowName;
                            let newUrl =　　　url.replace(/ /g, '+');
                            let Urlww = encodeURI(newUrl);
                            $(this).attr('href',Urlww);
                            indexA++;
                        });

                        let v = 0;
                        $('.product-price').each(function(){
                            $(this).html(test01[v].price);
                            v++;
                        });
                    
                        let w = 0
                        $('.rc-name').each(function(){
                            $(this).html(test01[w].name);
                            w++;
                        });

                        let y = 0;
                        $('.rc-size-name').each(function(){
                            $(this).html(test01[y].size_name);
                            y++;
                        });

                        let z = 0;
                        $('.rc-image').each(function(){
                            $(this).children('img').attr('src',test01[z].image);
                            z++;
                        });
                    }
                }

                if($('.product-content').length == 0){                    //コンテンツが空のとき
                    $('.js-modal02-open').hide();
                    $('.item-nothing').show();
                    $('.shopping_cont_btn'+'.modal01-btn').css({'width':'310px','margin-left':'30px'});
                }else{
                    $('.item-nothing').hide();
                    let ww = jQuery('body').width();
                    if(ww >= 750){
                        $('.shopping_cont_btn'+'.modal01-btn').css({'width':'100%','margin-left':'0'});
                    }
                    $('.js-modal02-open').show();
                    if(ww < 750){
                        $('.shopping_cont_btn'+'.modal01-btn').css({'width':'120px','margin-left':'0'});
                    }
                }

                if(!productsList){
                    $('.trial-order-count').text(0);   
                    $('.trial-order-count').show();
                }else{
                    let test01 = JSON.parse(productsList);
                    let trialOrderList = test01.length;        
                    $('.trial-order-count').text(trialOrderList);    //お試し履きカート内商品数の表示
                    $('.trial-order-count').show();
                }
                $('.modal01').fadeIn();
            }                                   //在庫確認　閉じタグ
            return false;　　　　　　　　　　　　　　　//在庫なしのときページを読み込まないように

            $('.js-modal-close').click(function(){
                $('.modal01').fadeOut();
                $('.products-index').remove();
                return false;
            });
        });
    });
});


    
//お試し履き_申し込みフォーム（メールアドレス確認）
$('.js-modal02-open').click(function(){
    let productsList = Cookies.getJSON("products_list")
    if (!productsList.length == 0) {
        $('.modal01-select-btn').fadeOut();
        $('.form-content-test').fadeIn();
        $('.validation-message').fadeOut();
        $('#pageBack2').fadeIn();
        return false;     
    }else {
        alert("商品が選択されていません");
    }
});


$('.js-modal02-close').click(function(){
    $('.modal01').fadeOut();
    return false;
});

$('#pageBack2').click(function(){
    $(this).fadeOut();
    $('.form-content-test').fadeOut();
    $('.modal01-select-btn').fadeIn();
    return false;
});           

$('[name="btn"]:radio').change( function() {
    if($('[id=a]').prop('checked')){
        $('.question').fadeOut();
        $('.message02').fadeOut();
        $('.message01').fadeIn();
    } 
    if($('[id=b]').prop('checked')){
        $('.message01').fadeOut();
        $('.question').fadeIn();
    } 
});

$('[name="btn02"]:radio').change( function() {
    if($('[id=c]').prop('checked')){
        $('.message02').fadeIn();
    } 
    if($('[id=d]').prop('checked')){
        $('.message02').fadeOut();
    } 
});

$('#checkButton').click(function(){
    let cookieSave = $("#cookie-save").prop("checked")      //アドレス保存するか
    if(cookieSave == true){
        Cookies.set('mailSave',1);  
    }else{
        Cookies.set('mailSave',0);  
    }

    if($('[id=b]').prop('checked') && $('[id=d]').prop('checked')) {
        $('.change_email').hide();
    }

    if($('[id=a]').prop('checked') || $('[id=c]').prop('checked')) {
        $('.change_email').show();
    }

    let emailText = $("#email").val();
    let encodeEmail = encodeURIComponent(emailText);

    if(emailText == ""){//emailが未入力のとき
        $('#validation01').fadeIn();
    }else if (!emailText.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){//emailの形式が適切じゃないとき
        $('#validation02').fadeIn();
    }else if(emailText){
        Cookies.set ('user-email',emailText);
        $("#overlay").fadeIn(300);　
        $.ajax({
            type: "GET",
            url: "https://rabostar.com/otameshi/wp-json/acf/v3/customer?customer_mail="+ encodeEmail,
            headers: {
                "Authorization": "Basic cmFib3N0YXJfb3RhbWVzaGk6UHNjRCBBenpCIFdDRmQgUVN5YiBwcG1nIGN3dTQ="
            },
            data: { 
                "trialorder_customer_email" : encodeEmail           
            },
            dataType : "json"
        }).done(function(data) {
            setTimeout(function(){
                $("#overlay").fadeOut(300);
            },500);
            console.log(data);
            let productsList = Cookies.get('products_list');
            let test01 = JSON.parse(productsList);
            if(test01.length > 2 && data.length == 0){//商品が3点以上　かつ、利用実績ない場合
                $('.modal03').fadeIn();                   
                return false;
            } else {
                if(data.length > 0){ 
                    let customerId = data[0]["acf"]["id_customer"];
                    let customerName = data[0]["acf"]["customer_name"];
                    let customerPost = data[0]["acf"]["customer_post"];
                    let customerPref = data[0]["acf"]["customer_pref"];
                    let customerPrefCity = data[0]["acf"]["customer_pref_city"];
                    let customerStreet = data[0]["acf"]["customer_street_building"];
                    let customerTel = data[0]["acf"]["customer_tel"];
                    Cookies.set ('trialorder_id_customer',customerId);
                    Cookies.set ('customer_name',customerName);
                    Cookies.set ('customer_post',customerPost);
                    Cookies.set ('customer_pref',customerPref);
                    Cookies.set ('customer_pref_city',customerPrefCity);
                    Cookies.set ('customer_street',customerStreet);
                    Cookies.set ('customer_tel',customerTel);
                    $('.input-customer-info').show();   
                } else {
                    Cookies.set ('trialorder_id_customer',null);
                    $('.change_email').hide();
                    $('.input-customer-info').hide();   
                }      
                    let UserName = Cookies.get('customer_name');
                    $('#family_name').val([UserName]);
                    let UserEmail =Cookies.get('user-email');
                    $("#sample_email").html(UserEmail);
                    let UserPost = Cookies.get('customer_post');
                    $('#postal_code input').val([UserPost]);
                    let UserPref= Cookies.get('customer_pref');
                    let UserPrefCity = Cookies.get('customer_pref_city');
                    $('#address_level1').val([UserPref]);     
                    let UserStreet = Cookies.get('customer_street');
                    $('#address_level2').val([UserPrefCity]+[UserStreet]);
                    let UserTel =Cookies.get('customer_tel');
                    $("#phone_number").val(UserTel);

                    console.log(UserName);
                    console.log(UserEmail);
                    console.log(UserPost);
                    console.log(UserPref);
                    console.log(UserPrefCity);
                    console.log(UserStreet);
                    $('.modal04').fadeIn();
                    return false;
            }
        }).fail(function(XMLHttpRequest, status, e){
            console.log(e);
        });
    }else{
        $('#validation01').fadeIn();
    }
});

//お試し履き_申し込みフォーム（メールアドレス確認）エラー
$('.js-modal03-close').click(function(){    
    $('.modal03').fadeOut();
    return false;
});

$('.js-modal-close').click(function(){
    $('.modal01').fadeOut();
    return false;
});

//お試し履き_申し込みフォーム – その他個人情報入力
$('.js-modal04-open').click(function(){  
    $('.validation-message').fadeOut();  
    let UserEmail =Cookies.get('user-email');
    $("#sample_email").html(UserEmail);
    $('.modal04').fadeIn();
    $('.modal__content').css({'overflow-x':'hidden','overflow-y':'scroll'});
    return false;
});
                    
$('.js-modal04-close').click(function(){
    $('.modal01').fadeOut();
    $('.modal02').fadeOut();
    $('.modal04').fadeOut();
    　　return false;
});

$('#pageBack4').click(function(){
    $('.modal04').fadeOut();
    return false;
});  

//お試し履き_申し込みフォーム – 入力内容確認
$('#confirmButton').click(function(){   
    let productsList = Cookies.get('products_list');
    let test05 = JSON.parse(productsList);
    for(var x=0; x<test05.length; x++){                       
        $(".check-trial-products").append('<div class="d-flex justify-content-around mt-2 product-content05"><div class="rc-image05"><img alt="商品画像" width="140px" height="105px"></div><div class="product-info" style="line-height: 1;"><p class="font-weight-bold rc-name05"></p><div class="d-flex"><p>¥<span class="product-price05"></span></p></div><p class="rc-size-wrap">サイズ: <span class="rc-size-name05"></span></p></div></div>');                                                               
    }       //for文の閉じタグ 

    let v = 0;
    $('.product-price05').each(function(){              
        $(this).html(test05[v].price);
        v++;
    });

    let w = 0; 
    $('.rc-name05').each(function(){
        $(this).html(test05[w].name);
        w++;
    });

    let y = 0;
    $('.rc-size-name05').each(function(){
        $(this).html(test05[y].size_name);
        y++;
    });

    let z = 0;
    $('.rc-image05').each(function(){
        $(this).children('img').attr('src',test05[z].image);
        z++;
    });
    let changeEmail = $("#change_email").val();        
    let familyNameText = $("#family_name").val();
    let phoneNumberText = $("#phone_number").val();
    let postalCodeText = $('#postal_code input').val();
    let address1Text = $("#address_level1").val();
    let address2Text = $("#address_level2").val();

    if(changeEmail){
        Cookies.set ('user-email',changeEmail);
    }
    if(familyNameText =="" || phoneNumberText =="" || !phoneNumberText.match(/^\d*$/) || postalCodeText =="" || !postalCodeText.match(/^\d*$/) || address1Text ==""){
        if(!changeEmail == "" && !changeEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            $('#validation03').fadeIn();
        }
        if(familyNameText ==""){
            $('#validation04').fadeIn();
        }
        if(phoneNumberText =="") {
            $('#validation05').fadeIn();     
        }
        if(!phoneNumberText.match(/^\d*$/)){
            $('#validation06').fadeIn();
        }
        if(postalCodeText =="") {
            $('#validation07').fadeIn();
        }
        if(!postalCodeText.match(/^\d*$/)){
            $('#validation08').fadeIn();
        }
        if(address1Text =="") {
            $('#validation09').fadeIn();
        }
        $('.check-trial-products').empty();
    }else{
        Cookies.set ('family-name',familyNameText);
        Cookies.set ('phone-number',phoneNumberText);
        Cookies.set ('postal-code',postalCodeText);
        Cookies.set ('address01',address1Text);
        Cookies.set ('address02',address2Text);

        let getEmail = Cookies.get('user-email');
        let getFamilyName = Cookies.get('family-name');
        let getPhoneNumber = Cookies.get('phone-number');
        let getPostalCode = Cookies.get('postal-code');
        let getAddress1 = Cookies.get('address01');
        let getAddress2 = Cookies.get('address02');
        $("#user_email").html(getEmail);
        $("#user_name").html(getFamilyName);
        $("#user_phone_number").html(getPhoneNumber);
        $("#user_postal_code").html(getPostalCode);
        $("#user_address1").html(getAddress1);
        $("#user_address2").html(getAddress2);
        $('.modal05').fadeIn();     
        return false;
    }
});
            
$('.js-modal05-close').click(function(){
    $('.check-trial-products').empty();
    $('.modal01').fadeOut();
    $('.modal02').fadeOut();
    $('.modal04').fadeOut();
    $('.modal05').fadeOut();
    return false;
});

$('#pageBack5').click(function(){
    $('.check-trial-products').empty();
    $('.modal05').fadeOut();
    return false;
});


//お試し履き_申し込みフォーム – 申し込み完了
$('.js-modal06-open').click(function(){
    let getEmail = Cookies.get('user-email');
    let getFamilyName = Cookies.get('family-name');
    let getPhoneNumber = Cookies.get('phone-number');
    let getPostalCode = Cookies.get('postal-code');
    let getAddress1 = Cookies.get('address01');
    let getAddress2 = Cookies.get('address02');
    let getCustomerId = Cookies.get('trialorder_id_customer');
    let productsList = Cookies.get('products_list');
    let test01 = JSON.parse(productsList);    
    var getProducts = {
    "products":test01
    };
    let test02 = JSON.stringify(getProducts);
        $("#overlay").fadeIn(300);　
        $.ajax({
            type: "POST",
            url: "https://rabostar.com/otameshi/wp-json/wp/v2/trialorder",
            headers: {
                "Authorization": "Basic cmFib3N0YXJfb3RhbWVzaGk6UHNjRCBBenpCIFdDRmQgUVN5YiBwcG1nIGN3dTQ="
            },
            dataType : "json",
            data: { 
                "trialorder_id_customer" : getCustomerId,           
                "trialorder_customer_name" :getFamilyName,
                "trialorder_products" : test02,
                "trialorder_mail" : getEmail,
                "trialorder_tel" : getPhoneNumber,
                "trialorder_postcode" : getPostalCode,
                "trialorder_pref_city" : getAddress1,
                "trialorder_street_building" : getAddress2,
                "status" : "publish",
            },
        }).done(function(data) {
            setTimeout(function(){
                $("#overlay").fadeOut(300);
            },500);
            console.log("成功しました");
        }).fail(function(XMLHttpRequest, status, e){
            console.log(e);
        });
        $('.modal06').fadeIn();
        return false;
    });
    
    $('.js-modal06-close').click(function(){
        let getMailSave = Cookies.get('mailSave');
        if(getMailSave != 1){
            Cookies.set ('user-email',"");
        }
        Cookies.set ('family-name',"");
        Cookies.set ('given-name',"");
        Cookies.set ('phone-number',"");
        Cookies.set ('customer_tel',"");
        Cookies.set ('postal-code',"");
        Cookies.set ('address01',"");
        Cookies.set ('address02',"");
        Cookies.set ('customer_street',"");
        Cookies.set ('customer_post',"");
        Cookies.set ('customer_name',"");
        Cookies.set ('customer_pref_city',"");
        Cookies.set ('products_list',"");
        Cookies.set('trialorder_id_customer',"");
        $('.products-index').empty();
        $('.check-trial-products').empty();
        $("#email").val('');
        $(".change_email").val('');
        $("#family_name").val('');
        $("#phone_number").val('');
        $("#postal_code").children('input').val('');
        $("#address_level1").val('');
        $("#address_level2").val('');
        $(".inputBtn").attr("checked",false);
        $('input[type="radio"]').prop('checked', false);
        $('.modal06').fadeOut();
        $('.modal05').fadeOut();
        $('.modal04').fadeOut();
        $('.modal03').fadeOut();　
        $('.modal02').fadeOut();
        $('.modal01').fadeOut();
        $('.trial-order-count').text(0);   
        $('.trial-order-count').show();
        return false;
    });