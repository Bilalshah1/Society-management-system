const getLayoutsByView = async (req, res) => {
    const { view_id } = req.params;

    // // temp data ..data taken from db etc etc
    // const layouts = [
    //     { id: 1, name: 'Layout 1', description: 'first one' },
    //     { id: 2, name: 'Layout 2', description: 'second one' },
    //     // Add more layouts as needed
    // ];

    // Respond with the fetched layouts
    res.json({ layouts });
};

module.exports = {
    getLayoutsByView,
};
