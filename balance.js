import { getCashdeskBalance, requireMethod, sendError } from "./_lib/cashdesk.js";
export default async function handler(req, res) {
  try {
    requireMethod(req, "GET");
    const result = await getCashdeskBalance();
    return res.status(200).json({ success: true, result });
  } catch (error) { return sendError(res, error); }
}
