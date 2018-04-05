let current=1;
let total=null;
let data=null;
let currentData=null;
function getData(){
  $.ajax({
    url:'json/data.json',
    type:'get',
    dataType:'json',
    success:function(res){
      total=Math.ceil((res.length)/5);
      res.sort(function(a,b){
        return b.number-a.number
      });
      res.forEach(function(item,index){
        item.rank=index+1;
      });
      let current=1;
      data=res;
      getLogoList()
    },
    error:function(error){
      console.log(error);
    }
  });
}
getData();
function getLogoList(){
  let str='';
  currentData=data.slice(current*5-5,current*5);
  currentData.forEach(function(item){
    str+=`<li class="li2 clear">
                       <span>
                       <img src=${item.image} alt="">
                   </span>
                       <span>${item.number}</span>
                       <span>${item.rank}</span>
                    </li>`
  });
  $('.ul2').html(str);
  $('.total').html(total);
  $('.current').html(current);
  if(current===1){
    $('.ul2>li:nth-child(1)>span:nth-child(3)').addClass('first');
    $('.ul2>li:nth-child(2)>span:nth-child(3)').addClass('second');
    $('.ul2>li:nth-child(3)>span:nth-child(3)').addClass('third');
    $('.prev-page').css('color','rgba(120,77,210,.41)')
  }else{
    $('.prev-page').css('color','#ffffff')
  };
  if(current===total){
    $('.next-page').css('color','rgba(120,77,210,.41)')
  }else{
    $('.next-page').css('color','#ffffff')
  }
}
function changePage(i){
  current=current+i;
  getLogoList();
}
$('.next-page').click(()=>{
  if(current<total){
    changePage(1);
  }
});
$('.prev-page').click(()=>{
  if(current>1&&current<=total){
    changePage(-1);
  }
});
$('.lit-up').click(function(){
  $('.bullet1').css('display','block')
});
$('.back').click(function(){
  $(this).parent().css('display','none')
});
$('.go-bullet2').click(function(){
  $('.bullet1').css('display','none');
  $('.bullet2').css('display','block');
});
$('.logo-list>li').click(function(){
  getQuestion()
  $('.bullet1').css('display','none');
  $('.bullet3').css('display','block');
});
$('.go-bullet3').click(function(){
  getQuestion();
  $('.bullet2').css('display','none');
  $('.bullet3').css('display','block');
});
function getQuestion(){
  console.log(1);
  $.ajax({
    url:'json/topic.json',
    type:'get',
    dataType:'json',
    success:function(res){
      let math=Math.round(Math.random()*(res.length-1));
      let str1='';
      let data=res[math];
      str1+=`<p class="topic-question">${data.question}</p>`;
      eval(data.answer).forEach(item=>str1+=`<div>
                            <input type="radio" name="answer" value=${item}>${item}</div>`);
      str1+=`<div class="go-bullet4">确认</div>
                        <div class="raiders">
                            查看答题攻略
                            <div class="hide-raiders">
                                <p>答题攻略</p>
                                <p>${data.raiders}</p>
                            </div>
                        </div>`;
      $('.topic-content').html(str1);
      $('.go-bullet4').click(function(){
        $('.bullet3').css('display','none');
        $('.bullet4').css('display','block');
      })
    },
    error:function(error){
      console.log(error);
    }
  });
}
window.setInterval(function(){
  getData();
},60*1000);