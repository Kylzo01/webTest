$(document).ready(function(){

    
    var noOfInput = 0;
    var currentPerson = 0;
    var ogSize = 0;


    for(var i = 0; i < 9; i++){

        addPerson();

    }

    $('#backToEdit').hide();
    $('#nextInit').hide();


    $('#submitInit').click(function(){

        var names = [];
        var init = [];

        var output = "";
        var valid = true;


        for(var i = 0; i < noOfInput; i++){

            //Create local variables with the name and initaitive in the current position of the loop
            var nameInput = $('#name' + i).val();
            var initInput = $('#Initiative' + i).val();

            
            //Check to see if the name is blank
            if(nameInput.localeCompare("")){

                names[i] = nameInput;

                //Check if the initiative is a number
                
                if(isNaN(initInput)){
                    alert("Invalid Data Type Entered In Initiative Box + " + i);
                    valid = false;

                }
                
                init[i] = initInput;

                output += "Name - " + names[i] + ", Inititative - " + init[i] + "\n";
                
            }

        }

        if(names.length <=0){

            alert("There needs to be a name added into the tracker")
            valid = false;

        }

        if(valid){

            output += "\nAFTER SORT\n";

            var highestNo = 0;
            var highestPos = 0;

            var finalName = [];
            var finalInit = [];
        
            ogSize = names.length;

            for(var i = 0; i < ogSize; i++){

                for(var j = 0; j < ogSize; j++){

                    if(parseInt(init[j]) > parseInt(highestNo)){

                        highestPos = j;
                        highestNo = init[j];

                    }

                }


                finalName[i] = names[highestPos];
                finalInit[i] = init[highestPos];

                init.splice(highestPos, 1);
                names.splice(highestPos, 1);
            
                highestNo = 0;
                highestPos = 0;

                output += "Name - " + finalName[i] + ", Inititative - " + finalInit[i] + "\n";



            }


            for(var i = 0; i < ogSize; i++){

                $('#name' + i).val(finalName[i]).prop("disabled", true);
                $('#Initiative' + i).val(finalInit[i]).prop("disabled", true);

                $('#name' + i).css("background-color", "white");
                $('#Initiative' + i).css("background-color", "white");

            }

            for(var i = ogSize; i < noOfInput; i++){

                //$('#name' + i).hide();
                //$('#Initiative' + i).hide();

                $('#row' + i).remove();
            }

            $('#submitInit').hide();
            $('#newRow').hide();
            $('#backToEdit').show();
            $('#nextInit').show();

            $('#name' + currentPerson).css("background-color", "lightgreen");
            $('#Initiative' + currentPerson).css("background-color", "lightgreen");

        }
        

    });


    $('#nextInit').click(function(){

        if(currentPerson == ogSize-1){

            $('#name' + currentPerson).css("background-color", "white");
            $('#Initiative' + currentPerson).css("background-color", "white");

            currentPerson = 0;

            $('#name' + 0).css("background-color", "lightgreen");
            $('#Initiative' + 0).css("background-color", "lightgreen");


        }else{
        currentPerson

            $('#name' + currentPerson).css("background-color", "white");
            $('#Initiative' + currentPerson).css("background-color", "white");

            currentPerson += 1;

            $('#name' + currentPerson).css("background-color", "lightgreen");
            $('#Initiative' + currentPerson).css("background-color", "lightgreen");

        }
    });

    function addPerson(){

        $('#initTable').append('<tr id = "row' + noOfInput + '"><td><input type="text" name="name[]" id = "name' + noOfInput + '" placeholder = "name' + noOfInput + '"/></td>   <td><input type="text" name="init[]" id = "Initiative' + noOfInput + '" placeholder = "Enter Initiative"/></tr>');
        //$('<tr>><td><input type="text" name="name[]" id = "name' + noOfInput + '" placeholder = "name' + noOfInput + '"/></td>   <td><input type="text" name="init[]" id = "Initiative' + noOfInput + '" placeholder = "Enter Initiative"/></tr>').insertBefore( "#initButtons" );
        
        //$('#initTable').append('<tr>><td><input type="text" name="name[]" id = "name' + noOfInput + '" placeholder = "Enter Name"/></td>   <td><input type="text" name="init[]" id = "Initiative' + noOfInput + '" placeholder = "Enter Initiative"/></tr>');
       
        noOfInput += 1;

    }

    //<button type="submitInit" id = "submitInit">Submit Initiative</button>
    //<button type="newRow" id = "newRow">New Row</button>
  
    //<button type="nextInit" id = "nextInit" >Next</button>
    //<button type="backToEdit" id = "backToEdit" >Back To Edit</button>

    
    $('#newRow').click(function(){

        addPerson();

    });


    $('#backToEdit').click(function(){

        $('#submitInit').show();
        $('#newRow').show();

        $('#backToEdit').hide();
        $('#nextInit').hide();

        for(var i = 0; i < ogSize; i++){

            $('#name' + i).prop("disabled", false);
            $('#Initiative' + i).prop("disabled", false);

            $('#name' + i).css("background-color", "white");
            $('#Initiative' + i).css("background-color", "white");

        }

        noOfInput = parseInt(ogSize);


        currentPerson = 0;
        ogSize = 0;

    });





    //Detects change in the name input field
    //$('#name').change(function(e){
    
    //});

    //$('#name').after($("#name#").last);



})