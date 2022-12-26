let handleClick = e => {
    Array.from(document.querySelectorAll(".active"), e => e.classList.remove("active")); // remove `active` class from every elements which contains him.
    e.target.classList.add("active");
   
    document.querySelector(`div.tabcontent[data-id*="${e.target.dataset.id}"]`).classList.add("active");
   
  };
  
  Array.from(document.getElementsByClassName("tablinks"), btn => btn.addEventListener('click', handleClick, false));
  window.addEventListener('load'      , getallemployees(),getdepartments(),getlocations()  );

                        function getallemployees(){
                            
                            $.ajax({
                                url: "php/getAllDepartments.php",
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
                            $.ajax({
                                url: "php/getall.php",
                                type: 'GET',
                                dataType: 'json',
                                
                                
                                
                                success: function(result) {
                                    $('#addemployee').click(function(e) {
                                        //sending the data gathered from input of user to php file where api is called
                                        e.preventDefault();
                                            $.ajax({
                                                url: "php/insertPersonnel.php",
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
                                                        Swal.fire({
                                                            title:"Added",
                                                            text:"Added",
                                                            type:"success"
                                                          }).then(function(){
                                                            
                                                            $("#addemployeemodal").modal("hide");
                                                            $('.modal-backdrop').removeClass('modal-backdrop');
                                                            $('#employeestable').load(location.href + " #employeestable>*")
                                                             getallemployees();
                                                             
                                                          });
                                        
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
                                    employees=result['data'];
                                    
                                    const list = document.querySelector('.tablebody');
                                    employees.forEach((employee) => {
                                        const tr=document.createElement('tr');
                                        const p=document.createElement('td');
                                        const p2=document.createElement('td');
                                        const p3=document.createElement('td');
                                        const p4=document.createElement('td');
                                        const p5=document.createElement('td');
                                        
                                        const editbuttonemployee=document.createElement('button');
                                        
                                        editbuttonemployee.innerText="Edit";
                                        editbuttonemployee.dataset.bsToggle="modal";
                                        editbuttonemployee.dataset.bsTarget="#editemployeemodal";
                                        editbuttonemployee.dataset.id=employee.id;
                                        editbuttonemployee.id="employeeeditbutton";
                                        tr.className="employee-row"
                                        editbuttonemployee.className="btn btn-info";
                                       
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
                                        tr.appendChild(editbuttonemployee);
                                        
                                    })
                                    $('.employee-row button').click(function(e){
                                            e.preventDefault();
                                            
                                        $.ajax({
                                            
                            
                                           url: "php/getPersonnelByID.php",
                                           type: 'GET',
                                           dataType: 'json',
                                           data:{
                                               id:$(this).data('id'),
                                               
                                           },
                                           
                                           
                                           success: function(result) {
                                               
                                               employeedata=result['data']['personnel']['0'];
                                               console.log(employeedata);
                                               const fname = document.querySelector('.fename');
                                               const lname = document.querySelector('.lename');
                                               const email = document.querySelector('.eemail');
                                               const jobTitle=document.querySelector('.jetitle');
                                               const id=document.querySelector('.employeeid');
                                               
                                               
                            
                                              fname.value=employeedata.firstName;
                                              lname.value=employeedata.lastName;
                                              email.value=employeedata.email;
                                              jobTitle.value=employeedata.jobTitle;
                                              employeeid.value=employeedata.id;
                                              
                                              $.ajax({
                                               url:"php/getAllDepartments.php",
                                               type:'GET',
                                               dataType:'json',
                                               success:function(result){
                                                   const departments=result['data'];
                                                   const department=document.querySelector('.selecteddept');
                                                   const uselectdepartment=document.querySelector('.selectdeptu');
                                                   departments.forEach((department2)=>{
                                                       if(employeedata.departmentID==department2.id){
                                                           department.innerText=department2.name;
                                                           department.value=department2.id;
                                                       }
                                                       const op=document.createElement('option');
                                                       op.innerText=department2.name;
                                                       op.value=department2.id;
                                                       uselectdepartment.appendChild(op);
                                                   })
                            
                                               }
                                               
                                              })
                                               
                                              $('#deleteemployee').click(function(e) {
                                                e.preventDefault();
                                
                                                $.ajax({
                                               
                                                    url: "php/deletePersonnelByID.php",
                                                    type: 'GET',
                                                    dataType: 'json',
                                                    data:{
                                                        id:$('#employeeid').val()
                                                    },
                                                    
                                                    
                                                    success: function(result) {
                                                        
                                                        Swal.fire({
                                                            title:"deleted",
                                                            text:"deleted",
                                                            type:"success"
                                                          }).then(function(){
                                                            $("#confirmationmodal").modal("hide");
                                                            $("#editemployeemodal").modal("hide");
                                                            $('.modal-backdrop').removeClass('modal-backdrop');
                                                             $('#employeestable').load(location.href + " #employeestable>*")
                                                             getallemployees();
                                                             
                                                          });
                                                        
                                                       
                                                
                                                    
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
                                                        url: "php/updatePersonnelByID.php",
                                                        type: 'POST',
                                                        dataType:'json',
                                                        
                                                        data: {
                                                            firstName: $('#fename').val(),
                                                            lastName:$('#lename').val(),
                                                            jobTitle:$('#Jetitle').val(),
                                                            email:$('#eemail').val(),
                                                            departmentID:$('#udept').val(),
                                                            id:$('#employeeid').val(),
                                                        },
                                                        //if user enters correct data and api gives back the data then we run success funtion
                                                        success: function(result) {
                                                
                                                            console.log(result);
                                                
                                                            //if status of data is ok we fetch the data from fields and put them in results table in html
                                                            if (result.status.name == "ok") {
                                                
                                                                //fetching fields from api and showing them in html table
                                                              Swal.fire({
                                                                title:"updated",
                                                                text:"updated",
                                                                type:"success"
                                                              }).then(function(){
                                                                
                                                                $("#updateconfirmation").modal("hide");
                                                                $("#editemployeemodal").modal("hide");
                                                                $('.modal-backdrop').removeClass('modal-backdrop');
                                                                $("#employeestable").load(location.href + " #employeestable>*");
                                                                
                                                                getallemployees();
                                                                 
                                                              });
                                                             
                                                             
                                                
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
                                       
                                           
                                           },
                                           
                                           error: function(jqXHR, textStatus, errorThrown) {
                                       
                                               console.log("error");
                                              
                                           }
                                       }); 
                                       
                                    })
                            
                                
                                },
                                
                                error: function(jqXHR, textStatus, errorThrown) {
                            
                                    console.log("error");
                                   
                                }
                            }); 
                        }
                        
                        function getlocations(){
                            
                            $.ajax({
                                url: "php/getAllLocations.php",
                                type: 'GET',
                                dataType: 'json',
                                
                                
                                
                                success: function(result) {
                                    $('#addlocation').click(function(e) {
                                        e.preventDefault();
                                        //sending the data gathered from input of user to php file where api is called
                                            $.ajax({
                                                url: "php/insertLocations.php",
                                                type: 'POST',
                                                dataType: 'json',
                                                data: {
                                                    name: $('#locationname').val()
                                                    
                                                    
                                                },
                                                //if user enters correct data and api gives back the data then we run success funtion
                                                success: function(result) {
                                        
                                                    console.log(result);
                                        
                                                    //if status of data is ok we fetch the data from fields and put them in results table in html
                                                    if (result.status.name == "ok") {
                                        
                                                        //fetching fields from api and showing them in html table
                                                        Swal.fire({
                                                            title:"updated",
                                                            text:"updated",
                                                            type:"success"
                                                          }).then(function(){
                                                            $("#addlocationmodal").modal("hide");
                                                            $('.modal-backdrop').removeClass('modal-backdrop');
                                                           
                                                             $('#locationtable').load(location.href + " #locationtable>*")
                                                             getlocations();
                                                             const locations=document.querySelector('.selectlocations');
                                                             locations.innerText="";
                                                             dtaable=document.getElementById('dtablebody');
                                                             dtaable.innerText="";
                                                             getdepartments();
                                                             
                                                          });
                                                        
                                        
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
                                    
                                    locations=result['data'];
                                    
                                    const list = document.querySelector('.locationtablebody');
                                    
                                    locations.forEach((location) => {
                                        const tr=document.createElement('tr');
                                        const p=document.createElement('td');
                                        
                                        const locationeditbutton=document.createElement('button');
                                        
                                        locationeditbutton.innerText="Edit";
                                        
                                        locationeditbutton.className="btn btn-info"
                                        tr.className="location-row"
                                        p.innerText=location.name;
                                        locationeditbutton.dataset.id=location.id;
                                        locationeditbutton.dataset.bsToggle="modal";
                                        locationeditbutton.dataset.bsTarget="#editlocationmodal2";
                                        
                                        list.appendChild(tr);
                                        tr.appendChild(p);
                                        
                                        tr.appendChild(locationeditbutton);
                                        
                                        
                                    })
                                    $('.location-row button').click(function(e){
                                        e.preventDefault();
                                        $.ajax({
                                                   
                                            url: "php/getLocationByID.php",
                                            type: 'GET',
                                            dataType: 'json',
                                            data:{
                                                id:$(this).data('id'),
                                            },
                                            
                                            
                                            success: function(result) {
                                                
                                                locationdata=result['data']['0'];
                                                console.log(locationdata);
                                                const nname = document.querySelector('.editlocationlname');
                                                const lid=document.querySelector('.editlocationid');
                                                lid.value=locationdata.id;
                                                
                                                
                                    
                                               nname.value=locationdata.name;
                                               
                                              
                                               $('#updatelocation').click(function(e) {
                                                //sending the data gathered from input of user to php file where api is called
                                                e.preventDefault();
                                                    $.ajax({
                                                        url: "php/updateLocationByID.php",
                                                        type: 'POST',
                                                        dataType:'json',
                                                        
                                                        data: {
                                                            name: $('#editlocationname').val(),
                                                            
                                                            
                                                            id:$('#editlocationid').val()
                                                        },
                                                        //if user enters correct data and api gives back the data then we run success funtion
                                                        success: function(result) {
                                                
                                                            console.log(result);
                                                
                                                            //if status of data is ok we fetch the data from fields and put them in results table in html
                                                            if (result.status.name == "ok") {
                                                
                                                                //fetching fields from api and showing them in html table
                                                                Swal.fire({
                                                                    title:"updated",
                                                                    text:"updated",
                                                                    type:"success"
                                                                  }).then(function(){
                                                                    $("#locupdateconfirm").modal("hide");
                                                                    $("#editlocationmodal2").modal("hide");
                                                                    $('.modal-backdrop').removeClass('modal-backdrop');
                                                                     $('#locationtable').load(location.href + " #locationtable>*")
                                                                     getlocations();
                                                                     const locations=document.querySelector('.selectlocations');
                                                             locations.innerText="";
                                                             dtaable=document.getElementById('dtablebody');
                                                             dtaable.innerText="";
                                                             getdepartments();
                                                                  });
                                                              
                                                
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
                                                $('#deletelocation').click(function(e){
                                                    e.preventDefault();
                                                    
                                                    const locid=$('#editlocationid').val();
                                                    
                                                    $.ajax({
                                                        url:"php/getAllDepartments.php",
                                                        type:'GET',
                                                        dataType:'json',
                                                        success:function(result){
                                                            employees=result['data'];
                                                            console.log(employees);
                                                            const hasEmployee = employees.some(employee => employee.locationID === locid);
                                                            if (hasEmployee) {
                                                                $('#preventdellocation').modal('show');
                                                              } else {
                                                                $('#locdeleteconfirm').modal('show');
                                                              }
                                                            
                                                        
                                                            
                                                        }
                                                    })
                                                    $('#locationdeleteconfirm').click(function(e){
                                                        e.preventDefault();
                                                        $.ajax({
                                                        url: "php/deleteLocationByID.php",
                                                        type: 'POST',
                                                        dataType:'json',
                                                        
                                                        data: {
                                                            name: $('#dname').val(),
                                                            
                                                            locationID:$('#dlocation').val(),
                                                            id:$('#editlocationid').val(),
                                                        },
                                                        //if user enters correct data and api gives back the data then we run success funtion
                                                        success: function(result) {
                                                
                                                            console.log(result);
                                                
                                                            //if status of data is ok we fetch the data from fields and put them in results table in html
                                                            if (result.status.name == "ok") {
                                                
                                                                //fetching fields from api and showing them in html table
                                                                Swal.fire({
                                                                    title:"Deleted",
                                                                    text:"Deleted",
                                                                    type:"success"
                                                                  }).then(function(){
                                                                    $("#locdeleteconfirm").modal("hide");
                                                                    $("#editlocationmodal2").modal("hide");
                                                                    $('.modal-backdrop').removeClass('modal-backdrop');
                                                                     $('#locationtable').load(location.href + " #locationtable>*")
                                                                     getlocations();
                                                                     const locations=document.querySelector('.selectlocations');
                                                             locations.innerText="";
                                                             dtaable=document.getElementById('dtablebody');
                                                             dtaable.innerText="";
                                                             getdepartments();
                                                                    
                                                                     
                                                                  });
                                                              
                                                
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
                                                    })
                                                   
                                                })
                                                
                                               
                                        
                                            
                                            },
                                            
                                            error: function(jqXHR, textStatus, errorThrown) {
                                        
                                                console.log("error");
                                               
                                            }
                                        }); 
                                      })
                              
                                
                                },
                                
                                error: function(jqXHR, textStatus, errorThrown) {
                            
                                    console.log("error");
                                   
                                }
                            }); 
                            
                        }
                        function getdepartments(){
                            $.ajax({
                                url: "php/getAllLocations.php",
                                type: 'GET',
                                dataType: 'json',
                                
                                
                                
                                success: function(result) {
                                    employees=result['data'];
                                    
                                    
                                    const locations = document.querySelector('.selectlocations');
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
                           
                            $.ajax({
                                url: "php/getAllDepartments.php",
                                type: 'GET',
                                dataType: 'json',
                                
                                
                                
                                success: function(result) {
                                    $('#adddept').click(function() {
                                        //sending the data gathered from input of user to php file where api is called
                                            $.ajax({
                                                url: "php/insertDepartment.php",
                                                type: 'POST',
                                                dataType: 'json',
                                                data: {
                                                    name: $('#depname').val(),
                                                    locationID:$('#locationn').val()
                                                    
                                                },
                                                //if user enters correct data and api gives back the data then we run success funtion
                                                success: function(result) {
                                        
                                                    console.log(result);
                                        
                                                    //if status of data is ok we fetch the data from fields and put them in results table in html
                                                    if (result.status.name == "ok") {
                                        
                                                        //fetching fields from api and showing them in html table
                                                        Swal.fire({
                                                            title:"Added",
                                                            text:"Added",
                                                            type:"success"
                                                          }).then(function(){
                                                           
                                                            $("#adddepartmentmodal").modal("hide");
                                                            $('.modal-backdrop').removeClass('modal-backdrop');
                                                             $('#departmenttable').load(location.href + " #departmenttable>*")
                                                             getdepartments();
                                                             const depts=document.querySelector('.selectdept');
                                                             depts.innerText="";
                                                             etaable=document.getElementById('etablebody');
                                                             etaable.innerText="";
                                                             getallemployees();
                                                          });
                                                        
                                        
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
                                    departments=result['data'];
                                    $.ajax({
                                        url: "php/getAllLocations.php",
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
                                                const editbutton=document.createElement('button');
                                                
                                                editbutton.innerText="Edit";
                                                editbutton.dataset.bsToggle="modal";
                                                editbutton.dataset.bsTarget="#updatedepartmentmodal";
                                                editbutton.dataset.id=department.id;
                                                
                                                editbutton.className="btn btn-info"
                                                tr.className="department-row"
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
                                            $('.department-row button').click(function(e){
                                                $.ajax({
                                           
                                                    url: "php/getDepartmentByID.php",
                                                    type: 'GET',
                                                    dataType: 'json',
                                                    data:{
                                                        id:$(this).data('id')
                                                    },
                                                    
                                                    
                                                    success: function(result) {
                                                        
                                                        departmentdata=result['data']['0'];
                                                        console.log(departmentdata);
                                                        const nname = document.querySelector('.dname');
                                                        const did=document.querySelector('.depid');
                                                        
                                    
                                                       nname.value=departmentdata.name;
                                                       did.value=departmentdata.id;
                                                       
                                                       $.ajax({
                                                        url:"php/getAllLocations.php",
                                                        type:'GET',
                                                        dataType:'json',
                                                        success:function(result){
                                                            const locations=result['data'];
                                                            const department=document.querySelector('.selectedlocation');
                                                            const slocation=document.querySelector('.selectlocation')
                                                            locations.forEach((location)=>{
                                                                if(departmentdata.locationID==location.id){
                                                                    department.innerText=location.name;
                                                                    department.value=location.id;
                                                                }
                                                                const lop=document.createElement('option')
                                                                lop.innerText=location.name;
                                                                lop.value=location.id;
                                                                slocation.appendChild(lop);
                                                            })
                                    
                                                        }
                                                       })
                                                        
                                                       
                                                
                                                    
                                                    },
                                                    
                                                    error: function(jqXHR, textStatus, errorThrown) {
                                                
                                                        console.log("error");
                                                       
                                                    }
                                                }); 
                                            })
                                            $('#updatedepartment').click(function(e) {
                                                //sending the data gathered from input of user to php file where api is called
                                                e.preventDefault();
                                                    $.ajax({
                                                        url: "php/updateDepartmentByID.php",
                                                        type: 'POST',
                                                        dataType:'json',
                                                        
                                                        data: {
                                                            name: $('#dname').val(),
                                                            
                                                            locationID:$('#dlocation').val(),
                                                            id:$('#depid').val(),
                                                        },
                                                        //if user enters correct data and api gives back the data then we run success funtion
                                                        success: function(result) {
                                                
                                                            console.log(result);
                                                
                                                            //if status of data is ok we fetch the data from fields and put them in results table in html
                                                            if (result.status.name == "ok") {
                                                
                                                                //fetching fields from api and showing them in html table
                                                                Swal.fire({
                                                                    title:"updated",
                                                                    text:"updated",
                                                                    type:"success"
                                                                  }).then(function(){
                                                                    $("#depupdateconfirm").modal("hide");
                                                                    $("#updatedepartmentmodal").modal("hide");
                                                                    $('.modal-backdrop').removeClass('modal-backdrop');
                                                                     $('#departmenttable').load(location.href + " #departmenttable>*")
                                                                     getdepartments();
                                                                     const depts=document.querySelector('.selectdept');
                                                             depts.innerText="";
                                                             etaable=document.getElementById('etablebody');
                                                             etaable.innerText="";
                                                             getallemployees();
                                                                  });
                                                              
                                                
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
                                                $('#deletedepartment').click(function(e){
                                                    e.preventDefault();
                                                    const deptid=$('#depid').val();
                                                    
                                                    $.ajax({
                                                        url:"php/getall.php",
                                                        type:'GET',
                                                        dataType:'json',
                                                        success:function(result){
                                                            employees=result['data'];
                                                            console.log(employees);
                                                            const hasEmployee = employees.some(employee => employee.departmentID === deptid);
                                                            if (hasEmployee) {
                                                                $('#preventdel').modal('show');
                                                              } else {
                                                                $('#confirmdel').modal('show');
                                                              }
                                                            
                                                        
                                                            
                                                        }
                                                    })
                                                    $('#confirmdeldepartment').click(function(e){
                                                        e.preventDefault();
                                                        $.ajax({
                                                        url: "php/deleteDepartmentByID.php",
                                                        type: 'POST',
                                                        dataType:'json',
                                                        
                                                        data: {
                                                            name: $('#dname').val(),
                                                            
                                                            locationID:$('#dlocation').val(),
                                                            id:$('#depid').val(),
                                                        },
                                                        //if user enters correct data and api gives back the data then we run success funtion
                                                        success: function(result) {
                                                
                                                            console.log(result);
                                                
                                                            //if status of data is ok we fetch the data from fields and put them in results table in html
                                                            if (result.status.name == "ok") {
                                                
                                                                //fetching fields from api and showing them in html table
                                                                Swal.fire({
                                                                    title:"Deleted",
                                                                    text:"Deleted",
                                                                    type:"success"
                                                                  }).then(function(){
                                                                    $("#confirmdel").modal("hide");
                                                                    $("#updatedepartmentmodal").modal("hide");
                                                                    $('.modal-backdrop').removeClass('modal-backdrop');
                                                                     $('#departmenttable').load(location.href + " #departmenttable>*")
                                                                     getdepartments();
                                                                     const depts=document.querySelector('.selectdept');
                                                             depts.innerText="";
                                                             etaable=document.getElementById('etablebody');
                                                             etaable.innerText="";
                                                             getallemployees();
                                                                     
                                                                  });
                                                              
                                                
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
                                                    })
                                                   
                                                })
                                            
                                        }
                                    })
                                    
                                   
                            
                                
                                },
                                
                                error: function(jqXHR, textStatus, errorThrown) {
                            
                                    console.log("error");
                                   
                                }
                            }); 
                            
                        }
                        