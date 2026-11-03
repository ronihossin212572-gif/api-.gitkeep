import { payout, requireMethod, sendError } from "./_lib/cashdesk.js";
export default async function handler(req, res) {
  try {
    requireMethod(req, "POST");
    const { userId, code, lng = "en" } = req.body || {};
    if (!/^\d+$/.test(String(userId || ""))) return res.status(400).json({ success: false, message: "Valid numeric player ID is required." });
    if (typeof code !== "string" || !code.trim()) return res.status(400).json({ success: false, message: "Payout code is required." });
    const result = await payout(String(userId), code.trim(), String(lng).slice(0, 5));
    return res.status(200).json({ success: true, result });
  } catch (error) { return sendError(res, error); }
}
