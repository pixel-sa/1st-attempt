
"use strict";
$(document).ready(function () {
    "use strict";


<!--  ********  Event Handlers **********   -->


    $("#year").on("change", function(){
        var year = $("#year").val();
        if(year !== '') {
            getMakes(year, function (makes) {
                populateMakes(makes)
            })
        }else {
            //TODO: insert error handling if user doesnt select year.
            console.log("Did not select a year error ")
        }
    });

   $("#make").on("change", function(){
       var year = $("#year").val();
       var make = $(this).val();
       if(make !== '' && year !== '') {
            getModels(make, year, function (models) {
                populateModels(models)
            })
       }else {
           //TODO: insert error handling if user doesnt select make.
           console.log("Did not select a make error ")
       }
   });

    $("#model").on("change", function(){
        var year = $("#year").val();
        var make = $("#make").val();
        var model = $(this).val();
        if(model !== '' && make !== '' && year !== '') {
            getEngines(model, make, year, function (vehicles) {
                if (vehicles.length === 1){
                    //TODO: use this vehicles MPG and continue process
                    console.log(vehicles[0].combined)
                }else{
                    //TODO: select from displacement and if still not to one then select from transmission
                    populateEngines(vehicles);
                    $.each(vehicles, function(i, vehicle){
                        console.log(vehicle)
                    })
                }

            })
        }else {
            //TODO: insert error handling if user doesnt select model.
            console.log("Did not select a make error ")
        }
    });

    function bindEngineListenerToDom(vehicles) {
        $("#engine").on("change", function(){
            var displacement = $(this).val();
            var matchingVehicles = [];
            $.each(vehicles, function(i, vehicle){
                if(vehicle.displacement == displacement) {
                    matchingVehicles.push(vehicle)
                }
            });

            if(matchingVehicles > 1){
                // need to compare these .. if mpg and tranny are = then poof done..
                console.log(matchingVehicles);
            }else{
                //this is the winner
                console.log(matchingVehicles[0].combined);
            }
        })

    }



<!--    ******* HTML Render  ********     -->


    function populateMakes(makes) {
        var html = '';
        html += '<option value="">Select a make</option>';
        $.each(makes, function(i, make) {
            html += '<option value="' + make +'">' + make + '</option>';
        });
        $("#make").html(html);
    }

    function populateModels(models) {
        var html = '';
        html += '<option value="">Select a make</option>';
        $.each(models, function(i, model) {
            html += '<option value="' + model +'">' + model + '</option>';
        });
        $("#model").html(html);
    }

    function populateEngines(vehicles) {
        var html = '';
        html += '<label for="engine">Engine</label>';
        html += '<select name="engine" id="engine">';
        html += '<option value="">Select and engine size</option>';

        $.each(vehicles, function(i, vehicle) {
            if(i === 0 || vehicle.displacement !== vehicles[i - 1].displacement) {
                html += '<option value="' + vehicle.displacement + '">' + vehicle.displacement + '</option>';
            }
        });

        html += '</select>';
        $("#vehicleForm").append(html);
        bindEngineListenerToDom(vehicles);
    }


<!--  ********  AJAX requests **********   -->


    function getMakes(year, callback) {
       $.ajax({
           url: "/application/getMakes?year=" + year,
           success: function(response) {
               if(response && response.result){
                   callback(response.data)
               }else {
                   //TODO: handle error response
                   console.log(response.errors)
               }
           }
       })
    }


    function getModels(make, year, callback) {
        $.ajax({
            url: "/application/getModels?make=" + make + "&year=" + year,
            success: function(response) {
                if(response && response.result){
                    callback(response.data)
                }else {
                    //TODO: handle error response
                    console.log(response.errors)
                }
            }
        })
    }

    function getEngines(model, make, year, callback) {
        $.ajax({
            url: "/application/getEngines?model=" + model + "&make=" + make + "&year=" + year,
            success: function(response) {
                if(response && response.result){
                    callback(response.data)
                }else {
                    //TODO: handle error response
                    console.log(response.errors)
                }
            }
        })
    }


});