import mongoose from "mongoose";

export const EmployeeSchema = new mongoose.Schema({
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    username: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    nickname: { type: String },
    localname: { type: String },
    mobile : { type : Number },
    birthplace: { type: String },
    birthDate: { type: String },
    gender: { type: String },
    address: {
        district: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String }
    },
    contacts: {
        phone: { type: String },
        email: { type: String }
    },
    religion: { type: String },
    status: { type: String },
    nationality: { type: String },
    dialect: { type: String },
    race: { type: String },
    skills: {type: Array }
});

export default mongoose.model.Employee || mongoose.model('Employee', EmployeeSchema);