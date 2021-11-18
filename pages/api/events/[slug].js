const { events } = require("./data.json");

module.exports = (req, res) => {
    const event = events.filter((evt) => evt.slug === req.query.slug);
    if (req.method === "GET") {
        res.status(200).json(event);
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
};
