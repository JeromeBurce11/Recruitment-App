import ApplicantModel from "../model/Applicant.model.js";

export async function createApplicant(req, res) {
  try {
    const { email, firstname, lastname, mobile, address, status } = req.body;
    const applicant = new ApplicantModel({
        email,
        firstname,
        lastname,
        mobile,
        address,
        status,
    });

    applicant
      .save()
      .then(() =>
        res.status(201).send({ msg: "Applicant Successfully Added" })
      )
      .catch((error) => res.status(500).send({ error }));
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getAllApplicant(req,res){
    
    try {
            ApplicantModel.find( function(err, applicants){
            if(err) return res.status(500).send({ err });
     
            return res.status(201).send(applicants);
        }).sort({_id:-1})

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find User Data"});
    }

}

export async function getApplicantById(req,res){
    console.log("REEQ :", req.params);
    console.log("REEQ1 :", req);


    const { id } = req.params; 
    try {
            ApplicantModel.findOne( { _id : id }, function(err, applicant){
            if(err) return res.status(500).send({ err });
            console.log("RESULTTTT :", applicant);
     
            return res.status(201).send(applicant);
        })

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find Applicant Data"});
    }

}

export async function updateApplicant(req,res){
    
    const { id } = req.body;
    console.log("APPLICANNNNNTTT IDDD :", id.id);
    const body = req.body;
    console.log("BUUURE :", body);

    if(id){
        ApplicantModel.updateOne({ _id : id.id }, body, function(err, data){
            if(err) throw err;

            return res.status(201).send({ msg : "Applicant details Updated...!"});
        })

    }else{
        return res.status(401).send({ error : "Applicant Not Found...!"});
    }

}


export async function deleteApplicant(req, res){
    const { id } = req.params;
    console.log("id to be deleted : ", req.params);
    if(id){
        ApplicantModel.deleteOne({ _id : id }, function(err, data){
            if(err) throw err;

            return res.status(201).send({ msg : "Applicant successfully deleted...!"});
        })

    }else{
        return res.status(401).send({ error : "Applicant Not Found...!"});
    }
}