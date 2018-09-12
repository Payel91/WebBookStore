function ajaxLib(olid)
{
    
    arr.length = 0;
    var booksAPI = "https://openlibrary.org/api/books?bibkeys=" + olid + "&jscmd=data&format=json"
    $.ajax({ 
        type: 'GET', 
        url: booksAPI, 
        data: {}, 
        dataType: "json",
        success: function(results) {
            //Represent in HTML
            drawTableData(results);
        }
    });
}

function RemoveTableData()
{
   $('#BooksTable tr:not(:first)').remove()
}

function drawTableData(rowData) {
    $.each(rowData, function(i) {
        var row = $("<tr />")
    $("#BooksTable").append(row);
    if(i.split(':')[1] != null)
    {
    row.append($("<td>" + i.split(':')[1] + "</td>"));
    arr.push(i.split(':')[1]);
    }
    else
    {
    row.append($("<td>" + i + "</td>"));
    arr.push(i);
    }
    row.append($("<td>" + rowData[i].title + "</td>"));
    if(rowData[i].authors == null) //As not all objects are having Authors hence checking with 'By_Statement' attribute
    {
     row.append($("<td>" + rowData[i].by_statement + "</td>"));
    }
    else
    {
     row.append($("<td>" + rowData[i].authors[0].name + "</td>"));
    }
    var img = $('<img>');
    img.attr('src', rowData[i].cover["medium"]);
    row.append($(img));
      });
}

//Global array
var arr = [];
//Check for the button event
$( document ).ready(function() {

    var olid = "OLID:OL22895148M,OLID:OL6990157M,OLID:OL7101974M,OLID:OL6732939M,OLID:OL7193048M,OLID:OL24347578M,OLID:OL24364628M,OLID:OL24180216M,OLID:OL24948637M,OLID:OL1631378M,OLID:OL979600M,OLID:OL33674M,OLID:OL7950349M,OLID:OL349749M,OLID:OL30460M,OLID:OL24347578M"
    ajaxLib(olid); //Call method to load data
    $("#btnSearch").click(function(){
        var txt = $("#txtSearch");
       if(txt.val() != null && txt.val() != '')
       {
          //Check whether OLID
          var chk = txt.val().startsWith("OL", 0)
          if(chk)
          {
            var arraycontainsOLID = (arr.indexOf(txt.val()) > -1);
            if(arraycontainsOLID)
            {
                RemoveTableData();
                ajaxLib(txt.val());
            }
           
          }

       }
       else
       {
           //Reset to display all
        RemoveTableData();
        ajaxLib(olid);
       }
    });

    
});

