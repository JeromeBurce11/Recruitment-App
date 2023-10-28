import EmployeeModel from "../model/Employee.model.js";

export async function createEmployee(req, res) {
  try {
    const {
        email,
        username,
        firstname,
        lastname,
        nickname,
        localname,
        mobile ,
        birthplace,
        birthDate,
        gender,
        address,
        contacts,
        religion,
        status,
        nationality,
        dialect,
        race
    } = req.body;

    const employee = new EmployeeModel({
        email,
        username,
        firstname,
        lastname,
        nickname,
        localname,
        mobile ,
        birthplace,
        birthDate,
        gender,
        address,
        contacts,
        religion,
        status,
        nationality,
        dialect,
        race
    });

    employee
      .save()
      .then(() =>
        res.status(201).send({ msg: "Employee Successfully Added" })
      )
      .catch((error) => res.status(500).send({ error }));
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getAllEmployee(req,res){
    try {
            EmployeeModel.find( function(err, employees){
            if(err) return res.status(500).send({ err });
     
            return res.status(201).send(employees);
        }).sort({_id:-1})

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find User Data"});
    }

}

export async function getEmployeeById(req,res){
    console.log("REEQ :", req.params);
    console.log("REEQ1 :", req);


    const { id } = req.params; 
    try {
            EmployeeModel.findOne( { _id : id }, function(err, employee){
            if(err) return res.status(500).send({ err });
            console.log("RESULTTTT :", employee);
     
            return res.status(201).send(employee);
        })

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find Employee Data"});
    }

}

export async function updateEmployee(req,res){
    
    const { id } = req.body;
    console.log("APPLICANNNNNTTT IDDD :", id.id);
    const body = req.body;
    console.log("BUUURE :", body);

    if(id){
        EmployeeModel.updateOne({ _id : id.id }, body, function(err, data){
            if(err) throw err;

            return res.status(201).send({ msg : "Employee details Updated...!"});
        })

    }else{
        return res.status(401).send({ error : "Employee Not Found...!"});
    }

}


export async function deleteEmployee(req, res){
    const { id } = req.params;
    console.log("id to be deleted : ", req.params);
    if(id){
        EmployeeModel.deleteOne({ _id : id }, function(err, data){
            if(err) throw err;

            return res.status(201).send({ msg : "Employee successfully deleted...!"});
        })

    }else{
        return res.status(401).send({ error : "Employee Not Found...!"});
    }
}