
$.ajax({
    url: "../php/getall.php",
    type: 'GET',
    dataType: 'json',
    
    
    
    success: function(result) {
        employees=result['data'];
        
        const list = document.querySelector('.tablebody');
        employees.forEach((employee) => {
            const tr=document.createElement('tr');
            const p=document.createElement('td');
            const p2=document.createElement('td');
            const p3=document.createElement('td');
            const p4=document.createElement('td');
            const p5=document.createElement('td');
            const editbutton=document.createElement('a');
            
            editbutton.innerText="Edit";
            editbutton.href="updatepersonnel.html?id="+employee.id;
            
            editbutton.className="btn btn-info"
           
            p.innerText=employee.firstName;
            p2.innerText=employee.lastName;
            p3.innerText=employee.email;
            p4.innerText=employee.department;
            p5.innerText=employee.location;
            
            list.appendChild(tr);
            tr.appendChild(p);
            tr.appendChild(p2);
            tr.appendChild(p3);
            tr.appendChild(p4);
            tr.appendChild(p5);
            tr.appendChild(editbutton);
            
        })

    
    },
    
    error: function(jqXHR, textStatus, errorThrown) {

        console.log("error");
       
    }
}); 
$.ajax({
    url: "../php/getAllDepartments.php",
    type: 'GET',
    dataType: 'json',
    
    
    
    success: function(result) {
        departments=result['data'];
        $.ajax({
            url: "../php/getAllLocations.php",
            type: 'GET',
            dataType: 'json',
            success:function(result){
                console.log(result['data'])
                locations=result['data'];
                const list = document.querySelector('.departmenttablebody');
                departments.forEach((department) => {
                    const tr=document.createElement('tr');
                    const p=document.createElement('td');
                    const p2=document.createElement('td');
                    const editbutton=document.createElement('a');
                    
                    editbutton.innerText="Edit";
                    editbutton.href="updatedepartment.html?id="+department.id;
                    
                    editbutton.className="btn btn-info"
                    
                    p.innerText=department.name;
                    locations.forEach((location)=>{
                        if(department.locationID==location.id){
                            p2.innerText=location.name;
                        }
                    })
                    
                   
                    
                    list.appendChild(tr);
                    tr.appendChild(p);
                    tr.appendChild(p2);
                    
                    tr.appendChild(editbutton);
                    
                })
            }
        })
        
       

    
    },
    
    error: function(jqXHR, textStatus, errorThrown) {

        console.log("error");
       
    }
}); 
$.ajax({
    url: "../php/getAllLocations.php",
    type: 'GET',
    dataType: 'json',
    
    
    
    success: function(result) {
        employees=result['data'];
        
        const list = document.querySelector('.locationtablebody');
        
        employees.forEach((employee) => {
            const tr=document.createElement('tr');
            const p=document.createElement('td');
            
            const editbutton=document.createElement('a');
            
            editbutton.innerText="Edit";
            
            editbutton.className="btn btn-info"
            
            p.innerText=employee.name;
            editbutton.href="updatelocation.html?id="+employee.id;
            
            list.appendChild(tr);
            tr.appendChild(p);
            
            tr.appendChild(editbutton);
            
            
        })

    
    },
    
    error: function(jqXHR, textStatus, errorThrown) {

        console.log("error");
       
    }
}); 
$.ajax({
    url: "../php/getAllLocations.php",
    type: 'GET',
    dataType: 'json',
    
    
    
    success: function(result) {
        employees=result['data'];
        
        
        const locations = document.querySelector('.selectdepartment');
        employees.forEach((employee) => {
           
            
            
            
            const a=document.createElement('option');
            a.innerText=employee.name;
            a.value=employee.id;
            locations.appendChild(a);
        })

    
    },
    
    error: function(jqXHR, textStatus, errorThrown) {

        console.log("error");
       
    }
}); 
$('#adddept').click(function() {
    //sending the data gathered from input of user to php file where api is called
        $.ajax({
            url: "../php/insertDepartment.php",
            type: 'POST',
            dataType: 'json',
            data: {
                name: $('#name').val(),
                locationID:$('#dept').val()
                
            },
            //if user enters correct data and api gives back the data then we run success funtion
            success: function(result) {
    
                console.log(result);
    
                //if status of data is ok we fetch the data from fields and put them in results table in html
                if (result.status.name == "ok") {
    
                    //fetching fields from api and showing them in html table
                  window.alert("added");
                    
    
                }else{
                    //if the upper condition  fails
                    console.log("error");
                   
                }
            
            },
            //if there is no success in retrieving data from api
            error: function(jqXHR, textStatus, errorThrown) {
    
                console.log("error");
                $('#txterror').html("Enter Valid Id");
            }
        }); 
    
    });


    $.ajax({
        url: "../php/getAllDepartments.php",
        type: 'GET',
        dataType: 'json',
        
        
        
        success: function(result) {
            departments=result['data'];
            
            const department2 = document.querySelector('.selectdept');
            departments.forEach((department) => {
               
                
                
                
                const a=document.createElement('option');
                a.innerText=department.name;
                a.value=department.id;
                department2.appendChild(a);
            })
           
    
        
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
    
            console.log("error");
           
        }
    }); 
    $('#addemployee').click(function(e) {
        //sending the data gathered from input of user to php file where api is called
        e.preventDefault();
            $.ajax({
                url: "../php/insertPersonnel.php",
                type: 'POST',
                
                data: {
                    firstName: $('#fname').val(),
                    lastName:$('#lname').val(),
                    jobTitle:$('#Jtitle').val(),
                    email:$('#email').val(),
                    departmentID:$('#dept').val()
                },
                //if user enters correct data and api gives back the data then we run success funtion
                success: function(result) {
        
                    console.log(result);
        
                    //if status of data is ok we fetch the data from fields and put them in results table in html
                    if (result.status.name == "ok") {
        
                        //fetching fields from api and showing them in html table
                      window.alert("added");
                        location.href="viewemployees.html"
        
                    }else{
                        //if the upper condition  fails
                        console.log("error");
                       
                    }
                
                },
                //if there is no success in retrieving data from api
                error: function(jqXHR, textStatus, errorThrown) {
        
                    console.log("error");
                    $('#txterror').html("Enter Valid Id");
                }
            }); 
        
        });
        $('#addlocation').click(function(e) {
            e.preventDefault();
            //sending the data gathered from input of user to php file where api is called
                $.ajax({
                    url: "../php/insertLocations.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        name: $('#name').val()
                        
                        
                    },
                    //if user enters correct data and api gives back the data then we run success funtion
                    success: function(result) {
            
                        console.log(result);
            
                        //if status of data is ok we fetch the data from fields and put them in results table in html
                        if (result.status.name == "ok") {
            
                            //fetching fields from api and showing them in html table
                          window.alert("added");
                            
            
                        }else{
                            //if the upper condition  fails
                            console.log("error");
                           
                        }
                    
                    },
                    //if there is no success in retrieving data from api
                    error: function(jqXHR, textStatus, errorThrown) {
            
                        console.log("error");
                        $('#txterror').html("Enter Valid Id");
                    }
                }); 
            
            });
            const querystring=window.location.search;
            const urlParams = new URLSearchParams(querystring);
            const id = urlParams.get('id');
            $.ajax({
               
                url: "../php/getPersonnelByID.php",
                type: 'GET',
                dataType: 'json',
                data:{
                    id:id
                },
                
                
                success: function(result) {
                    
                    employeedata=result['data']['personnel']['0'];
                    console.log(employeedata);
                    const fname = document.querySelector('.fname');
                    const lname = document.querySelector('.lname');
                    const email = document.querySelector('.email');
                    const jobTitle=document.querySelector('.jtitle');
                    

                   fname.value=employeedata.firstName;
                   lname.value=employeedata.lastName;
                   email.value=employeedata.email;
                   jobTitle.value=employeedata.jobTitle;
                   $.ajax({
                    url:"../php/getAllDepartments.php",
                    type:'GET',
                    dataType:'json',
                    success:function(result){
                        const departments=result['data'];
                        const department=document.querySelector('.selecteddept');
                        departments.forEach((department2)=>{
                            if(employeedata.departmentID==department2.id){
                                department.innerText=department2.name;
                                department.value=department2.id;
                            }
                        })

                    }
                   })
                    
                   
            
                
                },
                
                error: function(jqXHR, textStatus, errorThrown) {
            
                    console.log("error");
                   
                }
            }); 
            $('#deleteemployee').click(function(e) {
                e.preventDefault();

                $.ajax({
               
                    url: "../php/deletePersonnelByID.php",
                    type: 'GET',
                    dataType: 'json',
                    data:{
                        id:id
                    },
                    
                    
                    success: function(result) {
                        
                        alert("deleted")
                        location.href="viewemployees.html"
                        
                       
                
                    
                    },
                    
                    error: function(jqXHR, textStatus, errorThrown) {
                
                        console.log("error");
                       
                    }
                }); 

            })
            $('#updateemployee').click(function(e) {
                //sending the data gathered from input of user to php file where api is called
                e.preventDefault();
                    $.ajax({
                        url: "../php/updatePersonnelByID.php",
                        type: 'POST',
                        dataType:'json',
                        
                        data: {
                            firstName: $('#fname').val(),
                            lastName:$('#lname').val(),
                            jobTitle:$('#Jtitle').val(),
                            email:$('#email').val(),
                            departmentID:$('#dept').val(),
                            id:id
                        },
                        //if user enters correct data and api gives back the data then we run success funtion
                        success: function(result) {
                
                            console.log(result);
                
                            //if status of data is ok we fetch the data from fields and put them in results table in html
                            if (result.status.name == "ok") {
                
                                //fetching fields from api and showing them in html table
                              window.alert("added");
                              location.href="viewemployees.html"
                
                            }else{
                                //if the upper condition  fails
                                console.log("error");
                               
                            }
                        
                        },
                        //if there is no success in retrieving data from api
                        error: function(jqXHR, textStatus, errorThrown) {
                
                            console.log("error");
                            $('#txterror').html("Enter Valid Id");
                        }
                    }); 
                
                });



                $.ajax({
               
                    url: "../php/getDepartmentByID.php",
                    type: 'GET',
                    dataType: 'json',
                    data:{
                        id:id
                    },
                    
                    
                    success: function(result) {
                        
                        departmentdata=result['data']['0'];
                        console.log(departmentdata);
                        const nname = document.querySelector('.dname');
                        
                        
    
                       nname.value=departmentdata.name;
                       
                       $.ajax({
                        url:"../php/getAllLocations.php",
                        type:'GET',
                        dataType:'json',
                        success:function(result){
                            const locations=result['data'];
                            const department=document.querySelector('.selectedlocation');
                            locations.forEach((location)=>{
                                if(departmentdata.locationID==location.id){
                                    department.innerText=location.name;
                                    department.value=location.id;
                                }
                            })
    
                        }
                       })
                        
                       
                
                    
                    },
                    
                    error: function(jqXHR, textStatus, errorThrown) {
                
                        console.log("error");
                       
                    }
                }); 


                $('#updatedepartment').click(function(e) {
                    //sending the data gathered from input of user to php file where api is called
                    e.preventDefault();
                        $.ajax({
                            url: "../php/updateDepartmentByID.php",
                            type: 'POST',
                            dataType:'json',
                            
                            data: {
                                name: $('#name').val(),
                                
                                locationID:$('#dept').val(),
                                id:id
                            },
                            //if user enters correct data and api gives back the data then we run success funtion
                            success: function(result) {
                    
                                console.log(result);
                    
                                //if status of data is ok we fetch the data from fields and put them in results table in html
                                if (result.status.name == "ok") {
                    
                                    //fetching fields from api and showing them in html table
                                  window.alert("added");
                                  location.href="viewdepartments.html"
                    
                                }else{
                                    //if the upper condition  fails
                                    console.log("error");
                                   
                                }
                            
                            },
                            //if there is no success in retrieving data from api
                            error: function(jqXHR, textStatus, errorThrown) {
                    
                                console.log("error");
                                $('#txterror').html("Enter Valid Id");
                            }
                        }); 
                    
                    });

                    $.ajax({
               
                        url: "../php/getLocationByID.php",
                        type: 'GET',
                        dataType: 'json',
                        data:{
                            id:id
                        },
                        
                        
                        success: function(result) {
                            
                            departmentdata=result['data']['0'];
                            console.log(departmentdata);
                            const nname = document.querySelector('.lname');
                            
                            
        
                           nname.value=departmentdata.name;
                           
                          
                            
                           
                    
                        
                        },
                        
                        error: function(jqXHR, textStatus, errorThrown) {
                    
                            console.log("error");
                           
                        }
                    }); 

                    $('#updatelocation').click(function(e) {
                        //sending the data gathered from input of user to php file where api is called
                        e.preventDefault();
                            $.ajax({
                                url: "../php/updateLocationByID.php",
                                type: 'POST',
                                dataType:'json',
                                
                                data: {
                                    name: $('#name').val(),
                                    
                                    
                                    id:id
                                },
                                //if user enters correct data and api gives back the data then we run success funtion
                                success: function(result) {
                        
                                    console.log(result);
                        
                                    //if status of data is ok we fetch the data from fields and put them in results table in html
                                    if (result.status.name == "ok") {
                        
                                        //fetching fields from api and showing them in html table
                                      window.alert("added");
                                      location.href="viewlocations.html"
                        
                                    }else{
                                        //if the upper condition  fails
                                        console.log("error");
                                       
                                    }
                                
                                },
                                //if there is no success in retrieving data from api
                                error: function(jqXHR, textStatus, errorThrown) {
                        
                                    console.log("error");
                                    $('#txterror').html("Enter Valid Id");
                                }
                            }); 
                        
                        });