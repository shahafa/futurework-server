/* eslint-disable func-names */

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  userId: { type: String, unique: true },
  firstName: String,
  lastName: String,
  gender: String,
  address: {
    lineOne: String,
    lineTwo: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  bankAccount: {
    nickname: String,
    number: Number,
    routingNumber: Number,
  },
  ssn: String,
  dob: Date,
  citizenship: String,
  phone: String,
  is_permanent_resident: Boolean,
  disclosures: Array,
  retirement_age: Number,
  company: String,
  company_id: String,
  terms_accepted: Date,
  account_status: String,
  max_income: Number,
  risk_model: Number,
  calculated_risk_model: Number,
  auto_escalation: Boolean,
  pending_cash: Number,
  is_self_employed: Boolean,
  is_covered_by_plan: Boolean,
  is_paid_for_by_affiliate: Boolean,
  kyc_needs_update: Boolean,
}, { timestamps: true });

profileSchema.statics.getProfile = async function (profileId) {
  const profile = await this.findOne({ id: profileId }).exec();
  if (!profile) {
    return false;
  }

  return profile;
};

profileSchema.statics.addProfile = async function (profile) {
  const newProfile = new this(profile);
  await newProfile.save();
};

profileSchema.statics.updateProfile = async function (profileId, newProfile) {
  return this.findOneAndUpdate({ id: profileId }, newProfile, { new: true });
};

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
