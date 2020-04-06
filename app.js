var total_data=[];

function show(country){
		//spinner show
		// $(window).scrollTop(0);
		$('html, body').animate({scrollTop:0}, 'slow');
		var vv= document.getElementById("myChart").getAttribute("height");
 		//console.log(vv+"px");
 		vv=vv+"px";
		var xx=document.querySelector("#spinner1");
		xx.style.display="block";
		xx.style.height=vv;
		var kk= document.getElementById("myChart");
		kk.style.display="none";
		history(country);
	}

const merge = () => {
		

		document.querySelector(".table_body").innerHTML='';

		var arr=[];
		arr=total_data;


		for(let i=0;i<arr.length;i++){
			//console.log(arr[i]);
		let country=arr[i].country;
		let new_cases=arr[i].new_cases;
		let active=arr[i].active;
		let critical=arr[i].critical;
		let recovered=arr[i].recovered;
		let total_cases=arr[i].total_cases;
		let new_deaths=arr[i].new_deaths;
		let total_deaths=arr[i].total_deaths;

		if(new_cases==null)
			new_cases=0;
		if(new_deaths==null)
			new_deaths=0;

		

		var list=`<tr class="table_row" onclick="show('${country}')">
      <td class="country point">${country}</td>
      <td class="point">${new_cases}</td>
      
      <td class="point">${recovered}</td>
      <td class="point">${total_cases}</td>
      
      <td class="point">${total_deaths}</td>
    </tr>`

    var p = document.querySelector(".table_body");
    p.innerHTML+=list;


	}
}







function graph(data,country){

var arr=[];
arr=data.response;

console.log(arr);

var active=[];
var timer=[];

let map = new Map();
for(let i=0;i<arr.length;i++){
	//active.push(arr[i].cases.total);
	//timer.push(arr[i].time);
	if(!map.has(arr[i].day)){
		map.set(arr[i].day,arr[i].cases.total);
		active.push(arr[i].cases.total);
		timer.push(arr[i].day);
	}
}
active.reverse();
timer.reverse();

if(country==="World" || country==="All")
	country="Global";

    massPopChart.data.datasets[0].data=active;
    massPopChart.data.labels=timer;
    massPopChart.options.title.text=country;
    massPopChart.update();

    // spinner hide
    var xx=document.querySelector("#spinner1");
		xx.style.display="none";
    var kk= document.getElementById("myChart");

	kk.style.display="block";


}




function getData(data){

	var arr=[];
	arr=data.response;

for(let i=0;i<arr.length;i++){

		let country=arr[i].country;
		if(country=="World")
			continue;
		let new_cases=arr[i].cases.new;
		let active=arr[i].cases.active;
		let critical=arr[i].cases.critical;
		let recovered=arr[i].cases.recovered;
		let total_cases=arr[i].cases.total;
		let new_deaths=arr[i].deaths.new;
		let total_deaths=arr[i].deaths.total;

		if(new_cases==null)
			new_cases=0;
		if(new_deaths==null)
			new_deaths=0;

		total_data.push({country,new_cases,active,critical,recovered,total_cases,new_deaths,total_deaths});

		var list=`<tr class="table_row" onclick="show('${country}')">
      <td class="country point">${country}</td>
      <td class="point">${new_cases}</td>
      <td class="point">${recovered}</td>
      <td class="point">${total_cases}</td>
      <td class="point">${total_deaths}</td>
    </tr>`

    var x = document.querySelector(".table_body");
    x.innerHTML+=list;


	}
	//console.log(document.querySelector('.table-fixed'));
	document.querySelector('.table-fixed').style.display="table";
	//console.log(total_data);
	

   // $('#table_id').DataTable();

   
    oTable = $('#table_id').DataTable({
    	responsive: true,
    	//sDom: 'lrtip'
    	"order": [[ 4, "desc" ]],
    	"oLanguage": { "sSearch": "" } 
    });
   // console.log($("label"));

  

    document.getElementsByTagName("INPUT")[0].classList.add("form-control");
   document.getElementsByTagName("INPUT")[0].classList.add("form-control-sm");
   document.getElementsByTagName("INPUT")[0].setAttribute("placeholder", "Search...");

    //var $label = document.getElementsByTagName("INPUT")[0].closest("label");
//$label.replaceWith(document.getElementsByTagName("INPUT")[0]);
//console.log(document.getElementsByTagName("INPUT")[0]);
/*oTable.columns().iterator( 'column', function (ctx, idx) {
    $( oTable.column(idx).header() ).append('<span class="sort-icon"/>');
  } );*/

    $('#myInput').keyup(function(){
      oTable.search($(this).val()).draw();
});
   
}





async function c(){

	const p = await fetch("https://covid-193.p.rapidapi.com/statistics", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "8mj1OjTN4UmshJx0GSBzBPEtHYsNp1whbGWjsnzcCWsdWYbMY4"
	}
});
	const x = await p.json();
	//console.log(x);
	getData(x);
	

	


		/*var column = "total_deaths";
		var order = "desc";
		

		if(order == 'desc'){
			
			document.getElementsByTagName("TH")[7].setAttribute("data-order","asc");
			total_data = total_data.sort((a,b) => a[column] < b[column] ? 1 : -1)
			

		}
		
		merge();*/






	/*$('th').on('click', function(){
		
		
		var column = $(this).data('column');
		var order = $(this).data('order');
		var text = $(this).html();
		

		if(order == 'desc'){
			$(this).data('order', "asc");
			if(column=="country")
				total_data = total_data.sort((a,b) => a[column] < b[column] ? 1 : -1);
			else
			total_data = total_data.sort((a,b) => parseInt(a[column]) < parseInt(b[column]) ? 1 : -1);
			//text += '&#9660'

		}else{
			$(this).data('order', "desc");
			if(column=="country")
				total_data = total_data.sort((a,b) => a[column] > b[column] ? 1 : -1);
			else
			total_data = total_data.sort((a,b) => parseInt(a[column]) > parseInt(b[column]) ? 1 : -1);
			

		}
		
		merge();
		
	})*/


}
c();

async function first(){

	var xx=document.querySelector("#spinner1");
	console.log(xx);
	xx.style.display="block";
	//console.log(6);
	//xx.style.display="block";
	const p = await fetch(`https://covid-193.p.rapidapi.com/history?country=All`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "8mj1OjTN4UmshJx0GSBzBPEtHYsNp1whbGWjsnzcCWsdWYbMY4"
	}
});
	const x = await p.json();
	console.log(x);
	fchart(x);
	var kk= document.getElementById("myChart");
	console.log(kk);
	kk.style.display="block";
   //document.getElementsById("spinner").style.display="none";
   xx.style.display="none";
}
 //var vv=document.getElementById("myChart").getAttribute("height");
 //document.querySelector("#spinner1").setAttribute(name: DOMString, value: DOMString)
 //var vv= document.getElementById("myChart");
 //console.log(vv); 

first("All");




async function history(country){

	const p = await fetch(`https://covid-193.p.rapidapi.com/history?country=${country}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "8mj1OjTN4UmshJx0GSBzBPEtHYsNp1whbGWjsnzcCWsdWYbMY4"
	}
});
	const x = await p.json();
	//console.log(x);
	graph(x,country);
	
}



$(document).ready(function(){
  $("#myInput").on("keyup", function() {


            /*scrollTop =  
              window.pageYOffset || document.documentElement.scrollTop; 
            scrollLeft =  
              window.pageXOffset || document.documentElement.scrollLeft, 
  
                
                window.onscroll = function() { 
                    window.scrollTo(scrollLeft, scrollTop); 
                }; */


    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

