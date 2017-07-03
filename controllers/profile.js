const Profile = require('../models/Profile');
const { successObject, errorObject } = require('../lib/util');
const {
  ERROR_NO_PERMISSION,
  ERROR_SOMETHING_BAD_HAPPEND,
} = require('../consts');

const get = async (req, res) => {
  try {
    const profileId = req.params.id;
    const userId = req.user.user.id;

    const profile = await Profile.getProfile(profileId);

    if (!profile) {
      return res.status(403).send(errorObject(ERROR_NO_PERMISSION, 'no permission to perform operation')); // Change Profile not found
    }

    if (userId !== profile.userId) {
      return res.status(403).send(errorObject(ERROR_NO_PERMISSION, 'no permission to perform operation'));
    }

    return res.send(successObject('', { data: { profile } }));
  } catch (err) {
    return res.status(500).send(errorObject(ERROR_SOMETHING_BAD_HAPPEND, 'Something bad happened :(', err));
  }
};

const add = async (req, res) => {
  try {
    const userId = req.user.user.id;
    const profile = req.body.profile;

    if (userId !== profile.userId) {
      return res.status(403).send(errorObject(ERROR_NO_PERMISSION, 'no permission to perform operation'));
    }

    await Profile.addProfile(profile);

    return res.send(successObject('', { data: { profile } }));
  } catch (err) {
    return res.status(500).send(errorObject(ERROR_SOMETHING_BAD_HAPPEND, 'Something bad happened :(', err));
  }
};

const update = async (req, res) => {
  try {
    const profileId = req.params.id;
    const userId = req.user.user.id;
    const newProfile = req.body.profile;

    if (userId !== newProfile.userId || profileId !== newProfile.id) {
      return res.status(403).send(errorObject(ERROR_NO_PERMISSION, 'no permission to perform operation'));
    }

    const userProfile = await Profile.updateProfile(profileId, newProfile);

    if (!userProfile) {
      return res.status(500).send(errorObject(ERROR_SOMETHING_BAD_HAPPEND, 'Something bad happened :(')); // Change to user not found error
    }

    return res.send(successObject('', { data: { userProfile } }));
  } catch (err) {
    return res.status(500).send(errorObject(ERROR_SOMETHING_BAD_HAPPEND, 'Something bad happened :(', err));
  }
};

module.exports = {
  get,
  add,
  update,
};
