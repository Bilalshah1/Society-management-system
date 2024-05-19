////////////////-----------------------------------///////////////////////
const getLayouts = async (req, res) => {
    const layouts = [
        { id: 1, name: 'Layout 1', description: 'Description of Layout 1' },
        { id: 2, name: 'Layout 2', description: 'Description of Layout 2' },
        ///idkidkdididk
    ];

    res.json({ layouts });
};

const createLayout = async(req, res) => {
    // logic
};

const updateLayout = async(req, res) => {
    // logic
};

const deleteLayout = async(req, res) => {
    // logic
};

module.exports = {
    getLayouts,
    createLayout,
    updateLayout,
    deleteLayout,
};
