import mongoose from "mongoose";

export const ApplicantSchema = new mongoose.Schema({
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    firstname: { type: String},
    lastname: { type: String},
    mobile : { type : Number},
    address: { type: String},
    status: { type: String}
});

export default mongoose.model.Applicant || mongoose.model('Applicant', ApplicantSchema);