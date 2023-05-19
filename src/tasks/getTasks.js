export const getTasks = {
  path: "/",
  method: "get",
  handler: (req, res) => {
    return res.status(200).json({
      success: true,
    });
  },
};
