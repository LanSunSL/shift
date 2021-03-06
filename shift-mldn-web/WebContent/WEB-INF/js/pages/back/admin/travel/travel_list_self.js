$(function(){
	$("span[id^=showBtn-]").each(function(){
		$(this).on("click",function(){
			initModal();
			tid = this.id.split("-")[1] ;
			console.log("差旅编号：" + tid) ;
			//details
			$.post("pages/back/admin/travel/details.action", {"tid" : tid}, function(data) {
				console.log(data);
				$("#title").text(data.travel.title);
				$("#item").text(data.item);
				$("#allPrice").text("￥" + data.travel.total);
				$("#ecount").text(data.travel.ecount);
				$("#subdate").text(new Date(data.travel.subdate.time).format("yyyy-MM-dd"));
				$("#sdate").text(new Date(data.travel.sdate.time).format("yyyy-MM-dd"));
				$("#edate").text(new Date(data.travel.edate.time).format("yyyy-MM-dd"));
				$("#dest").text(data.travel.dest);
				$("#allCount").text(data.travel.ecount);
				$("#allPrice2").text(data.travel.total); 
				for(i = 0; i < data.emps.length; i++) {
					var str = 
						"<tr>" + 
						"	<td class='text-center'>" + 
						"		<img src='upload/member/" + data.emps[i].a.photo + "' style='width:20px;'/> " + 
						"	</td>" + 
						"	<td class='text-center'><span id='eid-" + data.emps[i].a.eid + "' style='cursor:pointer;'>" + data.emps[i].a.ename + "</span></td>" + 
						"	<td class='text-center'>" + data.emps[i].a.phone + "</td>" + 
						"	<td class='text-center'>￥" + data.emps[i].a.sal + "</td>" + 
						"	<td class='text-center'>" + data.emps[i].b + "</td>" + 
						"	<td class='text-center'>" + new Date(data.emps[i].a.hiredate.time).format("yyyy-MM-dd") + "</td>" + 
						"	<td class='text-center'>" + data.emps[i].c + "</td>" + 
						"</tr> ";
					$("#contentOne table tbody").append(str);  
				}
				for(i = 0; i < data.costs.length; i++) {
					var str = 
						"<tr>" + 
						"	<td class='text-center'>" + data.costs[i].b + "</td>" + 
						"	<td class='text-center'>￥<span id='price-1'>" + data.costs[i].a.price + "</span></td>" + 
						"	<td class='text-center'>" + data.costs[i].a.title + "</td>" + 
						"</tr> ";
					$("#contentTwo table tbody").append(str);  
				}
			}, "json");
			$("#travelInfo").modal("toggle") ;
		}) ;
	}) ;
	$("a[id^=delBut-]").each(function(){
		$(this).on("click",function(){
			tid = this.id.split("-")[1] ;
			console.log("差旅编号：" + tid) ;
			if(window.confirm("确定要删除吗?")) {
				$.post("pages/back/admin/travel/delete.action", {"tid" : tid}, function(data) {
					operateAlert(data.trim() == "true" ? "申请单删除成功" : "申请单删除失败")
					if(data.trim() == "true") {
						$("#travel-" + tid).remove();
					}
				}, "text");
			}
		}) ;
	}) ;
});

function initModal() {
	$("#contentOne table tbody").empty();
	$("#contentTwo table tbody").empty();
}