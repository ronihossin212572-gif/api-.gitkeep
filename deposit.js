import { addDeposit, requireMethod, sendError } from "./_lib/cashdesk.js";
export default async function handler(req, res) {
  try {
    requireMethod(req, "POST");
    const { userId, amount, lng = "en" } = req.body || {};
    if (!/^\d+$/.test(String(userId || ""))) return res.status(400).json({ success: false, message: "Valid numeric player ID is required." });
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0 || value > 100000000) return res.status(400).json({ success: false, message: "Invalid amount." });
    const result = await addDeposit(String(userId), value, String(lng).slice(0, 5));
    return res.status(200).json({ success: true, result });
  } catch (error) { return sendError(res, error); }
}
