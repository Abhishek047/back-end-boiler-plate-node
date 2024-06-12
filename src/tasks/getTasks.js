export const getTasks = {
    path: "/",
    method: "get",
    handler: (req, res) => {
        console.log("route-hit");
        return res.status(200).json({
            success: true,
        });
    },
};
