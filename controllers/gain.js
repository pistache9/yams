import PastryModel from "../Models/Pastry.js";
import UserModel from "../Models/User.js";

export default async function gain(req, res) {

  const userEmail = req.session.email;
  const gain = parseInt(req.body.gain);

  if (isNaN(gain) || gain < 1) {
    return res.sendStatus(500);
  }

  try {
    for (let i = 0; i < gain; i++) {
      let pastry = await PastryModel.aggregate([{ $sample: { size: 1 } }]);
      if (!pastry.length) {
        return res.sendStatus(500);
      }

      pastry = pastry[0];

      if (pastry.number === 1) {
        await PastryModel.deleteOne({ _id: pastry._id });
      } else {
        await PastryModel.updateOne({ _id: pastry._id }, { $set: { number: pastry.number - 1 } });
      }
      await UserModel.updateOne({ email: req.session.user.email }, { $push: { pastries: { name: pastry.name, date: Date.now() } } });
    }
    req.session.user = await UserModel.findOne({ email: req.session.user.email });
    res.redirect('/dashboard');
  } catch (e) {
    res.sendStatus(500);
  }

}
